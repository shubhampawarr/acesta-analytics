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

      for (const node of result.overCanvas) {
        overCanvas.push({
          route,
          viewport: viewport.name,
          canvasOpacity: result.canvasOpacity,
          ...node,
        });
      }

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

    for (const node of ranked.slice(0, 8)) {
      console.log(
        `      ${String(Math.round(node.fontSize)).padStart(3)}px/${node.fontWeight}  y=${String(node.top).padStart(5)}  ${node.selector}  "${node.text}"`
      );
    }

    if (ranked.length > 8) {
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
