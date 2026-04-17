import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleFeed from "@/components/ArticleFeed";
import LatestGrimoire from "@/components/LatestGrimoire";
import { getAllArticles } from "@/lib/articles";
import { getAllStories } from "@/lib/stories";

export default function Home() {
  const days = getAllArticles();
  const stories = getAllStories();

  return (
    <>
      <Header />
      <LatestGrimoire stories={stories} />
      <ArticleFeed days={days} />
      <Footer />
    </>
  );
}
