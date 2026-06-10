import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal';

const process = [
  {
    number: '01',
    title: 'Understand',
    description:
      'We study your business, digital presence, data gaps, and growth priorities.',
  },
  {
    number: '02',
    title: 'Structure',
    description:
      'We define dashboards, web architecture, SEO foundations, and conversion paths.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'We design and develop assets that create clarity, trust, and visibility.',
  },
  {
    number: '04',
    title: 'Refine',
    description:
      'We improve presentation, data clarity, visibility, and growth flow.',
  },
];

export default function Process() {
  return (
    <section className="relative flex min-h-screen items-center py-6 md:py-12">
      <div className="premium-container">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-5 md:gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-9">
            <Reveal y={18} className="text-center lg:-ml-6 lg:text-left xl:-ml-10">
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#d8b25e] md:text-[11px] md:tracking-[0.38em]">
                Method
              </p>

              <h2 className="font-display mx-auto mt-2 max-w-sm text-3xl font-semibold leading-[0.88] tracking-[-0.05em] text-[#f8f4ea] md:mt-4 md:max-w-xl md:text-6xl lg:mx-0">
                Built with clarity.
                <br />
                Refined with precision.
              </h2>

              <div className="mx-auto mt-3 h-px w-full max-w-xs gold-line opacity-60 md:mt-5 md:max-w-md lg:mx-0" />

              <p className="mx-auto mt-3 max-w-xs text-[11px] leading-4 text-[#a7a197] md:mt-5 md:max-w-sm md:text-sm md:leading-6 lg:mx-0">
                Premium work should feel simple from the outside. Behind that
                simplicity is structure, direction, and controlled execution.
              </p>

              <Link
                href="/contact"
                className="group mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#f1d99b] md:mt-6 md:text-sm"
              >
                Discuss your project
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1 md:h-4 md:w-4" />
              </Link>
            </Reveal>

            <Stagger className="mx-auto grid w-full max-w-[480px] grid-cols-2 gap-2.5 lg:max-w-none lg:grid-cols-1 lg:gap-3">
              {process.map((step) => (
                <StaggerItem key={step.number}>
                  <article className="group rounded-[1rem] border border-[#d8b25e]/14 bg-[#080705]/75 p-3 text-center transition duration-500 hover:border-[#f1d99b]/35 hover:bg-[#0c0a07] lg:relative lg:ml-12 lg:rounded-[1.25rem] lg:p-4 lg:text-left">
                    <div className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full border border-[#d8b25e]/24 bg-black text-[10px] font-semibold text-[#f1d99b] lg:absolute lg:-left-[3.75rem] lg:top-4 lg:mb-0 lg:h-10 lg:w-10 lg:text-xs">
                      {step.number}
                    </div>

                    <h3 className="font-display text-xl font-semibold leading-none tracking-[-0.035em] text-[#f8f4ea] md:text-2xl lg:text-3xl">
                      {step.title}
                    </h3>

                    <p className="mx-auto mt-2 max-w-[145px] text-[10px] leading-4 text-[#a7a197] md:text-xs lg:mx-0 lg:max-w-2xl lg:text-sm lg:leading-5">
                      {step.description}
                    </p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="mt-6 hidden h-px w-full gold-line opacity-50 md:block" />
        </div>
      </div>
    </section>
  );
}