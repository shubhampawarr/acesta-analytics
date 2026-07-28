import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // Powers the 400ms void wipe between routes (see globals.css).
    viewTransition: true,
  },
};

export default nextConfig;
