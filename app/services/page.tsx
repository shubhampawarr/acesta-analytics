import type { Metadata } from 'next';
import Link from 'next/link';

import { Reveal } from '@/components/motion/Reveal';
import { ResolveWaypoint } from '@/components/resolve/Resolve';
import {
  ServiceSection,
  type ServiceSpec,
} from '@/components/services/ServiceSection';
import { Dashboard } from '@/components/services/artifacts/Dashboard';
import { SeoPanel } from '@/components/services/artifacts/SeoPanel';
import { GrowthFlow } from '@/components/services/artifacts/GrowthFlow';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Premium web development, executive data intelligence, search visibility and growth systems architecture — built as one system for businesses that need clarity.',
};

/**
 * Order matches the homepage snippet sequence, so a prospect who scrolls the
 * homepage and clicks through meets the services in the order they expect —
 * and the particle field runs the same grid → chart → radial → flow sequence
 * it does there.
 */
const services: ServiceSpec[] = [
  {
    id: 'web',
    eyebrow: 'Web Development',
    name: 'Premium Web Development',
    positioning:
      'Sites for businesses whose website is the first thing a prospect judges them on. Fast, restrained, and built to survive close inspection rather than to win a design award.',
    scope: [
      'Positioning and page structure',
      'Design direction and art direction',
      'Build, deploy and handover',
      'Performance and accessibility budgets',
    ],
    deliverables: [
      'Marketing site or landing page',
      'Design system and tokens',
      'Content structure you can maintain',
      'Lighthouse targets met on mobile',
    ],
    formation: 'grid',
    align: 'right',
  },
  {
    id: 'data',
    eyebrow: 'Data Intelligence',
    name: 'Executive Data Intelligence',
    positioning:
      'One view of the business that a board can read in a minute. We consolidate the numbers you already have into something decisions can actually be made from.',
    scope: [
      'Source audit and data cleaning',
      'Metric definitions agreed in writing',
      'Dashboard design and build',
      'Handover and team walkthrough',
    ],
    deliverables: [
      'Executive dashboard',
      'Revenue, orders and conversion views',
      'Channel and region breakdowns',
      'Refresh process your team can run',
    ],
    formation: 'chart',
    align: 'left',
  },
  {
    id: 'search',
    eyebrow: 'Search Visibility',
    name: 'Search Visibility Foundation',
    positioning:
      'The technical groundwork that makes a site legible to search engines. Foundations that compound quietly, not tactics that expire the next time the algorithm moves.',
    scope: [
      'Technical crawl and index audit',
      'Information architecture',
      'Metadata and schema',
      'Core Web Vitals remediation',
    ],
    deliverables: [
      'Prioritised audit with fixes applied',
      'Page and heading structure',
      'Keyword-to-page mapping',
      'Visibility baseline to measure against',
    ],
    formation: 'radial',
    align: 'right',
  },
  {
    id: 'growth',
    eyebrow: 'Growth Systems',
    name: 'Growth Systems Architecture',
    positioning:
      'The path between someone noticing you and someone becoming an enquiry, designed deliberately instead of accumulating by accident.',
    scope: [
      'Enquiry journey mapping',
      'Qualification criteria',
      'Automation and routing',
      'Instrumentation and review cadence',
    ],
    deliverables: [
      'Documented lead flow',
      'Qualification and routing rules',
      'Follow-up sequences',
      'Reporting on what converts',
    ],
    formation: 'flow',
    align: 'left',
  },
];

export default function ServicesPage() {
  const [web, data, search, growth] = services;

  return (
    <main className="relative overflow-x-clip">
      <ResolveWaypoint formation="lattice">
        <section className="premium-container flex min-h-[70svh] items-center pt-32 md:min-h-[80svh] md:pt-20">
          <div>
            <Reveal immediate>
              <p className="font-mono text-mono-label uppercase tracking-mono text-gold">
                Services
              </p>
            </Reveal>

            <Reveal immediate>
              <h1 className="mt-6 max-w-[15ch] text-display text-bone">
                Four disciplines, built as one system.
              </h1>
            </Reveal>

            <Reveal immediate>
              <p className="mt-8 max-w-[52ch] text-lead font-extralight text-mist">
                Most agencies sell these separately. They compound when they are
                built together — and they undermine each other when they are
                not.
              </p>
            </Reveal>
          </div>
        </section>
      </ResolveWaypoint>

      {/* 1 — no vitrine at all. The proof is the site, so this section is the
          strongest typographic moment on the page instead of an exhibit. */}
      <ServiceSection
        service={web}
        artifact={
          <div className="premium-container mt-20 md:mt-24">
            <div className="md:grid md:grid-cols-12">
              <div className="md:col-span-9 md:col-start-4">
                <Reveal>
                  <p className="text-heading text-bone">
                    The proof of this one is the page you are reading. It scores
                    99 on mobile, carries a four-thousand-point particle system,
                    and still paints in under two seconds.
                  </p>
                </Reveal>

                <Reveal delay={0.08}>
                  <Link href="/work" className="ghost-link mt-10 inline-block">
                    See selected work
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        }
      />

      {/* 2 — bleeds off the right edge. */}
      <ServiceSection
        service={data}
        artifact={
          <Reveal className="mt-20 pl-(--gutter) md:mt-24 md:pl-[max(var(--gutter),calc((100vw-var(--page-max-width))/2))]">
            {/* Bleeds off the right edge: no radius or border on that side. */}
            <Dashboard
              surfaceClassName="rounded-r-none border-r-0"
              captionClassName="pr-(--gutter)"
            />
          </Reveal>
        }
      />

      {/* 3 — centred and inset, the quietest of the three exhibits. */}
      <ServiceSection
        service={search}
        artifact={
          <div className="premium-container mt-20 md:mt-24">
            <Reveal className="mx-auto md:max-w-[56rem]">
              <SeoPanel />
            </Reveal>
          </div>
        }
      />

      {/* 4 — full-bleed, wide and short. Echoes the flow formation behind it. */}
      <ServiceSection
        service={growth}
        artifact={
          <Reveal className="mt-20 md:mt-24">
            {/* Full-bleed: both vertical edges run off the viewport. */}
            <GrowthFlow
              surfaceClassName="rounded-none border-x-0"
              captionClassName="px-(--gutter)"
            />
          </Reveal>
        }
      />

      {/* Close on the lattice — the field returns to where the page opened. */}
      <ResolveWaypoint formation="lattice">
        <section className="premium-container pt-(--section-gap)">
          <Reveal>
            <p className="font-mono text-mono-label uppercase tracking-mono text-gold">
              Start
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="mt-8 max-w-[18ch] text-heading-lg text-bone">
              Not sure which of these you need first?
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[52ch] text-body text-mist">
              That is usually the right question to arrive with. Tell us what is
              unclear and we will tell you which of the four actually addresses
              it.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <Link href="/contact" className="ghost-link mt-10 inline-block">
              Start a conversation
            </Link>
          </Reveal>
        </section>
      </ResolveWaypoint>
    </main>
  );
}
