import Link from 'next/link';

const legalLinks = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#d8b25e]/10 bg-black/30 py-4">
      <div className="premium-container">
        <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
          <Link href="/" className="group">
            <p className="font-display text-lg font-semibold uppercase tracking-[0.2em] text-[#f8f4ea] transition group-hover:text-[#f1d99b]">
              Acesta
            </p>
            <p className="-mt-1 text-[9px] uppercase tracking-[0.32em] text-[#7d7568]">
              Analytics
            </p>
          </Link>

          <div className="flex flex-col items-center gap-2 text-[11px] text-[#7d7568] md:items-end">
            <div className="flex items-center gap-4 uppercase tracking-[0.18em]">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition hover:text-[#f1d99b]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <p>© {new Date().getFullYear()} Acesta Analytics.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}