import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe2,
  SearchCheck,
  Workflow,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore Acesta Analytics services including executive data intelligence, premium web experiences, search visibility foundation, and growth systems architecture.',
};

const services = [
  {
    eyebrow: 'Data Visualization & Dashboards',
    title: 'Executive Data Intelligence',
    description:
      'Clear dashboards, visual reports, and business intelligence systems that turn scattered data into decision-ready clarity.',
    icon: BarChart3,
    deliverables: [
      'Executive dashboards',
      'KPI reporting systems',
      'Sales and marketing views',
      'Business health reports',
      'Data cleaning and structuring',
    ],
    outcomes: [
      'Understand performance faster',
      'Reduce manual reporting',
      'Improve visibility across metrics',
      'Make decisions with cleaner context',
    ],
  },
  {
    eyebrow: 'Website Development',
    title: 'Premium Web Experiences',
    description:
      'Refined, fast, conversion-focused websites that help your business look credible, premium, and ready for serious enquiries.',
    icon: Globe2,
    deliverables: [
      'Premium landing pages',
      'Business websites',
      'Service pages',
      'Founder or brand pages',
      'Responsive mobile-first layouts',
    ],
    outcomes: [
      'Create a stronger first impression',
      'Increase trust and brand value',
      'Guide visitors toward enquiries',
      'Make your business easier to present',
    ],
  },
  {
    eyebrow: 'SEO Foundation',
    title: 'Search Visibility Foundation',
    description:
      'Technical SEO, metadata, page structure, and search foundations designed to help the right audience discover your business.',
    icon: SearchCheck,
    deliverables: [
      'Technical SEO foundation',
      'Metadata and page structure',
      'Search-friendly service pages',
      'Content hierarchy',
      'Indexing and visibility basics',
    ],
    outcomes: [
      'Improve organic visibility',
      'Build a cleaner search presence',
      'Attract more relevant visitors',
      'Strengthen long-term discovery',
    ],
  },
  {
    eyebrow: 'Growth Systems',
    title: 'Growth Systems Architecture',
    description:
      'Lead flow, conversion paths, content structure, and business systems that turn digital attention into clearer opportunities.',
    icon: Workflow,
    deliverables: [
      'Lead flow planning',
      'Conversion path structure',
      'Content and offer hierarchy',
      'Enquiry journey improvement',
      'Growth system recommendations',
    ],
    outcomes: [
      'Improve enquiry quality',
      'Create clearer customer journeys',
      'Reduce scattered digital efforts',
      'Turn attention into business flow',
    ],
  },
];

