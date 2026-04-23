"use client";

import { useState } from "react";
import Image from "next/image";
import type { Article, Commenter } from "@/lib/articles";
import NewsThumbnail from "./NewsThumbnail";

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

type CategoryGroup = "occult_core" | "mystery" | "normal";

function getCategoryGroup(category: string): CategoryGroup {
  if (["ghost", "paranormal", "cryptid"].includes(category)) return "occult_core";
  if (["ufo", "uma", "mystery", "urban_legend"].includes(category)) return "mystery";
  return "normal";
}

const groupStyles: Record<CategoryGroup, {
  badge: string;
  caption: string;
  commentBox: string;
  commentLabel: string;
  readMore: string;
  sourceLink: string;
}> = {
  occult_core: {
    badge: "bg-accent/25 text-accent",
    caption: "text-accent/80",
    commentBox: "bg-accent/[0.05] border-accent/20 shadow-[0_0_24px_-8px_rgba(139,92,246,0.45)]",
    commentLabel: "text-accent/80",
    readMore: "text-accent hover:text-accent-dim",
    sourceLink: "text-accent hover:text-accent/70",
  },
  mystery: {
    badge: "bg-cyan/20 text-cyan",
    caption: "text-cyan/80",
    commentBox: "bg-cyan/[0.03] border-cyan/10 shadow-[0_0_24px_-8px_rgba(6,182,212,0.35)]",
    commentLabel: "text-cyan/80",
    readMore: "text-cyan hover:text-cyan/70",
    sourceLink: "text-cyan hover:text-cyan/70",
  },
  normal: {
    badge: "bg-muted/15 text-muted",
    caption: "text-foreground/60",
    commentBox: "bg-card border-card-border shadow-[0_0_18px_-10px_rgba(139,92,246,0.25)]",
    commentLabel: "text-foreground/70",
    readMore: "text-accent hover:text-accent-dim",
    sourceLink: "text-cyan hover:text-cyan/70",
  },
};

const commenterInfo: Record<
  Commenter,
  { name: string; icon: string; stripeClass: string }
> = {
  shuna: { name: "シュナ", icon: "/shuna.webp", stripeClass: "bg-accent" },
  raika: { name: "ライカ", icon: "/raika.webp", stripeClass: "bg-cyan" },
};

export default function ArticleCard({
  article,
  isNew = false,
  isHot = false,
}: {
  article: Article;
  isNew?: boolean;
  isHot?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const isOccultNews = article.type === "occult_news";
  const group = getCategoryGroup(article.category);
  const styles = groupStyles[group];
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
    <article className="relative border-b border-card-border px-4 py-5 pl-5">
      {/* 著者別アクセントストライプ（左端） */}
      <span
        aria-hidden
        className={`absolute left-0 top-0 h-full w-0.5 ${commenter.stripeClass}`}
      />
      {/* カテゴリ＋タイプ */}
      <div className="mb-1.5 flex items-center gap-2 text-xs">
        {isNew && (
          <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold leading-none tracking-wider text-background shadow-[0_0_8px_rgba(139,92,246,0.45)]">
            NEW
          </span>
        )}
        {isHot && (
          <span className="text-sm leading-none" aria-hidden title="注目案件">🔥</span>
        )}
        <span className={`rounded px-1.5 py-0.5 ${styles.badge}`}>
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
        <p className={`text-[11px] mb-0.5 italic ${styles.caption}`}>
          {commenter.name}「{article.leadline}」
        </p>
      )}

      {/* 見出し + サムネイル */}
      <div className="mb-2 flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-[15px] font-bold leading-snug mb-2">{article.title}</h2>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-muted">{article.source}</span>
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-ga-event="click_news_source"
              data-ga-label={sourceHost}
              data-ga-category={article.category}
              className={`underline underline-offset-2 ${styles.sourceLink}`}
            >
              元記事（{sourceHost}）&rarr;
            </a>
          </div>
        </div>
        <NewsThumbnail
          category={article.category}
          type={article.type}
          className="h-16 w-16 shrink-0 rounded border border-card-border"
        />
      </div>

      {/* 記事概要（短縮版） */}
      <p className="text-[13px] leading-relaxed text-foreground/70 mb-3 line-clamp-2">
        {article.summary}
      </p>

      {/* コメント（吹き出し風） */}
      <div
        className={`rounded-lg border p-3 cursor-pointer transition-shadow ${styles.commentBox}`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-2.5">
          <Image
            src={commenter.icon}
            alt=""
            aria-hidden="true"
            width={28}
            height={28}
            className="rounded-full border border-accent/30 shrink-0 mt-0.5"
          />
          <div className="min-w-0 flex-1">
            <p className={`text-[10px] font-bold mb-1 ${styles.commentLabel}`}>
              {commenter.name}の{isOccultNews ? "ひとこと" : "考察"}
            </p>
            <p className="text-sm leading-relaxed text-foreground/90">
              {expanded ? article.occultComment : commentPreview}
            </p>
            <button
              className={`mt-2 text-xs transition-colors ${styles.readMore}`}
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
