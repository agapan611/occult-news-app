"use client";

import { useState } from "react";
import type { ArticleType, DailyArticles } from "@/lib/articles";
import TabBar from "./TabBar";
import ArticleCard from "./ArticleCard";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00+09:00");
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekday = weekdays[d.getDay()];
  return `${month}月${day}日（${weekday}）`;
}

export default function ArticleFeed({ days }: { days: DailyArticles[] }) {
  const [tab, setTab] = useState<ArticleType | "all">("all");

  // 最新日＝フィルタ前の全件ベースで判定（タブ切替で NEW バッジが消えないように）
  const latestDate = days[0]?.date;

  const filtered = days
    .map((day) => ({
      ...day,
      articles:
        tab === "all"
          ? day.articles
          : day.articles.filter((a) => a.type === tab),
    }))
    .filter((day) => day.articles.length > 0);

  return (
    <>
      <TabBar active={tab} onChange={setTab} />
      <main className="mx-auto w-full max-w-lg flex-1">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-muted">
            <p className="text-4xl mb-4">&#128065;</p>
            <p className="text-sm">まだ記事がありません</p>
          </div>
        ) : (
          filtered.map((day) => (
            <section key={day.date}>
              <div className="border-b border-card-border bg-card/30 px-4 py-2">
                <time className="text-xs font-bold text-accent tracking-wider">
                  {formatDate(day.date)}
                </time>
              </div>
              {day.articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  isNew={day.date === latestDate}
                  isHot={
                    day.date === latestDate &&
                    ["ghost", "paranormal", "cryptid"].includes(article.category)
                  }
                />
              ))}
            </section>
          ))
        )}
      </main>
    </>
  );
}
