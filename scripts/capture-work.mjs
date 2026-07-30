/**
 * Captures a desktop hero screenshot of each live project.
 *
 *   npm run capture:work
 *
 * FULL COLOUR — no duotone (§6, corrected after Phase 8). These are evidence,
 * not decoration: a studio selling web design has to let a prospect evaluate
 * the work, and a monochrome wash hides the exact thing being sold. What
 * integrates them with the void is crop, containment and reduced opacity at
 * rest, never a colour treatment.
 *
 * THE TONAL-SPREAD GATE IS RETIRED (§6). It existed to stop the duotone
 * collapsing a flat source into a gold slab, and the duotone is gone. A flat
 * source is no longer disqualifying — it is a display problem, solved by
 * matching opacity to luminance rather than by dropping the image. The artist
 * portfolio is the case that proved it: a genuine near-white design measuring
 * 254/13.8, correct at 85% and destroyed at 30%.
 *
 * The HTTP status check stays. A dead URL is a real and separate problem, and
 * it is the one failure this script must never let through silently.
 *
 * Output: five WebP captures plus app/work/captures.json, which carries the
 * measured mean luminance forward so the page derives its opacity from the
 * source rather than from a hand-tuned per-project value.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import puppeteer from 'puppeteer-core';
import sharp from 'sharp';

const OUT = path.join(process.cwd(), 'public/work');
const MANIFEST = path.join(process.cwd(), 'app/work/captures.json');

/**
 * The roster, led by CareRadar — a live product on its own domain, which is
 * the strongest credibility signal in the set.
 */
const PROJECTS = [
  { slug: 'careradar', url: 'https://careradar.de/' },
  { slug: 'axira-media', url: 'https://axiramedia.vercel.app/' },
  { slug: 'balaji-arts', url: 'https://balajiarts.vercel.app/' },
  // NOT proteincartel.vercel.app — that host 404s. The hyphenated domain is
  // the live one.
  { slug: 'protein-cartel', url: 'https://protein-cartel.vercel.app/' },
  /**
   * The root, deliberately. It measures 254/13.8 because the site really is a
   * near-white page with sparse black granules and thin black type — that is
   * the design, not a failed capture. It ships at the light-source opacity.
   */
  { slug: 'artist-portfolio', url: 'https://shubhampmusic.vercel.app/' },
];

/**
 * §6: above this mean luminance a capture is a light source and rests at 85%
 * on desktop; below it, 30%. Recorded per project in the manifest so the
 * threshold lives in one place and the page never guesses.
 */
const LIGHT_SOURCE_LUMINANCE = 200;

const CHROME =
  process.env.CHROME_PATH ??
  'C:/Program Files/Google/Chrome/Application/chrome.exe';

/**
 * Cheap insurance on every capture, and independent of why any one of them
 * might come out wrong:
 *
 *   - Wait for webfonts. A shot taken mid-swap shows fallback type, which on a
 *     portfolio row is the one thing a prospect reads as amateur.
 *   - Scroll and return. Most of these sites reveal their hero on an
 *     IntersectionObserver; a page that never scrolls can leave content at
 *     opacity 0 forever, and the capture is then of an empty stage.
 *   - Settle. Entrance animations need to finish, or the shot is a frame of
 *     the transition rather than the resting composition.
 */
async function prepare(page) {
  await page.evaluate(() => document.fonts.ready);

  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight / 2);
    const limit = Math.min(document.body.scrollHeight, window.innerHeight * 3);

    for (let y = step; y <= limit; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }

    window.scrollTo(0, 0);
  });

  await new Promise((r) => setTimeout(r, 4500));
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--hide-scrollbars'],
  });

  const manifest = {};

  for (const project of PROJECTS) {
    // Asserted before the browser is involved, so a dead URL is reported as a
    // dead URL rather than as some downstream symptom of one.
    let status;

    try {
      const probe = await fetch(project.url, { redirect: 'follow' });

      status = probe.status;
    } catch (error) {
      console.log(`  ✗ ${project.slug}: unreachable — ${error.message}`);
      continue;
    }

    if (status < 200 || status > 299) {
      console.log(
        `  ✗ ${project.slug}: HTTP ${status} — no image, row stays typographic`
      );
      continue;
    }

    const page = await browser.newPage();

    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

    try {
      await page.goto(project.url, {
        waitUntil: 'networkidle2',
        timeout: 60000,
      });
    } catch {
      console.warn(`  ! ${project.slug}: navigation timed out, capturing anyway`);
    }

    await prepare(page);

    // Viewport-sized, deliberately: a full-page capture squeezed into a
    // portfolio row renders its content at unreadable size, and averages a
    // light site down to one flat tone.
    const raw = await page.screenshot({ type: 'png' });

    const stats = await sharp(raw).removeAlpha().stats();
    const spread =
      stats.channels.reduce((total, c) => total + c.stdev, 0) / stats.channels.length;
    const meanLuminance = Math.round(
      0.2126 * stats.channels[0].mean +
        0.7152 * stats.channels[1].mean +
        0.0722 * stats.channels[2].mean
    );

    await sharp(raw)
      .resize({ width: 1600 })
      .webp({ quality: 82 })
      .toFile(path.join(OUT, `${project.slug}.webp`));

    const light = meanLuminance > LIGHT_SOURCE_LUMINANCE;

    manifest[project.slug] = { meanLuminance, light };

    // Spread is still printed. It is no longer a gate, but it is the one
    // number that says whether a capture caught the page or caught a blank.
    console.log(
      `  ✓ ${project.slug}  mean luminance ${meanLuminance} (${light ? 'light' : 'dark/mid'} → ${light ? 85 : 30}% at rest)  tonal spread ${spread.toFixed(1)}`
    );
    await page.close();
  }

  await browser.close();

  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`  → ${path.relative(process.cwd(), MANIFEST)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
