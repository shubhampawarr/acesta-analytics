import type { ReactNode } from 'react';

import { Reveal, StaggerGroup } from '@/components/motion/Reveal';
import { ResolveWaypoint } from '@/components/resolve/Resolve';
import type { FormationName } from '@/components/resolve/formations';
import { cn } from '@/lib/cn';

export type ServiceSpec = {
  id: string;
  eyebrow: string;
  name: string;
  /** Positioning — what this is and who it is for. Two sentences at most. */
  positioning: string;
  scope: string[];
  deliverables: string[];
  formation: FormationName;
  /** Copy column side. Set opposite the formation's world offset. */
  align: 'left' | 'right';
};

function Column({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-mono text-mono-label uppercase tracking-mono text-gold">
        {label}
      </h3>

      <ul className="mt-5 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="text-body text-mist">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * One service. Copy block sits opposite its formation's offset; the artifact
 * slot below it is composed differently in every section, which is the main
 * defence against the four-boxes failure — see the notes at each call site.
 *
 * The rhythm gap lives on the waypoint wrapper, not on the section. Padding
 * inside the section sits inside its scroll-margin box too, so a deep link
 * would land on 225px of empty space before the eyebrow ever appeared. §5's
 * note that 180px is a floor here, not a target, is why it runs at 1.25x.
 *
 * `scroll-mt` then clears the fixed 80px nav, so a deep link from the
 * homepage lands with the eyebrow visible rather than tucked under the header.
 */
export function ServiceSection({
  service,
  artifact,
}: {
  service: ServiceSpec;
  artifact?: ReactNode;
}) {
  return (
    <ResolveWaypoint
      formation={service.formation}
      className="pt-[calc(var(--section-gap)*1.25)]"
    >
      <section id={service.id} className="scroll-mt-32">
        <div className="premium-container md:grid md:grid-cols-12">
          {/* The whole text block — including scope and deliverables — stays
              in one 5-column band opposite the formation's world offset. A
              wider band puts the second list directly on top of the particle
              field, which is legible in a screenshot and not on a screen. */}
          <div
            className={cn(
              'md:col-span-5',
              service.align === 'right' ? 'md:col-start-8' : 'md:col-start-1'
            )}
          >
            <Reveal>
              <p className="font-mono text-mono-label uppercase tracking-mono text-gold">
                {service.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-6 text-heading-lg text-bone">{service.name}</h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 text-lead font-extralight text-mist">
                {service.positioning}
              </p>
            </Reveal>

            {/* Mono labels and short lines — never a prose block beside a box. */}
            <StaggerGroup className="mt-14 grid gap-10 sm:grid-cols-2 sm:gap-8 md:mt-16">
              <Column label="Scope" items={service.scope} />
              <Column label="Deliverables" items={service.deliverables} />
            </StaggerGroup>
          </div>
        </div>

        {artifact}
      </section>
    </ResolveWaypoint>
  );
}