const engagementSteps = [
  {
    title: 'Discovery',
    description:
      'We understand your business, current presence, goals, and the problem you want to solve.',
  },
  {
    title: 'Direction',
    description:
      'We define the right scope, structure, deliverables, and execution plan.',
  },
  {
    title: 'Build',
    description:
      'We design, develop, organize, and refine the system with premium execution standards.',
  },
  {
    title: 'Launch',
    description:
      'We prepare the final delivery, review the output, and hand over the finished system clearly.',
  },
];

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-void">


      <section className="relative z-10 px-0 pb-10 pt-24 md:pb-20 md:pt-32">
        <div className="premium-container">
          <div className="mx-auto max-w-7xl rounded-[1.5rem] border border-gold/12 bg-vitrine/70 p-4 shadow-2xl shadow-black/30 md:rounded-[2.25rem] md:p-8 lg:p-10">
            <div className="mx-auto max-w-5xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-gold md:text-xs">
                Services
              </p>

              <h1 className="font-display mx-auto mt-3 max-w-4xl text-4xl font-normal leading-[0.9] tracking-[-0.055em] text-bone md:mt-4 md:text-7xl">
                Premium systems for clarity, presence, and growth.
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-xs leading-6 text-mist md:mt-6 md:text-base md:leading-8">
                Acesta brings together data intelligence, premium web
                experiences, search visibility, and growth systems for
                businesses that want to look sharper, operate smarter, and
                convert with confidence.
              </p>

              <div className="mx-auto mt-5 h-px w-full max-w-2xl gold-line opacity-60 md:mt-7" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 md:mt-10 md:gap-4">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <article
                    key={service.title}
                    className="group flex h-full flex-col rounded-[1.15rem] border border-gold/14 bg-vitrine/85 p-3 transition duration-500 hover:-translate-y-1 hover:border-gold-bright/32 hover:bg-vitrine md:rounded-[1.5rem] md:p-6"
                  >
                    <div className="flex items-start justify-between gap-3 md:gap-5">
                      <p className="max-w-[150px] text-[8px] font-semibold uppercase leading-4 tracking-[0.16em] text-gold md:max-w-[230px] md:text-[10px] md:leading-5 md:tracking-[0.22em]">
                        {service.eyebrow}
                      </p>

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/18 bg-gold/8 text-gold-bright transition duration-500 group-hover:scale-110 group-hover:border-gold-bright/45 md:h-9 md:w-9">
                        <Icon className="h-3 w-3 md:h-4 md:w-4" />
                      </div>
                    </div>

                    <h2 className="font-display mt-4 text-xl font-normal leading-[0.95] tracking-[-0.045em] text-bone md:mt-5 md:text-[2.35rem]">
                      {service.title}
                    </h2>

                    <p className="mt-3 text-[10px] leading-4 text-ash md:mt-4 md:text-sm md:leading-6">
                      {service.description}
                    </p>

                    <div className="mt-5 hidden gap-5 md:grid md:grid-cols-2">
                      <ServiceList
                        title="What we build"
                        items={service.deliverables}
                      />

                      <ServiceList
                        title="Business outcome"
                        items={service.outcomes}
                      />
                    </div>

                    <div className="mt-auto pt-5 md:pt-7">
                      <Link
                        href="/contact"
                        className="group/link inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-gold/22 bg-gold/8 px-3 py-2.5 text-[10px] font-semibold text-gold-bright transition hover:border-gold-bright/45 hover:bg-gold/12 md:gap-2 md:px-5 md:py-3 md:text-sm"
                      >
                        Discuss
                        <span className="hidden md:inline">this service</span>
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover/link:translate-x-1 md:h-4 md:w-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-4 rounded-[1.35rem] border border-gold/14 bg-vitrine/75 p-4 md:mt-6 md:rounded-[1.5rem] md:p-7">
              <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:gap-7">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-gold md:text-xs">
                    Engagement
                  </p>

                  <h2 className="font-display mt-3 max-w-xl text-3xl font-normal leading-[0.92] tracking-[-0.05em] text-bone md:text-5xl">
                    Simple outside. Structured underneath.
                  </h2>

                  <p className="mt-3 max-w-md text-xs leading-5 text-ash md:mt-4 md:text-sm md:leading-6">
                    Every engagement is designed to be clear, practical, and
                    easy to understand before work begins.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 md:gap-3 lg:grid-cols-4">
                  {engagementSteps.map((step) => (
                    <article
                      key={step.title}
                      className="rounded-[1rem] border border-gold/12 bg-black/20 p-3 md:rounded-[1.2rem] md:p-4"
                    >
                      <h3 className="font-display text-xl font-normal tracking-[-0.035em] text-bone md:text-2xl">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-[10px] leading-4 text-ash md:text-xs md:leading-5">
                        {step.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="premium-card mt-4 rounded-[1.35rem] p-5 text-center md:mt-6 md:rounded-[1.75rem] md:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-gold md:text-xs">
                Start
              </p>

              <h2 className="font-display mx-auto mt-3 max-w-3xl text-3xl font-normal leading-[0.92] tracking-[-0.05em] text-bone md:mt-4 md:text-5xl">
                Need clarity on what your business should build first?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-xs leading-6 text-mist md:mt-5 md:text-sm md:leading-7">
                Tell us where you are now. We’ll help identify whether your next
                move should be data intelligence, a premium web experience,
                search visibility, or growth systems.
              </p>

              <div className="mt-5 md:mt-6">
                <Link
                  href="/contact"
                  className="gold-button group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition md:px-6 md:py-3.5"
                >
                  Start a Conversation
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

function ServiceList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
        {title}
      </p>

      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <div key={item} className="flex gap-2.5">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
            <p className="text-sm leading-5 text-mist">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}