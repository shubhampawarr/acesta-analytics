'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

import { useReducedMotion } from '@/lib/useReducedMotion';

/**
 * ACESTA-DESIGN.md §8. The trigger point is expressed as a bottom root-margin:
 * -25% means the element must reach 75% of the viewport before it fires.
 */
const TRIGGER_MARGIN = '0px 0px -25% 0px';
const STAGGER_MS = 60;

/**
 * Fires `onEnter` once, the first time the element reaches the §8 trigger line.
 * IntersectionObserver rather than ScrollTrigger on purpose: a fire-once reveal
 * needs no scroll-linked progress, and pulling GSAP in for it cost ~250ms of
 * main-thread time on throttled mobile. GSAP stays for Phase 3, where the
 * particle morph genuinely needs continuous scroll progress.
 */
function useRevealOnce(
  ref: React.RefObject<HTMLElement | null>,
  enabled: boolean,
  onEnter: (element: HTMLElement) => void
) {
  useEffect(() => {
    const element = ref.current;

    if (!element || !enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            onEnter(element);
            observer.disconnect();
          }
        }
      },
      { rootMargin: TRIGGER_MARGIN }
    );

    observer.observe(element);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ref]);
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Seconds, to match the GSAP-style call sites already in the codebase. */
  delay?: number;
  /**
   * Render the resting state immediately, with no hidden start and no
   * transition. Use for anything in the initial viewport — an above-the-fold
   * element that fades up from `opacity: 0` pushes out LCP by its own duration.
   */
  immediate?: boolean;
};

/**
 * Mask-up reveal (§8): translateY 24px + opacity over 700ms on the expo-out
 * curve, fired once at 75% viewport. Never fade-only.
 *
 * The hidden resting state and the transition both live in CSS, so a
 * reduced-motion visitor gets the finished composition on the first paint
 * whether or not this JavaScript ever runs.
 */
export function Reveal({
  children,
  className,
  as: Tag = 'div',
  delay = 0,
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useRevealOnce(ref, !immediate && !reducedMotion, (element) => {
    element.style.transitionDelay = delay ? `${delay * 1000}ms` : '';
    element.dataset.revealed = '';
  });

  return (
    <Tag ref={ref} className={className} data-reveal={immediate ? undefined : ''}>
      {children}
    </Tag>
  );
}

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
};

/**
 * Reveals its direct children in sequence at the §8 stagger of 60ms.
 * Children need no wrapper component — the group drives them directly.
 */
export function StaggerGroup({
  children,
  className,
  as: Tag = 'div',
  delay = 0,
}: StaggerGroupProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useRevealOnce(ref, !reducedMotion, (element) => {
    const base = delay * 1000;

    Array.from(element.children).forEach((child, index) => {
      const item = child as HTMLElement;

      item.style.transitionDelay = `${base + index * STAGGER_MS}ms`;
      item.dataset.revealed = '';
    });
  });

  return (
    <Tag ref={ref} className={className} data-stagger-group="">
      {children}
    </Tag>
  );
}
