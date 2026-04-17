"use client";

import type { ArticleType } from "@/lib/articles";

type Tab = { key: ArticleType | "all"; label: string };

const tabs: Tab[] = [
  { key: "all", label: "すべて" },
  { key: "occult_comment", label: "AI考察" },
  { key: "occult_news", label: "オカルトNEWS" },
];

export default function TabBar({
  active,
  onChange,
}: {
  active: ArticleType | "all";
  onChange: (tab: ArticleType | "all") => void;
}) {
  return (
    <div className="sticky top-[6.25rem] z-40 border-b border-card-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`flex-1 py-2.5 text-xs font-bold transition-colors ${
              active === tab.key
                ? "text-accent border-b-2 border-accent"
                : "text-muted"
            }`}
            onClick={() => onChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
