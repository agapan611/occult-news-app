import Image from "next/image";
import Link from "next/link";
import type { Story, StoryAuthor } from "@/lib/stories";

const authorInfo: Record<
  StoryAuthor,
  { name: string; icon: string; leadlineClass: string }
> = {
  shuna: { name: "シュナ", icon: "/shuna.webp", leadlineClass: "text-accent/85" },
  raika: { name: "ライカ", icon: "/raika.webp", leadlineClass: "text-cyan/85" },
  both: { name: "シュナ & ライカ", icon: "/shuna.webp", leadlineClass: "text-foreground/70" },
};

export default function LatestGrimoire({ stories }: { stories: Story[] }) {
  if (stories.length === 0) return null;

  const latest = stories.slice(0, 5);

  return (
    <section className="relative border-b border-card-border bg-gradient-to-b from-accent/[0.08] via-transparent to-transparent py-5">
      {/* 見出し */}
      <div className="mx-auto flex max-w-lg items-baseline justify-between px-4 mb-3">
        <div>
          <p className="text-[10px] tracking-[0.4em] text-accent/70">LATEST</p>
          <h2 className="text-lg font-bold tracking-[0.25em]">GRIMOIRE</h2>
        </div>
        <Link
          href="/grimoire"
          data-ga-event="click_grimoire_more"
          data-ga-label="latest_header"
          className="text-[11px] text-accent hover:text-accent-dim transition-colors"
        >
          すべて &rsaquo;
        </Link>
      </div>

      {/* 横スクロール */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4 pb-1" style={{ width: "max-content" }}>
          {latest.map((story) => {
            const author = authorInfo[story.author];
            return (
              <Link
                key={story.id}
                href={`/grimoire/${story.id}`}
                data-ga-event="click_grimoire_card"
                data-ga-label={story.id}
                data-ga-category={story.category}
                className="group relative block w-[220px] shrink-0 rounded-xl border border-card-border bg-card p-4 transition-all active:scale-[0.98] hover:border-accent/40"
              >
                {/* アイコン */}
                <div className="mb-3 flex items-center gap-1.5">
                  {story.author === "both" ? (
                    <div className="flex -space-x-2" aria-hidden="true">
                      <Image
                        src="/shuna.webp"
                        alt=""
                        width={24}
                        height={24}
                        className="rounded-full border border-card-border z-10"
                      />
                      <Image
                        src="/raika.webp"
                        alt=""
                        width={24}
                        height={24}
                        className="rounded-full border border-card-border"
                      />
                    </div>
                  ) : (
                    <Image
                      src={author.icon}
                      alt=""
                      aria-hidden="true"
                      width={24}
                      height={24}
                      className="rounded-full border border-card-border"
                    />
                  )}
                  <span className="text-[10px] text-muted">
                    {author.name}・{story.readingTimeMinutes}分
                  </span>
                </div>

                {/* leadline（タイトル上、小さく） */}
                {story.leadline && (
                  <p className={`mb-1 text-[10px] italic leading-snug line-clamp-2 ${author.leadlineClass}`}>
                    「{story.leadline}」
                  </p>
                )}

                {/* タイトル（3行まで） */}
                <h3 className="text-[13px] font-bold leading-snug text-foreground/95 line-clamp-3 min-h-[3.6em]">
                  {story.title}
                </h3>
              </Link>
            );
          })}

          {/* もっと見るカード */}
          <Link
            href="/grimoire"
            data-ga-event="click_grimoire_more"
            data-ga-label="latest_hscroll"
            className="flex w-[120px] shrink-0 items-center justify-center rounded-xl border border-dashed border-accent/30 bg-transparent text-center transition-colors hover:border-accent/60"
          >
            <span className="text-xs text-accent font-bold tracking-wider">
              MORE
              <br />
              &rsaquo;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
