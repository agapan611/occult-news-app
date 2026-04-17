"use client";

import { useState } from "react";
import type { Story, StoryAuthor } from "@/lib/stories";
import StoryCard from "./StoryCard";

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
      <div className="sticky top-14 z-50 border-b border-card-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg">
          {filters.map((f) => (
            <button
              key={f.key}
              className={`flex-1 py-2.5 text-xs font-bold transition-colors ${
                filter === f.key ? "text-accent border-b-2 border-accent" : "text-muted"
              }`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <main className="mx-auto w-full max-w-lg flex-1">
        <div className="px-4 py-4 border-b border-card-border">
          <p className="text-xs text-muted">
            シュナとライカがお届けする、オカルト・都市伝説の読み物。
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center text-sm text-muted">該当する記事がありません</div>
        ) : (
          filtered.map((s) => <StoryCard key={s.id} story={s} />)
        )}
      </main>
    </>
  );
}
