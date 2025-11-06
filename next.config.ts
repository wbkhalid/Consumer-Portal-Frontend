import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://103.4.95.24:151/api/:path*`,
      },
      {
        source: "/upload/:path*",
        destination: `http://103.4.95.24:151/upload/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "103.4.95.24:151",
        port: "151",
        pathname: "/upload/**",
      },
    ],
  },
};

export default nextConfig;
