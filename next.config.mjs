/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

// const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // reactStrictMode: true
  experimental: {
    turbo: {}, // Enabling Turbopack
    missingSuspenseWithCSRBailout: false,
  },  
};

const pwaConfig = {
  dest: 'public',
  // disable: !isProd, // Disable PWA in development
  register: true, // Automatically register the service worker
  skipWaiting: true, // Skip the waiting phase and activate the new service worker immediately
}

export default withPWA(pwaConfig)(nextConfig);
