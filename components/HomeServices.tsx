import {
  BarChart3,
  Globe2,
  SearchCheck,
  Workflow,
} from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal';

const services = [
  {
    title: 'Data Intelligence',
    description: 'Dashboards, reports, and business clarity.',
    icon: BarChart3,
  },
  {
    title: 'Web Experiences',
    description: 'Premium websites built for trust and conversion.',
    icon: Globe2,
  },
  {
    title: 'SEO Foundation',
    description: 'Metadata, structure, and visibility foundations.',
    icon: SearchCheck,
  },
  {
    title: 'Growth Systems',
    description: 'Lead flow, conversion paths, and growth structure.',
    icon: Workflow,
  },
];

export default function HomeServices() {
  return (
    <section className="relative flex min-h-screen items-center py-10 md:py-12">
      <div className="premium-container">
        <div className="mx-auto max-w-6xl">
          <Reveal y={16}>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#d8b25e] md:text-[11px]">
                Services
              </p>

              <h2 className="font-display mx-auto mt-3 max-w-xl text-3xl font-semibold leading-[0.95] tracking-[-0.045em] text-[#f8f4ea] md:text-5xl">
                Four ways we build business clarity.
              </h2>
            </div>
          </Reveal>

          <Stagger className="mx-auto mt-7 grid max-w-[560px] grid-cols-2 gap-3 md:mt-8 md:max-w-none md:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <StaggerItem key={service.title}>
                  <article className="group h-full rounded-[1.15rem] border border-[#d8b25e]/14 bg-[#080705]/75 px-3 py-4 text-center transition duration-500 hover:-translate-y-1 hover:border-[#f1d99b]/35 hover:bg-[#0c0a07] md:rounded-[1.25rem] md:px-4 md:py-5 lg:px-5">
                    <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full border border-[#d8b25e]/18 bg-[#d8b25e]/8 text-[#f1d99b] transition duration-500 group-hover:scale-110 group-hover:border-[#f1d99b]/45 md:h-9 md:w-9">
                      <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    </div>

                    <h3 className="font-display mt-3 text-xl font-semibold leading-none tracking-[-0.04em] text-[#f8f4ea] md:mt-4 md:text-2xl lg:text-3xl">
                      {service.title}
                    </h3>

                    <p className="mx-auto mt-2 max-w-[150px] text-[11px] leading-4 text-[#a7a197] md:mt-3 md:max-w-xs md:text-xs md:leading-5 lg:text-sm">
                      {service.description}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>

          <Reveal delay={0.18} y={18}>
            <div className="mx-auto mt-7 max-w-4xl rounded-[1.4rem] border border-[#d8b25e]/14 bg-[#080705]/70 px-5 py-5 text-center md:mt-8 md:rounded-[1.75rem] md:px-6 md:py-6">
              <p className="font-display mx-auto max-w-3xl text-2xl font-semibold leading-[0.95] tracking-[-0.04em] text-[#f8f4ea] md:text-4xl">
                This is not just design. Not just data. Not just traffic.
              </p>

              <div className="mx-auto mt-3 h-px w-full max-w-xs gold-line opacity-60 md:mt-4 md:max-w-md" />

              <p className="mx-auto mt-3 max-w-2xl text-xs leading-5 text-[#b8b0a3] md:mt-4 md:text-sm md:leading-6">
                It is a connected digital system: the numbers that reveal what
                is happening, the website that creates trust, the search
                foundation that improves discovery, and the growth structure
                that turns attention into opportunities.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}