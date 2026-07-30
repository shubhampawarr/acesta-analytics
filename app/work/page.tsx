import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Reveal } from '@/components/motion/Reveal';
import { ResolveWaypoint } from '@/components/resolve/Resolve';

import captures from './captures.json';

export const metadata: Metadata = {
  title: 'Selected Work',
  description:
    'Selected work from Acesta Analytics — agency websites, ecommerce storefronts and creative web experiences.',
};

/**
 * Problem / built / changed, per 9.2. Modelled as a list rather than three
 * fixed fields because not every project has all three: Shubham Music is a
 * self-initiated piece with a single descriptive paragraph, and padding it out
 * to match the client entries would mean inventing the parts that are missing.
 */
type NarrativeBlock = { label: string; body: string };

type Project = {
  name: string;
  discipline: string;
  /** "Client project" or "Self-initiated" — never blurred together. */
  status: string;
  /** Omitted where the year is not established. */
  year?: string;
  href: string;
  /** Key into captures.json, which carries the measured source luminance. */
  slug: string;
  image: string;
  narrative: NarrativeBlock[];
};

const projects: Project[] = [
  {
    name: 'CareRadar',
    discipline: 'Web Development · Search Visibility',
    status: 'Client project',
    year: '2025',
    href: 'https://careradar.de/',
    slug: 'careradar',
    image: '/work/careradar.webp',
    narrative: [
      {
        label: 'Problem',
        body: 'Indian nurses moving to Germany face a process nobody explains clearly — qualification routes, costs, timelines, what happens when. Someone deciding whether to commit years of their life needs to understand it before they’ll trust anyone with it.',
      },
      {
        label: 'Built',
        body: 'A bilingual platform with role-based access for nurses, employers and administrators. Public pathway pages set out each qualification route end to end; behind sign-in, document upload, shortlisting and pipeline management. Next.js, Supabase, Postgres with row-level security.',
      },
      {
        label: 'Changed',
        body: 'The process is legible before anyone creates an account. Candidates see the route, the requirements and the timeline, then decide — rather than trusting a recruiter first and finding out later.',
      },
    ],
  },
  {
    name: 'Balaji Arts',
    discipline: 'Web Development',
    status: 'Client project',
    year: '2026',
    href: 'https://balajiarts.vercel.app/',
    slug: 'balaji-arts',
    image: '/work/balaji-arts.webp',
    narrative: [
      {
        label: 'Problem',
        body: 'Offset printing, labelling and packaging is a specification business. Buyers need to see substrates, finishes and formats before they enquire, and a brochure page can’t carry that.',
      },
      {
        label: 'Built',
        body: 'A product catalogue with real category structure, photography and motion across the range — offset printing, labels, packaging and tags.',
      },
      {
        label: 'Changed',
        body: 'The range is browsable. Buyers arrive at an enquiry already knowing roughly what they want, instead of it being explained on a call.',
      },
    ],
  },
  {
    name: 'Axira Media',
    discipline: 'Web Development',
    status: 'Client project',
    href: 'https://axiramedia.vercel.app/',
    slug: 'axira-media',
    image: '/work/axira-media.webp',
    narrative: [
      {
        label: 'Problem',
        body: 'A digital marketing agency is judged on its own presence before anyone reads a case study. The site has to demonstrate the standard it sells.',
      },
      {
        label: 'Built',
        body: 'A marketing site built around the agency’s service lines and positioning.',
      },
      {
        label: 'Changed',
        body: 'The agency’s own presence now matches the work it asks clients to buy.',
      },
    ],
  },
  {
    name: 'Protein Cartel',
    discipline: 'Web Development',
    status: 'Client project',
    href: 'https://protein-cartel.vercel.app/',
    slug: 'protein-cartel',
    image: '/work/protein-cartel.webp',
    narrative: [
      {
        label: 'Problem',
        body: 'Premium ingredients are the entire proposition, and a photograph of a salad is exactly what fails to communicate that.',
      },
      {
        label: 'Built',
        body: 'A brand site for the range — rice bowls, paneer and chicken salads, and the sourcing behind them.',
      },
      {
        label: 'Changed',
        body: 'The positioning is legible before someone orders, rather than something they work out afterwards.',
      },
    ],
  },
  {
    name: 'Shubham Music',
    discipline: 'Web Development',
    // Not a client engagement, and labelled so. Presenting a personal project
    // under the same framing as paid work would be the one dishonest thing on
    // a page whose entire job is credibility.
    status: 'Self-initiated',
    href: 'https://shubhampmusic.vercel.app/',
    slug: 'artist-portfolio',
    image: '/work/artist-portfolio.webp',
    narrative: [
      {
        label: 'Built',
        body: 'A music portfolio built as one continuous composition — sparse type, an animated particle field, and gallery and mixtape sections that stay out of the way of the work.',
      },
    ],
  },
];

