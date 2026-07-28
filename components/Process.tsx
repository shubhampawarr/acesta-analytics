import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Reveal, StaggerGroup } from '@/components/motion/Reveal';

const steps = [
  {
    number: '01',
    title: 'Understand',
    description: 'We clarify the business, audience, objective, and current digital gaps.',
  },
  {
    number: '02',
    title: 'Structure',
    description: 'We define the right pages, data flow, content hierarchy, and conversion path.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'We design and develop the system with clean execution and premium presentation.',
  },
  {
    number: '04',
    title: 'Launch',
    description: 'We test, deploy, refine, and prepare the system for real business use.',
  },
];

export default function Process() {
  return (
    <section className="relative overflow-hidden">

      <div className="premium-container">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="text-center">
              <div className="mx-auto mb-4 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-gold/45" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-gold md:text-[11px]">
                  Method
                </p>
                <span className="h-px w-10 bg-gold/45" />
              </div>

              <h2 className="font-display mx-auto max-w-2xl text-4xl font-normal leading-[0.92] tracking-[-0.05em] text-bone md:text-6xl">
                Simple on the surface. Structured underneath.
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-ash md:mt-5 md:text-sm md:leading-7">
                A clear process keeps the work focused, premium, and useful from the first conversation to launch.
              </p>
            </div>
          </Reveal>

          <StaggerGroup className="mx-auto mt-8 grid max-w-[620px] grid-cols-2 gap-3 md:mt-10 md:max-w-none md:grid-cols-4 md:gap-4">
            {steps.map((step) => (
                <article
                  key={step.number}
                  className="group relative h-full overflow-hidden rounded-[1.15rem] border border-gold/14 bg-vitrine/72 px-3 py-4 transition duration-500 hover:-translate-y-1 hover:border-gold-bright/35 hover:bg-vitrine md:rounded-[1.35rem] md:px-4 md:py-6"
                >
                  <div className="pointer-events-none absolute left-4 right-4 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent opacity-70" />

                  <div className="flex items-start justify-between gap-3">
                    <p className="font-display text-3xl font-normal leading-none tracking-[-0.05em] text-gold/75 md:text-4xl">
                      {step.number}
                    </p>

                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/18 bg-gold/8 text-gold-bright transition duration-500 group-hover:scale-110 group-hover:border-gold-bright/45 md:h-8 md:w-8">
                      <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </div>
                  </div>

                  <h3 className="font-display mt-4 text-2xl font-normal leading-none tracking-[-0.04em] text-bone md:text-3xl">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-[11px] leading-5 text-ash md:text-xs md:leading-6">
                    {step.description}
                  </p>
                </article>
            ))}
          </StaggerGroup>

          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 md:mt-10">
              <div className="h-px w-full max-w-md gold-line opacity-50" />

              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 text-sm font-semibold text-gold-bright transition hover:text-bone"
              >
                Discuss a project
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}