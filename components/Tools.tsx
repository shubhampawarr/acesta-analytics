const tools = [
  'Python',
  'SQL',
  'Power BI',
  'Tableau',
  'Excel',
  'Google Sheets',
  'Looker Studio',
  'Google Analytics',
  'Meta Ads',
  'Google Ads',
  'Supabase',
  'APIs',
];

const examples = [
  'Marketing ROI Dashboard',
  'Sales Forecasting Model',
  'Operations Report Automation',
];

export default function Tools() {
  return (
    <section id="tools" className="relative py-28">
      <div className="premium-container">
        <div className="premium-card overflow-hidden rounded-[2.5rem]">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-white/10 p-8 md:p-12 lg:border-b-0 lg:border-r">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
                Toolkit
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                Built with modern data tools.
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-400">
                We use practical, business-ready tools for dashboards,
                automation, analysis, forecasting, and reporting pipelines.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm font-medium text-slate-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 md:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                Example outcomes
              </p>

              <div className="mt-8 space-y-4">
                {examples.map((example, index) => (
                  <div
                    key={example}
                    className="rounded-3xl border border-white/10 bg-white/[0.025] p-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 font-mono text-sm text-cyan-200">
                        0{index + 1}
                      </span>

                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {example}
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-slate-400">
                          {index === 0 &&
                            'Track ad spend, leads, conversions, CAC, ROAS, and channel-wise performance.'}
                          {index === 1 &&
                            'Predict monthly sales using historical performance and business drivers.'}
                          {index === 2 &&
                            'Replace manual spreadsheet reporting with automated performance reports.'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-sm leading-7 text-slate-500">
                Note: these are capability examples, not fabricated client case
                studies. Real case studies can be added once project results are
                available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}