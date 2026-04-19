import type { MetadataRoute } from "next";

const SITE_URL = "https://occult.ainiwa.jp";

const ALLOWED_AI_BOTS = [
  "Googlebot",
  "Bingbot",
  "Applebot",
  "DuckDuckBot",
  "YandexBot",
  "SeznamBot",

  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",

  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",

  "PerplexityBot",
  "Perplexity-User",

  "Google-Extended",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "FacebookBot",
  "facebookexternalhit",

  "Amazonbot",
  "DuckAssistBot",
  "cohere-ai",
  "cohere-training-data-crawler",
  "YouBot",
  "MistralAI-User",
];

const BLOCKED_BOTS = [
  "Bytespider",
  "ByteDance",
  "SemrushBot",
  "AhrefsBot",
  "DotBot",
  "DataForSeoBot",
  "PetalBot",
  "MJ12bot",
  "BLEXBot",
  "SerpstatBot",
  "BacklinkCrawler",
  "Barkrowler",
  "MegaIndex",
  "LinkpadBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ALLOWED_AI_BOTS,
        allow: "/",
      },
      {
        userAgent: BLOCKED_BOTS,
        disallow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
