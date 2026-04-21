import { getAllStories } from "./stories";
import { getAllArticles } from "./articles";
import { grimoireCategoryLabels } from "./categories";

export type SearchItem = {
  id: string;
  kind: "grimoire" | "news";
  url: string;
  title: string;
  leadline?: string;
  summary: string;
  category?: string;
  categoryLabel?: string;
  tags?: string[];
  author?: string;
  date: string;
};

/** 検索対象のアイテム一覧（ビルド時に server 側で生成） */
export function buildSearchIndex(): SearchItem[] {
  const stories = getAllStories().map<SearchItem>((s) => ({
    id: s.id,
    kind: "grimoire",
    url: `/grimoire/${s.id}`,
    title: s.title,
    leadline: s.leadline,
    summary: s.summary,
    category: s.category,
    categoryLabel: grimoireCategoryLabels[s.category] ?? s.category,
    tags: s.tags,
    author: s.author,
    date: s.date,
  }));

  const articles = getAllArticles().flatMap((daily) =>
    daily.articles.map<SearchItem>((a) => ({
      id: a.id,
      kind: "news",
      url: a.sourceUrl,
      title: a.title,
      leadline: a.leadline,
      summary: a.summary,
      category: a.category,
      author: a.commentBy,
      date: daily.date,
    })),
  );

  return [...stories, ...articles];
}
