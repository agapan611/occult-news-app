import { getAllStories } from "@/lib/stories";
import { grimoireCategoryLabels } from "@/lib/categories";

const SITE_URL = "https://occult.ainiwa.jp";
const FEED_TITLE = "OCCULT WIRE - GRIMOIRE";
const FEED_DESCRIPTION =
  "シュナとライカが綴るオカルト・都市伝説の長編考察。神秘の書庫。";
const FEED_URL = `${SITE_URL}/feed.json`;
const FEED_HOME = `${SITE_URL}/grimoire`;
const ICON_URL = `${SITE_URL}/shuna-raika.png`;

const authorLabel = (author: string) =>
  author === "shuna"
    ? "シュナ"
    : author === "raika"
      ? "ライカ"
      : "シュナ & ライカ";

export async function GET() {
  const stories = getAllStories().slice(0, 30);

  const items = stories.map((s) => {
    const url = `${SITE_URL}/grimoire/${s.id}`;
    const dateIso = new Date(s.createdAt || s.date).toISOString();
    const tags = [
      grimoireCategoryLabels[s.category] ?? s.category,
      ...s.tags,
    ];

    return {
      id: url,
      url,
      title: s.title,
      summary: s.leadline ? `${s.leadline}｜${s.summary}` : s.summary,
      content_text: s.summary,
      date_published: dateIso,
      date_modified: dateIso,
      authors: [{ name: authorLabel(s.author) }],
      tags,
      language: "ja",
    };
  });

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: FEED_TITLE,
    home_page_url: FEED_HOME,
    feed_url: FEED_URL,
    description: FEED_DESCRIPTION,
    icon: ICON_URL,
    favicon: ICON_URL,
    language: "ja",
    authors: [{ name: "OCCULT WIRE", url: SITE_URL }],
    items,
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

export const dynamic = "force-static";
export const revalidate = 3600;
