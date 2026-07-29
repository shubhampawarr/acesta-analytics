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

/**
 * A closing signature, not a second page. One row on desktop, legal inline
 * beneath it — the disciplines column is gone because /services already
 * carries that list and repeating it here only added height.
 */
export function SiteFooter() {
  return (
    <footer className="premium-container pb-16 pt-32 md:pb-20 md:pt-40">
      <div className="flex flex-col gap-10 md:flex-row md:items-baseline md:justify-between md:gap-16">
        <Link href="/" className="text-heading-xs text-bone">
          Acesta
        </Link>

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-baseline gap-x-8 gap-y-3"
        >
          {pages.map((page) => (
            <Link key={page.href} href={page.href} className="ghost-link">
              {page.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
          <a href="mailto:shubham@acestaanalytics.com" className="ghost-link">
            shubham@acestaanalytics.com
          </a>

          <a href="tel:+919869371603" className="ghost-link">
            +91 98693 71603
          </a>
        </div>
      </div>

      <div className="mt-14 flex flex-wrap items-baseline gap-x-6 gap-y-2 font-mono text-mono-label uppercase tracking-mono text-ash">
        <span>© {new Date().getFullYear()} Acesta Analytics</span>
        <span aria-hidden>·</span>
        <span>Mumbai</span>

        {legal.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="transition-[color] duration-(--dur-micro) ease-out-expo hover:text-bone"
          >
            {item.label}
          </Link>
        ))}

        <span className="basis-full normal-case tracking-normal">
          GST not charged as supplier is not registered under GST.
        </span>
      </div>
    </footer>
  );
}
