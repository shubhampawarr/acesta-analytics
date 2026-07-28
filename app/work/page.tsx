import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  ExternalLink,
  Globe2,
  ShoppingBag,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Selected Work',
  description:
    'Explore selected Acesta Analytics work including agency websites, ecommerce storefronts, and premium creative web experiences.',
};

const projects = [
  {
    title: 'Axira Media',
    category: 'Digital Marketing Agency Website',
    status: 'Client Project',
    description:
      'A premium agency website built for a digital marketing brand, focused on services, credibility, contact conversion, and a polished business presence.',
    highlights: [
      'Responsive agency website',
      'Services and enquiry flow',
      'SEO metadata structure',
      'Premium visual direction',
    ],
    link: 'https://axiramedia.vercel.app/',
    icon: BarChart3,
  },
  {
    title: 'Protein Cartel',
    category: 'E-commerce Nutrition Storefront',
    status: 'Business Concept / Demo Build',
    description:
      'A clean ecommerce storefront for a nutrition and supplement brand, built around product browsing, cart experience, and checkout-ready structure.',
    highlights: [
      'Product listing experience',
      'Cart and checkout flow',
      'Admin-ready structure',
      'Mobile-first storefront',
    ],
    link: 'https://protein-cartel.vercel.app/',
    icon: ShoppingBag,
  },
  {
    title: 'Artist Website',
    category: 'Premium Musician Portfolio',
    status: 'Creative Web Experience',
    description:
      'A refined artist website built for music, visual identity, social presence, and a premium personal brand experience.',
    highlights: [
      'Artist landing page',
      'Music and gallery sections',
      'Premium motion feel',
      'Mobile-responsive layout',
    ],
    link: 'https://shubhampmusic.vercel.app/',
    icon: Globe2,
  },
];

export default function WorkPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-void">


      <section className="relative z-10 px-0 pb-10 pt-24 md:pb-20 md:pt-32">
        <div className="premium-container">
          <div className="mx-auto max-w-7xl rounded-[1.5rem] border border-gold/12 bg-vitrine/70 p-4 shadow-2xl shadow-black/30 md:rounded-[2.25rem] md:p-8 lg:p-10">
            <div className="mx-auto max-w-5xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-gold md:text-xs">
                Selected Work
              </p>

              <h1 className="font-display mx-auto mt-3 max-w-4xl text-4xl font-normal leading-[0.9] tracking-[-0.055em] text-bone md:mt-4 md:text-7xl">
                Built work that shows clarity, presence, and execution.
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-xs leading-6 text-mist md:mt-6 md:text-base md:leading-8">
                A selection of client projects, business concepts, and creative
                web experiences built to demonstrate strategy, design,
                development, and digital execution.
              </p>

              <div className="mx-auto mt-5 h-px w-full max-w-2xl gold-line opacity-60 md:mt-7" />
            </div>

            <div className="mt-7 grid gap-4 md:mt-10 lg:grid-cols-3">
              {projects.map((project) => {
                const Icon = project.icon;

                return (
                  <article
                    key={project.title}
                    className="group flex h-full flex-col rounded-[1.25rem] border border-gold/14 bg-vitrine/85 p-4 transition duration-500 hover:-translate-y-1 hover:border-gold-bright/32 hover:bg-vitrine md:rounded-[1.5rem] md:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-gold-deep md:text-[10px]">
                          {project.category}
                        </p>

                        <h2 className="font-display mt-3 text-3xl font-normal leading-[0.95] tracking-[-0.045em] text-bone md:text-4xl">
                          {project.title}
                        </h2>
                      </div>

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/18 bg-gold/8 text-gold-bright transition duration-500 group-hover:scale-110 group-hover:border-gold-bright/45">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="mt-4 inline-flex w-fit rounded-full border border-gold/16 bg-gold/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-bright">
                      {project.status}
                    </div>

                    <p className="mt-4 text-xs leading-6 text-ash md:text-sm md:leading-7">
                      {project.description}
                    </p>

                    <div className="mt-5 grid gap-2">
                      {project.highlights.map((item) => (
                        <div key={item} className="flex items-center gap-2.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                          <p className="text-xs text-mist md:text-sm">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-6">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/22 bg-gold/8 px-5 py-3 text-sm font-semibold text-gold-bright transition hover:border-gold-bright/45 hover:bg-gold/12"
                      >
                        View Live Project
                        <ExternalLink className="h-4 w-4 transition group-hover/link:translate-x-1" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="premium-card mt-5 rounded-[1.35rem] p-5 text-center md:mt-7 md:rounded-[1.75rem] md:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-gold md:text-xs">
                Build With Us
              </p>

              <h2 className="font-display mx-auto mt-3 max-w-3xl text-3xl font-normal leading-[0.92] tracking-[-0.05em] text-bone md:text-5xl">
                Want your business to look this sharp online?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-xs leading-6 text-mist md:text-sm md:leading-7">
                Acesta Analytics can help you build a premium website, clearer
                digital structure, and a stronger enquiry flow.
              </p>

              <div className="mt-5">
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