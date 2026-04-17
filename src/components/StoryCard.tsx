import Image from "next/image";
import Link from "next/link";
import type { Story, StoryAuthor } from "@/lib/stories";

const authorInfo: Record<StoryAuthor, { name: string; icon: string; colorClass: string }> = {
  shuna: { name: "シュナ", icon: "/shuna.png", colorClass: "text-accent" },
  raika: { name: "ライカ", icon: "/raika.png", colorClass: "text-cyan" },
  both: { name: "シュナ & ライカ", icon: "/shuna.png", colorClass: "text-foreground" },
};

const categoryLabels: Record<string, string> = {
  numerology: "数秘術",
  ancient_civilization: "古代文明",
  mysticism: "神秘主義",
  ghost_stories: "心霊",
  prophecy: "予言",
  ufo: "UFO/UAP",
  conspiracy: "陰謀論",
  uma: "UMA",
  urban_legend: "都市伝説",
  science_occult: "科学×オカルト",
  horror: "怪談",
  mystery: "ミステリー",
};

export default function StoryCard({ story }: { story: Story }) {
  const author = authorInfo[story.author];
  return (
    <Link
      href={`/grimoire/${story.id}`}
      className="block border-b border-card-border px-4 py-5 active:bg-white/[0.02] transition-colors"
    >
      {/* カテゴリ + 読了時間 */}
      <div className="mb-2 flex items-center gap-2 text-xs">
        <span className="rounded bg-accent/20 px-1.5 py-0.5 text-accent">
          {categoryLabels[story.category] ?? story.category}
        </span>
        <span className="text-muted">{story.readingTimeMinutes}分で読める</span>
      </div>

      {/* タイトル */}
      <h2 className="text-base font-bold leading-snug mb-2">{story.title}</h2>

      {/* 概要 */}
      <p className="text-xs leading-relaxed text-foreground/70 mb-3 line-clamp-2">
        {story.summary}
      </p>

      {/* 著者 + 日付 */}
      <div className="flex items-center gap-2">
        {story.author === "both" ? (
          <div className="flex -space-x-2">
            <Image
              src="/shuna.png"
              alt="シュナ"
              width={22}
              height={22}
              className="rounded-full border border-card-border z-10"
            />
            <Image
              src="/raika.png"
              alt="ライカ"
              width={22}
              height={22}
              className="rounded-full border border-card-border"
            />
          </div>
        ) : (
          <Image
            src={author.icon}
            alt={author.name}
            width={22}
            height={22}
            className="rounded-full border border-card-border"
          />
        )}
        <span className={`text-[11px] font-bold ${author.colorClass}`}>{author.name}</span>
        <span className="text-[11px] text-muted">&middot; {formatDate(story.date)}</span>
      </div>
    </Link>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00+09:00");
  return `${d.getMonth() + 1}/${d.getDate()}`;
}
