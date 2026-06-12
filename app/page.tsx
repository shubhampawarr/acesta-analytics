import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HomeServices from '@/components/HomeServices';
import Services from '@/components/Services';
import Process from '@/components/Process';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden bg-[#030303] scroll-smooth md:h-[100dvh] md:overflow-y-auto md:snap-y md:snap-mandatory">
      <div className="grid-bg pointer-events-none fixed inset-0 opacity-60" />

      <Navbar />

      <section className="min-h-[100dvh] md:snap-start md:snap-always">
        <Hero />
      </section>

      <section className="min-h-[100dvh] md:snap-start md:snap-always">
        <HomeServices />
      </section>

      <section className="min-h-[100dvh] md:snap-start md:snap-always">
        <Services />
      </section>

      <section className="min-h-[100dvh] md:snap-start md:snap-always">
        <Process />
      </section>

      <section className="flex min-h-[100dvh] flex-col justify-between pt-20 md:snap-start md:snap-always">
        <FinalCTA />
        <Footer />
      </section>
    </main>
  );
}