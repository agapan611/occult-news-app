import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getAllStories, getStoryById } from "@/lib/stories";
import type { StoryAuthor } from "@/lib/stories";

const SITE_URL = "https://occult.ainiwa.jp";

const authorInfo: Record<StoryAuthor, { name: string; icon: string; colorClass: string; slug: string }> = {
  shuna: { name: "シュナ", icon: "/shuna.png", colorClass: "text-accent", slug: "shuna" },
  raika: { name: "ライカ", icon: "/raika.png", colorClass: "text-cyan", slug: "raika" },
  both: { name: "シュナ & ライカ", icon: "/shuna.png", colorClass: "text-foreground", slug: "both" },
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

export function generateStaticParams() {
  return getAllStories().map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = getStoryById(id);
  if (!story) return { title: "記事が見つかりません" };
  const path = `/grimoire/${story.id}`;
  const publishedIso = new Date(story.createdAt || story.date).toISOString();
  const authorName = authorInfo[story.author].name;
  return {
    title: story.title,
    description: story.summary,
    keywords: story.tags,
    authors: [{ name: authorName }],
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: `${story.title} | OCCULT WIRE`,
      description: story.summary,
      url: path,
      publishedTime: publishedIso,
      modifiedTime: publishedIso,
      authors: [authorName],
      tags: story.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${story.title} | OCCULT WIRE`,
      description: story.summary,
    },
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = getStoryById(id);
  if (!story) notFound();

  const author = authorInfo[story.author];
  const pageUrl = `${SITE_URL}/grimoire/${story.id}`;
  const publishedIso = new Date(story.createdAt || story.date).toISOString();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.summary,
    datePublished: publishedIso,
    dateModified: publishedIso,
    author: {
      "@type": "Person",
      name: author.name,
      url: `${SITE_URL}/grimoire/author/${author.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: "OCCULT WIRE",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/shuna-raika.png`,
        width: 1200,
        height: 630,
      },
    },
    image: [`${SITE_URL}/shuna-raika.png`],
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    inLanguage: "ja",
    articleSection: categoryLabels[story.category] ?? story.category,
    keywords: story.tags,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "GRIMOIRE", item: `${SITE_URL}/grimoire` },
      { "@type": "ListItem", position: 3, name: story.title, item: pageUrl },
    ],
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <header className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-lg items-center px-4">
          <Link
            href="/grimoire"
            className="text-xs text-accent hover:text-accent-dim transition-colors"
          >
            &larr; GRIMOIRE
          </Link>
          <h1 className="flex-1 text-center text-sm font-bold tracking-widest">GRIMOIRE</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-6">
        {/* カテゴリ + 読了時間 */}
        <div className="mb-3 flex items-center gap-2 text-xs">
          <span className="rounded bg-accent/20 px-1.5 py-0.5 text-accent">
            {categoryLabels[story.category] ?? story.category}
          </span>
          <span className="text-muted">{story.readingTimeMinutes}分で読める</span>
          <span className="text-muted">&middot; {formatDate(story.date)}</span>
        </div>

        {/* タイトル */}
        <h1 className="text-xl sm:text-2xl font-bold leading-snug mb-4">{story.title}</h1>

        {/* 著者 */}
        <div className="mb-6 flex items-center gap-2 rounded-lg bg-card border border-card-border p-3">
          {story.author === "both" ? (
            <div className="flex -space-x-2">
              <Image
                src="/shuna.png"
                alt="シュナ"
                width={36}
                height={36}
                className="rounded-full border border-card-border z-10"
              />
              <Image
                src="/raika.png"
                alt="ライカ"
                width={36}
                height={36}
                className="rounded-full border border-card-border"
              />
            </div>
          ) : (
            <Image
              src={author.icon}
              alt={author.name}
              width={36}
              height={36}
              className="rounded-full border border-card-border"
            />
          )}
          <div>
            <p className={`text-sm font-bold ${author.colorClass}`}>{author.name}</p>
            <p className="text-[10px] text-muted">OCCULT WIRE 管理人</p>
          </div>
        </div>

        {/* 本文 */}
        <div className="story-content">
          {renderMarkdown(story.content)}
        </div>

        {/* タグ */}
        <div className="mt-8 flex flex-wrap gap-2">
          {story.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-card-border px-2 py-0.5 text-[10px] text-muted"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 注記 */}
        <div className="mt-8 rounded-lg border border-card-border bg-card p-3 text-[11px] text-muted leading-relaxed">
          本記事はAIキャラクターによる創作・考察です。登場する事件・伝説の事実性については諸説あります。歴史的事実と創作的解釈が混在する場合があります。
        </div>

        {/* 戻る */}
        <div className="mt-6 text-center">
          <Link
            href="/grimoire"
            className="inline-block text-xs text-accent hover:text-accent-dim transition-colors"
          >
            &larr; 他の GRIMOIRE を読む
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00+09:00");
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function renderMarkdown(content: string): React.ReactNode[] {
  const blocks: React.ReactNode[] = [];
  const lines = content.split("\n");
  let listBuffer: string[] = [];
  let paraBuffer: string[] = [];
  let idx = 0;

  const flushList = () => {
    if (listBuffer.length > 0) {
      blocks.push(
        <ul key={`l-${idx++}`} className="mb-4 space-y-1.5 pl-5 list-disc text-[14.5px] leading-relaxed text-foreground/90">
          {listBuffer.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  const flushPara = () => {
    if (paraBuffer.length > 0) {
      blocks.push(
        <p key={`p-${idx++}`} className="mb-4 text-[14.5px] leading-[1.9] text-foreground/90">
          {paraBuffer.map((line, i) => (
            <span key={i}>
              {renderInline(line)}
              {i < paraBuffer.length - 1 && <br />}
            </span>
          ))}
        </p>
      );
      paraBuffer = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flushList();
      flushPara();
      blocks.push(
        <h2 key={`h2-${idx++}`} className="mt-8 mb-3 text-lg font-bold text-accent border-l-2 border-accent pl-3">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      flushList();
      flushPara();
      blocks.push(
        <h3 key={`h3-${idx++}`} className="mt-6 mb-2 text-base font-bold text-foreground">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      flushPara();
      listBuffer.push(line.slice(2));
    } else if (line.trim() === "") {
      flushList();
      flushPara();
    } else {
      flushList();
      paraBuffer.push(line);
    }
  }
  flushList();
  flushPara();

  return blocks;
}

function renderInline(text: string): React.ReactNode {
  // **太字** のみサポート
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={i} className="text-accent font-bold">
          {p.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{p}</span>;
  });
}
