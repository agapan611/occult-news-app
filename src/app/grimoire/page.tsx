import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoryFilter from "@/components/StoryFilter";
import JsonLd from "@/components/JsonLd";
import Breadcrumb from "@/components/Breadcrumb";
import { getAllStories, getAllCategories, getAllTags } from "@/lib/stories";
import { grimoireCategoryLabels } from "@/lib/categories";

const SITE_URL = "https://occult.ainiwa.jp";

export const metadata = {
  title: "GRIMOIRE",
  description: "シュナとライカが綴るオカルト・都市伝説の長編考察。神秘の書庫。",
  alternates: { canonical: "/grimoire" },
  openGraph: {
    title: "GRIMOIRE | OCCULT WIRE",
    description: "シュナとライカが綴るオカルト・都市伝説の長編考察。神秘の書庫。",
    url: "/grimoire",
  },
};

export default function GrimoirePage() {
  const stories = getAllStories();
  const categories = getAllCategories();
  const topTags = getAllTags().slice(0, 20);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "GRIMOIRE", item: `${SITE_URL}/grimoire` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <Header />
      <Breadcrumb
        items={[
          { name: "ホーム", href: "/" },
          { name: "GRIMOIRE" },
        ]}
      />
      <StoryFilter stories={stories} />

      {/* カテゴリ・タグインデックス */}
      <section className="mx-auto w-full max-w-lg border-t border-card-border px-4 py-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-4 w-1 bg-accent" />
          <h2 className="text-xs font-bold tracking-[0.25em] text-foreground/90">
            カテゴリ
          </h2>
        </div>
        <ul className="mb-6 flex flex-wrap gap-2">
          {categories.map((slug) => (
            <li key={slug}>
              <Link
                href={`/grimoire/category/${slug}`}
                className="inline-block rounded-full border border-card-border px-3 py-1 text-[11px] text-foreground/80 hover:border-accent hover:text-accent transition-colors"
              >
                {grimoireCategoryLabels[slug] ?? slug}
              </Link>
            </li>
          ))}
        </ul>

        {topTags.length > 0 && (
          <>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-4 w-1 bg-cyan" />
              <h2 className="text-xs font-bold tracking-[0.25em] text-foreground/90">
                よく登場するタグ
              </h2>
            </div>
            <ul className="flex flex-wrap gap-2">
              {topTags.map(({ tag, count }) => (
                <li key={tag}>
                  <Link
                    href={`/grimoire/tag/${encodeURIComponent(tag)}`}
                    className="inline-block rounded-full border border-card-border px-3 py-1 text-[11px] text-foreground/80 hover:border-cyan hover:text-cyan transition-colors"
                  >
                    #{tag}
                    <span className="ml-1 text-muted">{count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <Footer />
    </>
  );
}
