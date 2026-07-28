import type { Metadata, Viewport } from 'next';
import { ViewTransition } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { SiteNav } from '@/components/shell/SiteNav';
import { SiteFooter } from '@/components/shell/SiteFooter';
import { geistMono, switzer } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.acestaanalytics.com'),
  title: {
    default: 'Acesta Analytics | Premium Data Intelligence Consulting',
    template: '%s | Acesta Analytics',
  },
  description:
    'Acesta Analytics builds premium data, web, and search systems for businesses that want to look sharper, operate smarter, and convert with confidence.',
  keywords: [
    'Acesta Analytics',
    'data visualization',
    'dashboard design',
    'business dashboards',
    'premium website development',
    'SEO optimization',
    'growth architecture',
    'digital intelligence',
    'business analytics',
  ],
  authors: [{ name: 'Acesta Analytics' }],
  creator: 'Acesta Analytics',
  publisher: 'Acesta Analytics',
  openGraph: {
    title: 'Acesta Analytics | Premium Data Intelligence Consulting',
    description:
      'Premium data, web, and search systems for businesses that want clarity, authority, and growth structure.',
    url: 'https://www.acestaanalytics.com',
    siteName: 'Acesta Analytics',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acesta Analytics | Premium Data Intelligence Consulting',
    description:
      'Premium data, web, and search systems for businesses that want clarity, authority, and growth structure.',
  },
  // No `icons` override: the icon.tsx / apple-icon.tsx / opengraph-image.tsx
  // file conventions supply these, and an override here would pin the old
  // pre-Decision-C artwork back over the re-cut versions.
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${switzer.variable} ${geistMono.variable}`}>
      <body>
        <SmoothScroll />

        {/* Shell lives in the layout so the nav never remounts across routes —
            the void wipe anchors on it, and Phase 3 mounts the particle
            system once against the same guarantee. */}
        <SiteNav />

        <ViewTransition>
          <div>
            {children}
            <SiteFooter />
          </div>
        </ViewTransition>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}