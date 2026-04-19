import { getAllStories } from "@/lib/stories";

const SITE_URL = "https://occult.ainiwa.jp";
const FEED_TITLE = "OCCULT WIRE - GRIMOIRE";
const FEED_DESCRIPTION =
  "シュナとライカが綴るオカルト・都市伝説の長編考察。神秘の書庫。";
const FEED_URL = `${SITE_URL}/feed.xml`;

const authorLabel = (author: string) =>
  author === "shuna"
    ? "シュナ"
    : author === "raika"
      ? "ライカ"
      : "シュナ & ライカ";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const stories = getAllStories().slice(0, 30);
  const now = new Date();
  const latestPubDate = stories[0]
    ? new Date(stories[0].createdAt || stories[0].date)
    : now;

  const items = stories
    .map((s) => {
      const url = `${SITE_URL}/grimoire/${s.id}`;
      const pubDate = new Date(s.createdAt || s.date).toUTCString();
      const author = authorLabel(s.author);
      const categoryList = [s.category, ...s.tags]
        .map((c) => `    <category>${escapeXml(c)}</category>`)
        .join("\n");
      return `  <item>
    <title>${escapeXml(s.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <pubDate>${pubDate}</pubDate>
    <description>${escapeXml(s.summary)}</description>
    <dc:creator>${escapeXml(author)}</dc:creator>
${categoryList}
  </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
  <title>${FEED_TITLE}</title>
  <link>${SITE_URL}/grimoire</link>
  <description>${FEED_DESCRIPTION}</description>
  <language>ja</language>
  <lastBuildDate>${latestPubDate.toUTCString()}</lastBuildDate>
  <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

export const dynamic = "force-static";
export const revalidate = 3600;
