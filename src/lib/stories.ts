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
