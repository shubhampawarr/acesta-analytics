import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, IBM_Plex_Mono, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
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
  title: 'Acesta Analytics | Premium Data Intelligence Consulting',
  description:
    'Acesta Analytics builds premium data, web, and search systems for businesses that want to look sharper, operate smarter, and convert with confidence.',
  metadataBase: new URL('https://acestaanalytics.vercel.app'),
  openGraph: {
    title: 'Acesta Analytics | Premium Data Intelligence Consulting',
    description:
      'Premium data, web, and search systems for businesses that want clarity, authority, and growth structure.',
    url: 'https://acestaanalytics.vercel.app',
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
    icon: '/icon',
    apple: '/apple-icon',
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
      </body>
    </html>
  );
}