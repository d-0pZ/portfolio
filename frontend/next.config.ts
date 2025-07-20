// frontend/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for smaller Docker images
  output: 'standalone',
  
  // Disable telemetry for faster builds
  experimental: {
    // Remove unused imports
    optimizePackageImports: ['lucide-react'],
  },
  
  // Optimize images
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // Compress pages
  compress: true,
  
  // Remove console.log in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig