import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import StoryCard from "@/components/StoryCard";
import { getStoriesByCategory, getAllCategories } from "@/lib/stories";
import {
  grimoireCategoryLabels,
  grimoireCategoryDescriptions,
} from "@/lib/categories";

const SITE_URL = "https://occult.ainiwa.jp";

export function generateStaticParams() {
  return getAllCategories().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const label = grimoireCategoryLabels[slug];
  if (!label) return { title: "カテゴリが見つかりません" };
  const description =
    grimoireCategoryDescriptions[slug] ??
    `GRIMOIRE の「${label}」カテゴリの長編考察記事一覧。`;
  const path = `/grimoire/category/${slug}`;
  return {
    title: `${label}の GRIMOIRE`,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: `${label}の GRIMOIRE | OCCULT WIRE`,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: `${label}の GRIMOIRE | OCCULT WIRE`,
      description,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const label = grimoireCategoryLabels[slug];
  if (!label) notFound();

  const stories = getStoriesByCategory(slug);
  const description =
    grimoireCategoryDescriptions[slug] ??
    `GRIMOIRE の「${label}」カテゴリの長編考察記事一覧。`;
  const pageUrl = `${SITE_URL}/grimoire/category/${slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "GRIMOIRE", item: `${SITE_URL}/grimoire` },
      { "@type": "ListItem", position: 3, name: label, item: pageUrl },
    ],
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${label}の GRIMOIRE`,
    description,
    url: pageUrl,
    inLanguage: "ja",
    isPartOf: { "@type": "WebSite", name: "OCCULT WIRE", url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: stories.length,
      itemListElement: stories.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/grimoire/${s.id}`,
        name: s.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={collectionJsonLd} />
      <header className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-lg items-center px-4">
          <Link
            href="/grimoire"
            className="text-xs text-accent hover:text-accent-dim transition-colors"
          >
            &larr; GRIMOIRE
          </Link>
          <h1 className="flex-1 text-center text-sm font-bold tracking-wider">
            {label}
          </h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg flex-1">
        {/* カテゴリ説明 */}
        <div className="border-b border-card-border px-4 py-5">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-5 w-1 bg-accent" />
            <h2 className="text-base font-bold tracking-wider">{label}</h2>
          </div>
          <p className="text-xs leading-relaxed text-foreground/70">{description}</p>
          <p className="text-[11px] text-muted mt-2">{stories.length} 記事</p>
        </div>

        {/* 記事一覧 */}
        {stories.length === 0 ? (
          <div className="py-20 text-center text-sm text-muted">
            まだ記事がありません
          </div>
        ) : (
          stories.map((s) => <StoryCard key={s.id} story={s} />)
        )}

        {/* 他のカテゴリへの導線 */}
        <nav className="border-t border-card-border px-4 py-5">
          <p className="mb-3 text-[11px] text-muted tracking-wider">
            ほかのカテゴリも読む
          </p>
          <ul className="flex flex-wrap gap-2">
            {getAllCategories()
              .filter((c) => c !== slug)
              .map((c) => (
                <li key={c}>
                  <Link
                    href={`/grimoire/category/${c}`}
                    className="inline-block rounded-full border border-card-border px-3 py-1 text-[11px] text-foreground/80 hover:border-accent hover:text-accent transition-colors"
                  >
                    {grimoireCategoryLabels[c] ?? c}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </main>

      <Footer />
    </>
  );
}
