import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://45.115.86.186:191/api/:path*`,
      },
      {
        source: "/upload/:path*",
        destination: `http://45.115.86.186:191/upload/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "45.115.86.186",
        port: "191",
        pathname: "/upload/**",
      },
    ],
  },
};

export default nextConfig;
