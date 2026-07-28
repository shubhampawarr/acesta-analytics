import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';

export default function FinalCTA() {
  return (
    <section className="relative z-10 flex flex-1 items-center px-0 py-6 md:py-8">
      <div className="premium-container">
        <Reveal>
          <div className="premium-card mx-auto max-w-4xl rounded-[1.5rem] px-5 py-8 text-center md:rounded-[2rem] md:px-8 md:py-10 lg:px-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-gold md:text-xs">
              Start
            </p>

            <h2 className="font-display mx-auto mt-3 max-w-3xl text-4xl font-normal leading-[0.9] tracking-[-0.055em] text-bone md:mt-4 md:text-6xl">
              Build sharper. Launch cleaner.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-mist md:mt-5 md:text-sm md:leading-7">
              Premium websites, data clarity, and growth systems for businesses
              that want to look serious online.
            </p>

            <div className="mx-auto mt-5 h-px w-full max-w-sm gold-line opacity-60 md:mt-6" />

            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-6">
              <Link
                href="/contact"
                className="gold-button group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition sm:w-auto md:px-7 md:py-3.5"
              >
                Start a Conversation
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>

              <Link
                href="/work"
                className="inline-flex w-full items-center justify-center rounded-full border border-gold/18 bg-white/[0.025] px-6 py-3 text-sm font-semibold text-bone transition hover:border-gold-bright/40 hover:bg-gold/8 sm:w-auto md:px-7 md:py-3.5"
              >
                View Work
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}