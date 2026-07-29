import {
  MONTHS,
  coreWebVitals,
  keywords,
  seoLift,
  visibilityScore,
} from '@/components/services/data/scenario';
import { Artifact, PanelLabel } from './Artifact';
import { linePath, niceMax, scales } from './chart';

/**
 * Taller than it is wide compared with the first cut (was 520×150), because a
 * wide short plot flattens any trend. Slope earned by aspect ratio, not by
 * touching a number.
 */
const BOX = {
  width: 440,
  height: 280,
  padTop: 16,
  padRight: 8,
  padBottom: 26,
  padLeft: 30,
};

function VisibilityTrend() {
  /**
   * Zero-based, deliberately. On the section selling SEO, a truncated axis is
   * the exact move a data-literate prospect reads as a tell. The ceiling is
   * tightened to just above the maximum instead — 35 for data topping at 31.2
   * rather than 40, which recovers the slope without touching the floor.
   */
  const max = niceMax(visibilityScore, 5);
  const { x, y, innerW } = scales(BOX, visibilityScore.length, max);

  return (
    <svg
      viewBox={`0 0 ${BOX.width} ${BOX.height}`}
      className="w-full"
      role="img"
      aria-label={`Visibility index rising from ${visibilityScore[0]} to ${visibilityScore[visibilityScore.length - 1]} over twelve months, on a zero-based axis.`}
    >
      {[0, max / 2, max].map((t) => (
        <g key={t}>
          <line
            x1={BOX.padLeft}
            x2={BOX.padLeft + innerW}
            y1={y(t)}
            y2={y(t)}
            stroke="#FFFFFF"
            strokeOpacity={0.08}
          />
          <text
            x={BOX.padLeft - 8}
            y={y(t) + 4}
            textAnchor="end"
            className="font-mono"
            fontSize={9}
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
            y={BOX.height - 6}
            textAnchor="middle"
            className="font-mono"
            fontSize={9}
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
          <tr className="font-mono text-mono-label uppercase tracking-mono text-ash">
            <th scope="col" className="pb-3 font-medium">Query</th>
            <th scope="col" className="pb-3 text-right font-medium">Before</th>
            <th scope="col" className="pb-3 text-right font-medium">Now</th>
            <th scope="col" className="pb-3 text-right font-medium">Change</th>
          </tr>
        </thead>
        <tbody>
          {keywords.map((k) => (
            <tr key={k.term} className="border-t border-gold/12">
              <td className="py-3 pr-4 text-caption text-mist">{k.term}</td>
              <td className="py-3 text-right font-mono text-caption text-ash">
                {k.before}
              </td>
              <td className="py-3 text-right font-mono text-caption text-bone">
                {k.after}
              </td>
              <td className="py-3 text-right font-mono text-caption text-gold">
                +{k.before - k.after}
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
            <VisibilityTrend />
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
