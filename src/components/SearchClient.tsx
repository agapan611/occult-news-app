"use client";

import Link from "next/link";
import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import type { SearchItem } from "@/lib/search-index";

type Props = {
  items: SearchItem[];
  initialQuery?: string;
};

export default function SearchClient({ items, initialQuery = "" }: Props) {
  const [query, setQuery] = useState(initialQuery);

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: [
          { name: "title", weight: 3 },
          { name: "leadline", weight: 2 },
          { name: "summary", weight: 1.5 },
          { name: "tags", weight: 1.5 },
          { name: "categoryLabel", weight: 1 },
          { name: "category", weight: 0.8 },
        ],
        threshold: 0.4,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [items],
  );

  const results = query.trim().length >= 1 ? fuse.search(query).slice(0, 40) : [];
  const hasQuery = query.trim().length >= 1;

  return (
    <div>
      <label className="mb-4 block">
        <span className="mb-2 block text-xs tracking-[0.25em] text-foreground/70">
          キーワード
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="例: ギョベクリ、スターゲイト、マンデラ効果"
          autoFocus
          className="w-full rounded-lg border border-card-border bg-card/60 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50"
        />
      </label>

      {hasQuery && (
        <p className="mb-4 text-xs text-muted">
          {results.length > 0
            ? `${results.length}件見つかりました`
            : "該当する記事が見つかりませんでした"}
        </p>
      )}

      <ul className="space-y-3">
        {results.map(({ item }) => (
          <li key={`${item.kind}-${item.id}`}>
            <ResultCard item={item} />
          </li>
        ))}
      </ul>

      {!hasQuery && (
        <div className="rounded-lg border border-card-border bg-card/40 p-4 text-xs leading-relaxed text-foreground/70">
          GRIMOIRE（長編考察）と NEWS 欄の記事タイトル・本文・タグから検索します。
          2文字以上入力してください。
        </div>
      )}
    </div>
  );
}

function ResultCard({ item }: { item: SearchItem }) {
  const isExternal = item.kind === "news";
  const kindLabel = item.kind === "grimoire" ? "GRIMOIRE" : "NEWS";
  const kindClass =
    item.kind === "grimoire"
      ? "bg-accent/20 text-accent"
      : "bg-cyan/20 text-cyan";

  const content = (
    <>
      <div className="mb-1 flex items-center gap-2 text-[10px] tracking-wider">
        <span className={`rounded px-1.5 py-0.5 ${kindClass}`}>
          {kindLabel}
        </span>
        {item.categoryLabel && (
          <span className="text-muted">{item.categoryLabel}</span>
        )}
        <span className="ml-auto text-muted">{item.date}</span>
      </div>
      <h3 className="mb-1 text-sm font-bold leading-snug text-foreground group-hover:text-accent">
        {item.title}
      </h3>
      {item.leadline && (
        <p className="mb-1 text-xs italic text-foreground/70">
          「{item.leadline}」
        </p>
      )}
      <p className="line-clamp-2 text-xs text-foreground/80">{item.summary}</p>
    </>
  );

  return isExternal ? (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-card-border bg-card/60 p-3 hover:border-cyan/60 transition-colors"
    >
      {content}
    </a>
  ) : (
    <Link
      href={item.url}
      className="group block rounded-lg border border-card-border bg-card/60 p-3 hover:border-accent/60 transition-colors"
    >
      {content}
    </Link>
  );
}
