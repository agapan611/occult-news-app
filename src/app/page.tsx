import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleFeed from "@/components/ArticleFeed";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const days = getAllArticles();

  return (
    <>
      <Header />
      <ArticleFeed days={days} />
      <Footer />
    </>
  );
}
