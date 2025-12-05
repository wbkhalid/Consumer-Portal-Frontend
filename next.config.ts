import type { NextConfig } from "next";
const backendUrl = process.env.BACKEND_API;

// Parse hostname and protocol from the env
const url = new URL(backendUrl as string);

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: "/Upload/:path*",
        destination: `${backendUrl}/Upload/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        port: url.port || undefined,
        pathname: "/Upload/**",
      } satisfies import("next/dist/shared/lib/image-config").RemotePattern,
    ],
  },
};

export default nextConfig;
