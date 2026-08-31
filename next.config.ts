import type { NextConfig } from "next";

/**
 * `NEXT_PUBLIC_BASE_PATH` is only set by the GitHub Pages workflow, where the
 * site is served from `/<repo-name>`. Local dev, Vercel and Netlify all serve
 * from the domain root, so it stays empty there and nothing is prefixed.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Fully static output: no server runtime needed, deployable anywhere.
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    // The static exporter cannot run the on-demand image optimizer.
    unoptimized: true,
  },
};

export default nextConfig;
