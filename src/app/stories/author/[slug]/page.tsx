import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import StoryCard from "@/components/StoryCard";
import { getStoriesByAuthor } from "@/lib/stories";
import type { StoryAuthor } from "@/lib/stories";

const authorInfo: Record<StoryAuthor, { name: string; icon: string; description: string }> = {
  shuna: {
    name: "シュナ",
    icon: "/shuna.png",
    description: "古代文明・数秘術・神秘主義を得意とするゴシック少女。数字と象徴の背後に隠された意味を読み解く。",
  },
  raika: {
    name: "ライカ",
    icon: "/raika.png",
    description: "UFO・陰謀論・未解決事件を得意とする双子の兄。事実ベースの冷静な考察を好む。",
  },
  both: {
    name: "シュナ & ライカ",
    icon: "/shuna.png",
    description: "二人の視点が交わる特別対談。月に1〜2回、大きなテーマを二人で掘り下げる。",
  },
};

export function generateStaticParams() {
  return [{ slug: "shuna" }, { slug: "raika" }, { slug: "both" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const info = authorInfo[slug as StoryAuthor];
  if (!info) return { title: "記事一覧 | OCCULT WIRE" };
  return {
    title: `${info.name}の読み物 | OCCULT WIRE`,
    description: info.description,
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = slug as StoryAuthor;
  const info = authorInfo[author];
  if (!info) notFound();

  const stories = getStoriesByAuthor(author);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-lg items-center px-4">
          <Link
            href="/stories"
            className="text-xs text-accent hover:text-accent-dim transition-colors"
          >
            &larr; 読み物一覧
          </Link>
          <h1 className="flex-1 text-center text-sm font-bold">{info.name}の読み物</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg flex-1">
        {/* プロフィール */}
        <div className="flex items-start gap-4 border-b border-card-border px-4 py-6">
          {author === "both" ? (
            <div className="flex -space-x-3 shrink-0">
              <Image
                src="/shuna.png"
                alt="シュナ"
                width={56}
                height={56}
                className="rounded-full border border-card-border z-10"
              />
              <Image
                src="/raika.png"
                alt="ライカ"
                width={56}
                height={56}
                className="rounded-full border border-card-border"
              />
            </div>
          ) : (
            <Image
              src={info.icon}
              alt={info.name}
              width={56}
              height={56}
              className="rounded-full border border-card-border shrink-0"
            />
          )}
          <div>
            <h2 className="text-base font-bold mb-1">{info.name}</h2>
            <p className="text-xs leading-relaxed text-foreground/70">{info.description}</p>
            <p className="text-[11px] text-muted mt-2">{stories.length} 記事</p>
          </div>
        </div>

        {/* 記事一覧 */}
        {stories.length === 0 ? (
          <div className="py-20 text-center text-sm text-muted">まだ記事がありません</div>
        ) : (
          stories.map((s) => <StoryCard key={s.id} story={s} />)
        )}
      </main>

      <Footer />
    </>
  );
}
