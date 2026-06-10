import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />

      <Navbar />

      <section className="relative z-10 px-0 pb-24 pt-36">
        <div className="premium-container">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#d8b25e]">
            Contact
          </p>

          <h1 className="font-display mt-5 max-w-4xl text-6xl font-semibold leading-[0.92] tracking-[-0.05em] text-[#f8f4ea] md:text-8xl">
            Let’s build something precise, premium, and useful.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#a7a197]">
            Tell us what you are building, improving, or trying to understand.
            We will help shape the right data, web, or growth system around it.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}