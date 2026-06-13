import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.api-sports.io", pathname: "/football/teams/**" },
    ],
  },
};

export default nextConfig;
