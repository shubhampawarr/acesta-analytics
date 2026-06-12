import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export default function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden px-0 pb-14 pt-24 md:min-h-screen md:py-16">
      <div className="absolute left-1/2 top-24 h-px w-[72%] -translate-x-1/2 gold-line opacity-35 md:top-24" />

      <div className="luxury-pulse absolute left-[10%] top-[22%] h-56 w-56 rounded-full bg-[#d8b25e]/10 blur-3xl" />
      <div className="luxury-pulse absolute bottom-[12%] right-[10%] h-64 w-64 rounded-full bg-[#f1d99b]/8 blur-3xl" />

      <div className="premium-container relative z-10">
        <div className="mx-auto flex min-h-[calc(100dvh-130px)] max-w-6xl items-center md:min-h-[calc(100vh-160px)]">
          <div className="w-full max-w-4xl">
            <Reveal y={14}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d8b25e]/20 bg-[#d8b25e]/[0.055] px-3.5 py-2 text-xs text-[#d8c9a4] md:mb-6 md:px-4 md:text-sm">
                <Sparkles className="h-3.5 w-3.5 text-[#f1d99b] md:h-4 md:w-4" />
                Premium data, web, and growth systems
              </div>
            </Reveal>

            <Reveal delay={0.08} y={24}>
              <h1 className="font-display max-w-4xl text-[3.25rem] font-semibold leading-[0.9] tracking-[-0.055em] text-[#f8f4ea] md:text-7xl lg:text-[6.9rem]">
                Digital intelligence for brands that need{' '}
                <span className="gradient-text">clarity.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16} y={20}>
              <p className="mt-6 max-w-xl text-sm leading-6 text-[#b8b0a3] md:mt-7 md:text-lg md:leading-7">
                Acesta Analytics builds premium data, web, and search systems
                for businesses that want to look sharper, operate smarter, and
                convert with confidence.
              </p>
            </Reveal>

            <Reveal delay={0.24} y={18}>
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
                  className="inline-flex items-center justify-center rounded-full border border-[#d8b25e]/18 bg-white/[0.025] px-5 py-3 text-sm font-semibold text-[#f8f4ea] transition hover:border-[#f1d99b]/40 hover:bg-[#d8b25e]/8 md:px-6 md:py-3.5"
                >
                  View Services
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.32} y={14}>
              <div className="mt-8 h-px w-full max-w-3xl gold-line opacity-55 md:mt-10" />

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#7d7568] md:gap-x-7 md:gap-y-3 md:text-[11px] md:tracking-[0.24em]">
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