/**
 * §6: at-rest opacity is a function of the source, not a constant.
 *
 * Reducing a light capture does not restrain it, it destroys it — a white page
 * at 30% on void is a flat grey slab with its type washed out, which is the
 * same error as the old 45% mobile value. A dark screenshot needs holding
 * back; a light one needs showing. Full opacity on hover either way.
 *
 * Both branches are complete literals so Tailwind's scanner sees the classes;
 * the luminance behind the choice is measured in capture-work.mjs and carried
 * in captures.json, so this is derived rather than picked per project.
 */
const REST_OPACITY = {
  // Mobile is 85% throughout: there is no hover on touch, so the at-rest state
  // is the only state a phone user ever sees.
  light: 'opacity-85 md:opacity-85',
  dark: 'opacity-85 md:opacity-30',
};

function restOpacity(slug: string) {
  const capture = (captures as Record<string, { light: boolean } | undefined>)[
    slug
  ];

  return capture?.light ? REST_OPACITY.light : REST_OPACITY.dark;
}

/**
 * §1's two-column zigzag, alternating capture-left and capture-right down the
 * page. Explicit `col-start` on both columns rather than relying on flow:
 * grid auto-placement is sparse, so a later DOM item is never backtracked into
 * an earlier column, which is what silently pushed the /about portrait onto a
 * row of its own.
 *
 * The capture is height-capped by a fixed aspect ratio rather than running at
 * the source's own proportions. A full-width 1.6:1 capture plus this much copy
 * put a single entry well over a 720px viewport, and §1 asks for one or two
 * elements per viewport — the crop is what makes an entry legible whole.
 */
function ProjectEntry({ project, index }: { project: Project; index: number }) {
  const captureLeft = index % 2 === 0;

  return (
    <Reveal>
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block py-12 md:grid md:grid-cols-12 md:items-start md:gap-x-16 md:py-16"
      >
        {/* Opaque ground, deliberately. The capture sits below full opacity at
            rest, and the particle canvas is at -z-10 behind the whole page, so
            without something solid behind it the field composites *through*
            the screenshot — gold speckle across a client's website. §6 forbids
            the field crossing an image. bg-void is invisible on a void page,
            so this blocks the canvas without introducing a box. */}
        <div
          className={`mb-10 overflow-hidden rounded-3xl bg-void md:mb-0 md:col-span-5 ${
            captureLeft ? 'md:col-start-1' : 'md:col-start-8'
          }`}
        >
          <Image
            src={project.image}
            alt=""
            width={1600}
            height={1000}
            sizes="(max-width: 768px) 100vw, 42vw"
            className={`aspect-[16/10] w-full object-cover object-top transition-[opacity,transform] duration-(--dur-reveal) ease-out-expo md:group-hover:scale-[1.03] md:group-hover:opacity-100 ${restOpacity(
              project.slug
            )}`}
          />
        </div>

        <div
          className={`md:col-span-6 ${
            captureLeft ? 'md:col-start-7' : 'md:col-start-1 md:row-start-1'
          }`}
        >
          <h2 className="text-heading text-bone transition-transform duration-(--dur-reveal) ease-out-expo md:group-hover:translate-x-3">
            {project.name}
          </h2>

          <p className="mt-4 font-mono text-mono-label uppercase tracking-mono text-ash">
            {project.discipline} · {project.status}
            {project.year ? ` · ${project.year}` : ''}
          </p>

          <div className="mt-8 space-y-6 md:mt-10">
            {project.narrative.map((block) => (
              <div key={block.label}>
                <h3 className="font-mono text-mono-label uppercase tracking-mono text-gold">
                  {block.label}
                </h3>
                <p className="mt-2 max-w-[62ch] text-body text-mist">
                  {block.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 font-mono text-mono-label uppercase tracking-mono text-gold">
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
                Client projects and self-initiated builds. Every one of them is
                live — open them and look.
              </p>
            </Reveal>
          </div>
        </section>
      </ResolveWaypoint>

      <section className="premium-container pt-(--section-gap)">
        {projects.map((project, index) => (
          <ProjectEntry key={project.name} project={project} index={index} />
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
