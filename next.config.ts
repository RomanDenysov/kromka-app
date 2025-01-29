import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'minio.pekarenkromka.sk',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        search: '',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
