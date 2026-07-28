'use client';

import { useEffect } from 'react';

import { useReducedMotion } from '@/lib/useReducedMotion';

/**
 * Smooth scroll (ACESTA-DESIGN.md §8, lerp 0.09) with GSAP ScrollTrigger
 * driven off the same ticker, so scroll-linked animation and scroll position
 * can never drift apart.
 *
 * Lenis and GSAP are imported dynamically inside the effect: neither is needed
 * for first paint, and keeping them out of the initial chunk is what stops the
 * motion stack from competing with the headline for main-thread time.
 *
 * Reduced motion bypasses Lenis entirely — native scroll, no ticker, no tweens.
 */
export function SmoothScroll() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    let cancelled = false;
    let teardown: (() => void) | undefined;

    async function start() {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import('lenis'),
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);

      if (cancelled) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
        autoRaf: false,
      });

      function onScroll() {
        ScrollTrigger.update();
      }

      function raf(time: number) {
        // gsap.ticker reports seconds; Lenis expects milliseconds.
        lenis.raf(time * 1000);
      }

      lenis.on('scroll', onScroll);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.refresh();

      teardown = () => {
        lenis.off('scroll', onScroll);
        gsap.ticker.remove(raf);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
      };
    }

    // Hand the main thread back first. Smooth scroll is a felt refinement, not
    // a first-paint requirement, and booting it inside the TBT window is what
    // turns a fast page into a janky-feeling one on mid-range Android.
    const idle =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback(() => void start(), { timeout: 2000 })
        : window.setTimeout(() => void start(), 200);

    return () => {
      cancelled = true;

      if (typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idle as number);
      } else {
        window.clearTimeout(idle as number);
      }

      teardown?.();
    };
  }, [reducedMotion]);

  return null;
}
