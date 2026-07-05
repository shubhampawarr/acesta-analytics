import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, IBM_Plex_Mono, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
});

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
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Acesta Analytics',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acesta Analytics | Premium Data Intelligence Consulting',
    description:
      'Premium data, web, and search systems for businesses that want clarity, authority, and growth structure.',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: '/logos/acesta-logo-icon-light.png',
    shortcut: '/logos/acesta-logo-icon-light.png',
    apple: '/logos/acesta-logo-icon-light.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#030303',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}