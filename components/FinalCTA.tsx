import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export default function FinalCTA() {
  return (
    <section id="contact" className="relative flex flex-1 items-center py-6 md:py-12">
      <div className="premium-container">
        <Reveal y={20}>
          <div className="premium-card relative mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] p-5 text-center md:rounded-[2.25rem] md:p-10">
            <div className="luxury-pulse absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-[#d8b25e]/12 blur-3xl md:h-64 md:w-64" />

            <div className="relative z-10 mx-auto max-w-4xl">
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#d8b25e] md:text-[11px] md:tracking-[0.34em]">
                Start a project
              </p>

              <h2 className="font-display mx-auto mt-3 max-w-sm text-3xl font-semibold leading-[0.88] tracking-[-0.05em] text-[#f8f4ea] md:mt-4 md:max-w-4xl md:text-6xl">
                Build a digital system with clarity, presence, and growth.
              </h2>

              <p className="mx-auto mt-4 max-w-xs text-[11px] leading-5 text-[#b8b0a3] md:mt-6 md:max-w-2xl md:text-base md:leading-7">
                Tell us what you are building, improving, or trying to
                understand. We will shape the right data, web, or growth system
                around it.
              </p>

              <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-8 md:gap-4">
                <Link
                  href="/contact"
                  className="gold-button group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-bold transition md:px-6 md:py-3.5 md:text-sm"
                >
                  Start a Conversation
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1 md:h-4 md:w-4" />
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full border border-[#d8b25e]/18 bg-white/[0.025] px-5 py-3 text-xs font-semibold text-[#f8f4ea] transition hover:border-[#f1d99b]/40 hover:bg-[#d8b25e]/8 md:px-6 md:py-3.5 md:text-sm"
                >
                  View Services
                </Link>
              </div>

              <p className="mx-auto mt-4 max-w-xs text-[9px] uppercase leading-5 tracking-[0.18em] text-[#7d7568] md:mt-6 md:max-w-none md:text-[11px] md:tracking-[0.22em]">
                Data Intelligence • Premium Web Experiences • SEO & Growth
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}