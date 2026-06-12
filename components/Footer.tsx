import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = [
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
  {
    label: 'Privacy',
    href: '/privacy',
  },
  {
    label: 'Terms',
    href: '/terms',
  },
];

const services = [
  'Data Intelligence',
  'Premium Websites',
  'SEO Foundation',
  'Growth Systems',
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#d8b25e]/10 bg-[#030303]/92">
      <div className="premium-container">
        <div className="py-6 md:py-10">
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-3"
                aria-label="Acesta Analytics home"
              >
                <img
                  src="/logos/acesta-logo-icon-dark.png"
                  alt="Acesta Analytics"
                  className="h-9 w-auto shrink-0 md:h-11"
                />

                <div className="leading-none">
                  <p className="font-display text-xl font-semibold tracking-[-0.045em] text-[#f8f4ea] md:text-2xl">
                    Acesta
                  </p>
                  <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.32em] text-[#d8b25e] md:text-[9px]">
                    Analytics
                  </p>
                </div>
              </Link>

              <p className="mt-4 max-w-md text-xs leading-6 text-[#a7a197] md:mt-5 md:text-sm md:leading-7">
                Premium data intelligence, website development, SEO foundation,
                and growth systems for businesses that want clarity, presence,
                and structure.
              </p>

              <div className="mt-4 grid gap-2.5 text-xs text-[#b8b0a3] md:mt-5 md:gap-3 md:text-sm">
                <a
                  href="mailto:acestaanalytics@gmail.com"
                  className="flex items-center gap-2.5 transition hover:text-[#f1d99b] md:gap-3"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0 text-[#d8b25e] md:h-4 md:w-4" />
                  <span className="break-all">acestaanalytics@gmail.com</span>
                </a>

                <a
                  href="tel:+919869371603"
                  className="flex items-center gap-2.5 transition hover:text-[#f1d99b] md:gap-3"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0 text-[#d8b25e] md:h-4 md:w-4" />
                  +91 98693 71603
                </a>

                <p className="flex items-start gap-2.5 md:gap-3">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d8b25e] md:h-4 md:w-4" />
                  Mumbai, Maharashtra
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:justify-self-end md:gap-8">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#d8b25e] md:text-[10px] md:tracking-[0.28em]">
                  Pages
                </p>

                <div className="mt-3 grid gap-2.5 md:mt-4 md:gap-3">
                  {footerLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-xs text-[#a7a197] transition hover:text-[#f1d99b] md:text-sm"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#d8b25e] md:text-[10px] md:tracking-[0.28em]">
                  Work
                </p>

                <div className="mt-3 grid gap-2.5 text-xs text-[#a7a197] md:mt-4 md:gap-3 md:text-sm">
                  {services.map((service) => (
                    <p key={service}>{service}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-[#d8b25e]/10 pt-4 md:mt-8 md:pt-5">
            <div className="flex flex-col gap-2 text-[10px] leading-5 text-[#7d7568] md:flex-row md:items-center md:justify-between md:text-xs">
              <p>
                © {new Date().getFullYear()} Acesta Analytics. All rights
                reserved.
              </p>

              <p>GST not charged as supplier is not registered under GST.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}