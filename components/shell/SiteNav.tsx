'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Wordmark } from '@/components/shell/Wordmark';
import { cn } from '@/lib/cn';

/** ACESTA-DESIGN.md §5 — blur and ground fade in after 80px of scroll. */
const SCROLL_THRESHOLD = 80;
const STAGGER_MS = 60;

const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
];

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroCtaVisible, setHeroCtaVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // A sentinel at the 80px mark rather than a scroll listener: the browser
  // reports the crossing itself, so nothing runs on every scroll frame.
  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /**
   * Decision N, keyed to the thing it is actually about: the nav CTA drops its
   * fill only while a page's own gold pill is on screen.
   *
   * N specified the 80px scroll sentinel as the trigger, on the assumption
   * that the hero pill is gone by then. Measured, it is not — the hero pill
   * sits at document y 848, so the sentinel would put two gold fills on screen
   * from scrollY 81 to 848. §9 forbids exactly that, and the design system
   * wins, so this watches the pill itself. Any route can opt in by marking its
   * primary action with `data-hero-cta`; routes that do not are filled from
   * the top, as N requires.
   */
  useEffect(() => {
    let observer: IntersectionObserver | undefined;

    // The incoming route's markup is not committed yet on a client
    // navigation, so look for it after the next frame.
    const raf = requestAnimationFrame(() => {
      const target = document.querySelector('[data-hero-cta]');

      if (!target) {
        setHeroCtaVisible(false);

        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => setHeroCtaVisible(entry.isIntersecting),
        { threshold: 0 }
      );

      observer.observe(target);
    });

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen]);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="absolute top-0 h-20 w-px" />

      <header
        data-site-nav
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-(--dur-reveal) ease-out-expo',
          scrolled && 'bg-void/60 backdrop-blur-xl'
        )}
      >
        <div className="premium-container">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="relative z-10">
              <Wordmark />
            </Link>

            <nav
              aria-label="Primary"
              className="hidden items-center gap-9 md:flex"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'font-mono text-[0.875rem] uppercase tracking-mono transition-[color] duration-(--dur-micro) ease-out-expo',
                    isActive(item.href)
                      ? 'text-bone'
                      : 'text-ash hover:text-bone'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Decision N: the CTA yields its fill only where the collision
                actually happens — the homepage above the fold, where the hero
                pill is in view. Past the same 80px sentinel that drives the
                nav ground, and on every other route, it is a gold pill. */}
            <Link
              href="/contact"
              className={cn(
                'gold-pill hidden md:inline-flex',
                heroCtaVisible && 'gold-pill--ghost'
              )}
            >
              Book a Call
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="relative z-10 -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span className="sr-only">
                {menuOpen ? 'Close menu' : 'Open menu'}
              </span>
              <span
                aria-hidden
                className={cn(
                  'h-px w-6 bg-bone transition-transform duration-(--dur-micro) ease-out-expo',
                  menuOpen && 'translate-y-[3.5px] rotate-45'
                )}
              />
              <span
                aria-hidden
                className={cn(
                  'h-px w-6 bg-bone transition-transform duration-(--dur-micro) ease-out-expo',
                  menuOpen && '-translate-y-[3.5px] -rotate-45'
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen void overlay. Kept mounted and driven by CSS so the exit
          animation needs no unmount coordination — and no animation library. */}
      <div
        id="mobile-menu"
        data-open={menuOpen ? '' : undefined}
        aria-hidden={!menuOpen}
        className={cn(
          'fixed inset-0 z-40 bg-void px-(--gutter) pt-32 md:hidden',
          'transition-opacity duration-(--dur-reveal) ease-out-expo',
          menuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={menuOpen ? undefined : -1}
              style={{ transitionDelay: `${index * STAGGER_MS}ms` }}
              className={cn(
                'py-5 font-mono text-[0.875rem] uppercase tracking-mono',
                'transition-[opacity,transform] duration-(--dur-reveal) ease-out-expo',
                isActive(item.href) ? 'text-bone' : 'text-ash',
                menuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-6 opacity-0'
              )}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/contact"
            tabIndex={menuOpen ? undefined : -1}
            style={{ transitionDelay: `${navItems.length * STAGGER_MS}ms` }}
            className={cn(
              'gold-pill mt-12 self-start',
              'transition-[opacity,transform] duration-(--dur-reveal) ease-out-expo',
              menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            )}
          >
            Book a Call
          </Link>
        </nav>
      </div>
    </>
  );
}
