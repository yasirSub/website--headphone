import type { NextConfig } from "next";

const repo = '/website--headphone';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: repo,
  assetPrefix: repo,
  reactCompiler: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: repo,
  },
};

export default nextConfig;
