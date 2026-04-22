import Image from "next/image";
import Link from "next/link";
import type { Story, StoryAuthor } from "@/lib/stories";
import { grimoireCategoryLabels } from "@/lib/categories";

const authorInfo: Record<
  StoryAuthor,
  {
    name: string;
    icon: string;
    colorClass: string;
    stripeStyle: string;
    leadlineClass: string;
  }
> = {
  shuna: {
    name: "シュナ",
    icon: "/shuna.png",
    colorClass: "text-accent",
    stripeStyle: "bg-accent",
    leadlineClass: "text-accent/80",
  },
  raika: {
    name: "ライカ",
    icon: "/raika.png",
    colorClass: "text-cyan",
    stripeStyle: "bg-cyan",
    leadlineClass: "text-cyan/80",
  },
  both: {
    name: "シュナ & ライカ",
    icon: "/shuna.png",
    colorClass: "text-foreground",
    stripeStyle: "bg-gradient-to-b from-accent to-cyan",
    leadlineClass: "text-foreground/70",
  },
};

export default function StoryCard({ story }: { story: Story }) {
  const author = authorInfo[story.author];
  return (
    <Link
      href={`/grimoire/${story.id}`}
      className="relative block border-b border-card-border px-4 py-5 pl-5 active:bg-white/[0.02] transition-colors"
    >
      {/* 著者別アクセントストライプ（左端） */}
      <span
        aria-hidden
        className={`absolute left-0 top-0 h-full w-0.5 ${author.stripeStyle}`}
      />
      {/* カテゴリ + 読了時間 */}
      <div className="mb-2 flex items-center gap-2 text-xs">
        <span className="rounded bg-accent/20 px-1.5 py-0.5 text-accent">
          {grimoireCategoryLabels[story.category] ?? story.category}
        </span>
        <span className="text-muted">{story.readingTimeMinutes}分で読める</span>
      </div>

      {/* キャラのリード（タイトル上、leadline） */}
      {story.leadline && (
        <p className={`mb-1 text-[11px] italic ${author.leadlineClass}`}>
          {author.name}「{story.leadline}」
        </p>
      )}

      {/* タイトル */}
      <h2 className="text-base font-bold leading-snug mb-2">{story.title}</h2>

      {/* 概要 */}
      <p className="text-xs leading-relaxed text-foreground/70 mb-3 line-clamp-2">
        {story.summary}
      </p>

      {/* 著者 + 日付 */}
      <div className="flex items-center gap-2">
        {story.author === "both" ? (
          <div className="flex -space-x-2" aria-hidden="true">
            <Image
              src="/shuna.png"
              alt=""
              width={22}
              height={22}
              className="rounded-full border border-card-border z-10"
            />
            <Image
              src="/raika.png"
              alt=""
              width={22}
              height={22}
              className="rounded-full border border-card-border"
            />
          </div>
        ) : (
          <Image
            src={author.icon}
            alt=""
            aria-hidden="true"
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
