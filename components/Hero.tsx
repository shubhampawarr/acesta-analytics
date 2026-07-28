import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-0 pt-32 md:pt-40">


      <div className="premium-container relative z-10">
        <div className="mx-auto flex max-w-6xl items-center">
          <div className="w-full max-w-4xl">
            <Reveal immediate>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/[0.055] px-3.5 py-2 text-xs text-mist md:mb-6 md:px-4 md:text-sm">
                <Sparkles className="h-3.5 w-3.5 text-gold-bright md:h-4 md:w-4" />
                Premium data, web, and growth systems
              </div>
            </Reveal>

            <Reveal immediate>
              <h1 className="font-display max-w-4xl text-[3.25rem] font-normal leading-[0.9] tracking-[-0.055em] text-bone md:text-7xl lg:text-[6.9rem]">
                Digital intelligence for brands that need{' '}
                clarity.
              </h1>
            </Reveal>

            <Reveal immediate>
              <p className="mt-6 max-w-xl text-sm leading-6 text-mist md:mt-7 md:text-lg md:leading-7">
                Acesta Analytics builds premium data, web, and search systems
                for businesses that want to look sharper, operate smarter, and
                convert with confidence.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row md:mt-8 md:gap-4">
                <Link
                  href="/contact"
                  className="gold-button group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition md:px-6 md:py-3.5"
                >
                  Start a Project
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full border border-gold/18 bg-white/[0.025] px-5 py-3 text-sm font-semibold text-bone transition hover:border-gold-bright/40 hover:bg-gold/8 md:px-6 md:py-3.5"
                >
                  View Services
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-8 h-px w-full max-w-3xl gold-line opacity-55 md:mt-10" />

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-medium uppercase tracking-[0.2em] text-ash md:gap-x-7 md:gap-y-3 md:text-[11px] md:tracking-[0.24em]">
                <span>Data Intelligence</span>
                <span>Premium Web Experiences</span>
                <span>SEO & Growth Systems</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}