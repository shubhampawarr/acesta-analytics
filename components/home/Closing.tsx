import Link from 'next/link';

import { Reveal } from '@/components/motion/Reveal';

/**
 * The close. One statement, one action — the supporting paragraph and the
 * secondary button both went, per Decision M.
 */
export default function Closing() {
  return (
    <section className="premium-container flex min-h-[70svh] items-center">
      <div>
        <Reveal>
          <p className="font-mono text-mono-label uppercase tracking-mono text-gold">
            Start
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="mt-8 max-w-[14ch] text-heading-lg text-bone">
            Build sharper. Launch cleaner.
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <Link href="/contact" className="gold-pill mt-12">
            Start a project
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
