import Link from 'next/link';

import { Reveal } from '@/components/motion/Reveal';

/**
 * A typographic close, not a button in a section. Per Decision N the nav CTA
 * is a filled gold pill by the time a reader reaches this point, so a second
 * pill here would be the second gold fill in view — §9 forbids it. The
 * statement carries the weight and a ghost link carries the action.
 *
 * Rhythm: --section-gap above, nothing below. The footer follows immediately.
 */
export default function Closing() {
  return (
    <section className="premium-container pt-(--section-gap)">
      <Reveal>
        <p className="font-mono text-mono-label uppercase tracking-mono text-gold">
          Start
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-8 max-w-[18ch] text-heading-lg text-bone">
          Tell us where the picture stops being clear.
        </h2>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="mt-6 max-w-[52ch] text-body text-mist">
          Most engagements start with one unanswered question about the
          business. Bring yours and we will tell you what it would take to
          answer it properly.
        </p>
      </Reveal>

      <Reveal delay={0.18}>
        <Link href="/contact" className="ghost-link mt-10 inline-block">
          Start a conversation
        </Link>
      </Reveal>
    </section>
  );
}
