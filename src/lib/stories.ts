import fs from "fs";
import path from "path";
import type { Commenter } from "./articles";

export type StoryAuthor = Commenter | "both";

export type Reference = {
  /** 参考資料のタイトル（書名・記事名・機関名など） */
  title: string;
  /** 一次資料URL（あれば） */
  url?: string;
  /** 補足：どの部分を参考にしたか、出版年、著者など */
  note?: string;
};

export type Story = {
  id: string;
  date: string;
  author: StoryAuthor;
  title: string;
  category: string;
  tags: string[];
  /** タイトル上に表示されるキャラ視点のサブタイトル（10〜35字、問いの形推奨） */
  leadline: string;
  summary: string;
  content: string; // Markdown形式の本文
  readingTimeMinutes: number;
  createdAt: string;
  /** 参考にした一次資料・書籍・論文・外部リソース（任意） */
  references?: Reference[];
};

const STORIES_DIR = path.join(process.cwd(), "data", "stories");

/** 全ての長編記事を新しい順で取得 */
export function getAllStories(): Story[] {
  if (!fs.existsSync(STORIES_DIR)) return [];

  const walk = (dir: string): string[] => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files: string[] = [];
    for (const e of entries) {
      const fullPath = path.join(dir, e.name);
      if (e.isDirectory()) files.push(...walk(fullPath));
      else if (e.name.endsWith(".json")) files.push(fullPath);
    }
    return files;
  };

  const files = walk(STORIES_DIR);
  return files
    .map((f) => JSON.parse(fs.readFileSync(f, "utf-8")) as Story)
    .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt));
}

/** 指定IDの記事を取得 */
export function getStoryById(id: string): Story | null {
  const all = getAllStories();
  return all.find((s) => s.id === id) ?? null;
}

/** 管理人別の記事 */
export function getStoriesByAuthor(author: StoryAuthor): Story[] {
  return getAllStories().filter((s) => s.author === author);
}

/** カテゴリ別の記事 */
export function getStoriesByCategory(category: string): Story[] {
  return getAllStories().filter((s) => s.category === category);
}

/** 全カテゴリ一覧 */
export function getAllCategories(): string[] {
  const cats = new Set<string>();
  for (const s of getAllStories()) cats.add(s.category);
  return Array.from(cats).sort();
}

/**
 * 関連記事をスコア順で返す（自分自身を除く、最大N件）
 * スコア: カテゴリ一致 +100 / 著者一致 +30 / タグ一致 +20 × 件数 / 新しさ補正 最大+30
 */
export function getRelatedStories(story: Story, limit = 8): Story[] {
  const now = Date.now();
  const DAY_MS = 1000 * 60 * 60 * 24;
  const baseTags = new Set(story.tags);

  return getAllStories()
    .filter((s) => s.id !== story.id)
    .map((s) => {
      let score = 0;
      if (s.category === story.category) score += 100;
      if (s.author === story.author) score += 30;
      const matchedTags = s.tags.filter((t) => baseTags.has(t)).length;
      score += matchedTags * 20;
      const ageDays = (now - new Date(s.date).getTime()) / DAY_MS;
      score += Math.max(0, 30 - ageDays / 30);
      return { story: s, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.story);
}

/** 全タグ一覧（件数の多い順） */
export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const s of getAllStories()) {
    for (const t of s.tags) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "ja"));
}

/** タグ別の記事（新しい順） */
export function getStoriesByTag(tag: string): Story[] {
  return getAllStories().filter((s) => s.tags.includes(tag));
}
