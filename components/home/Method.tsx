import { Reveal, StaggerGroup } from '@/components/motion/Reveal';

/**
 * Four steps, four fragments. Kept per Decision A, cut to the bone per
 * Decision M — the old version was four bordered cards carrying a sentence
 * each, which is precisely the "box, information, box" pattern being removed.
 */
const steps = [
  { n: '01', title: 'Understand', line: 'Business, audience, objective, gaps.' },
  { n: '02', title: 'Structure', line: 'Hierarchy, data flow, conversion path.' },
  { n: '03', title: 'Build', line: 'Design and develop, cleanly.' },
  { n: '04', title: 'Launch', line: 'Test, deploy, hand over.' },
];

export default function Method() {
  return (
    <section className="premium-container py-(--section-gap)">
      <Reveal>
        <p className="font-mono text-mono-label uppercase tracking-mono text-gold">
          Method
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-8 max-w-[16ch] text-heading text-bone">
          Simple on the surface. Structured underneath.
        </h2>
      </Reveal>

      <StaggerGroup className="mt-24 grid gap-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        {steps.map((step) => (
          <div key={step.n}>
            <p className="font-mono text-mono-label uppercase tracking-mono text-ash">
              {step.n}
            </p>

            <h3 className="mt-6 text-heading-2xs text-bone">{step.title}</h3>

            <p className="mt-3 max-w-[24ch] text-[0.9375rem] text-ash">
              {step.line}
            </p>
          </div>
        ))}
      </StaggerGroup>
    </section>
  );
}
