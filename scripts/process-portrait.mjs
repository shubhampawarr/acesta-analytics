/**
 * Prepares the founder portrait for §6.1.
 *
 *   npm run process:portrait
 *
 * FULL COLOUR — no duotone (§6, corrected after Phase 8). A duotoned face
 * reads as a graphic; on a page arguing that the person who scopes the work is
 * the person who builds it, the portrait's job is to make that person real.
 *
 * The matte decontamination stays, and matters more than ever. The source was
 * cut from a white background, which leaves white mixed into every partially
 * transparent edge pixel — measured at 29% of the rim above luminance 200, and
 * 33% in the hair. Against void that is a visible halo whether or not the
 * image is tinted. An edge pixel observed over white is `a·subject +
 * (1-a)·255`, so the true colour recovers as `(observed - (1-a)·255) / a`.
 * Eroding the mask would also work but eats a pixel of hair detail all round.
 */

import path from 'node:path';

import sharp from 'sharp';

const SRC = path.join(process.cwd(), 'public/founder.png');
const OUT = path.join(process.cwd(), 'public/founder.webp');

/**
 * §6: a head-and-shoulders crop, not the full-body source. Scaling a
 * full-length shot down renders the face too small to register while the frame
 * still occupies the same real estate — cropping in solves what shrinking
 * cannot.
 *
 * Derived from the source's own alpha profile rather than picked by eye: the
 * head runs y 160-720 (peak width 441 at y 360), the neck narrows to 235 at
 * y 720, and the shoulders widen from y 760 out to the full frame by y 1000.
 * This box takes head, shoulders and upper chest, horizontally centred between
 * the face centre (~620) and the shoulder centre (~550).
 */
const CROP = { left: 195, top: 130, width: 760, height: 900 };


async function main() {
  const { data, info } = await sharp(SRC)
    .extract(CROP)
    .resize({ width: 760, withoutEnlargement: true })
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

    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;

    lumSum += 0.2126 * r + 0.7152 * g + 0.0722 * b;
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
