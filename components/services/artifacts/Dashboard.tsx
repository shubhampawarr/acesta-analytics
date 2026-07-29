'use client';

import { useState } from 'react';

import {
  MONTHS,
  SEGMENTS,
  channels,
  metricsFor,
  revenueFor,
  revenuePriorFor,
  type SegmentKey,
} from '@/components/services/data/scenario';
import { Artifact, PanelLabel, type ArtifactComposition } from './Artifact';
import { MetricReadout } from './MetricReadout';
import { areaPath, linePath, niceMax, scales } from './chart';
import { cn } from '@/lib/cn';

const BOX = {
  width: 760,
  height: 260,
  padTop: 16,
  padRight: 8,
  padBottom: 28,
  padLeft: 40,
};

function RevenueChart({ segment }: { segment: SegmentKey }) {
  const current = revenueFor(segment);
  const prior = revenuePriorFor(segment);
  const max = niceMax([...current, ...prior], 5);
  const { x, y, baseline, innerW } = scales(BOX, current.length, max);
  const ticks = [0, max / 2, max];

  return (
    <svg
      viewBox={`0 0 ${BOX.width} ${BOX.height}`}
      className="w-full"
      role="img"
      aria-label={`Monthly revenue in lakhs across twelve months, current period against prior period. Current period runs from ${current[0]} to ${current[current.length - 1]} lakh.`}
    >
      {/* Reference lines — white, per the spec, kept faint. */}
      {ticks.map((t) => (
        <g key={t}>
          <line
            x1={BOX.padLeft}
            x2={BOX.padLeft + innerW}
            y1={y(t)}
            y2={y(t)}
            stroke="#FFFFFF"
            strokeOpacity={0.08}
            strokeWidth={1}
          />
          <text
            x={BOX.padLeft - 10}
            y={y(t) + 4}
            textAnchor="end"
            className="font-mono"
            fontSize={10}
            fill="var(--color-ash)"
          >
            {t}
          </text>
        </g>
      ))}

      {/* Prior period — the single steel comparison series (§2). */}
      <path
        d={linePath(prior, x, y)}
        fill="none"
        stroke="var(--color-steel)"
        strokeWidth={1.5}
        strokeDasharray="4 4"
      />

      {/* Current period — gold, the primary series. Flat fill, no gradient. */}
      <path d={areaPath(current, x, y, baseline)} fill="var(--color-gold)" fillOpacity={0.08} />
      <path
        d={linePath(current, x, y)}
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {current.map((v, i) => (
        <circle key={MONTHS[i]} cx={x(i)} cy={y(v)} r={2.5} fill="var(--color-gold)" />
      ))}

      {MONTHS.map((m, i) => (
        <text
          key={m}
          x={x(i)}
          y={BOX.height - 8}
          textAnchor="middle"
          className="font-mono"
          fontSize={10}
          fill="var(--color-ash)"
        >
          {m}
        </text>
      ))}
    </svg>
  );
}

function ChannelBreakdown() {
  const max = Math.max(...channels.map((c) => c.sessions));

  return (
    <div className="flex flex-col gap-4">
      {channels.map((channel) => (
        <div key={channel.label} className="flex items-center gap-4">
          <p className="w-28 shrink-0 text-caption text-mist">{channel.label}</p>

          <div className="h-2 flex-1 bg-bone/5">
            <div
              className="h-full bg-gold"
              style={{ width: `${(channel.sessions / max) * 100}%` }}
            />
          </div>

          <p className="w-16 shrink-0 text-right font-mono text-caption text-bone">
            {(channel.sessions / 1000).toFixed(1)}k
          </p>
        </div>
      ))}
    </div>
  );
}

export function Dashboard(props: ArtifactComposition) {
  const [segment, setSegment] = useState<SegmentKey>('all');
  const metrics = metricsFor(segment);

  return (
    <Artifact {...props} label="Executive revenue dashboard, illustrative sample">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <PanelLabel>Revenue overview · FY Apr–Mar</PanelLabel>

        {/* Filter row — actually swaps the rendered data set. */}
        <div role="group" aria-label="Customer segment" className="flex gap-6">
          {SEGMENTS.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setSegment(option.key)}
              aria-pressed={segment === option.key}
              className={cn(
                'font-mono text-mono-label uppercase tracking-mono transition-[color] duration-(--dur-micro) ease-out-expo',
                segment === option.key
                  ? 'text-gold'
                  : 'text-ash hover:text-bone'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricReadout key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="mt-12 lg:grid lg:grid-cols-[1.55fr_1fr] lg:gap-12">
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <PanelLabel>Revenue · ₹ lakhs</PanelLabel>

            <div className="flex items-center gap-5 font-mono text-caption">
              <span className="flex items-center gap-2 text-gold">
                <span aria-hidden className="h-px w-4 bg-gold" />
                This year
              </span>
              {/* Decision E as corrected: a legend label naming the steel
                  series is steel, so the label and its line stay connected. */}
              <span className="flex items-center gap-2 text-steel">
                <span aria-hidden className="h-px w-4 bg-steel" />
                Prior year
              </span>
            </div>
          </div>

          <div className="mt-6">
            <RevenueChart segment={segment} />
          </div>
        </div>

        <div className="mt-12 lg:mt-0">
          <PanelLabel>Sessions by channel · 12 months</PanelLabel>

          <div className="mt-6">
            <ChannelBreakdown />
          </div>
        </div>
      </div>
    </Artifact>
  );
}
