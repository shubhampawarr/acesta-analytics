import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const highlights = [
  'Data Intelligence',
  'Premium Web Experiences',
  'SEO & Growth Systems',
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />

      <Navbar />

      <section className="relative z-10 px-0 pb-24 pt-32">
        <div className="premium-container">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.95fr_0.9fr]">
            <div className="lg:pl-6">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#d8b25e]">
                About the founder
              </p>

              <h1 className="font-display mt-5 max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-[#f8f4ea] md:text-7xl">
                Built by Shubham Pawar.
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-[#b8b0a3] md:text-lg">
                Acesta Analytics is a founder-led digital and intelligence
                studio built around one clear belief: a business should not just
                look good online — it should understand its numbers, present
                itself with authority, and grow with structure.
              </p>

              <p className="mt-5 max-w-xl text-base leading-8 text-[#b8b0a3] md:text-lg">
                I work across data visualization, premium website development,
                and search-led growth systems to help businesses create a
                sharper digital presence and make more confident decisions.
              </p>

              <div className="mt-8 flex max-w-xl flex-wrap gap-3">
                {highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#d8b25e]/18 bg-[#d8b25e]/[0.055] px-4 py-2 text-sm font-medium text-[#d8c9a4]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[430px]">
              <div className="absolute -left-8 top-10 h-56 w-56 rounded-full bg-[#d8b25e]/12 blur-3xl" />
              <div className="absolute -right-8 bottom-10 h-64 w-64 rounded-full bg-[#f1d99b]/8 blur-3xl" />

              <div className="premium-card luxury-glow relative overflow-hidden rounded-[2.25rem] p-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] border border-[#d8b25e]/16 bg-white">
                  <div className="absolute inset-5 bottom-24">
                    <Image
                      src="/shubham-sticker.jpeg"
                      alt="Shubham Pawar, founder of Acesta Analytics"
                      fill
                      priority
                      className="object-contain object-center"
                    />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-24">
                    <p className="font-display text-3xl font-semibold text-[#f8f4ea]">
                      Shubham Pawar
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-[#d8b25e]">
                      Founder, Acesta Analytics
                    </p>
                  </div>
                </div>
              </div>

              <div className="premium-card absolute -bottom-8 left-1/2 hidden w-[86%] -translate-x-1/2 rounded-3xl p-5 lg:block">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a77b32]">
                  Philosophy
                </p>
                <p className="mt-3 font-display text-2xl leading-7 text-[#f8f4ea]">
                  Clarity before scale. Precision before noise.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-28 grid max-w-6xl gap-5 md:grid-cols-3">
            <AboutCard
              number="01"
              title="Data clarity"
              description="Turning scattered information into clean dashboards, visual reports, and decision-ready insights."
            />

            <AboutCard
              number="02"
              title="Digital presence"
              description="Building refined web experiences that help businesses look credible, premium, and trustworthy."
            />

            <AboutCard
              number="03"
              title="Growth structure"
              description="Creating SEO and growth systems that improve visibility, acquisition, and long-term positioning."
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function AboutCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-[2rem] border border-[#d8b25e]/14 bg-[#080705]/80 p-6 transition duration-500 hover:border-[#f1d99b]/35">
      <p className="font-mono text-sm text-[#7d7568]">{number}</p>

      <h2 className="font-display mt-6 text-4xl font-semibold tracking-[-0.035em] text-[#f8f4ea]">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-7 text-[#a7a197]">{description}</p>
    </article>
  );
}