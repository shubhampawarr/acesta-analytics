/**
 * Formation geometry for The Resolve (ACESTA-DESIGN.md §7).
 *
 * Every generator returns a Float32Array of n×3 positions in world units,
 * sized to read inside a ~7.4-unit-tall camera frustum. All randomness runs
 * through a seeded PRNG so a given particle count always produces the same
 * cloud — screenshots are reproducible and hydration can never diverge.
 */

export type FormationName =
  | 'chaos'
  | 'lattice'
  | 'grid'
  | 'chart'
  | 'radial'
  | 'flow';

export const FORMATIONS: FormationName[] = [
  'chaos',
  'lattice',
  'grid',
  'chart',
  'radial',
  'flow',
];

/** mulberry32 — small, fast, deterministic. */
function rng(seed: number) {
  let a = seed >>> 0;

  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Uniform point in a sphere — the unresolved noise state. */
export function chaos(n: number): Float32Array {
  const rand = rng(101);
  const out = new Float32Array(n * 3);

  for (let i = 0; i < n; i++) {
    const r = 3.8 * Math.cbrt(rand());
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);

    out[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    out[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    out[i * 3 + 2] = r * Math.cos(phi);
  }

  return out;
}

/**
 * Hero — a 3D lattice constellation clipped to a sphere. Several particles
 * share each node with tiny jitter, so nodes read as stars of varying weight.
 */
export function lattice(n: number): Float32Array {
  const rand = rng(211);
  const out = new Float32Array(n * 3);
  const step = 0.62;
  const extent = 2.2;
  const radius = 2.35;

  const nodes: number[][] = [];

  for (let x = -extent; x <= extent; x += step) {
    for (let y = -extent; y <= extent; y += step) {
      for (let z = -extent; z <= extent; z += step) {
        if (Math.hypot(x, y, z) <= radius) {
          nodes.push([x, y, z]);
        }
      }
    }
  }

  for (let i = 0; i < n; i++) {
    const node = nodes[Math.floor(rand() * nodes.length)];

    out[i * 3] = node[0] + (rand() - 0.5) * 0.07;
    out[i * 3 + 1] = node[1] + (rand() - 0.5) * 0.07;
    out[i * 3 + 2] = node[2] + (rand() - 0.5) * 0.07;
  }

  return out;
}

/** Web development — a wireframe grid, viewport-shaped (16:10), flat in z. */
export function grid(n: number): Float32Array {
  const rand = rng(307);
  const out = new Float32Array(n * 3);
  const w = 5.6;
  const h = 3.5;
  const cols = 9;
  const rows = 6;

  for (let i = 0; i < n; i++) {
    let x: number;
    let y: number;

    if (rand() < 0.55) {
      // a vertical line
      const c = Math.floor(rand() * cols);
      x = -w / 2 + (c / (cols - 1)) * w;
      y = (rand() - 0.5) * h;
    } else {
      // a horizontal line
      const r = Math.floor(rand() * rows);
      y = -h / 2 + (r / (rows - 1)) * h;
      x = (rand() - 0.5) * w;
    }

    out[i * 3] = x + (rand() - 0.5) * 0.025;
    out[i * 3 + 1] = y + (rand() - 0.5) * 0.025;
    out[i * 3 + 2] = (rand() - 0.5) * 0.05;
  }

  return out;
}

/**
 * Data intelligence — a bar chart silhouette with a line series above it
 * and a baseline axis. Bars ladder upward with believable variance.
 */
export function chart(n: number): Float32Array {
  const rand = rng(401);
  const out = new Float32Array(n * 3);
  const bars = 12;
  const w = 5.6;
  const barW = (w / bars) * 0.62;
  const yBase = -1.9;

  const heights: number[] = [];

  for (let b = 0; b < bars; b++) {
    // a modest upward ladder, never monotone
    heights.push(0.7 + (b / (bars - 1)) * 2.5 + (rand() - 0.5) * 0.5);
  }

  for (let i = 0; i < n; i++) {
    const pick = rand();
    let x: number;
    let y: number;

    if (pick < 0.58) {
      // bar fill
      const b = Math.floor(rand() * bars);
      const cx = -w / 2 + ((b + 0.5) / bars) * w;
      x = cx + (rand() - 0.5) * barW;
      y = yBase + rand() * heights[b];
    } else if (pick < 0.85) {
      // line series floating above the bars
      const t = rand();
      const b = Math.min(bars - 1, Math.floor(t * bars));
      const next = Math.min(bars - 1, b + 1);
      const frac = t * bars - b;
      const yLine =
        yBase +
        0.55 +
        heights[b] * (1 - frac) +
        heights[next] * frac;

      x = -w / 2 + t * w;
      y = yLine + (rand() - 0.5) * 0.05;
    } else {
      // axes: baseline and left rule
      if (rand() < 0.7) {
        x = -w / 2 + rand() * w;
        y = yBase - 0.12;
      } else {
        x = -w / 2 - 0.12;
        y = yBase + rand() * 3.4;
      }
    }

    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = (rand() - 0.5) * 0.06;
  }

  return out;
}

/** Search — a radial graph: dense hub, concentric orbits, spoked node ring. */
export function radial(n: number): Float32Array {
  const rand = rng(503);
  const out = new Float32Array(n * 3);
  const outerR = 2.6;
  const nodeCount = 8;

  const nodeAngles = Array.from(
    { length: nodeCount },
    (_, i) => (i / nodeCount) * Math.PI * 2 + 0.2
  );

  for (let i = 0; i < n; i++) {
    const pick = rand();
    let x: number;
    let y: number;
    let z = (rand() - 0.5) * 0.12;

    if (pick < 0.14) {
      // hub
      const r = 0.3 * Math.sqrt(rand());
      const a = rand() * Math.PI * 2;
      x = r * Math.cos(a);
      y = r * Math.sin(a);
    } else if (pick < 0.36) {
      // orbit rings
      const ring = [1.05, 1.8, outerR][Math.floor(rand() * 3)];
      const a = rand() * Math.PI * 2;
      x = ring * Math.cos(a) + (rand() - 0.5) * 0.03;
      y = ring * Math.sin(a) + (rand() - 0.5) * 0.03;
    } else if (pick < 0.64) {
      // orbiting node clusters on the outer ring
      const a = nodeAngles[Math.floor(rand() * nodeCount)];
      const r = 0.17 * Math.sqrt(rand());
      const ca = rand() * Math.PI * 2;
      x = outerR * Math.cos(a) + r * Math.cos(ca);
      y = outerR * Math.sin(a) + r * Math.sin(ca);
    } else {
      // spokes hub -> nodes
      const a = nodeAngles[Math.floor(rand() * nodeCount)];
      const t = rand();
      x = outerR * t * Math.cos(a) + (rand() - 0.5) * 0.04;
      y = outerR * t * Math.sin(a) + (rand() - 0.5) * 0.04;
    }

    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }

  return out;
}

/**
 * Growth — a directed flow: three sources -> qualification -> automation ->
 * outcome, left to right, edges as sagging quadratic curves.
 */
export function flow(n: number): Float32Array {
  const rand = rng(607);
  const out = new Float32Array(n * 3);

  const columns: number[][][] = [
    [
      [-2.8, -1.6],
      [-2.8, 0],
      [-2.8, 1.6],
    ],
    [
      [-0.95, -0.9],
      [-0.95, 0.9],
    ],
    [
      [0.95, -0.9],
      [0.95, 0.9],
    ],
    [[2.8, 0]],
  ];

  const edges: number[][] = [];

  for (let c = 0; c < columns.length - 1; c++) {
    for (const a of columns[c]) {
      for (const b of columns[c + 1]) {
        edges.push([a[0], a[1], b[0], b[1]]);
      }
    }
  }

  const nodes = columns.flat();

  for (let i = 0; i < n; i++) {
    let x: number;
    let y: number;

    if (rand() < 0.42) {
      // node cluster
      const node = nodes[Math.floor(rand() * nodes.length)];
      const r = 0.2 * Math.sqrt(rand());
      const a = rand() * Math.PI * 2;
      x = node[0] + r * Math.cos(a);
      y = node[1] + r * Math.sin(a);
    } else {
      // edge, quadratic bezier with a slight sag toward centre
      const e = edges[Math.floor(rand() * edges.length)];
      const t = rand();
      const mx = (e[0] + e[2]) / 2;
      const my = (e[1] + e[3]) / 2 - 0.25;
      const u = 1 - t;

      x = u * u * e[0] + 2 * u * t * mx + t * t * e[2];
      y = u * u * e[1] + 2 * u * t * my + t * t * e[3];
      x += (rand() - 0.5) * 0.03;
      y += (rand() - 0.5) * 0.03;
    }

    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = (rand() - 0.5) * 0.08;
  }

  return out;
}

export const generators: Record<FormationName, (n: number) => Float32Array> = {
  chaos,
  lattice,
  grid,
  chart,
  radial,
  flow,
};

/**
 * Horizontal offset per formation, in world units. The hero lattice sits
 * right of the headline; the provisional Phase 3 wiring alternates the rest
 * in the zigzag rhythm Phase 4 will formalise. Mobile centres everything.
 */
export const offsets: Record<FormationName, number> = {
  chaos: 0,
  lattice: 1.7,
  grid: -1.5,
  chart: 1.5,
  radial: -1.5,
  flow: 1.5,
};
