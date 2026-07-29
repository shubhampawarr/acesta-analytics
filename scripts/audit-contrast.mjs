/**
 * Contrast auditor — run against a production build.
 *
 *   npm run build && npx next start -p 3111
 *   npm run audit:contrast
 *
 * Runs every route under forced reduced motion, which resolves every scroll
 * reveal on first paint. Without that, elements sitting at `opacity: 0` are
 * skipped by any checker — Lighthouse included — and report clean.
 *
 * WHAT THIS TOOL CHECKS, AND WHAT IT DOES NOT
 *
 * It compares each text node's colour against its resolved *CSS* background,
 * walking ancestors until it finds an opaque one. That is the whole of its
 * competence. A clean result means "no failures against CSS backgrounds" and
 * must be reported in those words — not as accessibility sign-off.
 *
 * It cannot see text over the WebGL canvas. The canvas sits at `-z-10`, so
 * those nodes resolve as text on void and pass without ever being checked.
 * Rather than stay silent about that, section 2 of the report enumerates every
 * text node the canvas shows through, turning "check the field by eye" into a
 * finite list. Each entry needs a human pass on a real device.
 *
 * Where a tool cannot see, it should say so. Silence reading as a pass is how
 * both of this auditor's blind spots survived several phases.
 */

import puppeteer from 'puppeteer-core';
import sharp from 'sharp';

/**
 * Optional second pass: `npm run audit:contrast -- --density`.
 *
 * Enumeration alone says "these nodes sit over the canvas". This measures how
 * much of the field is actually behind each one, by screenshotting the
 * viewport with the canvas visible and again with it hidden, then diffing the
 * pixels inside each node's box. It still cannot compute a contrast ratio, but
 * it turns a list of several hundred "unknown" nodes into the handful with
 * meaningful particle coverage — which is a checklist a human can finish.
 */
const MEASURE_DENSITY = process.argv.includes('--density');

const BASE = process.env.BASE_URL ?? 'http://localhost:3111';
const ROUTES = (
  process.env.ROUTES ?? '/,/services,/work,/about,/contact,/privacy,/terms'
).split(',');

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, deviceScaleFactor: 1 },
  { name: 'mobile', width: 390, height: 844, deviceScaleFactor: 2, isMobile: true },
];

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

/** Runs inside the page. Returns text nodes plus how each one is backed. */
function collect() {
  function resolvedBackground(el) {
    let node = el;

    while (node && node !== document.documentElement) {
      const bg = getComputedStyle(node).backgroundColor;
      const parts = bg.match(/[\d.]+/g);

      if (parts && (parts.length < 4 || parseFloat(parts[3]) > 0.95)) {
        return bg;
      }

      node = node.parentElement;
    }

    return null;
  }

  // A host that is not rendering is not a background. Routes that suppress
  // the field (§6.5) must drop off the unchecked list, not sit on it forever
  // as nodes over a canvas that was never painted.
  const host = document.querySelector('[data-resolve-host]');
  const hostStyle = host ? getComputedStyle(host) : null;
  const hostRendering =
    hostStyle !== null &&
    hostStyle.display !== 'none' &&
    hostStyle.visibility !== 'hidden' &&
    Number(hostStyle.opacity) > 0.02;

  const canvas = hostRendering ? host.querySelector('canvas') : null;
  const canvasOpacity = hostRendering ? Number(hostStyle.opacity) : 0;

  const backed = [];
  const overCanvas = [];

  for (const el of document.querySelectorAll('body *')) {
    const ownText = [...el.childNodes]
      .filter((n) => n.nodeType === 3 && n.textContent.trim().length > 1)
      .map((n) => n.textContent.trim())
      .join(' ');

    if (!ownText) continue;

    const style = getComputedStyle(el);

    if (
      style.visibility === 'hidden' ||
      style.display === 'none' ||
      parseFloat(style.opacity) < 0.5
    ) {
      continue;
    }

    const rect = el.getBoundingClientRect();

    if (rect.width < 1 || rect.height < 1) continue;

    const record = {
      text: ownText.slice(0, 48),
      color: style.color,
      fontSize: parseFloat(style.fontSize),
      fontWeight: Number(style.fontWeight),
      selector: `${el.tagName.toLowerCase()}${el.className ? '.' + String(el.className).trim().split(/\s+/).slice(0, 2).join('.') : ''}`,
      top: Math.round(rect.top + window.scrollY),
      width: Math.round(rect.width),
    };

    const background = resolvedBackground(el);

    if (background) {
      backed.push({ ...record, background });
    } else if (canvas) {
      // Nothing opaque between this text and the canvas behind the page.
      overCanvas.push(record);
    } else {
      backed.push({ ...record, background: 'rgb(0, 0, 0)' });
    }
  }

  return { backed, overCanvas, canvasPresent: Boolean(canvas), canvasOpacity };
}

