'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BarChart3, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#d8b25e]/10 bg-black/75 backdrop-blur-2xl">
      <div className="premium-container flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8b25e]/20 bg-[#d8b25e]/10 transition group-hover:border-[#f1d99b]/40 md:h-11 md:w-11">
            <BarChart3 className="h-5 w-5 text-[#f1d99b]" />
          </div>

          <div>
            <p className="font-display text-lg font-semibold uppercase tracking-[0.18em] text-[#f8f4ea] md:text-xl">
              Acesta
            </p>
            <p className="-mt-1 text-[9px] uppercase tracking-[0.32em] text-[#a7a197] md:text-[10px]">
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

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d8b25e]/18 bg-[#d8b25e]/[0.055] text-[#f1d99b] transition hover:border-[#f1d99b]/40 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-[#d8b25e]/10 bg-black/95 md:hidden">
          <nav className="premium-container flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-[#b8b0a3] transition hover:bg-[#d8b25e]/10 hover:text-[#f1d99b]"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-full border border-[#d8b25e]/25 bg-[#d8b25e]/10 px-4 py-3 text-center text-sm font-semibold text-[#f1d99b] transition hover:border-[#f1d99b]/50"
            >
              Book a Call
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}