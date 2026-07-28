import Link from 'next/link';

const pages = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
];

const legal = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

const disciplines = [
  'Executive Data Intelligence',
  'Premium Web Development',
  'Search Visibility Foundation',
  'Growth Systems Architecture',
];

function ColumnLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-mono-label uppercase tracking-mono text-gold">
      {children}
    </p>
  );
}

export function SiteFooter() {
  return (
    <footer className="premium-container pb-24 pt-(--section-gap)">
      {/* Large typographic wordmark — no icon grid, no bordered panels. */}
      <p className="text-heading-lg text-bone">Acesta</p>

      <div className="mt-24 grid gap-16 md:grid-cols-[1.2fr_0.9fr_0.9fr] md:gap-12">
        <div>
          <ColumnLabel>Contact</ColumnLabel>

          <div className="mt-6 flex flex-col items-start gap-3">
            <a
              href="mailto:shubham@acestaanalytics.com"
              className="ghost-link break-all"
            >
              shubham@acestaanalytics.com
            </a>

            <a href="tel:+919869371603" className="ghost-link">
              +91 98693 71603
            </a>

            <p className="text-[0.875rem] text-mist">Mumbai, Maharashtra</p>
          </div>
        </div>

        <div>
          <ColumnLabel>Pages</ColumnLabel>

          <div className="mt-6 flex flex-col items-start gap-3">
            {pages.map((page) => (
              <Link key={page.href} href={page.href} className="ghost-link">
                {page.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <ColumnLabel>Disciplines</ColumnLabel>

          <div className="mt-6 flex flex-col gap-3">
            {disciplines.map((discipline) => (
              <p key={discipline} className="text-[0.875rem] text-mist">
                {discipline}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-mono-label uppercase tracking-mono text-ash">
          © {new Date().getFullYear()} Acesta Analytics
        </p>

        <div className="flex items-center gap-6">
          {legal.map((item) => (
            <Link key={item.href} href={item.href} className="ghost-link">
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <p className="mt-8 text-caption text-ash">
        GST not charged as supplier is not registered under GST.
      </p>
    </footer>
  );
}
