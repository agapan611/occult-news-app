import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SearchClient from "@/components/SearchClient";
import { buildSearchIndex } from "@/lib/search-index";

export const metadata = {
  title: "サイト内検索",
  description:
    "OCCULT WIRE のGRIMOIRE（長編考察）・NEWS から、キーワードで記事を検索できます。",
  alternates: { canonical: "/search" },
  openGraph: {
    title: "サイト内検索 | OCCULT WIRE",
    description: "GRIMOIRE・NEWS のキーワード検索。",
    url: "/search",
  },
  robots: { index: false, follow: true },
};

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const items = buildSearchIndex();

  return (
    <>
      <Header />
      <Breadcrumb
        items={[{ name: "ホーム", href: "/" }, { name: "サイト内検索" }]}
      />
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-8">
        <h1 className="mb-3 text-xl font-bold text-accent">サイト内検索</h1>
        <p className="mb-6 text-xs leading-relaxed text-foreground/70">
          GRIMOIRE 長編考察と NEWS 欄の記事から、キーワードで探せます。
          全{items.length}件が対象です。
        </p>
        <SearchClient items={items} initialQuery={q ?? ""} />
      </main>
      <Footer />
    </>
  );
}
