import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HomeServices from '@/components/HomeServices';
import Services from '@/components/Services';
import Process from '@/components/Process';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative h-screen overflow-y-auto overflow-x-hidden scroll-smooth snap-y snap-mandatory">
      <div className="grid-bg pointer-events-none fixed inset-0 opacity-60" />

      <Navbar />

      <section className="min-h-screen snap-start snap-always">
        <Hero />
      </section>

      <section className="min-h-screen snap-start snap-always">
        <HomeServices />
      </section>

      <section className="min-h-screen snap-start snap-always">
        <Services />
      </section>

      <section className="min-h-screen snap-start snap-always">
        <Process />
      </section>

      <section className="flex min-h-screen snap-start snap-always flex-col justify-between">
        <FinalCTA />
        <Footer />
      </section>
    </main>
  );
}