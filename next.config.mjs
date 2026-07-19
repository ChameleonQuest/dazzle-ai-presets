/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    turbo: {}, // Enabling Turbopack
  },
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
};

export default nextConfig;



