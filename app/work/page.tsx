import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Reveal } from '@/components/motion/Reveal';
import { ResolveWaypoint } from '@/components/resolve/Resolve';

export const metadata: Metadata = {
  title: 'Selected Work',
  description:
    'Selected work from Acesta Analytics — agency websites, ecommerce storefronts and creative web experiences.',
};

type Project = {
  name: string;
  outcome: string;
  discipline: string;
  year: string;
  status: string;
  href: string;
  /**
   * Optional. A capture ships only if it clears the measured tonal-spread
   * gate in scripts/capture-work.mjs; the artist portfolio does not, so that
   * row stays typographic (§8.1).
   */
  image?: string;
};

const projects: Project[] = [
  {
    name: 'CareRadar',
    outcome:
      'International nurse recruitment, presented to a German market that had to trust it on sight.',
    discipline: 'Web Development · Search Visibility',
    year: '2025',
    status: 'Client project',
    href: 'https://careradar.de/',
    image: '/work/careradar.webp',
  },
  {
    name: 'Axira Media',
    outcome:
      'A digital marketing agency that needed to look like one before the first call.',
    discipline: 'Web Development · SEO Foundation',
    year: '2025',
    status: 'Client project',
    href: 'https://axiramedia.vercel.app/',
    image: '/work/axira-media.webp',
  },
  {
    name: 'Balaji Arts',
    outcome:
      'Printing, packaging and label manufacturing, given a presence that matches the plant.',
    discipline: 'Web Development',
    year: '2025',
    status: 'Client project',
    href: 'https://balajiarts.vercel.app/',
    image: '/work/balaji-arts.webp',
  },
  {
    name: 'Protein Cartel',
    outcome:
      'A nutrition storefront built around browsing, cart and a checkout-ready structure.',
    discipline: 'Web Development · Growth Systems',
    year: '2025',
    status: 'Concept build',
    href: 'https://protein-cartel.vercel.app/',
    image: '/work/protein-cartel.webp',
  },
  {
    name: 'Artist Portfolio',
    outcome:
      'A musician’s presence where the work had to carry the page, not the layout.',
    discipline: 'Web Development',
    year: '2025',
    status: 'Creative build',
    href: 'https://shubhampmusic.vercel.app/',
  },
];

/**
 * §6.3: typographic rows, not cards. The row is the link — the whole surface
 * is clickable, and the name shifts right on hover as the only affordance.
 *
 * Separated by whitespace, not by rules. §2 allows exactly one border in the
 * system, --stroke-hairline, and only on vitrine surfaces; a row separator at
 * the same value is still a border where the system does not have one.
 */
function ProjectRow({ project }: { project: Project }) {
  return (
    <Reveal>
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block py-16 md:py-20"
      >
        {project.image ? (
          <div className="mb-12 overflow-hidden rounded-3xl md:mb-16">
            <Image
              src={project.image}
              alt=""
              width={1600}
              height={1000}
              sizes="(max-width: 768px) 100vw, 1280px"
              className="w-full opacity-45 transition-opacity duration-(--dur-reveal) ease-out-expo md:opacity-30 md:group-hover:opacity-100"
            />
          </div>
        ) : null}

        <div className="md:grid md:grid-cols-12 md:items-baseline md:gap-8">
          <div className="md:col-span-7">
            <h2 className="text-heading text-bone transition-transform duration-(--dur-reveal) ease-out-expo md:group-hover:translate-x-3">
              {project.name}
            </h2>

            <p className="mt-5 max-w-[46ch] text-body text-mist">
              {project.outcome}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3 md:col-span-4 md:mt-0 md:flex-col md:gap-3">
            <p className="font-mono text-mono-label uppercase tracking-mono text-ash">
              {project.discipline}
            </p>
            <p className="font-mono text-mono-label uppercase tracking-mono text-ash">
              {project.status} · {project.year}
            </p>
          </div>

          <p className="mt-8 font-mono text-mono-label uppercase tracking-mono text-gold md:col-span-1 md:mt-0 md:text-right">
            View
          </p>
        </div>
      </a>
    </Reveal>
  );
}

export default function WorkPage() {
  return (
    <main className="relative overflow-x-clip">
      <ResolveWaypoint formation="grid">
        <section className="premium-container flex min-h-[70svh] items-center pt-32 md:min-h-[80svh] md:pt-20">
          <div>
            <Reveal immediate>
              <p className="font-mono text-mono-label uppercase tracking-mono text-gold">
                Selected Work
              </p>
            </Reveal>

            <Reveal immediate>
              <h1 className="mt-6 max-w-[15ch] text-display text-bone">
                Built to be looked at closely.
              </h1>
            </Reveal>

            <Reveal immediate>
              <p className="mt-8 max-w-[52ch] text-lead font-extralight text-mist">
                Client projects and concept builds. Every one of them is live —
                open them and look.
              </p>
            </Reveal>
          </div>
        </section>
      </ResolveWaypoint>

      <section className="premium-container pt-(--section-gap)">
        {projects.map((project) => (
          <ProjectRow key={project.name} project={project} />
        ))}
      </section>

      <section className="premium-container pt-(--section-gap)">
        <Reveal>
          <p className="font-mono text-mono-label uppercase tracking-mono text-gold">
            Start
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="mt-8 max-w-[18ch] text-heading-lg text-bone">
            Want your business to hold up to the same look?
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <Link href="/contact" className="ghost-link mt-10 inline-block">
            Start a conversation
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
