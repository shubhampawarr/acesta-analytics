import { flowStages } from '@/components/services/data/scenario';
import { Artifact, PanelLabel, type ArtifactComposition } from './Artifact';

/**
 * Directed graph: sources → qualification → automation → outcome.
 *
 * The node counts and the every-node-to-every-node edge pattern are the same
 * ones `flow()` builds in components/resolve/formations.ts, and the edges use
 * the same sagging quadratic curve. The particle formation behind this section
 * is this diagram, unresolved — which is the point of §7.
 *
 * The travelling pulse is a dashed overlay path animated by stroke-dashoffset:
 * no JS, no SMIL, and it degrades to a static hairline under reduced motion.
 */

const COLUMN_X = [80, 330, 580, 830];
const COLUMN_Y = [
  [80, 180, 280],
  [130, 230],
  [130, 230],
  [180],
];

/** Keep the edge clear of the label sitting on each node. */
const PORT = 62;

function edgePath(x0: number, y0: number, x1: number, y1: number) {
  const sx = x0 + PORT;
  const ex = x1 - PORT;
  const mx = (sx + ex) / 2;
  const my = (y0 + y1) / 2 + 18;

  return `M${sx} ${y0} Q${mx} ${my} ${ex} ${y1}`;
}

export function GrowthFlow(props: ArtifactComposition) {
  const edges: { d: string; key: string }[] = [];

  for (let c = 0; c < COLUMN_X.length - 1; c++) {
    COLUMN_Y[c].forEach((y0, a) => {
      COLUMN_Y[c + 1].forEach((y1, b) => {
        edges.push({
          key: `${c}-${a}-${b}`,
          d: edgePath(COLUMN_X[c], y0, COLUMN_X[c + 1], y1),
        });
      });
    });
  }

  return (
    <Artifact {...props} label="Growth systems flow diagram, illustrative sample">
      <PanelLabel>Enquiry flow · March</PanelLabel>

      <svg
        viewBox="0 0 900 330"
        className="mt-8 w-full"
        role="img"
        aria-label="Directed flow from three traffic sources through qualification and automation to 1,470 orders in March."
      >
        {edges.map((edge, index) => (
          <g key={edge.key}>
            <path
              d={edge.d}
              fill="none"
              stroke="var(--color-gold)"
              strokeOpacity={0.25}
              strokeWidth={1}
            />
            {/* pathLength normalises every edge to 1 unit, so one pulse
                traverses each edge continuously whatever its real length —
                without it a fixed dash cycle leaves short edges empty. */}
            <path
              className="flow-pulse"
              d={edge.d}
              pathLength={1}
              style={{ '--pulse-index': index } as React.CSSProperties}
              fill="none"
              stroke="var(--color-gold-bright)"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          </g>
        ))}

        {flowStages.map((stage, c) => (
          <g key={stage.label}>
            <text
              x={COLUMN_X[c]}
              y={26}
              textAnchor="middle"
              className="font-mono"
              fontSize={11}
              letterSpacing="0.08em"
              fill="var(--color-ash)"
            >
              {stage.label.toUpperCase()}
            </text>

            {stage.nodes.map((node, i) => {
              const x = COLUMN_X[c];
              const y = COLUMN_Y[c][i];

              return (
                <g key={node.label}>
                  <circle cx={x} cy={y} r={3.5} fill="var(--color-gold)" />
                  <text
                    x={x}
                    y={y - 16}
                    textAnchor="middle"
                    className="font-mono"
                    fontSize={11}
                    fill="var(--color-mist)"
                  >
                    {node.label}
                  </text>
                  <text
                    x={x}
                    y={y + 26}
                    textAnchor="middle"
                    className="font-mono"
                    fontSize={14}
                    fill="var(--color-bone)"
                  >
                    {node.value}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </Artifact>
  );
}
