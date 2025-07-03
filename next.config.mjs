/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // Image optimization settings (disabled for static export)
  images: {
    unoptimized: true, // Required for static export
  },
  
  // Environment variables available to the client
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    BUSINESS_NAME: process.env.BUSINESS_NAME,
  },
  
  // Optimize for static export
  experimental: {
    // Disable ISR for static export
    isrMemoryCacheSize: 0,
  },
};

export default nextConfig;
