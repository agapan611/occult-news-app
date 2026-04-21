import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleFeed from "@/components/ArticleFeed";
import LatestGrimoire from "@/components/LatestGrimoire";
import OccultLevelGauge from "@/components/OccultLevelGauge";
import { getAllArticles } from "@/lib/articles";
import { getAllStories } from "@/lib/stories";

// JST の日付替わりに追随させるため1時間毎に再生成（今日のオカルト度ゲージ用）
export const revalidate = 3600;

export default function Home() {
  const days = getAllArticles();
  const stories = getAllStories();

  return (
    <>
      <Header />
      <OccultLevelGauge />
      <LatestGrimoire stories={stories} />
      <ArticleFeed days={days} />
      <Footer />
    </>
  );
}
