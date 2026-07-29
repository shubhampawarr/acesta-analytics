import {
  MONTHS,
  coreWebVitals,
  keywords,
  seoLift,
  visibilityScore,
} from '@/components/services/data/scenario';
import { Artifact, PanelLabel } from './Artifact';
import { linePath, niceMax, scales } from './chart';

const BOX = {
  width: 520,
  height: 150,
  padTop: 12,
  padRight: 6,
  padBottom: 22,
  padLeft: 26,
};

function VisibilityTrend() {
  const max = niceMax(visibilityScore, 10);
  const { x, y, innerW } = scales(BOX, visibilityScore.length, max);

  return (
    <svg
      viewBox={`0 0 ${BOX.width} ${BOX.height}`}
      className="w-full"
      role="img"
      aria-label={`Visibility index rising from ${visibilityScore[0]} to ${visibilityScore[visibilityScore.length - 1]} over twelve months.`}
    >
      {[0, max].map((t) => (
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
