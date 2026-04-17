"use client";

import { useState } from "react";
import Image from "next/image";
import type { Article, Commenter } from "@/lib/articles";

const categoryLabels: Record<string, string> = {
  science: "科学", society: "社会", politics: "政治", economy: "経済",
  tech: "テクノロジー", world: "国際", sports: "スポーツ", entertainment: "芸能",
  ufo: "UFO", uma: "UMA", ghost: "心霊", urban_legend: "都市伝説",
  paranormal: "超常現象", mystery: "ミステリー", cryptid: "未確認生物",
};

const styleLabels: Record<string, string> = {
  numerology: "数秘術", ancient_civilization: "古代文明", conspiracy: "陰謀論",
  prophecy: "予言", synchronicity: "シンクロニシティ", occult_history: "オカルト史",
};

const commenterInfo: Record<Commenter, { name: string; icon: string }> = {
  shuna: { name: "シュナ", icon: "/shuna.png" },
  raika: { name: "ライカ", icon: "/raika.png" },
};

export default function ArticleCard({ article }: { article: Article }) {
  const [expanded, setExpanded] = useState(false);
  const isOccultNews = article.type === "occult_news";
  const commenter = commenterInfo[article.commentBy] ?? commenterInfo.shuna;

  const commentPreview = article.occultComment.slice(0, 60) + "...";
  // ホスト名だけ抽出（元記事リンクのラベル用）
  const sourceHost = (() => {
    try {
      return new URL(article.sourceUrl).hostname.replace(/^www\./, "");
    } catch {
      return article.source;
    }
  })();

  return (
    <article className="border-b border-card-border px-4 py-5">
      {/* カテゴリ＋タイプ */}
      <div className="mb-1.5 flex items-center gap-2 text-xs">
        <span
          className={`rounded px-1.5 py-0.5 ${
            isOccultNews ? "bg-cyan/20 text-cyan" : "bg-accent/20 text-accent"
          }`}
        >
          {categoryLabels[article.category] ?? article.category}
        </span>
        {!isOccultNews && (
          <span className="text-cyan">
            {styleLabels[article.commentStyle] ?? article.commentStyle}
          </span>
        )}
        {isOccultNews && <span className="text-accent/60">オカルトNEWS</span>}
      </div>

      {/* キャラのリード（サブタイトル風） */}
      {article.leadline && (
        <p className={`text-[11px] mb-0.5 italic ${isOccultNews ? "text-cyan/80" : "text-accent/80"}`}>
          {commenter.name}「{article.leadline}」
        </p>
      )}

      {/* ニュース見出し */}
      <h2 className="text-[15px] font-bold leading-snug mb-2">{article.title}</h2>

      {/* ソース + 元記事リンク（冒頭表示） */}
      <div className="mb-2 flex items-center gap-2 text-[11px]">
        <span className="text-muted">{article.source}</span>
        <a
          href={article.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan underline underline-offset-2 hover:text-cyan/70"
        >
          元記事（{sourceHost}）&rarr;
        </a>
      </div>

      {/* 記事概要（短縮版） */}
      <p className="text-[13px] leading-relaxed text-foreground/60 mb-3 line-clamp-2">
        {article.summary}
      </p>

      {/* コメント（吹き出し風） */}
      <div
        className={`rounded-lg border p-3 cursor-pointer ${
          isOccultNews ? "bg-cyan/[0.03] border-cyan/10" : "bg-card border-card-border"
        }`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-2.5">
          <Image
            src={commenter.icon}
            alt={commenter.name}
            width={28}
            height={28}
            className="rounded-full border border-accent/30 shrink-0 mt-0.5"
          />
          <div className="min-w-0 flex-1">
            <p
              className={`text-[10px] font-bold mb-1 ${
                isOccultNews ? "text-cyan/80" : "text-accent/80"
              }`}
            >
              {commenter.name}の{isOccultNews ? "ひとこと" : "考察"}
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
    </article>
  );
}
