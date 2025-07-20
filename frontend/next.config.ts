/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output removed - not needed for Render
  
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