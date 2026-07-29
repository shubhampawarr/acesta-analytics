import { Reveal, StaggerGroup } from '@/components/motion/Reveal';

/**
 * Four steps, four fragments. Kept per Decision A, cut to the bone per
 * Decision M. Two columns at 390px rather than four stacked full-width rows —
 * four rows made this the tallest thing on the mobile page for the least
 * information on it (item 7).
 */
const steps = [
  { n: '01', title: 'Understand', line: 'Business, audience, objective, gaps.' },
  { n: '02', title: 'Structure', line: 'Hierarchy, data flow, conversion path.' },
  { n: '03', title: 'Build', line: 'Design and develop, cleanly.' },
  { n: '04', title: 'Launch', line: 'Test, deploy, hand over.' },
];

export default function Method() {
  return (
    <section className="premium-container pt-(--section-gap)">
      <Reveal>
        <p className="font-mono text-mono-label uppercase tracking-mono text-gold">
          Method
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-6 max-w-[18ch] text-heading text-bone">
          Simple on the surface. Structured underneath.
        </h2>
      </Reveal>

      <StaggerGroup className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-20 md:gap-x-12 lg:grid-cols-4">
        {steps.map((step) => (
          <div key={step.n}>
            <p className="font-mono text-mono-label uppercase tracking-mono text-ash">
              {step.n}
            </p>

            <h3 className="mt-3 text-heading-2xs text-bone md:mt-4">
              {step.title}
            </h3>

            <p className="mt-2 max-w-[26ch] text-caption text-ash md:mt-3">
              {step.line}
            </p>
          </div>
        ))}
      </StaggerGroup>
    </section>
  );
}
