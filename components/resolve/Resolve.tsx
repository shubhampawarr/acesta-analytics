'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import { useReducedMotion } from '@/lib/useReducedMotion';
import { FORMATIONS, type FormationName } from './formations';
import { resolveController } from './controller';

/**
 * The canvas is code-split and client-only, so three.js never lands in the
 * document's critical path (Phase 3 gate: the canvas must not be in the LCP
 * path). `mounted` additionally holds it back until after first paint.
 */
const ResolveCanvas = dynamic(() => import('./ResolveCanvas'), {
  ssr: false,
});

const MOBILE_QUERY = '(max-width: 768px)';

/** Dev-only `?formation=` override, if it names a real formation. */
function devFormation(): FormationName | null {
  if (process.env.NODE_ENV === 'production' || typeof window === 'undefined') {
    return null;
  }

  const requested = new URLSearchParams(window.location.search).get(
    'formation'
  ) as FormationName | null;

  return requested && FORMATIONS.includes(requested) ? requested : null;
}

export function Resolve() {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // QA escape hatch, available in every environment: `?resolve=off` skips
    // the canvas entirely. It only ever disables an effect, and it is what
    // lets a Lighthouse run attribute cost to the particle system rather than
    // to machine noise.
    if (new URLSearchParams(window.location.search).get('resolve') === 'off') {
      return;
    }

    setMobile(window.matchMedia(MOBILE_QUERY).matches);

    // Boot on idle, not on a rAF pair. Parsing three.js and creating the WebGL
    // context costs ~300ms of main-thread time on throttled mobile; run inside
    // the FCP-to-interactive window and every millisecond of it lands in TBT.
    // Idle puts it after the page is usable, where the user cannot feel it.
    let idle: number;

    if (typeof window.requestIdleCallback === 'function') {
      idle = window.requestIdleCallback(() => setMounted(true), {
        timeout: 3000,
      });

      return () => window.cancelIdleCallback(idle);
    }

    idle = window.setTimeout(() => setMounted(true), 1200);

    return () => window.clearTimeout(idle);
  }, []);

  // Pause the render loop whenever the canvas is off screen (§7 perf).
  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { rootMargin: '10% 0px' }
    );

    observer.observe(host);

    return () => observer.disconnect();
  }, [mounted]);

  // Resolve on load: chaos -> lattice (§7). Reduced motion gets the resolved
  // formation immediately, with no animation loop at all.
  useEffect(() => {
    if (!mounted) {
      return;
    }

    // A dev override owns the initial state outright — otherwise this timer
    // would fire after the switcher and animate straight back to lattice.
    if (devFormation()) {
      return;
    }

    if (reducedMotion) {
      resolveController.morphTo('lattice', { instant: true });
      return;
    }

    const timer = setTimeout(() => resolveController.morphTo('lattice'), 260);

    return () => clearTimeout(timer);
  }, [mounted, reducedMotion]);

  // Dev-only formation switcher: ?formation=chart, or press 1–5.
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' || !mounted) {
      return;
    }

    const requested = devFormation();

    if (requested) {
      resolveController.morphTo(requested, { instant: true });
    }

    function onKey(event: KeyboardEvent) {
      const index = Number(event.key);

      if (index >= 1 && index <= 5) {
        resolveController.morphTo(FORMATIONS[index]);
      }
    }

    window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);
  }, [mounted]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      data-resolve-host={mounted ? 'ready' : undefined}
    >
      {mounted && (
        <ResolveCanvas
          mobile={mobile}
          reducedMotion={reducedMotion}
          paused={offscreen}
        />
      )}
    </div>
  );
}

/**
 * Declares which formation owns a stretch of the page. The particle system
 * is mounted once at the app shell; sections only announce themselves as
 * they arrive, so the field travels between formations instead of resetting.
 */
export function ResolveWaypoint({
  formation,
  className,
  children,
}: {
  formation: FormationName;
  className?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    // While a dev formation is pinned, waypoints stay out of the way —
    // otherwise the hero's own waypoint fires on load and overrides it.
    if (!element || devFormation()) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          resolveController.morphTo(formation);
        }
      },
      // Fires as the section settles into the middle of the viewport.
      { rootMargin: '-35% 0px -35% 0px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [formation]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
