import Link from 'next/link';
import { BarChart3 } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#d8b25e]/10 bg-black/70 backdrop-blur-2xl">
      <div className="premium-container flex h-20 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d8b25e]/20 bg-[#d8b25e]/10 transition group-hover:border-[#f1d99b]/40">
            <BarChart3 className="h-5 w-5 text-[#f1d99b]" />
          </div>

          <div>
            <p className="font-display text-xl font-semibold uppercase tracking-[0.18em] text-[#f8f4ea]">
              Acesta
            </p>
            <p className="-mt-1 text-[10px] uppercase tracking-[0.32em] text-[#a7a197]">
              Analytics
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#a7a197] transition hover:text-[#f1d99b]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-full border border-[#d8b25e]/30 bg-[#d8b25e]/10 px-5 py-2.5 text-sm font-semibold text-[#f1d99b] transition hover:border-[#f1d99b]/60 hover:bg-[#d8b25e]/15 md:inline-flex"
        >
          Book a Call
        </Link>
      </div>
    </header>
  );
}