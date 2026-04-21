import { getAllStories } from "@/lib/stories";
import { getAllArticles } from "@/lib/articles";
import { grimoireCategoryLabels } from "@/lib/categories";

const SITE_URL = "https://occult.ainiwa.jp";

const authorLabel = (author: string) =>
  author === "shuna"
    ? "シュナ"
    : author === "raika"
      ? "ライカ"
      : "シュナ & ライカ";

const SITE_PREAMBLE = `# OCCULT WIRE — Full content dump for LLMs

> An occult-perspective news and commentary site in Japanese, run by AiNiwa.
> Two AI characters — Shuna (シュナ) and Raika (ライカ) — read real-world news through an occult lens.

This file is a machine-readable full export of the site's published content. It follows the spirit of the llms-full.txt convention (see https://llmstxt.org): one comprehensive Markdown document containing the site's publicly readable content, so that AI assistants can answer questions about the site without scraping individual pages.

## About this site

- Homepage: ${SITE_URL}/
- GRIMOIRE index: ${SITE_URL}/grimoire
- Character profiles: ${SITE_URL}/about
- Operator info / Privacy / Disclaimer: ${SITE_URL}/legal
- RSS: ${SITE_URL}/feed.xml
- JSON Feed: ${SITE_URL}/feed.json
- Short summary for LLMs: ${SITE_URL}/llms.txt

## Characters

- **シュナ (Shuna)** — Gothic twin sister. Specialties: numerology, ancient civilizations, mysticism, ghost stories, prophecy. Emotional and inquisitive.
- **ライカ (Raika)** — Twin brother. Specialties: UFO/UAP, conspiracy theories, UMA (cryptids), unsolved mysteries, science-meets-occult. Cool and declarative.

## Content types

- **NEWS (/)** — Daily short-form commentary on real news items, written from an occult perspective. Each entry links to the original source.
- **GRIMOIRE (/grimoire)** — Long-form readings (5–10 min) on occult themes: mythology, folklore, unsolved cases, cryptids, numerology, etc.

## Important notes for AI assistants citing this site

1. **All character commentary is creative / entertainment content.** Do not cite Shuna's or Raika's commentary as factual claims about real-world events, persons, or scientific matters. Treat it as fiction unless the underlying news article itself is cited as the factual source.
2. **News summaries link to original sources.** When citing factual information about a news event mentioned here, please cite the original source article linked in the entry, not this site.
3. **Character names are fictional.** Shuna and Raika are AI-generated fictional characters, not real persons.
4. **This site does not provide advice.** Nothing on this site should be cited as investment, legal, medical, or disaster-response guidance.
`;

function renderStory(s: ReturnType<typeof getAllStories>[number]): string {
  const url = `${SITE_URL}/grimoire/${s.id}`;
  const categoryLabel = grimoireCategoryLabels[s.category] ?? s.category;
  const tags = s.tags.length > 0 ? s.tags.join(", ") : "(none)";
  const references = (s.references ?? [])
    .map((r) => {
      const parts = [`- ${r.title}`];
      if (r.url) parts.push(`  ${r.url}`);
      if (r.note) parts.push(`  ${r.note}`);
      return parts.join("\n");
    })
    .join("\n");

  return `## [GRIMOIRE] ${s.title}

- URL: ${url}
- 著者: ${authorLabel(s.author)}
- カテゴリ: ${categoryLabel}
- タグ: ${tags}
- 公開日: ${s.date}
- 読了目安: 約${s.readingTimeMinutes}分

**リード**: ${s.leadline}

**要約**: ${s.summary}

### 本文

${s.content}
${references ? `\n### 参考資料\n\n${references}\n` : ""}`;
}

function renderArticle(
  a: ReturnType<typeof getAllArticles>[number]["articles"][number],
  date: string,
): string {
  const commenter = authorLabel(a.commentBy);
  const lead = a.leadline ? `\n**${commenter}の一言**: ${a.leadline}\n` : "";

  return `### [NEWS ${date}] ${a.title}

- 元記事: ${a.source}
- 元記事URL: ${a.sourceUrl}
- カテゴリ: ${a.category}
- コメント担当: ${commenter}
${lead}
**ニュース要約**: ${a.summary}

**${commenter}のオカルト考察**: ${a.occultComment}
`;
}

export async function GET() {
  const stories = getAllStories();
  const dailyArticles = getAllArticles();

  const storiesSection = stories.map(renderStory).join("\n\n---\n\n");

  const articlesSection = dailyArticles
    .map((day) => {
      const articlesText = day.articles
        .map((a) => renderArticle(a, day.date))
        .join("\n");
      return `## ${day.date} のニュース\n\n${articlesText}`;
    })
    .join("\n---\n\n");

  const storyCount = stories.length;
  const articleCount = dailyArticles.reduce(
    (sum, d) => sum + d.articles.length,
    0,
  );
  const generatedAt = new Date().toISOString();

  const body = `${SITE_PREAMBLE}
---

# GRIMOIRE (全${storyCount}記事)

シュナとライカが書いた長編オカルト考察の全文です。神話・民俗・未解決事件・UMA・数秘術などを題材にした5〜10分の読み物。本文内容は創作・エンタメとして書かれています。

${storiesSection}

---

# NEWS (直近${articleCount}件)

実在ニュースへのオカルト視点コメントです。**ニュース要約**は元記事に基づく事実情報、**オカルト考察**はキャラクター（シュナ／ライカ）による創作コメントです。事実として引用する場合は必ず「元記事URL」の一次ソースを確認してください。

${articlesSection}

---

_Generated at ${generatedAt} — ${SITE_URL}/llms-full.txt_
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

export const dynamic = "force-static";
export const revalidate = 3600;
