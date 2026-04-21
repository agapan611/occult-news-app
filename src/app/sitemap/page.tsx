import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import {
  getAllStories,
  getAllCategories,
  getAllTags,
} from "@/lib/stories";
import { grimoireCategoryLabels } from "@/lib/categories";

const SITE_URL = "https://occult.ainiwa.jp";

export const metadata = {
  title: "サイトマップ",
  description:
    "OCCULT WIRE の全ページ一覧。GRIMOIRE（長編考察）・カテゴリ・タグ・キャラプロフィールへのハブ。",
  alternates: { canonical: "/sitemap" },
  openGraph: {
    title: "サイトマップ | OCCULT WIRE",
    description: "OCCULT WIRE の全ページ一覧。",
    url: "/sitemap",
  },
};

export default function SitemapPage() {
  const stories = getAllStories();
  const categories = getAllCategories();
  const tags = getAllTags();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "サイトマップ",
        item: `${SITE_URL}/sitemap`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <Header />
      <Breadcrumb
        items={[{ name: "ホーム", href: "/" }, { name: "サイトマップ" }]}
      />
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-8">
        <h1 className="mb-3 text-xl font-bold text-accent">サイトマップ</h1>
        <p className="mb-8 text-xs leading-relaxed text-foreground/70">
          OCCULT WIRE の全ページを辿れます。機械向けの{" "}
          <a
            href="/sitemap.xml"
            className="underline underline-offset-2 hover:text-accent"
          >
            sitemap.xml
          </a>
          {" "}とは別の、人間向けの一覧です。
        </p>

        <section className="mb-10">
          <h2 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-foreground/90">
            <span className="h-4 w-1 bg-accent" />
            メインページ
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="text-accent hover:text-accent-dim">
                ホーム（最新ニュース）
              </Link>
            </li>
            <li>
              <Link
                href="/grimoire"
                className="text-accent hover:text-accent-dim"
              >
                GRIMOIRE（長編考察一覧）
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-accent hover:text-accent-dim"
              >
                シュナ・ライカについて
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-accent hover:text-accent-dim"
              >
                お問い合わせ
              </Link>
            </li>
            <li>
              <Link
                href="/legal"
                className="text-accent hover:text-accent-dim"
              >
                運営者情報・プライバシーポリシー・免責
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-accent hover:text-accent-dim"
              >
                利用規約
              </Link>
            </li>
            <li>
              <Link
                href="/search"
                className="text-accent hover:text-accent-dim"
              >
                サイト内検索
              </Link>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-foreground/90">
            <span className="h-4 w-1 bg-accent" />
            キャラプロフィール
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/grimoire/author/shuna"
                className="text-accent hover:text-accent-dim"
              >
                シュナ の書
              </Link>
            </li>
            <li>
              <Link
                href="/grimoire/author/raika"
                className="text-cyan hover:text-accent"
              >
                ライカ の書
              </Link>
            </li>
            <li>
              <Link
                href="/grimoire/author/both"
                className="text-foreground/80 hover:text-accent"
              >
                シュナ & ライカ 対談アーカイブ
              </Link>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-foreground/90">
            <span className="h-4 w-1 bg-accent" />
            GRIMOIRE（長編考察・全{stories.length}本）
          </h2>
          <ul className="space-y-2 text-sm">
            {stories.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/grimoire/${s.id}`}
                  className="text-foreground/90 hover:text-accent"
                >
                  {s.title}
                </Link>
                <span className="ml-2 text-[11px] text-muted">
                  {s.date}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-foreground/90">
            <span className="h-4 w-1 bg-accent" />
            カテゴリアーカイブ
          </h2>
          <ul className="flex flex-wrap gap-2">
            {categories.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/grimoire/category/${slug}`}
                  className="inline-block rounded-full border border-card-border px-3 py-1 text-[11px] text-foreground/80 transition-colors hover:border-accent hover:text-accent"
                >
                  {grimoireCategoryLabels[slug] ?? slug}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-foreground/90">
            <span className="h-4 w-1 bg-cyan" />
            タグアーカイブ（全{tags.length}件）
          </h2>
          <ul className="flex flex-wrap gap-2">
            {tags.map(({ tag, count }) => (
              <li key={tag}>
                <Link
                  href={`/grimoire/tag/${encodeURIComponent(tag)}`}
                  className="inline-block rounded-full border border-card-border px-3 py-1 text-[11px] text-foreground/70 transition-colors hover:border-cyan hover:text-cyan"
                >
                  #{tag}{" "}
                  <span className="text-muted">({count})</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-foreground/90">
            <span className="h-4 w-1 bg-accent" />
            その他
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/feed.xml"
                className="text-accent hover:text-accent-dim"
              >
                RSS フィード（feed.xml）
              </a>
            </li>
            <li>
              <a
                href="/feed.json"
                className="text-accent hover:text-accent-dim"
              >
                JSON Feed（feed.json）
              </a>
            </li>
            <li>
              <a
                href="/sitemap.xml"
                className="text-accent hover:text-accent-dim"
              >
                機械向けサイトマップ（sitemap.xml）
              </a>
            </li>
            <li>
              <a
                href="/robots.txt"
                className="text-accent hover:text-accent-dim"
              >
                robots.txt
              </a>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
