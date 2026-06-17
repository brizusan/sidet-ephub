import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "8omiavnh4l.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
