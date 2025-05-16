/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'echo-save-games.vercel.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  typescript: {
    // We should fix TypeScript errors and remove this in the future
    ignoreBuildErrors: true,
  },
  // Enable React strict mode for better development
  reactStrictMode: true,
};

module.exports = nextConfig; 