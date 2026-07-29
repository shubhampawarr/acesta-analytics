'use client';

import { useEffect, useRef, useState } from 'react';

import { useReducedMotion } from '@/lib/useReducedMotion';
import type { Metric } from '@/components/services/data/scenario';

const DURATION = 900;

function format(value: number, kind: Metric['format']) {
  switch (kind) {
    case 'crore':
      return `₹${value.toFixed(2)} Cr`;
    case 'rupees':
      return `₹${Math.round(value).toLocaleString('en-IN')}`;
    case 'percent':
      return `${value.toFixed(2)}%`;
    default:
      return Math.round(value).toLocaleString('en-IN');
  }
}

/**
 * §5 Metric Readout. Value counts up when the tile first scrolls into view,
 * and again whenever the segment filter changes the number — which is what
 * makes the filter feel like it did something.
 *
 * Reduced motion renders the final value immediately and never starts a loop.
 */
export function MetricReadout({ metric }: { metric: Metric }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [seen, setSeen] = useState(false);
  const [shown, setShown] = useState(metric.value);

  useEffect(() => {
    const element = ref.current;

    if (!element || seen) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -15% 0px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [seen]);

  useEffect(() => {
    if (!seen || reducedMotion) {
      setShown(metric.value);

      return;
    }

    const from = 0;
    const start = performance.now();
    let frame = requestAnimationFrame(function step(now) {
      const t = Math.min(1, (now - start) / DURATION);
      // expo-out, matching --ease-out-expo closely enough for a counter
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

      setShown(from + (metric.value - from) * eased);

      if (t < 1) {
        frame = requestAnimationFrame(step);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [metric.value, reducedMotion, seen]);

  return (
    <div ref={ref}>
      <p className="font-mono text-mono-metric text-bone">
        {format(shown, metric.format)}
      </p>

      <p className="mt-3 font-mono text-mono-label uppercase tracking-mono text-ash">
        {metric.label}
      </p>

      {/* §5: gold for positive, ash for negative. Never red or green. */}
      <p className="mt-2 font-mono text-caption text-gold">
        {metric.delta}{' '}
        <span className="text-ash">vs {metric.prior}</span>
      </p>
    </div>
  );
}
