import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/capitals',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
