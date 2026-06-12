import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Globe2,
  SearchCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services | Acesta Analytics',
  description:
    'Explore Acesta Analytics services: executive data intelligence, premium web experiences, and search-led growth architecture.',
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
    eyebrow: 'SEO & Growth Optimization',
    title: 'Search & Growth Architecture',
    description:
      'Website structure, metadata, content flow, and growth foundations designed to help the right audience discover you.',
    icon: SearchCheck,
    deliverables: [
      'Technical SEO foundation',
      'Metadata and page structure',
      'Search-friendly service pages',
      'Content hierarchy',
      'Growth recommendations',
    ],
    outcomes: [
      'Improve organic visibility',
      'Build a cleaner search presence',
      'Attract more relevant visitors',
      'Turn traffic into opportunities',
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
    <main className="relative min-h-screen overflow-hidden">
      <div className="grid-bg pointer-events-none fixed inset-0 opacity-30" />

      <Navbar />

      <section className="relative z-10 px-0 pb-16 pt-28 md:pb-20 md:pt-32">
        <div className="premium-container">
          <div className="mx-auto max-w-7xl rounded-[1.75rem] border border-[#d8b25e]/12 bg-[#050403]/70 p-5 shadow-2xl shadow-black/30 md:rounded-[2.25rem] md:p-8 lg:p-10">
            <div className="mx-auto max-w-5xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#d8b25e] md:text-xs">
                Services
              </p>

              <h1 className="font-display mx-auto mt-4 max-w-4xl text-5xl font-semibold leading-[0.9] tracking-[-0.055em] text-[#f8f4ea] md:text-7xl">
                Premium systems for clarity, presence, and growth.
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#b8b0a3] md:text-base md:leading-8">
                Acesta brings together data intelligence, premium web
                experiences, and search-led growth architecture for businesses
                that want to look sharper, operate smarter, and convert with
                confidence.
              </p>

              <div className="mx-auto mt-7 h-px w-full max-w-2xl gold-line opacity-60" />
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <article
                    key={service.title}
                    className="group flex h-full flex-col rounded-[1.5rem] border border-[#d8b25e]/14 bg-[#080705]/85 p-5 transition duration-500 hover:-translate-y-1 hover:border-[#f1d99b]/32 hover:bg-[#0c0a07] md:p-6"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <p className="max-w-[230px] text-[10px] font-semibold uppercase leading-5 tracking-[0.22em] text-[#a77b32]">
                        {service.eyebrow}
                      </p>

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d8b25e]/18 bg-[#d8b25e]/8 text-[#f1d99b] transition duration-500 group-hover:scale-110 group-hover:border-[#f1d99b]/45">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>

                    <h2 className="font-display mt-5 text-4xl font-semibold leading-[0.92] tracking-[-0.045em] text-[#f8f4ea] md:text-[2.45rem]">
                      {service.title}
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-[#a7a197]">
                      {service.description}
                    </p>

                    <div className="mt-6 grid gap-5">
                      <ServiceList
                        title="What we build"
                        items={service.deliverables}
                      />

                      <ServiceList
                        title="Business outcome"
                        items={service.outcomes}
                      />
                    </div>

                    <div className="mt-auto pt-7">
                      <Link
                        href="/contact"
                        className="group/link inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d8b25e]/22 bg-[#d8b25e]/8 px-5 py-3 text-sm font-semibold text-[#f1d99b] transition hover:border-[#f1d99b]/45 hover:bg-[#d8b25e]/12"
                      >
                        Discuss this service
                        <ArrowRight className="h-4 w-4 transition group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-[#d8b25e]/14 bg-[#080705]/75 p-5 md:mt-6 md:p-7">
              <div className="grid gap-7 lg:grid-cols-[0.7fr_1.3fr]">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#d8b25e] md:text-xs">
                    Engagement
                  </p>

                  <h2 className="font-display mt-3 max-w-xl text-4xl font-semibold leading-[0.92] tracking-[-0.05em] text-[#f8f4ea] md:text-5xl">
                    Simple outside. Structured underneath.
                  </h2>

                  <p className="mt-4 max-w-md text-sm leading-6 text-[#a7a197]">
                    Every engagement is designed to be clear, practical, and
                    easy to understand before work begins.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {engagementSteps.map((step) => (
                    <article
                      key={step.title}
                      className="rounded-[1.2rem] border border-[#d8b25e]/12 bg-black/20 p-4"
                    >
                      <h3 className="font-display text-2xl font-semibold tracking-[-0.035em] text-[#f8f4ea]">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-[#a7a197]">
                        {step.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="premium-card mt-5 rounded-[1.75rem] p-6 text-center md:mt-6 md:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#d8b25e] md:text-xs">
                Start
              </p>

              <h2 className="font-display mx-auto mt-4 max-w-3xl text-4xl font-semibold leading-[0.92] tracking-[-0.05em] text-[#f8f4ea] md:text-5xl">
                Need clarity on what your business should build first?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#b8b0a3]">
                Tell us where you are now. We’ll help identify whether your next
                move should be data intelligence, a premium web experience, or
                growth architecture.
              </p>

              <div className="mt-6">
                <Link
                  href="/contact"
                  className="gold-button group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition"
                >
                  Start a Conversation
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ServiceList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a77b32]">
        {title}
      </p>

      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <div key={item} className="flex gap-2.5">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d8b25e]" />
            <p className="text-sm leading-5 text-[#b8b0a3]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}