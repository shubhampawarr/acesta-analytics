'use client';

import { useCallback, useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);

  query.addEventListener('change', onChange);

  return () => query.removeEventListener('change', onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/**
 * The single reduced-motion source of truth. ACESTA-DESIGN.md §8 makes this a
 * hard requirement: every animated component in the codebase reads this hook.
 *
 * The server snapshot is `true` — we assume no motion until the client proves
 * otherwise, so nothing can start animating during hydration. The *visual*
 * resting state is owned by CSS (see the `[data-reveal]` rules in globals.css),
 * which means a reduced-motion visitor sees the final composition even if this
 * JavaScript never runs.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    useCallback(subscribe, []),
    getSnapshot,
    () => true
  );
}
