import Link from 'next/link';

import { Reveal } from '@/components/motion/Reveal';
import { ResolveWaypoint } from '@/components/resolve/Resolve';
import type { FormationName } from '@/components/resolve/formations';
import { cn } from '@/lib/cn';

export type Service = {
  eyebrow: string;
  name: string;
  /** The claim — one line, the reason to care. */
  proposition: string;
  /** What it actually is. Restores the floor Decision M over-cut (item 3/6). */
  support: string;
  anchor: string;
  formation: FormationName;
};

/**
 * One service, one sentence. The particle formation behind the page is the
 * entire visual payload here — no vitrine, no artifact, no data. Text sits on
 * the side opposite the formation's world-space offset, which is what produces
 * the zigzag: grid and radial sit left, so their copy sits right, and vice
 * versa. On mobile the field centres and the copy simply stacks.
 */
export function ServiceSnippet({
  service,
  align,
}: {
  service: Service;
  align: 'left' | 'right';
}) {
  return (
    <ResolveWaypoint formation={service.formation}>
      {/* Mobile stacks: the field lifts into the upper half (offsetsYMobile)
          and the copy sits below it. Desktop separates them horizontally
          instead, so the copy re-centres. */}
      <section className="premium-container flex min-h-svh items-end pb-28 md:items-center md:pb-0">
        <div className="w-full md:grid md:grid-cols-12">
          <div
            className={cn(
              'md:col-span-5',
              align === 'right' ? 'md:col-start-8' : 'md:col-start-1'
            )}
          >
            <Reveal>
              <p className="font-mono text-mono-label uppercase tracking-mono text-gold">
                {service.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-8 text-heading-lg text-bone">{service.name}</h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[34ch] text-lead font-extralight text-bone">
                {service.proposition}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-5 max-w-[46ch] text-body text-mist">
                {service.support}
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <Link
                href={`/services#${service.anchor}`}
                className="ghost-link mt-10 inline-block"
              >
                See the work
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </ResolveWaypoint>
  );
}
