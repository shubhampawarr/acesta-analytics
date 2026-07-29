import Link from 'next/link';

const pages = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
];

/**
 * A closing signature, not a second page (§5 Footer).
 *
 * Opaque void ground, deliberately. The footer is chrome rather than content,
 * and the fixed particle canvas sits behind the whole document — the density
 * pass measured a third of the legal links' area with field behind it. Void is
 * the ground everywhere anyway (§9), so making it explicit costs nothing
 * visually and takes the entire footer off the unchecked list.
 *
 * Mobile is a single column on a consistent --space-24 rhythm, with email and
 * phone stacked rather than sharing a line. The legal block is Switzer in
 * sentence case, not mono uppercase: uppercase mono is a label treatment, and
 * applying it to three lines of statutory text turns them into noise.
 */
export function SiteFooter() {
  return (
    <footer className="relative bg-void">
      <div className="premium-container pb-(--space-36) pt-(--space-36) md:pb-(--space-60) md:pt-(--section-gap)">
      <div className="flex flex-col gap-(--space-24) md:flex-row md:items-baseline md:justify-between md:gap-(--space-60)">
        <Link href="/" className="text-heading-xs text-bone">
          Acesta
        </Link>

        {/* Two columns at 390px: four links stacked one per row was the
            single biggest contributor to footer height. */}
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-(--space-12) md:flex md:gap-(--space-36)"
        >
          {pages.map((page) => (
            <Link key={page.href} href={page.href} className="ghost-link">
              {page.label}
            </Link>
          ))}
        </nav>

        {/* Stacked: an email address and a phone number sharing one line at
            390px is cramped. */}
        <div className="flex flex-col gap-(--space-12) md:gap-(--space-18)">
          <a href="mailto:shubham@acestaanalytics.com" className="ghost-link">
            shubham@acestaanalytics.com
          </a>

          <a href="tel:+919869371603" className="ghost-link">
            +91 98693 71603
          </a>
        </div>
      </div>

      <div className="mt-(--space-24) flex flex-col gap-(--space-6) text-caption text-ash md:mt-(--space-60) md:gap-(--space-12)">
        <p>
          © {new Date().getFullYear()} Acesta Analytics · Mumbai ·{' '}
          <Link
            href="/privacy"
            className="transition-[color] duration-(--dur-micro) ease-out-expo hover:text-bone"
          >
            Privacy
          </Link>{' '}
          ·{' '}
          <Link
            href="/terms"
            className="transition-[color] duration-(--dur-micro) ease-out-expo hover:text-bone"
          >
            Terms
          </Link>
        </p>

        {/* Statutory, and the quietest thing on the page. */}
        <p className="text-balance">
          GST not charged as supplier is not registered under GST.
        </p>
        </div>
      </div>
    </footer>
  );
}
