import Link from 'next/link';

import type { ReactNode } from 'react';

/**
 * §6.5 — prose on void, single column, no card.
 *
 * `data-page="legal"` suppresses the particle canvas entirely (see
 * globals.css). These pages carried 26–28 nodes of statutory text over a live
 * particle field, which was both a readability problem and slightly absurd.
 * Suppressing is cleaner than adding a waypoint, and it takes those nodes off
 * the contrast auditor's unchecked list rather than leaving them there
 * permanently unverifiable.
 */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main data-page="legal" className="relative overflow-x-clip">
      <article className="premium-container pt-40 md:pt-48">
        <div className="max-w-[62ch]">
          <p className="font-mono text-mono-label uppercase tracking-mono text-gold">
            Legal
          </p>

          <h1 className="mt-6 text-heading-lg text-bone">{title}</h1>

          <p className="mt-6 font-mono text-mono-label uppercase tracking-mono text-ash">
            Last updated {updated}
          </p>

          <div className="mt-20 flex flex-col gap-8 text-body text-mist md:mt-24">
            {children}
          </div>

          <Link href="/" className="ghost-link mt-20 inline-block md:mt-24">
            Back to home
          </Link>
        </div>
      </article>
    </main>
  );
}
