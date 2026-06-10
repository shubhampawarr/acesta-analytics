import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const body = Inter({
  variable: '--font-body',
  subsets: ['latin'],
});

const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Acesta Analytics | Premium Data Intelligence Consulting',
  description:
    'Acesta Analytics helps businesses transform scattered data into dashboards, automated reports, forecasting systems, and decision-ready intelligence.',
  keywords: [
    'Acesta Analytics',
    'Data Analytics',
    'Business Intelligence',
    'Dashboard Development',
    'Reporting Automation',
    'Forecasting',
    'Analytics Consulting',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}