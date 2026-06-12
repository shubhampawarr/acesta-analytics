import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, BarChart3, Globe2, SearchCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | Acesta Analytics',
  description:
    'About Acesta Analytics — a premium digital intelligence studio building data, web, and growth systems for modern businesses.',
};

const capabilities = [
  {
    title: 'Data Intelligence',
    description: 'Dashboards, reporting systems, and decision-ready clarity.',
    icon: BarChart3,
  },
  {
    title: 'Premium Web Experiences',
    description: 'Refined websites built for trust, presence, and conversion.',
    icon: Globe2,
  },
  {
    title: 'Search & Growth',
    description: 'SEO foundations and growth structure for better discovery.',
    icon: SearchCheck,
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="grid-bg pointer-events-none fixed inset-0 opacity-30" />

      <Navbar />

      <section className="relative z-10 px-0 pb-14 pt-24 md:pb-16 md:pt-28">
        <div className="premium-container">
          <div className="mx-auto max-w-7xl rounded-[1.75rem] border border-[#d8b25e]/12 bg-[#050403]/70 p-5 shadow-2xl shadow-black/30 md:rounded-[2.25rem] md:p-7 lg:p-8">
            <div className="grid items-center gap-7 lg:grid-cols-[1.08fr_0.72fr] lg:gap-10">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#d8b25e] md:text-xs">
                  About
                </p>

                <h1 className="font-display mt-4 max-w-3xl text-5xl font-semibold leading-[0.88] tracking-[-0.055em] text-[#f8f4ea] md:text-6xl lg:text-7xl">
                  Built for clarity before scale.
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#b8b0a3] md:text-base md:leading-8">
                  Acesta Analytics is a premium digital intelligence studio
                  focused on building clear, elegant, and practical systems for
                  modern businesses.
                </p>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#a7a197] md:text-base md:leading-8">
                  We combine data visualization, premium web development, and
                  search-led growth architecture so brands can look sharper,
                  operate smarter, and make better decisions.
                </p>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {capabilities.map((item) => {
                    const Icon = item.icon;

                    return (
                      <article
                        key={item.title}
                        className="group rounded-[1.15rem] border border-[#d8b25e]/14 bg-[#080705]/80 p-4 transition duration-500 hover:-translate-y-1 hover:border-[#f1d99b]/32 hover:bg-[#0c0a07]"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d8b25e]/18 bg-[#d8b25e]/8 text-[#f1d99b] transition duration-500 group-hover:scale-110 group-hover:border-[#f1d99b]/45">
                          <Icon className="h-3.5 w-3.5" />
                        </div>

                        <h3 className="font-display mt-4 text-2xl font-semibold leading-none tracking-[-0.04em] text-[#f8f4ea]">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-xs leading-5 text-[#a7a197]">
                          {item.description}
                        </p>
                      </article>
                    );
                  })}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/services"
                    className="gold-button group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition"
                  >
                    View Services
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-[#d8b25e]/18 bg-white/[0.025] px-6 py-3 text-sm font-semibold text-[#f8f4ea] transition hover:border-[#f1d99b]/40 hover:bg-[#d8b25e]/8"
                  >
                    Start a Conversation
                  </Link>
                </div>
              </div>

              <div className="mx-auto w-full max-w-[300px] md:max-w-[320px] lg:max-w-[340px]">
                <div className="rounded-[1.5rem] border border-[#d8b25e]/14 bg-[#080705]/85 p-4">
                  <div className="flex h-[300px] items-center justify-center overflow-hidden rounded-[1.15rem] border border-[#d8b25e]/12 bg-[#f8f4ea] md:h-[330px] lg:h-[350px]">
                    <Image
                      src="/shubham-sticker.jpeg"
                      alt="Acesta Analytics founder visual"
                      width={700}
                      height={700}
                      className="h-full w-full object-contain"
                      priority
                    />
                  </div>

                  <div className="mt-4">
                    <h2 className="font-display text-3xl font-semibold leading-none tracking-[-0.045em] text-[#f8f4ea]">
                      Built by Shubham Pawar.
                    </h2>

                    <p className="mt-4 text-xs leading-5 text-[#a7a197]">
                      Acesta Analytics is a founder-led digital and intelligence
                      studio built around one clear belief: a business should
                      not just look good online — it should understand its
                      numbers, present itself with authority, and grow with
                      structure.
                    </p>

                    <p className="mt-3 text-xs leading-5 text-[#a7a197]">
                      I work across data visualization, premium website
                      development, and search-led growth systems to help
                      businesses create a sharper digital presence and make more
                      confident decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[1.35rem] border border-[#d8b25e]/14 bg-black/25 p-5 text-center">
              <p className="mx-auto max-w-4xl font-display text-3xl font-semibold leading-[0.95] tracking-[-0.045em] text-[#f8f4ea] md:text-4xl">
                Less digital noise. More clarity, sharper presentation, and
                stronger business flow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}