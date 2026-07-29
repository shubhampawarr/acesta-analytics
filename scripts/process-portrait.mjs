/**
 * Prepares the founder portrait for §6.1: gold duotone, alpha preserved.
 *
 *   npm run process:portrait
 *
 * Two steps, and the first matters more than the second.
 *
 * 1. MATTE DECONTAMINATION. The source was cut out from a white background,
 *    which leaves white mixed into every partially-transparent edge pixel —
 *    measured at 29% of the rim above luminance 200, and 33% in the hair.
 *    Left alone, the duotone maps that bright rim to --color-gold-bright and
 *    the subject ships with a pale halo against void, which is the stated
 *    failure mode for a cutout on a dark page.
 *
 *    An edge pixel observed over white is `a·subject + (1-a)·255`, so the
 *    true subject colour recovers as `(observed - (1-a)·255) / a`. Eroding
 *    the mask instead would work but eats a pixel of hair detail all round;
 *    this recovers what was actually there.
 *
 * 2. The §6 duotone: luminance to --color-gold-deep at 0, --color-gold-bright
 *    at 1. A portrait has genuine tonal range — navy suit, skin, white shirt —
 *    so it needs far less midtone correction than a screenshot of a light UI.
 */

import path from 'node:path';

import sharp from 'sharp';

const SRC = path.join(process.cwd(), 'public/founder.png');
const OUT = path.join(process.cwd(), 'public/founder-duotone.webp');

const SHADOW = [0x6e, 0x5a, 0x28];
const HIGHLIGHT = [0xf2, 0xdf, 0xa8];
const slope = HIGHLIGHT.map((h, i) => (h - SHADOW[i]) / 255);

/** Mild — this is a photograph, not a flat UI capture. */
const TONE_CURVE = 1.25;

async function main() {
  const { data, info } = await sharp(SRC)
    .resize({ width: 1100, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  let rim = 0;
  let rimPaleBefore = 0;
  let rimPaleAfter = 0;
  let lumSum = 0;
  let lumCount = 0;

  for (let i = 0; i < data.length; i += channels) {
    const alpha = data[i + 3];

    if (alpha === 0) continue;

    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];

    if (alpha < 255) {
      rim += 1;

      if (0.2126 * r + 0.7152 * g + 0.0722 * b > 200) rimPaleBefore += 1;

      // Recover the subject colour from the white-matted edge.
      const a = alpha / 255;
      r = Math.min(255, Math.max(0, (r - (1 - a) * 255) / a));
      g = Math.min(255, Math.max(0, (g - (1 - a) * 255) / a));
      b = Math.min(255, Math.max(0, (b - (1 - a) * 255) / a));

      if (0.2126 * r + 0.7152 * g + 0.0722 * b > 200) rimPaleAfter += 1;
    }

    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    const t = Math.pow(lum, TONE_CURVE);

    data[i] = SHADOW[0] + slope[0] * 255 * t;
    data[i + 1] = SHADOW[1] + slope[1] * 255 * t;
    data[i + 2] = SHADOW[2] + slope[2] * 255 * t;

    lumSum += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    lumCount += 1;
  }

  await sharp(data, { raw: { width, height, channels } })
    .webp({ quality: 88, alphaQuality: 100 })
    .toFile(OUT);

  console.log(`  rim pixels: ${rim}`);
  console.log(
    `  pale rim (lum > 200): ${rimPaleBefore} before → ${rimPaleAfter} after decontamination`
  );
  console.log(`  mean luminance of visible pixels: ${(lumSum / lumCount).toFixed(0)}`);
  console.log(`  → ${path.relative(process.cwd(), OUT)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
