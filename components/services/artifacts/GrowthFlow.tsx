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

const PORT = 62;

type Point = { x: number; y: number };

type Layout = {
  viewBox: string;
  stageAt: (column: number) => Point;
  nodeAt: (column: number, index: number) => Point;
  vertical: boolean;
  labelFont: number;
  valueFont: number;
  /** Stage captions are dropped at mobile — see V_LAYOUT. */
  showStages: boolean;
};

/** Desktop: four columns left to right. */
const H_LAYOUT: Layout = {
  viewBox: '0 0 900 330',
  stageAt: (c: number) => ({ x: [80, 330, 580, 830][c], y: 26 }),
  nodeAt: (c: number, i: number) => ({
    x: [80, 330, 580, 830][c],
    y: [[80, 180, 280], [130, 230], [130, 230], [180]][c][i],
  }),
  vertical: false,
  labelFont: 11,
  valueFont: 14,
  showStages: true,
};

/**
 * Mobile: the same graph rotated to run top to bottom (§8.2). A wide directed
 * graph compressed to 390px is unreadable, so this is a different layout of
 * the same data rather than the desktop one scaled down.
 */
const V_LAYOUT: Layout = {
  viewBox: '0 0 380 760',
  stageAt: (c: number) => ({ x: 190, y: [30, 220, 430, 640][c] }),
  nodeAt: (c: number, i: number) => ({
    x: [[60, 190, 320], [120, 260], [120, 260], [190]][c][i],
    y: [90, 285, 495, 700][c],
  }),
  vertical: true,
  // Rendered near 0.9 scale at 390px, so these lift the effective size past
  // the 12px floor that the desktop values miss there.
  labelFont: 14,
  valueFont: 17,
  /**
   * No stage captions. Vertically the four stages sit in the middle of the
   * edge bundle travelling between rows, and there is no clear corridor at
   * 380 units to move them into. The top-to-bottom order already reads as a
   * sequence and the node labels carry the content, so this is one fewer
   * element rather than the same one made smaller.
   */
  showStages: false,
};

function edgePath(a: Point, b: Point, vertical: boolean) {
  if (vertical) {
    const sy = a.y + 34;
    const ey = b.y - 46;
    const my = (sy + ey) / 2;

    return `M${a.x} ${sy} Q${(a.x + b.x) / 2 + 14} ${my} ${b.x} ${ey}`;
  }

  const sx = a.x + PORT;
  const ex = b.x - PORT;
  const mx = (sx + ex) / 2;
  const my = (a.y + b.y) / 2 + 18;

  return `M${sx} ${a.y} Q${mx} ${my} ${ex} ${b.y}`;
}

function Graph({ layout }: { layout: Layout }) {
  const edges: { d: string; key: string }[] = [];

  for (let c = 0; c < flowStages.length - 1; c++) {
    flowStages[c].nodes.forEach((_, a) => {
      flowStages[c + 1].nodes.forEach((__, b) => {
        edges.push({
          key: `${c}-${a}-${b}`,
          d: edgePath(layout.nodeAt(c, a), layout.nodeAt(c + 1, b), layout.vertical),
        });
      });
    });
  }

  return (
    <svg
      viewBox={layout.viewBox}
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
              traverses each edge continuously whatever its real length. */}
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

      {flowStages.map((stage, c) => {
        const stageAt = layout.stageAt(c);

        return (
          <g key={stage.label}>
            {layout.showStages ? (
            <text
              x={stageAt.x}
              y={stageAt.y}
              textAnchor="middle"
              className="font-mono"
              fontSize={layout.labelFont}
              letterSpacing="0.08em"
              fill="var(--color-ash)"
            >
              {stage.label.toUpperCase()}
            </text>
            ) : null}

            {stage.nodes.map((node, i) => {
              const { x, y } = layout.nodeAt(c, i);

              return (
                <g key={node.label}>
                  <circle cx={x} cy={y} r={3.5} fill="var(--color-gold)" />
                  <text
                    x={x}
                    y={y - 16}
                    textAnchor="middle"
                    className="font-mono"
                    fontSize={layout.labelFont}
                    fill="var(--color-mist)"
                  >
                    {node.label}
                  </text>
                  <text
                    x={x}
                    y={y + 26}
                    textAnchor="middle"
                    className="font-mono"
                    fontSize={layout.valueFont}
                    fill="var(--color-bone)"
                  >
                    {node.value}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

export function GrowthFlow(props: ArtifactComposition) {
  return (
    <Artifact {...props} label="Growth systems flow diagram, illustrative sample">
      <PanelLabel>Enquiry flow · March</PanelLabel>

      <div className="md:hidden">
        <Graph layout={V_LAYOUT} />
      </div>
      <div className="hidden md:block">
        <Graph layout={H_LAYOUT} />
      </div>
    </Artifact>
  );
}
