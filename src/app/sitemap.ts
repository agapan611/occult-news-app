import type { MetadataRoute } from "next";
import { getAllStories } from "@/lib/stories";

const SITE_URL = "https://occult.ainiwa.jp";

export default function sitemap(): MetadataRoute.Sitemap {
  const stories = getAllStories();
  const latestStoryDate = stories[0]?.date ?? new Date().toISOString().slice(0, 10);

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/grimoire`,
      lastModified: new Date(latestStoryDate),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/grimoire/author/shuna`,
      lastModified: new Date(latestStoryDate),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/grimoire/author/raika`,
      lastModified: new Date(latestStoryDate),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/grimoire/author/both`,
      lastModified: new Date(latestStoryDate),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date("2026-04-17"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/legal`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const storyEntries: MetadataRoute.Sitemap = stories.map((s) => ({
    url: `${SITE_URL}/grimoire/${s.id}`,
    lastModified: new Date(s.createdAt || s.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...storyEntries];
}
