import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://theexplorermindset.com",
      lastModified: new Date("2026-02-25"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
