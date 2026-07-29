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
 * The measured tonal-spread gate is retained. It was introduced because the
 * duotone collapsed flat sources to a gold slab, but a near-uniform capture is
 * a weak portfolio image whatever the treatment — at rest opacity on black it
 * is simply a grey rectangle.
 */

import { mkdir } from 'node:fs/promises';
import path from 'node:path';

import puppeteer from 'puppeteer-core';
import sharp from 'sharp';

const OUT = path.join(process.cwd(), 'public/work');

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
  { slug: 'artist-portfolio', url: 'https://shubhampmusic.vercel.app/' },
];

/**
 * The gate is measured, not judged by eye (§8.1). A luminance-to-colour
 * mapping needs a spread of tones to map; a near-uniform source produces a
 * flat gold field whatever curve is applied. Anything below this standard
 * deviation ships as no image at all and its row stays typographic — the
 * artist portfolio failed at full page with a spread of 13.4.
 */
const MIN_TONAL_SPREAD = 22;

const CHROME =
  process.env.CHROME_PATH ??
  'C:/Program Files/Google/Chrome/Application/chrome.exe';


async function main() {
  await mkdir(OUT, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox', '--hide-scrollbars'],
  });

  for (const project of PROJECTS) {
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

    // Let entrance animations settle so the shot is the resting composition.
    await new Promise((r) => setTimeout(r, 4500));

    // Viewport-sized, deliberately: a full-page capture squeezed into a
    // portfolio row renders its content at unreadable size, and averages a
    // light site down to one flat tone.
    const raw = await page.screenshot({ type: 'png' });

    const stats = await sharp(raw).removeAlpha().stats();
    const spread =
      stats.channels.reduce((total, c) => total + c.stdev, 0) / stats.channels.length;
    const meanLum =
      0.2126 * stats.channels[0].mean +
      0.7152 * stats.channels[1].mean +
      0.0722 * stats.channels[2].mean;

    if (spread < MIN_TONAL_SPREAD) {
      console.log(
        `  ✗ ${project.slug}: tonal spread ${spread.toFixed(1)} below ${MIN_TONAL_SPREAD} (mean luminance ${meanLum.toFixed(0)}) — no image, row stays typographic`
      );
      await page.close();
      continue;
    }

    await sharp(raw)
      .resize({ width: 1600 })
      .webp({ quality: 82 })
      .toFile(path.join(OUT, `${project.slug}.webp`));

    console.log(
      `  ✓ ${project.slug}  tonal spread ${spread.toFixed(1)}  source mean luminance ${meanLum.toFixed(0)}`
    );
    await page.close();
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
