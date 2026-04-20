import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import StoryCard from "@/components/StoryCard";
import { getAllStories, getStoryById, getRelatedStories } from "@/lib/stories";
import type { StoryAuthor } from "@/lib/stories";
import { grimoireCategoryLabels } from "@/lib/categories";

const SITE_URL = "https://occult.ainiwa.jp";

const authorInfo: Record<
  StoryAuthor,
  { name: string; icon: string; colorClass: string; slug: string; leadlineClass: string }
> = {
  shuna: { name: "シュナ", icon: "/shuna.png", colorClass: "text-accent", slug: "shuna", leadlineClass: "text-accent/90" },
  raika: { name: "ライカ", icon: "/raika.png", colorClass: "text-cyan", slug: "raika", leadlineClass: "text-cyan/90" },
  both: { name: "シュナ & ライカ", icon: "/shuna.png", colorClass: "text-foreground", slug: "both", leadlineClass: "text-foreground/80" },
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
  const relatedStories = getRelatedStories(story, 4);
  const categoryLabel = grimoireCategoryLabels[story.category] ?? story.category;

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
    articleSection: grimoireCategoryLabels[story.category] ?? story.category,
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
          <Link
            href={`/grimoire/category/${story.category}`}
            className="rounded bg-accent/20 px-1.5 py-0.5 text-accent hover:bg-accent/30 transition-colors"
          >
            {grimoireCategoryLabels[story.category] ?? story.category}
          </Link>
          <span className="text-muted">{story.readingTimeMinutes}分で読める</span>
          <span className="text-muted">&middot; {formatDate(story.date)}</span>
        </div>

        {/* キャラのリード（タイトル上、leadline） */}
        {story.leadline && (
          <p className={`mb-2 text-sm italic ${author.leadlineClass}`}>
            {author.name}「{story.leadline}」
          </p>
        )}

        {/* タイトル */}
        <h1 className="text-xl sm:text-2xl font-bold leading-snug mb-4">{story.title}</h1>

        {/* 著者 */}
        <Link
          href={`/grimoire/author/${author.slug}`}
          className="mb-6 flex items-center gap-2 rounded-lg bg-card border border-card-border p-3 hover:bg-card-hover hover:border-accent/40 transition-colors"
        >
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
          <div className="flex-1">
            <p className={`text-sm font-bold ${author.colorClass}`}>{author.name}</p>
            <p className="text-[10px] text-muted">OCCULT WIRE 管理人</p>
          </div>
          <span className="text-xs text-muted" aria-hidden>&rarr;</span>
        </Link>

        {/* 本文 */}
        <div className="story-content">
          {renderMarkdown(story.content)}
        </div>

        {/* タグ */}
        <div className="mt-8 flex flex-wrap gap-2">
          {story.tags.map((tag) => (
            <Link
              key={tag}
              href={`/grimoire/tag/${encodeURIComponent(tag)}`}
              className="rounded-full border border-card-border px-2 py-0.5 text-[10px] text-muted hover:border-accent hover:text-accent transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* X シェア CTA */}
        <section className="mt-8 flex flex-wrap items-center justify-center gap-2 rounded-lg border border-card-border bg-card/40 p-4">
          <span className="text-[11px] text-muted">この考察が刺さったら</span>
          <a
            href={`https://x.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(story.title)}&via=occult_wire`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-card-border bg-background px-3 py-1.5 text-[11px] text-foreground hover:border-accent hover:text-accent transition-colors"
          >
            <svg viewBox="0 0 24 24" width={10} height={10} fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>Xでシェア</span>
          </a>
          <a
            href="https://x.com/occult_wire"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-card-border bg-background px-3 py-1.5 text-[11px] text-foreground hover:border-accent hover:text-accent transition-colors"
          >
            <svg viewBox="0 0 24 24" width={10} height={10} fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>@occult_wire をフォロー</span>
          </a>
        </section>

        {/* 関連記事（同カテゴリ） */}
        {relatedStories.length > 0 && (
          <section className="mt-10 border-t border-card-border pt-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold tracking-wider">
                <span className="text-accent">{categoryLabel}</span> の他の考察
              </h2>
              <Link
                href={`/grimoire/category/${story.category}`}
                className="text-[11px] text-accent hover:text-accent-dim transition-colors"
              >
                一覧 &rarr;
              </Link>
            </div>
            <div className="-mx-4 border-t border-card-border">
              {relatedStories.map((s) => (
                <StoryCard key={s.id} story={s} />
              ))}
            </div>
          </section>
        )}

        {/* 参考文献・外部リソース（あれば） */}
        {story.references && story.references.length > 0 && (
          <section className="mt-10 border-t border-card-border pt-6">
            <h2 className="mb-3 text-sm font-bold tracking-wider text-accent">
              参考にした一次資料・外部リソース
            </h2>
            <ul className="space-y-3">
              {story.references.map((ref, i) => (
                <li key={i} className="text-[12px] leading-relaxed text-foreground/85">
                  {ref.url ? (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-accent transition-colors underline decoration-muted/40 underline-offset-2"
                    >
                      {ref.title}
                    </a>
                  ) : (
                    <span className="text-foreground">{ref.title}</span>
                  )}
                  {ref.note && (
                    <span className="mt-1 block text-[11px] text-muted">{ref.note}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

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
        <ul key={`l-${idx++}`} className="mb-5 space-y-2 pl-5 list-disc text-[14.5px] leading-[1.85] text-foreground/90">
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
        <p key={`p-${idx++}`} className="mb-5 text-[14.5px] leading-[1.9] text-foreground/90">
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
