import Link from 'next/link';

import { Reveal } from '@/components/motion/Reveal';

/**
 * Full-bleed void. The right half is deliberately empty markup — The Resolve
 * sits behind the page in its `lattice` formation, offset right, and that
 * negative space is where it lands.
 *
 * The desktop top padding matches the fixed nav's 80px so the composition
 * centres in the space below the nav rather than behind it.
 */
export default function Hero() {
  return (
    <section className="premium-container flex min-h-[88svh] items-center pt-32 md:min-h-svh md:pt-20">
      <div className="w-full md:grid md:grid-cols-12">
        <div className="md:col-span-6">
          <Reveal immediate>
            <p className="font-mono text-mono-label uppercase tracking-mono text-gold">
              Digital Intelligence · Mumbai
            </p>
          </Reveal>

          <Reveal immediate>
            <h1 className="mt-6 text-display text-bone">
              Digital intelligence for brands that need clarity.
            </h1>
          </Reveal>

          <Reveal immediate>
            <p className="mt-8 max-w-[520px] text-body text-mist">
              We build the data, web and search systems that turn noise into
              decisions.
            </p>
          </Reveal>

          <Reveal immediate>
            <Link href="/services" data-hero-cta className="gold-pill mt-10">
              See the work
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
