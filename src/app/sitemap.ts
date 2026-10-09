import type { MetadataRoute } from "next";
import { EXPERIENCES, JOURNAL, SEO_PAGES } from "@/lib/data";

const BASE = "https://androsoutdooradventures.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/plan`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const seoRoutes: MetadataRoute.Sitemap = SEO_PAGES.map((p) => ({
    url: `${BASE}/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const experienceRoutes: MetadataRoute.Sitemap = EXPERIENCES.map((e) => ({
    url: `${BASE}/experiences/${e.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const journalRoutes: MetadataRoute.Sitemap = JOURNAL.map((j) => ({
    url: `${BASE}/journal/${j.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...seoRoutes, ...experienceRoutes, ...journalRoutes];
}
