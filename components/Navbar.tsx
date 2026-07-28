'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'Work',
    href: '/work',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isHome = pathname === '/';

  const visibleNavItems = isHome
    ? navItems
    : [
        {
          label: 'Home',
          href: '/',
        },
        ...navItems,
      ];

  function isActive(href: string) {
    if (href === '/') {
      return pathname === '/';
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-gold/10 bg-void/82 backdrop-blur-2xl">
      <div className="premium-container">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="group flex items-center gap-3"
            aria-label="Acesta Analytics home"
          >
            <img
              src="/logos/acesta-logo-icon-dark.png"
              alt="Acesta Analytics"
              className="h-10 w-auto shrink-0 transition duration-300 group-hover:scale-105 md:h-11"
            />

            <div className="leading-none">
              <p className="font-display text-xl font-normal tracking-[-0.045em] text-bone md:text-2xl">
                Acesta
              </p>
              <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.32em] text-gold md:text-[9px]">
                Analytics
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {visibleNavItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm font-medium transition ${
                    active
                      ? 'text-gold-bright'
                      : 'text-mist hover:text-bone'
                  }`}
                >
                  {item.label}

                  {active && (
                    <span className="absolute -bottom-2 left-0 h-px w-full bg-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/contact"
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                isActive('/contact')
                  ? 'gold-button'
                  : 'border border-gold/18 bg-white/[0.025] text-bone hover:border-gold-bright/40 hover:bg-gold/8'
              }`}
            >
              Book a Call
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/16 bg-white/[0.025] text-bone md:hidden"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-gold/10 bg-void/96 px-4 pb-5 pt-3 backdrop-blur-2xl md:hidden">
          <div className="grid gap-2">
            {visibleNavItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? 'border border-gold/24 bg-gold/10 text-gold-bright'
                      : 'border border-transparent text-mist hover:border-gold/16 hover:bg-gold/8 hover:text-bone'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={`mt-2 rounded-full px-5 py-3 text-center text-sm font-bold transition ${
                isActive('/contact')
                  ? 'gold-button'
                  : 'border border-gold/18 bg-white/[0.025] text-bone hover:border-gold-bright/40 hover:bg-gold/8'
              }`}
            >
              Book a Call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}