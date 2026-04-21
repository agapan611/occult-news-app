import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import StoryCard from "@/components/StoryCard";
import Breadcrumb from "@/components/Breadcrumb";
import { getAllTags, getStoriesByTag } from "@/lib/stories";

const SITE_URL = "https://occult.ainiwa.jp";

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ slug: tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);
  const stories = getStoriesByTag(tag);
  if (stories.length === 0) return { title: "タグが見つかりません" };
  const description = `タグ「${tag}」に関する OCCULT WIRE の GRIMOIRE 考察記事一覧。${stories.length}本の長編考察を掲載。`;
  const path = `/grimoire/tag/${encodeURIComponent(tag)}`;
  return {
    title: `#${tag} の GRIMOIRE`,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: `#${tag} の GRIMOIRE | OCCULT WIRE`,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: `#${tag} の GRIMOIRE | OCCULT WIRE`,
      description,
    },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);
  const stories = getStoriesByTag(tag);
  if (stories.length === 0) notFound();

  const pageUrl = `${SITE_URL}/grimoire/tag/${encodeURIComponent(tag)}`;
  const description = `タグ「${tag}」に関する OCCULT WIRE の GRIMOIRE 考察記事一覧。${stories.length}本の長編考察を掲載。`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "GRIMOIRE", item: `${SITE_URL}/grimoire` },
      { "@type": "ListItem", position: 3, name: `#${tag}`, item: pageUrl },
    ],
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `#${tag} の GRIMOIRE`,
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

  const otherTags = getAllTags()
    .filter(({ tag: t }) => t !== tag)
    .slice(0, 20);

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
            #{tag}
          </h1>
          <div className="w-20" />
        </div>
      </header>

      <Breadcrumb
        items={[
          { name: "ホーム", href: "/" },
          { name: "GRIMOIRE", href: "/grimoire" },
          { name: `#${tag}` },
        ]}
      />

      <main className="mx-auto w-full max-w-lg flex-1">
        {/* タグ説明 */}
        <div className="border-b border-card-border px-4 py-5">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-5 w-1 bg-accent" />
            <h2 className="text-base font-bold tracking-wider">#{tag}</h2>
          </div>
          <p className="text-xs leading-relaxed text-foreground/70">
            {description}
          </p>
          <p className="text-[11px] text-muted mt-2">{stories.length} 記事</p>
        </div>

        {/* 記事一覧 */}
        {stories.map((s) => (
          <StoryCard key={s.id} story={s} />
        ))}

        {/* 他のタグへの導線 */}
        {otherTags.length > 0 && (
          <nav className="border-t border-card-border px-4 py-5">
            <p className="mb-3 text-[11px] text-muted tracking-wider">
              ほかのタグも見る
            </p>
            <ul className="flex flex-wrap gap-2">
              {otherTags.map(({ tag: t, count }) => (
                <li key={t}>
                  <Link
                    href={`/grimoire/tag/${encodeURIComponent(t)}`}
                    className="inline-block rounded-full border border-card-border px-3 py-1 text-[11px] text-foreground/80 hover:border-accent hover:text-accent transition-colors"
                  >
                    #{t}
                    <span className="ml-1 text-muted">{count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </main>

      <Footer />
    </>
  );
}
