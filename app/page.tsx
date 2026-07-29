import Hero from '@/components/home/Hero';
import Method from '@/components/home/Method';
import Closing from '@/components/home/Closing';
import {
  ServiceSnippet,
  type Service,
} from '@/components/home/ServiceSnippet';
import { ResolveWaypoint } from '@/components/resolve/Resolve';

/**
 * Formation order is fixed by §7: grid → chart → radial → flow. Alignment
 * alternates against each formation's world offset to produce the §4 zigzag.
 */
const services: Service[] = [
  {
    eyebrow: 'Web Development',
    name: 'Premium Web Development',
    proposition: 'The site you are reading is the proof.',
    support:
      'Fast, restrained, conversion-focused sites built to make a serious business look serious — and to hold up when a prospect looks closely.',
    anchor: 'web',
    formation: 'grid',
  },
  {
    eyebrow: 'Data Intelligence',
    name: 'Executive Data Intelligence',
    proposition: 'Scattered numbers become one board-ready view.',
    support:
      'Dashboards and reporting that consolidate revenue, channels and operations into a single picture, so decisions stop waiting on someone rebuilding a spreadsheet.',
    anchor: 'data',
    formation: 'chart',
  },
  {
    eyebrow: 'Search Visibility',
    name: 'Search Visibility Foundation',
    proposition: 'Found by the people already looking for you.',
    support:
      'Technical foundations, page structure and metadata that make a site legible to search engines — the groundwork that compounds rather than the tricks that expire.',
    anchor: 'search',
    formation: 'radial',
  },
  {
    eyebrow: 'Growth Systems',
    name: 'Growth Systems Architecture',
    proposition: 'Attention routed into enquiries, by design.',
    support:
      'Lead flow, qualification and follow-up wired into one path, so interest arrives as a usable enquiry instead of scattering across channels.',
    anchor: 'growth',
    formation: 'flow',
  },
];

export default function Home() {
  return (
    <main className="relative overflow-x-clip">
      <ResolveWaypoint formation="lattice">
        <Hero />
      </ResolveWaypoint>

      {services.map((service, index) => (
        <ServiceSnippet
          key={service.anchor}
          service={service}
          align={index % 2 === 0 ? 'right' : 'left'}
        />
      ))}

      <Method />
      <Closing />
    </main>
  );
}
