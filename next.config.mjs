/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

// const isProd = process.env.NODE_ENV === 'production';

const nextConfig = withPWA({
    pwa: {
        dest: 'public',
        // disable: !isProd, // Disable PWA in development
        register: true, // Automatically register the service worker
        skipWaiting: true, // Skip the waiting phase and activate the new service worker immediately
      },
      reactStrictMode: true,
      swcMinify: true,
});

export default nextConfig;
