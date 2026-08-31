import type { MetadataRoute } from "next";
import { siteUrl } from "@/data";

// `output: export` needs every metadata route pinned to build time.
export const dynamic = "force-static";

/** Single-page site, so the sitemap has one entry. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
