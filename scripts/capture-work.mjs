/**
 * Captures a desktop screenshot of each live project and bakes in the §6
 * gold-duotone treatment.
 *
 *   npm run capture:work
 *
 * The duotone is baked rather than applied as a runtime SVG filter: it is a
 * fixed brand treatment, not a variable, and baking avoids both the per-frame
 * filter cost on large images and Safari's patchy record with filtered <img>.
 * The mapping is taken straight from the tokens — luminance 0 lands on
 * --color-gold-deep, luminance 1 on --color-gold-bright — so re-running this
 * after a token change reproduces it exactly.
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

/** §6 ramp: #6E5A28 shadows → #F2DFA8 highlights. Endpoints exactly as specified. */
const SHADOW = [0x6e, 0x5a, 0x28];
const HIGHLIGHT = [0xf2, 0xdf, 0xa8];
const slope = HIGHLIGHT.map((h, i) => (h - SHADOW[i]) / 255);

/**
 * Tone curve applied to luminance before the ramp.
 *
 * §6's treatment assumes a photograph, which has a spread of tones. A
 * screenshot of a light UI is mostly one bright tone, so a straight mapping
 * lands nearly the whole frame on gold-bright and produces a large flat gold
 * rectangle — which §9 forbids outright. Raising luminance to a power pushes
 * midtones toward the shadow end while leaving both endpoints untouched, so
 * the specified ramp still holds and light sources stop shouting.
 */
const TONE_CURVE = 2.1;

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

    const { data, info } = await sharp(raw)
      .resize({ width: 1600 })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 3) {
      const lum =
        (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
      const t = Math.pow(lum, TONE_CURVE);

      data[i] = SHADOW[0] + slope[0] * 255 * t;
      data[i + 1] = SHADOW[1] + slope[1] * 255 * t;
      data[i + 2] = SHADOW[2] + slope[2] * 255 * t;
    }

    await sharp(data, { raw: { width: info.width, height: info.height, channels: 3 } })
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