const luminance = ([r, g, b]) => {
  const channel = (c) => {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };

  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

const parse = (value) => {
  const parts = value.match(/[\d.]+/g);
  return parts ? parts.slice(0, 3).map(Number) : null;
};

function ratio(foreground, background) {
  const a = luminance(foreground);
  const b = luminance(background);

  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/**
 * Fraction of pixels inside each node box that change when the canvas is
 * hidden — i.e. how much particle field is actually behind that text.
 */
async function measureDensity(page, nodes) {
  if (nodes.length === 0) return;

  const viewport = page.viewport();
  const step = Math.round(viewport.height * 0.85);
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);

  for (let top = 0; top < pageHeight; top += step) {
    await page.evaluate((y) => window.scrollTo(0, y), top);
    await new Promise((r) => setTimeout(r, 350));

    const visible = await page.evaluate(() =>
      [...document.querySelectorAll('body *')]
        .filter((el) => {
          const own = [...el.childNodes].some(
            (n) => n.nodeType === 3 && n.textContent.trim().length > 1
          );
          if (!own) return false;
          const r = el.getBoundingClientRect();
          return r.top >= 0 && r.bottom <= window.innerHeight && r.width > 1;
        })
        .map((el) => {
          const r = el.getBoundingClientRect();
          return {
            key: (el.textContent || '').trim().slice(0, 48),
            x: Math.max(0, Math.round(r.left)),
            y: Math.max(0, Math.round(r.top)),
            w: Math.round(r.width),
            h: Math.round(r.height),
          };
        })
    );

    if (visible.length === 0) continue;

    const withField = await page.screenshot({ type: 'png' });
    await page.evaluate(() => {
      const host = document.querySelector('[data-resolve-host]');
      if (host) host.style.visibility = 'hidden';
    });
    await new Promise((r) => setTimeout(r, 120));
    const withoutField = await page.screenshot({ type: 'png' });
    await page.evaluate(() => {
      const host = document.querySelector('[data-resolve-host]');
      if (host) host.style.visibility = '';
    });

    const a = await sharp(withField).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const b = await sharp(withoutField).removeAlpha().raw().toBuffer();
    const { width } = a.info;
    const scale = a.info.width / viewport.width;

    for (const box of visible) {
      const target = nodes.find((n) => n.text === box.key.slice(0, 48));
      if (!target) continue;

      let differing = 0;
      let total = 0;
      const x0 = Math.round(box.x * scale);
      const y0 = Math.round(box.y * scale);
      const x1 = Math.min(a.info.width, Math.round((box.x + box.w) * scale));
      const y1 = Math.min(a.info.height, Math.round((box.y + box.h) * scale));

      for (let y = y0; y < y1; y += 2) {
        for (let x = x0; x < x1; x += 2) {
          const i = (y * width + x) * 3;
          total += 1;
          if (
            Math.abs(a.data[i] - b[i]) > 8 ||
            Math.abs(a.data[i + 1] - b[i + 1]) > 8 ||
            Math.abs(a.data[i + 2] - b[i + 2]) > 8
          ) {
            differing += 1;
          }
        }
      }

      if (total > 0) {
        target.density = Math.max(target.density ?? 0, differing / total);
      }
    }
  }
}

async function main() {
  const executablePath = CHROME_CANDIDATES.find(Boolean);
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--enable-unsafe-swiftshader'],
  });

  const failures = [];
  const overCanvas = [];
  let checked = 0;

  for (const viewport of VIEWPORTS) {
    for (const route of ROUTES) {
      const page = await browser.newPage();

      await page.setViewport(viewport);
      // Resolves every reveal on first paint, so nothing is skipped at opacity 0.
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ]);
      await page.goto(BASE + route, { waitUntil: 'networkidle0' });
      // The canvas mounts on idle; give it room to arrive.
      await new Promise((r) => setTimeout(r, 2600));

      const result = await page.evaluate(collect);

      for (const node of result.backed) {
        const fg = parse(node.color);
        const bg = parse(node.background);

        if (!fg || !bg) continue;

        checked += 1;

        const large =
          node.fontSize >= 24 || (node.fontSize >= 18.66 && node.fontWeight >= 700);
        const floor = large ? 3 : 4.5;
        const value = ratio(fg, bg);

        if (value < floor) {
          failures.push({ route, viewport: viewport.name, floor, ratio: value, ...node });
        }
      }

      const routeNodes = result.overCanvas.map((node) => ({
        route,
        viewport: viewport.name,
        canvasOpacity: result.canvasOpacity,
        ...node,
      }));

      if (MEASURE_DENSITY && routeNodes.length > 0) {
        await measureDensity(page, routeNodes);
      }

      overCanvas.push(...routeNodes);

      await page.close();
    }
  }

  await browser.close();

  console.log('\n=== 1. CONTRAST AGAINST CSS BACKGROUNDS ===');
  console.log(`  ${checked} text nodes checked across ${ROUTES.length} routes × ${VIEWPORTS.length} breakpoints`);
  console.log(`  ${failures.length} failures\n`);

  for (const f of failures) {
    console.log(
      `  ${f.ratio.toFixed(2)}:1 (need ${f.floor})  ${f.route} ${f.viewport}  ${f.selector}\n      "${f.text}"  ${f.color} on ${f.background}`
    );
  }

  console.log('\n=== 2. NOT CHECKED — TEXT OVER THE PARTICLE CANVAS ===');
  console.log('  The canvas sits at -z-10 and cannot be sampled from the DOM, so');
  console.log('  contrast for these nodes is UNKNOWN, not passing. Each needs a');
  console.log('  manual pass on a real device at both breakpoints.\n');

  const grouped = new Map();

  for (const node of overCanvas) {
    const key = `${node.route} · ${node.viewport} · canvas opacity ${node.canvasOpacity}`;
    grouped.set(key, [...(grouped.get(key) ?? []), node]);
  }

  for (const [key, nodes] of grouped) {
    console.log(`  ${key} — ${nodes.length} nodes`);

    // Smallest and lightest first: those are where the field actually competes.
    const ranked = [...nodes].sort(
      (a, b) => a.fontSize * a.fontWeight - b.fontSize * b.fontWeight
    );

    const measured = ranked.filter((n) => (n.density ?? 0) > 0.02);
    const shown = MEASURE_DENSITY ? measured : ranked.slice(0, 8);

    for (const node of shown) {
      const density =
        node.density === undefined
          ? ''
          : `  field ${(node.density * 100).toFixed(0)}%`;

      console.log(
        `      ${String(Math.round(node.fontSize)).padStart(3)}px/${node.fontWeight}  y=${String(node.top).padStart(5)}  ${node.selector}  "${node.text}"${density}`
      );
    }

    if (MEASURE_DENSITY) {
      console.log(
        `      ${measured.length} of ${nodes.length} have measurable field behind them`
      );
    } else if (ranked.length > 8) {
      console.log(`      … and ${ranked.length - 8} more`);
    }

    console.log('');
  }

  console.log('=== SUMMARY ===');
  console.log(`  ${failures.length} contrast failures against CSS backgrounds.`);
  console.log(`  ${overCanvas.length} text nodes over the canvas were NOT checked.`);
  console.log('  This is not accessibility sign-off. It is one of two checks.\n');

  process.exit(failures.length > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
