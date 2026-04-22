"use client";

import Link from "next/link";
import { useState } from "react";
import type { Story, StoryAuthor } from "@/lib/stories";
import StoryCard from "./StoryCard";
import { trackEvent } from "@/lib/analytics";

type FilterKey = "all" | StoryAuthor;

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "shuna", label: "シュナ" },
  { key: "raika", label: "ライカ" },
  { key: "both", label: "特別対談" },
];

export default function StoryFilter({ stories }: { stories: Story[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");

  const filtered = filter === "all" ? stories : stories.filter((s) => s.author === filter);

  return (
    <>
      {/* タイトルヒーロー */}
      <div className="border-b border-card-border bg-gradient-to-b from-accent/5 to-transparent px-4 py-8 text-center">
        <p className="text-[10px] tracking-[0.4em] text-accent mb-1">OCCULT WIRE</p>
        <h1 className="text-3xl font-bold tracking-[0.3em] mb-2">GRIMOIRE</h1>
        <div className="mx-auto h-px w-12 bg-gradient-to-r from-transparent via-accent/60 to-transparent mb-3" />
        <p className="text-xs text-foreground/70 leading-relaxed">
          シュナとライカが綴る、オカルト・都市伝説の書庫。
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Link
            href="/grimoire/daily"
            prefetch={false}
            data-ga-event="click_grimoire_special"
            data-ga-label="daily"
            className="inline-block rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-[11px] text-accent tracking-wider hover:bg-accent/20 hover:border-accent/60 transition-colors"
          >
            今日の1冊 &rarr;
          </Link>
          <Link
            href="/grimoire/random"
            prefetch={false}
            data-ga-event="click_grimoire_special"
            data-ga-label="random"
            className="inline-block rounded-full border border-cyan/40 bg-cyan/10 px-4 py-1.5 text-[11px] text-cyan tracking-wider hover:bg-cyan/20 hover:border-cyan/60 transition-colors"
          >
            ランダム &rarr;
          </Link>
        </div>
      </div>

      {/* フィルタタブ */}
      <div className="sticky top-[6.25rem] z-40 border-b border-card-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg">
          {filters.map((f) => (
            <button
              key={f.key}
              className={`flex-1 py-2.5 text-xs font-bold transition-colors ${
                filter === f.key ? "text-accent border-b-2 border-accent" : "text-muted"
              }`}
              onClick={() => {
                setFilter(f.key);
                trackEvent("grimoire_filter_change", { event_label: f.key });
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <main className="mx-auto w-full max-w-lg flex-1">
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-sm text-muted">該当する記事がありません</div>
        ) : (
          filtered.map((s) => <StoryCard key={s.id} story={s} />)
        )}
      </main>
    </>
  );
}
