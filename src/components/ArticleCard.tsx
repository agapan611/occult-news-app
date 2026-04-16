"use client";

import { useState } from "react";

type Article = {
  id: string;
  title: string;
  source: string;
  sourceUrl: string;
  category: string;
  occultComment: string;
  commentStyle: string;
  createdAt: string;
};

const categoryLabels: Record<string, string> = {
  science: "科学",
  society: "社会",
  politics: "政治",
  economy: "経済",
  tech: "テクノロジー",
  world: "国際",
  sports: "スポーツ",
  entertainment: "芸能",
};

const styleLabels: Record<string, string> = {
  numerology: "数秘術",
  ancient_civilization: "古代文明",
  conspiracy: "陰謀論",
  prophecy: "予言",
  synchronicity: "シンクロニシティ",
  occult_history: "オカルト史",
};

export default function ArticleCard({ article }: { article: Article }) {
  const [expanded, setExpanded] = useState(false);

  const preview = article.occultComment.slice(0, 80) + "...";

  return (
    <article
      className="border-b border-card-border px-4 py-5 active:bg-white/[0.02] transition-colors"
      onClick={() => setExpanded(!expanded)}
    >
      {/* カテゴリ＋考察スタイル */}
      <div className="mb-2 flex items-center gap-2 text-xs">
        <span className="rounded bg-accent/20 px-1.5 py-0.5 text-accent">
          {categoryLabels[article.category] ?? article.category}
        </span>
        <span className="text-cyan">
          {styleLabels[article.commentStyle] ?? article.commentStyle}
        </span>
      </div>

      {/* ニュース見出し */}
      <h2 className="text-[15px] font-bold leading-snug mb-1">
        {article.title}
      </h2>
      <p className="text-xs text-muted mb-3">
        {article.source}
      </p>

      {/* オカルトコメント */}
      <div className="rounded-lg bg-card border border-card-border p-3">
        <p className="text-xs text-accent/80 font-bold mb-1">AI考察</p>
        <p className="text-sm leading-relaxed text-foreground/90">
          {expanded ? article.occultComment : preview}
        </p>
        <button
          className="mt-2 text-xs text-accent hover:text-accent-dim transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
        >
          {expanded ? "閉じる" : "続きを読む"}
        </button>
      </div>

      {/* 元記事リンク */}
      {expanded && (
        <a
          href={article.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-xs text-cyan underline underline-offset-2"
          onClick={(e) => e.stopPropagation()}
        >
          元記事を読む
        </a>
      )}
    </article>
  );
}
