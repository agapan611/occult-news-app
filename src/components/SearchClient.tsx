"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Fuse, { type FuseResultMatch } from "fuse.js";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import type { SearchItem } from "@/lib/search-index";

type Props = {
  items: SearchItem[];
  initialQuery?: string;
};

type Matches = ReadonlyArray<FuseResultMatch>;

const SUGGESTION_LIMIT = 5;

export default function SearchClient({ items, initialQuery = "" }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
        includeMatches: true,
      }),
    [items],
  );

  const trimmed = query.trim();
  const hasQuery = trimmed.length >= 1;
  const allResults = hasQuery ? fuse.search(query) : [];
  const results = allResults.slice(0, 40);
  const suggestions = allResults.slice(0, SUGGESTION_LIMIT);

  // activeIndex は suggestions 長を超えないようその場で丸める（エフェクトで state を変えない）
  const effectiveActiveIndex =
    suggestions.length === 0
      ? -1
      : Math.min(Math.max(activeIndex, 0), suggestions.length - 1);

  // 外側クリックで候補を閉じる
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function navigateToItem(item: SearchItem) {
    if (item.kind === "news") {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.url);
    }
    setShowSuggestions(false);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const base = effectiveActiveIndex < 0 ? -1 : effectiveActiveIndex;
      setActiveIndex((base + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const base =
        effectiveActiveIndex < 0 ? suggestions.length : effectiveActiveIndex;
      setActiveIndex((base - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      if (
        effectiveActiveIndex >= 0 &&
        effectiveActiveIndex < suggestions.length
      ) {
        e.preventDefault();
        navigateToItem(suggestions[effectiveActiveIndex].item);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  }

  const listboxId = "search-suggestions-listbox";
  const showDropdown =
    showSuggestions && hasQuery && suggestions.length > 0;

  function handleQueryChange(value: string) {
    setQuery(value);
    setShowSuggestions(true);
    // 新しい検索なら先頭候補にフォーカスリセット
    setActiveIndex(0);
  }

  return (
    <div>
      <div ref={wrapperRef} className="relative mb-4">
        <label className="block">
          <span className="mb-2 block text-xs tracking-[0.25em] text-foreground/70">
            キーワード
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder="例: ギョベクリ、スターゲイト、マンデラ効果"
            autoFocus
            role="combobox"
            aria-expanded={showDropdown}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-activedescendant={
              showDropdown && effectiveActiveIndex >= 0
                ? `search-suggestion-${effectiveActiveIndex}`
                : undefined
            }
            className="w-full rounded-lg border border-card-border bg-card/60 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50"
          />
        </label>

        {showDropdown && (
          <ul
            id={listboxId}
            role="listbox"
            aria-label="検索候補"
            className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-lg border border-card-border bg-background/95 shadow-lg backdrop-blur-md"
          >
            {suggestions.map(({ item }, i) => {
              const isActive = i === effectiveActiveIndex;
              const kindLabel =
                item.kind === "grimoire" ? "GRIMOIRE" : "NEWS";
              const kindClass =
                item.kind === "grimoire"
                  ? "bg-accent/20 text-accent"
                  : "bg-cyan/20 text-cyan";
              return (
                <li
                  key={`sug-${item.kind}-${item.id}`}
                  id={`search-suggestion-${i}`}
                  role="option"
                  aria-selected={isActive}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseDown={(e) => {
                      // blur 前に click を発火させる
                      e.preventDefault();
                      navigateToItem(item);
                    }}
                    className={`flex w-full items-start gap-2 px-3 py-2 text-left transition-colors ${
                      isActive
                        ? "bg-accent/10"
                        : "hover:bg-card/60"
                    }`}
                  >
                    <span
                      className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] tracking-wider ${kindClass}`}
                    >
                      {kindLabel}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-semibold text-foreground">
                        {item.title}
                      </span>
                      {item.leadline && (
                        <span className="block truncate text-[10px] italic text-foreground/60">
                          {item.leadline}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {hasQuery && (
        <p className="mb-4 text-xs text-muted">
          {results.length > 0
            ? `${results.length}件見つかりました`
            : "該当する記事が見つかりませんでした"}
        </p>
      )}

      <ul className="space-y-3">
        {results.map(({ item, matches }) => (
          <li key={`${item.kind}-${item.id}`}>
            <ResultCard item={item} matches={matches ?? []} />
          </li>
        ))}
      </ul>

      {!hasQuery && (
        <div className="rounded-lg border border-card-border bg-card/40 p-4 text-xs leading-relaxed text-foreground/70">
          GRIMOIRE（長編考察）と NEWS 欄の記事タイトル・本文・タグから検索します。
          2文字以上入力してください。入力中は上位5件の候補が直下に表示されます
          （↑↓キーで選択、Enterで開く）。
        </div>
      )}
    </div>
  );
}

function highlight(
  text: string,
  matches: Matches,
  key: string,
): React.ReactNode[] {
  const match = matches.find((m) => m.key === key);
  if (!match || !text) return [text];

  const parts: React.ReactNode[] = [];
  let cursor = 0;
  for (const [start, end] of match.indices) {
    if (start > cursor) parts.push(text.slice(cursor, start));
    parts.push(
      <mark
        key={`${key}-${start}-${end}`}
        className="rounded bg-accent/30 px-0.5 text-foreground"
      >
        {text.slice(start, end + 1)}
      </mark>,
    );
    cursor = end + 1;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

function ResultCard({ item, matches }: { item: SearchItem; matches: Matches }) {
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
          <span className="text-muted">
            {highlight(item.categoryLabel, matches, "categoryLabel")}
          </span>
        )}
        <span className="ml-auto text-muted">{item.date}</span>
      </div>
      <h3 className="mb-1 text-sm font-bold leading-snug text-foreground group-hover:text-accent">
        {highlight(item.title, matches, "title")}
      </h3>
      {item.leadline && (
        <p className="mb-1 text-xs italic text-foreground/70">
          「{highlight(item.leadline, matches, "leadline")}」
        </p>
      )}
      <p className="line-clamp-2 text-xs text-foreground/80">
        {highlight(item.summary, matches, "summary")}
      </p>
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
