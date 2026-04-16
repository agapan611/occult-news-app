"use client";

import { useState } from "react";
import Image from "next/image";
import type { Article } from "@/lib/articles";

const categoryLabels: Record<string, string> = {
  science: "科学",
  society: "社会",
  politics: "政治",
  economy: "経済",
  tech: "テクノロジー",
  world: "国際",
  sports: "スポーツ",
  entertainment: "芸能",
  ufo: "UFO",
  uma: "UMA",
  ghost: "心霊",
  urban_legend: "都市伝説",
  paranormal: "超常現象",
  mystery: "ミステリー",
  cryptid: "未確認生物",
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
  const isOccultNews = article.type === "occult_news";

  const commentPreview = article.occultComment.slice(0, 60) + "...";

  return (
    <article
      className="border-b border-card-border px-4 py-5 active:bg-white/[0.02] transition-colors"
      onClick={() => setExpanded(!expanded)}
    >
      {/* カテゴリ＋タイプ */}
      <div className="mb-2 flex items-center gap-2 text-xs">
        <span
          className={`rounded px-1.5 py-0.5 ${
            isOccultNews
              ? "bg-cyan/20 text-cyan"
              : "bg-accent/20 text-accent"
          }`}
        >
          {categoryLabels[article.category] ?? article.category}
        </span>
        {!isOccultNews && (
          <span className="text-cyan">
            {styleLabels[article.commentStyle] ?? article.commentStyle}
          </span>
        )}
        {isOccultNews && (
          <span className="text-accent/60">オカルトNEWS</span>
        )}
      </div>

      {/* ニュース見出し */}
      <h2 className="text-[15px] font-bold leading-snug mb-1">
        {article.title}
      </h2>
      <p className="text-xs text-muted mb-2">{article.source}</p>

      {/* 記事概要 */}
      <p className="text-sm leading-relaxed text-foreground/70 mb-3">
        {article.summary}
      </p>

      {/* シュナのコメント（吹き出し風） */}
      <div
        className={`rounded-lg border p-3 ${
          isOccultNews
            ? "bg-cyan/[0.03] border-cyan/10"
            : "bg-card border-card-border"
        }`}
      >
        <div className="flex items-start gap-2.5">
          <Image
            src="/shuna.png"
            alt="シュナ"
            width={28}
            height={28}
            className="rounded-full border border-accent/30 shrink-0 mt-0.5"
          />
          <div className="min-w-0 flex-1">
            <p className={`text-[10px] font-bold mb-1 ${isOccultNews ? "text-cyan/80" : "text-accent/80"}`}>
              シュナの{isOccultNews ? "ひとこと" : "考察"}
            </p>
            <p className="text-sm leading-relaxed text-foreground/90">
              {expanded ? article.occultComment : commentPreview}
            </p>
            <button
              className={`mt-2 text-xs transition-colors ${
                isOccultNews
                  ? "text-cyan hover:text-cyan/70"
                  : "text-accent hover:text-accent-dim"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
            >
              {expanded ? "閉じる" : "続きを読む"}
            </button>
          </div>
        </div>
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
