/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  
  // Image optimization settings (disabled for static export)
  images: {
    unoptimized: true, // Required for static export
  },
  
  // Environment variables available to the client
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    BUSINESS_NAME: process.env.BUSINESS_NAME,
    BUSINESS_DESCRIPTION: process.env.BUSINESS_DESCRIPTION,
    BUSINESS_CONTACT: process.env.BUSINESS_CONTACT,
  },
  
  // Webpack configuration for better compatibility
  webpack: (config, { isServer }) => {
    // Ensure proper handling of CSS in production
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;
