import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Globe2,
  SearchCheck,
  Workflow,
} from 'lucide-react';
import { Reveal, StaggerGroup } from '@/components/motion/Reveal';

const services = [
  {
    title: 'Data Intelligence',
    description: 'Dashboards and clarity.',
    icon: BarChart3,
  },
  {
    title: 'Web Experiences',
    description: 'Premium websites.',
    icon: Globe2,
  },
  {
    title: 'SEO Foundation',
    description: 'Search-ready structure.',
    icon: SearchCheck,
  },
  {
    title: 'Growth Systems',
    description: 'Better enquiry flow.',
    icon: Workflow,
  },
];

export default function HomeServices() {
  return (
    <section className="relative overflow-hidden">


      <div className="premium-container">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="text-center">
              <div className="mx-auto mb-4 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-gold/45" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-gold md:text-[11px]">
                  Services
                </p>
                <span className="h-px w-10 bg-gold/45" />
              </div>

              <h2 className="font-display mx-auto max-w-2xl text-4xl font-normal leading-[0.92] tracking-[-0.05em] text-bone md:text-6xl">
                Four focused ways to build sharper digital presence.
              </h2>
            </div>
          </Reveal>

          <StaggerGroup className="mx-auto mt-8 grid max-w-[560px] grid-cols-2 gap-3 md:mt-10 md:max-w-none md:grid-cols-4 md:gap-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                  <article
                    key={service.title}
                    className="group relative h-full overflow-hidden rounded-[1.15rem] border border-gold/14 bg-vitrine/72 px-3 py-4 text-center transition duration-500 hover:-translate-y-1 hover:border-gold-bright/35 hover:bg-vitrine md:rounded-[1.35rem] md:px-4 md:py-6"
                  >
                    <div className="pointer-events-none absolute left-4 right-4 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent opacity-70" />
                    <div className="pointer-events-none absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

                    <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full border border-gold/18 bg-gold/8 text-gold-bright transition duration-500 group-hover:scale-110 group-hover:border-gold-bright/45 md:h-10 md:w-10">
                      <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </div>

                    <h3 className="font-display mt-3 text-xl font-normal leading-none tracking-[-0.04em] text-bone md:mt-4 md:text-2xl lg:text-3xl">
                      {service.title}
                    </h3>

                    <p className="mx-auto mt-2 max-w-[130px] text-[11px] leading-4 text-ash md:mt-3 md:text-xs md:leading-5">
                      {service.description}
                    </p>
                  </article>
              );
            })}
          </StaggerGroup>

          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 md:mt-10">
              <div className="h-px w-full max-w-md gold-line opacity-50" />

              <Link
                href="/services"
                className="gold-button group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition md:px-7 md:py-3.5"
              >
                Explore Services
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}