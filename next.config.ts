import type { NextConfig } from "next";

const config: NextConfig = {
  cacheComponents: true,
  devIndicators: false,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  partialPrefetching: true,
  reactCompiler: true,
  reactStrictMode: true,
};

export default config;
