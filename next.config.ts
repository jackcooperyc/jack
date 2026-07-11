import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static HTML export -> `npm run build` emits an `out/` directory with
  // index.html and one folder per route. Works for deploy_website previews
  // (plain static hosting) and remains fully Vercel-compatible.
  output: "export",
  // Emit `route/index.html` so directory-style static hosts resolve every
  // route (including dynamic /work/[slug]) without server rewrites.
  trailingSlash: true,
  images: {
    // No server image optimizer under static export.
    unoptimized: true,
  },
};

export default nextConfig;
