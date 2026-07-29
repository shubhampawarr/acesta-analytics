import {
  MONTHS,
  coreWebVitals,
  keywords,
  seoLift,
  visibilityScore,
} from '@/components/services/data/scenario';
import { Artifact, PanelLabel } from './Artifact';
import { cn } from '@/lib/cn';
import { linePath, niceMax, scales } from './chart';

/**
 * Taller than it is wide compared with the first cut (was 520×150), because a
 * wide short plot flattens any trend. Slope earned by aspect ratio, not by
 * touching a number.
 */
const BOX_DESKTOP = {
  width: 440,
  height: 280,
  padTop: 16,
  padRight: 14,
  padBottom: 26,
  padLeft: 46,
  axisFont: 14,
  midTick: true,
};

/** Narrower viewBox at mobile so the scale stays near 1 and labels clear 12px. */
const BOX_MOBILE = {
  width: 300,
  height: 240,
  padTop: 14,
  padRight: 6,
  padBottom: 24,
  padLeft: 26,
  axisFont: 13,
  /* 17.5 overruns the axis gutter at 390px; endpoints only. */
  midTick: false,
};

function VisibilityTrend({ box }: { box: typeof BOX_DESKTOP }) {
  /**
   * Zero-based, deliberately. On the section selling SEO, a truncated axis is
   * the exact move a data-literate prospect reads as a tell. The ceiling is
   * tightened to just above the maximum instead — 35 for data topping at 31.2
   * rather than 40, which recovers the slope without touching the floor.
   */
  const max = niceMax(visibilityScore, 5);
  const { x, y, innerW } = scales(box, visibilityScore.length, max);

  return (
    <svg
      viewBox={`0 0 ${box.width} ${box.height}`}
      className="w-full"
      role="img"
      aria-label={`Visibility index rising from ${visibilityScore[0]} to ${visibilityScore[visibilityScore.length - 1]} over twelve months, on a zero-based axis.`}
    >
      {(box.midTick ? [0, max / 2, max] : [0, max]).map((t) => (
        <g key={t}>
          <line
            x1={box.padLeft}
            x2={box.padLeft + innerW}
            y1={y(t)}
            y2={y(t)}
            stroke="#FFFFFF"
            strokeOpacity={0.08}
          />
          <text
            x={box.padLeft - 8}
            y={y(t) + 4}
            textAnchor="end"
            className="font-mono"
            fontSize={box.axisFont}
            fill="var(--color-ash)"
          >
            {t}
          </text>
        </g>
      ))}

      <path
        d={linePath(visibilityScore, x, y)}
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      <circle
        cx={x(visibilityScore.length - 1)}
        cy={y(visibilityScore[visibilityScore.length - 1])}
        r={3}
        fill="var(--color-gold-bright)"
      />

      {MONTHS.map((m, i) =>
        i % 2 === 0 ? (
          <text
            key={m}
            x={x(i)}
            y={box.height - 6}
            textAnchor="middle"
            className="font-mono"
            fontSize={box.axisFont}
            fill="var(--color-ash)"
          >
            {m}
          </text>
        ) : null
      )}
    </svg>
  );
}

export function SeoPanel() {
  const first = visibilityScore[0];
  const last = visibilityScore[visibilityScore.length - 1];

  return (
    <Artifact label="Search visibility panel, illustrative sample">
      <PanelLabel>Keyword positions</PanelLabel>

      <table className="mt-6 w-full border-collapse text-left">
        <thead>
          {/* §8.2: two columns at 390px — query and the change that matters.
              Before/Now return at md. A table that needs horizontal scroll
              has failed. */}
          <tr className="font-mono text-mono-label uppercase tracking-mono text-ash">
            <th scope="col" className="pb-3 font-medium">Query</th>
            <th scope="col" className="hidden pb-3 text-right font-medium md:table-cell">Before</th>
            <th scope="col" className="hidden pb-3 text-right font-medium md:table-cell">Now</th>
            <th scope="col" className="pb-3 text-right font-medium">Change</th>
          </tr>
        </thead>
        <tbody>
          {keywords.map((k, index) => (
            <tr
              key={k.term}
              className={cn(
                'border-t border-gold/12',
                index >= 4 && 'hidden md:table-row'
              )}
            >
              <td className="py-3 pr-4 text-caption text-mist">{k.term}</td>
              <td className="hidden py-3 text-right font-mono text-caption text-ash md:table-cell">
                {k.before}
              </td>
              <td className="hidden py-3 text-right font-mono text-caption text-bone md:table-cell">
                {k.after}
              </td>
              <td className="py-3 text-right font-mono text-caption text-gold">
                {k.before} → {k.after}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-12 md:grid md:grid-cols-2 md:gap-12">
        <div>
          <PanelLabel>Visibility index</PanelLabel>

          {/* Stated plainly, so the reader can check the claim against the
              axis rather than having to trust the shape of the line. */}
          <p className="mt-5 flex items-baseline gap-3 font-mono">
            <span className="text-subheading text-bone">
              {first} → {last}
            </span>
            <span className="text-caption text-gold">
              +{Math.round(((last - first) / first) * 100)}%
            </span>
            <span className="text-caption text-ash">12 months</span>
          </p>

          <div className="mt-6">
            <div className="md:hidden">
              <VisibilityTrend box={BOX_MOBILE} />
            </div>
            <div className="hidden md:block">
              <VisibilityTrend box={BOX_DESKTOP} />
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-0">
          <PanelLabel>Core Web Vitals</PanelLabel>

          <dl className="mt-6 flex flex-col gap-5">
            {coreWebVitals.map((vital) => (
              <div key={vital.label} className="flex items-baseline gap-4">
                <dt className="w-10 shrink-0 font-mono text-caption uppercase tracking-mono text-ash">
                  {vital.label}
                </dt>
                <dd className="flex items-baseline gap-3">
                  <span className="font-mono text-subheading text-bone">
                    {vital.value}
                  </span>
                  <span className="text-caption text-ash">
                    {vital.threshold}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-12">
        <PanelLabel>Twelve-month lift</PanelLabel>

        <dl className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {seoLift.map((row) => (
            <div key={row.label}>
              <dt className="text-caption text-ash">{row.label}</dt>
              <dd className="mt-2 flex items-baseline gap-2 font-mono">
                <span className="text-caption text-ash line-through decoration-ash/50">
                  {row.before}
                </span>
                <span aria-hidden className="text-caption text-gold-deep">
                  →
                </span>
                <span className="text-subheading text-bone">{row.after}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Artifact>
  );
}
