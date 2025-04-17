import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/:path*`
      }
    ];
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  }
};

export default nextConfig;
