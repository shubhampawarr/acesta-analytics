/**
 * Minimal SVG chart helpers — no charting library, per the build spec.
 *
 * The data is fixed and pre-computed: nothing streams, nothing re-bins, and
 * there is no interaction beyond swapping between prepared data sets. These
 * four functions are the entire surface a library would have been installed
 * to provide.
 */

export type Box = {
  width: number;
  height: number;
  padTop: number;
  padRight: number;
  padBottom: number;
  padLeft: number;
};

export function scales(box: Box, count: number, max: number) {
  const innerW = box.width - box.padLeft - box.padRight;
  const innerH = box.height - box.padTop - box.padBottom;

  return {
    x: (i: number) => box.padLeft + (count === 1 ? 0 : (i / (count - 1)) * innerW),
    y: (v: number) => box.padTop + innerH - (v / max) * innerH,
    innerW,
    innerH,
    baseline: box.padTop + innerH,
  };
}

/** Polyline path through every point. */
export function linePath(
  values: number[],
  x: (i: number) => number,
  y: (v: number) => number
) {
  return values
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
    .join(' ');
}

/** The same line, closed down to the baseline for a flat fill (no gradient). */
export function areaPath(
  values: number[],
  x: (i: number) => number,
  y: (v: number) => number,
  baseline: number
) {
  const last = values.length - 1;

  return `${linePath(values, x, y)} L${x(last).toFixed(1)} ${baseline} L${x(0).toFixed(1)} ${baseline} Z`;
}

/** A round number above the data, so the axis does not end mid-value. */
export function niceMax(values: number[], step: number) {
  return Math.ceil(Math.max(...values) / step) * step;
}
