import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/:path*' // Assuming FastAPI runs on port 8000
      }
    ];
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  }
};

export default nextConfig;
