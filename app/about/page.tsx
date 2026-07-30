import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Reveal, StaggerGroup } from '@/components/motion/Reveal';
import { ResolveWaypoint } from '@/components/resolve/Resolve';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Acesta Analytics is a founder-led digital intelligence studio in Mumbai, building data, web and search systems for businesses that need clarity.',
};

/** Sparse mono row, not three capability cards. */
const facts = [
  { label: 'Based', value: 'Mumbai, India' },
  { label: 'Founded', value: '2025' },
  { label: 'Led by', value: 'Shubham Pawar' },
  { label: 'Disciplines', value: 'Data · Web · Search · Growth' },
];

const practice = [
  {
    label: 'Data',
    line: 'Reporting a board can read in a minute, built from the numbers a business already has.',
  },
  {
    label: 'Web',
    line: 'Sites that survive close inspection, because the people judging them are looking closely.',
  },
  {
    label: 'Search',
    line: 'Foundations that compound quietly, rather than tactics that expire.',
  },
  {
    label: 'Growth',
    line: 'The path from attention to enquiry, designed rather than accumulated.',
  },
];

export default function AboutPage() {
  return (
    <main data-page="about" className="relative overflow-x-clip">
      {/* §6.1: the field holds a slow lattice throughout. This page is still. */}
      <ResolveWaypoint formation="lattice">
        <section className="premium-container flex min-h-[80svh] items-center pt-32 md:pt-20">
          <div>
            <Reveal immediate>
              <p className="font-mono text-mono-label uppercase tracking-mono text-gold">
                About
              </p>
            </Reveal>

            {/* A statement of position — what Acesta believes, not what it sells. */}
            <Reveal immediate>
              <h1 className="mt-6 max-w-[17ch] text-display text-bone">
                Most businesses are not short of data. They are short of a
                decision.
              </h1>
            </Reveal>
          </div>
        </section>
      </ResolveWaypoint>

      <section className="premium-container pt-(--section-gap)">
        <div className="md:grid md:grid-cols-12 md:items-stretch md:gap-16">
          {/* §6: full colour, head-and-shoulders crop, floating on void.

              Height is tied to the copy column rather than to a viewport
              percentage. The wrapper is a grid item that stretches to the row
              height, and the image is absolutely positioned inside it, so the
              portrait can never drive the row taller than the text beside it —
              it stays an accompaniment rather than growing into a peer of the
              copy on wide screens. Capped at 24% of viewport width.

              Left column deliberately: the lattice sits at world offset +2.9,
              the right half, and §6 forbids the field crossing a photograph.
              On mobile there is one column and no room to offset, so the field
              is suppressed there instead (see globals.css).

              First in the DOM because grid auto-placement is sparse — a later
              item is never backtracked into an earlier column, which silently
              pushed this onto its own row when it followed the copy. */}
          <Reveal
            className="mb-16 md:relative md:col-span-3 md:col-start-1 md:mb-0 md:max-w-[24vw]"
            delay={0.12}
          >
            <Image
              src="/founder.webp"
              alt="Shubham Pawar, founder of Acesta Analytics"
              width={760}
              height={900}
              sizes="(max-width: 768px) 70vw, 24vw"
              className="w-full rounded-3xl object-cover object-top md:absolute md:inset-0 md:h-full"
            />
          </Reveal>
          <div className="md:col-span-7 md:col-start-5">
            <Reveal>
              <p className="text-lead font-extralight text-mist">
                Acesta is a founder-led studio. The person who scopes the work
                is the person who builds it, and the person who has to explain
                it to you afterwards.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-8 max-w-[54ch] text-body text-mist">
                Four disciplines, treated as one system. A dashboard nobody
                trusts is a data problem and a design problem at once. A site
                that ranks but does not convert is a search problem and a growth
                problem at once. Splitting those across three suppliers is how
                businesses end up with four tools and no answer.
              </p>
            </Reveal>
          </div>

        </div>
      </section>

      {/* The pull-quote as typography — no box, no border, no quote mark. */}
      <section className="premium-container pt-(--section-gap)">
        <Reveal>
          <p className="max-w-[22ch] text-heading-lg font-extralight text-bone">
            Less digital noise. More clarity, sharper presentation, stronger
            business flow.
          </p>
        </Reveal>
      </section>

      <section className="premium-container pt-(--section-gap)">
        <Reveal>
          <p className="font-mono text-mono-label uppercase tracking-mono text-gold">
            Practice
          </p>
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-12 sm:grid-cols-2 md:mt-20 md:gap-16">
          {practice.map((item) => (
            <div key={item.label}>
              <h2 className="font-mono text-mono-label uppercase tracking-mono text-ash">
                {item.label}
              </h2>
              <p className="mt-4 max-w-[42ch] text-body text-mist">
                {item.line}
              </p>
            </div>
          ))}
        </StaggerGroup>
      </section>

      <section className="premium-container pt-(--section-gap)">
        <StaggerGroup className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <p className="font-mono text-mono-label uppercase tracking-mono text-ash">
                {fact.label}
              </p>
              <p className="mt-3 text-body text-bone">{fact.value}</p>
            </div>
          ))}
        </StaggerGroup>
      </section>

      <section className="premium-container pt-(--section-gap)">
        <Reveal>
          <p className="font-mono text-mono-label uppercase tracking-mono text-gold">
            Start
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="mt-8 max-w-[18ch] text-heading-lg text-bone">
            Bring the question you cannot answer yet.
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
