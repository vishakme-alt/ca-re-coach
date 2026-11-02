import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the app is fully client-side (progress lives in localStorage), so it can be
  // hosted on any static host. Set BASE_PATH (e.g. "/ca-re-coach") for GitHub Pages project sites.
  output: "export",
  basePath: process.env.BASE_PATH || undefined,
  images: { unoptimized: true },
  // Pin the workspace root: a stray lockfile in the home directory otherwise
  // makes Turbopack treat ~ as the project root and crawl everything in it.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
