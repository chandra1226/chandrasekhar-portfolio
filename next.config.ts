import type { NextConfig } from "next";

/**
 * `NEXT_PUBLIC_BASE_PATH` is only set by the GitHub Pages workflow, where the
 * site is served from `/<repo-name>`. Local dev, Vercel and Netlify all serve
 * from the domain root, so it stays empty there and nothing is prefixed.
 */
// Kept in step with `normaliseBasePath` in src/data/site.ts, and deliberately
// duplicated rather than imported: this file is evaluated by Next's own config
// loader, outside the app's module graph and path aliases. An empty or
// whitespace value means "domain root"; Next rejects a basePath that does not
// start with a slash, so add one rather than failing the build over it.
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim().replace(/\/+$/, "");
const basePath = !rawBasePath
  ? ""
  : rawBasePath.startsWith("/")
    ? rawBasePath
    : `/${rawBasePath}`;

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
