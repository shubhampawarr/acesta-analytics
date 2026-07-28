import localFont from 'next/font/local';
import { Geist_Mono } from 'next/font/google';

/**
 * Switzer — display and body. ACESTA-DESIGN.md §3.
 * Self-hosted variable file (100–900) so weight 200 body and weight 400
 * headlines come from one 43KB request with no layout shift.
 */
export const switzer = localFont({
  src: '../public/fonts/Switzer-Variable.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-switzer',
  display: 'swap',
  preload: true,
  fallback: [
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'Segoe UI',
    'Roboto',
    'sans-serif',
  ],
});

/**
 * Geist Mono — data, metrics, eyebrow labels. The instrument voice (§3).
 * Variable, self-hosted by next/font; no request reaches Google at runtime.
 */
export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
  preload: true,
});
