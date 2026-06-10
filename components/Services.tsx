import Link from 'next/link';
import { ArrowRight, BarChart3, Globe2, SearchCheck } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal';

const services = [
  {
    title: 'Executive Data Intelligence',
    label: 'Dashboards',
    description: 'Clear dashboards and visual reports for business decisions.',
    outcome: 'Revenue, sales, marketing, and operations clarity.',
    icon: BarChart3,
  },
  {
    title: 'Premium Web Experiences',
    label: 'Web Development',
    description: 'Elegant, fast websites built for trust and conversion.',
    outcome: 'A sharper digital presence for enquiries and credibility.',
    icon: Globe2,
  },
  {
    title: 'Search & Growth Architecture',
    label: 'SEO & Growth',
    description: 'SEO structure and growth foundations for better discovery.',
    outcome: 'Stronger visibility, organic reach, and growth flow.',
    icon: SearchCheck,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative flex min-h-screen items-center py-6 md:py-12"
    >
      <div className="premium-container">
        <div className="mx-auto grid max-w-7xl items-center gap-5 md:gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-9">
          <Reveal y={18} className="text-center lg:-ml-6 lg:text-left xl:-ml-10">
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#d8b25e] md:text-[11px] md:tracking-[0.38em]">
              Capabilities
            </p>

            <h2 className="font-display mx-auto mt-2 max-w-sm text-3xl font-semibold leading-[0.88] tracking-[-0.05em] text-[#f8f4ea] md:mt-4 md:max-w-xl md:text-6xl lg:mx-0">
              Three disciplines.
              <br />
              One premium growth system.
            </h2>

            <div className="mx-auto mt-3 h-px w-full max-w-xs gold-line opacity-60 md:mt-5 md:max-w-md lg:mx-0" />

            <p className="mx-auto mt-3 max-w-xs text-[11px] leading-4 text-[#a7a197] md:mt-5 md:max-w-sm md:text-sm md:leading-6 lg:mx-0">
              Data clarity, premium web presence, and search-led growth — built
              together as one refined digital system.
            </p>

            <Link
              href="/services"
              className="group mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#f1d99b] md:mt-6 md:text-sm"
            >
              Explore capabilities
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1 md:h-4 md:w-4" />
            </Link>
          </Reveal>

          <Stagger className="mx-auto grid w-full max-w-[480px] grid-cols-2 gap-2.5 lg:max-w-none lg:grid-cols-1 lg:gap-3">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <StaggerItem
                  key={service.title}
                  className={`${
                    index === 2
                      ? 'col-span-2 mx-auto w-[52%] lg:col-span-1 lg:w-full'
                      : ''
                  }`}
                >
                  <article className="group rounded-[1rem] border border-[#d8b25e]/14 bg-[#080705]/80 transition duration-500 hover:border-[#f1d99b]/35 hover:bg-[#0c0a07] lg:rounded-[1.25rem]">
                    <div className="p-3 text-center lg:grid lg:items-start lg:gap-4 lg:p-4 lg:text-left md:lg:grid-cols-[1fr_38px]">
                      <div>
                        <p className="text-[7px] font-semibold uppercase tracking-[0.18em] text-[#a77b32] md:text-[9px]">
                          {service.label}
                        </p>

                        <h3 className="font-display mt-1 text-lg font-semibold leading-none tracking-[-0.035em] text-[#f8f4ea] md:text-2xl lg:text-[2rem]">
                          {service.title}
                        </h3>

                        <p className="mx-auto mt-1.5 max-w-[135px] text-[10px] leading-4 text-[#a7a197] md:text-xs lg:mx-0 lg:mt-2.5 lg:max-w-xl lg:text-sm lg:leading-5">
                          {service.description}
                        </p>

                        <p className="mx-auto mt-1.5 max-w-[135px] text-[9px] leading-4 text-[#d8c9a4] md:text-xs lg:mx-0 lg:mt-3 lg:max-w-xl lg:leading-5">
                          <span className="text-[#a77b32]">Outcome — </span>
                          {service.outcome}
                        </p>
                      </div>

                      <div className="mx-auto mt-2 flex h-7 w-7 items-center justify-center rounded-full border border-[#d8b25e]/18 bg-[#d8b25e]/8 text-[#f1d99b] transition duration-500 group-hover:scale-110 group-hover:border-[#f1d99b]/45 lg:mt-0 lg:h-9 lg:w-9">
                        <Icon className="h-3 w-3 lg:h-4 lg:w-4" />
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}