import type { NextConfig } from "next";

const config: NextConfig = {
  cacheComponents: true,
  devIndicators: false,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.agentcareer.lol",
      },
    ],
  },
  partialPrefetching: true,
  reactCompiler: true,
  reactStrictMode: true,
};

export default config;
