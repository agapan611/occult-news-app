import fs from "fs";
import path from "path";

export type ArticleType = "occult_comment" | "occult_news";

export type Article = {
  id: string;
  type: ArticleType;
  title: string;
  source: string;
  sourceUrl: string;
  category: string;
  summary: string;
  occultComment: string;
  commentStyle: string;
  createdAt: string;
};

export type DailyArticles = {
  date: string;
  articles: Article[];
};

const DATA_DIR = path.join(process.cwd(), "data", "articles");

/** 指定日の記事を取得 */
export function getArticlesByDate(date: string): DailyArticles | null {
  const filePath = path.join(DATA_DIR, `${date}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

/** 全日付の記事を新しい順で取得 */
export function getAllArticles(): DailyArticles[] {
  if (!fs.existsSync(DATA_DIR)) return [];

  const files = fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .reverse();

  return files
    .map((f) => {
      const raw = fs.readFileSync(path.join(DATA_DIR, f), "utf-8");
      return JSON.parse(raw) as DailyArticles;
    });
}
