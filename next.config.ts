import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Playwright / devtools often use 127.0.0.1 while Next binds localhost — avoids HMR warnings.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  // Compress static assets
  compress: true,
  // Optimize images with modern formats
  images: {
    formats: ["image/avif", "image/webp"],
    // Add device sizes for better responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320],
  },
  // Experimental: improve bundle splitting
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
