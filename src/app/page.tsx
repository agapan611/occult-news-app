import Header from "@/components/Header";
import ArticleFeed from "@/components/ArticleFeed";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const days = getAllArticles();

  return (
    <>
      <Header />
      <ArticleFeed days={days} />
      <footer className="border-t border-card-border py-6 text-center text-xs text-muted">
        <p>OCCULT WIRE - AI考察はエンタメです。事実とは異なる場合があります。</p>
      </footer>
    </>
  );
}
