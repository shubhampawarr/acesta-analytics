import Hero from '@/components/Hero';
import HomeServices from '@/components/HomeServices';
import Process from '@/components/Process';
import FinalCTA from '@/components/FinalCTA';
import { ResolveWaypoint } from '@/components/resolve/Resolve';

export default function Home() {
  return (
    <main className="relative overflow-x-clip">
      {/* Section rhythm — §4: 180px desktop / 96px mobile, from one token. */}
      <div className="flex flex-col gap-(--section-gap) pb-(--section-gap)">
        {/* Provisional Phase 3 wiring: one waypoint per existing section so
            all five formations are reachable by scrolling and can be reviewed
            in place. Phase 4 replaces these with the four service snippets. */}
        <ResolveWaypoint formation="lattice">
          <Hero />
        </ResolveWaypoint>

        <ResolveWaypoint formation="grid">
          <HomeServices />
        </ResolveWaypoint>

        <ResolveWaypoint formation="chart">
          <Process />
        </ResolveWaypoint>

        <ResolveWaypoint formation="radial">
          <FinalCTA />
        </ResolveWaypoint>

        <ResolveWaypoint formation="flow" className="h-px w-full" />
      </div>
    </main>
  );
}
