import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />

      <Navbar />

      <section className="relative z-10 px-0 pb-24 pt-36">
        <div className="premium-container">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#d8b25e]">
            Services
          </p>

          <h1 className="font-display mt-5 max-w-4xl text-6xl font-semibold leading-[0.92] tracking-[-0.05em] text-[#f8f4ea] md:text-8xl">
            Premium systems for clarity, presence, and growth.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#a7a197]">
            Acesta brings together data intelligence, premium web experiences,
            and search-led growth architecture for businesses that want to look
            sharper, operate smarter, and convert with confidence.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}