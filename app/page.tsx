import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HomeServices from '@/components/HomeServices';
import Process from '@/components/Process';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative overflow-x-clip bg-void">
      <Navbar />

      {/* Section rhythm — §4: 180px desktop / 96px mobile, from one token. */}
      <div className="flex flex-col gap-(--section-gap) pb-(--section-gap)">
        <Hero />
        <HomeServices />
        <Process />
        <FinalCTA />
      </div>

      <Footer />
    </main>
  );
}
