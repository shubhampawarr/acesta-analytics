import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export default function FinalCTA() {
  return (
    <section className="relative z-10 flex flex-1 items-center px-0 py-6 md:py-8">
      <div className="premium-container">
        <Reveal y={18}>
          <div className="premium-card mx-auto max-w-5xl rounded-[1.5rem] px-5 py-8 text-center md:rounded-[2rem] md:px-8 md:py-10 lg:px-10 lg:py-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#d8b25e] md:text-xs">
              Start
            </p>

            <h2 className="font-display mx-auto mt-3 max-w-4xl text-4xl font-semibold leading-[0.9] tracking-[-0.055em] text-[#f8f4ea] md:mt-4 md:text-6xl lg:text-7xl">
              Ready to build a sharper digital system?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-xs leading-6 text-[#b8b0a3] md:mt-5 md:text-base md:leading-8">
              Whether you need clearer dashboards, a premium website, stronger
              search visibility, or a better growth structure, Acesta helps you
              build with clarity from the beginning.
            </p>

            <div className="mx-auto mt-5 h-px w-full max-w-md gold-line opacity-60 md:mt-6" />

            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-6">
              <Link
                href="/contact"
                className="gold-button group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition sm:w-auto md:px-7 md:py-3.5"
              >
                Start a Conversation
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>

              <Link
                href="/services"
                className="inline-flex w-full items-center justify-center rounded-full border border-[#d8b25e]/18 bg-white/[0.025] px-6 py-3 text-sm font-semibold text-[#f8f4ea] transition hover:border-[#f1d99b]/40 hover:bg-[#d8b25e]/8 sm:w-auto md:px-7 md:py-3.5"
              >
                View Services
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}