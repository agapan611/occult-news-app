import fs from "fs";
import path from "path";
import type { Commenter } from "./articles";

export type StoryAuthor = Commenter | "both";

export type Story = {
  id: string;
  date: string;
  author: StoryAuthor;
  title: string;
  category: string;
  tags: string[];
  summary: string;
  content: string; // Markdown形式の本文
  readingTimeMinutes: number;
  createdAt: string;
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

/** 同カテゴリの関連記事（自分自身を除く、最大N件、新しい順） */
export function getRelatedStories(story: Story, limit = 4): Story[] {
  return getAllStories()
    .filter((s) => s.id !== story.id && s.category === story.category)
    .slice(0, limit);
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
