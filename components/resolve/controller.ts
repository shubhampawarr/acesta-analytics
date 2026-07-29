import type { FormationName } from './formations';

/** §8 morph duration, and the §7 closing morph which is deliberately slower. */
export const MORPH_MS = 1400;
export const MORPH_SLOW_MS = 2600;

/**
 * The morph controller — the one mutable seam between the DOM world
 * (waypoints, dev switcher) and the render loop. The canvas registers an
 * implementation on mount; callers never need to know whether the canvas
 * has loaded yet, because requests made before registration are replayed
 * once it arrives.
 */
type MorphOptions = {
  instant?: boolean;
  /** Override the §8 morph duration. Used for the §7 lattice close. */
  durationMs?: number;
};

type ResolveApi = {
  morphTo: (formation: FormationName, options?: MorphOptions) => void;
};

let api: ResolveApi | null = null;
let current: FormationName | null = null;

export const resolveController = {
  /**
   * A newly registered canvas adopts whatever formation the page has already
   * asked for, jumping straight to it rather than animating. Without this, any
   * remount — StrictMode's double-invoke in dev, a fast refresh, a route
   * change — silently strands the field back in its initial chaos state while
   * the request that would have moved it has already been consumed.
   */
  register(impl: ResolveApi) {
    api = impl;

    if (current) {
      api.morphTo(current, { instant: true });
    }
  },

  unregister() {
    api = null;
  },

  morphTo(formation: FormationName, options?: MorphOptions) {
    current = formation;
    api?.morphTo(formation, options);
  },
};

/** cubic-bezier(0.65, 0, 0.35, 1) — --ease-morph (§8) as a callable. */
export function easeMorph(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;

  const p1x = 0.65;
  const p2x = 0.35;

  // Newton–Raphson for the parametric u where bezierX(u) = t.
  let u = t;

  for (let i = 0; i < 6; i++) {
    const iu = 1 - u;
    const x = 3 * iu * iu * u * p1x + 3 * iu * u * u * p2x + u * u * u;
    const dx =
      3 * iu * iu * p1x + 6 * iu * u * (p2x - p1x) + 3 * u * u * (1 - p2x);

    if (Math.abs(dx) < 1e-6) break;

    u -= (x - t) / dx;
    u = Math.min(1, Math.max(0, u));
  }

  // y-control points are 0 and 1, so bezierY reduces to:
  const iu = 1 - u;

  return 3 * iu * u * u + u * u * u;
}
