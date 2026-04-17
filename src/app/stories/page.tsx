import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoryFilter from "@/components/StoryFilter";
import { getAllStories } from "@/lib/stories";

export const metadata = {
  title: "読み物 | OCCULT WIRE",
  description: "シュナとライカがお届けするオカルト・都市伝説の長編読み物",
};

export default function StoriesPage() {
  const stories = getAllStories();

  return (
    <>
      <Header />
      <StoryFilter stories={stories} />
      <Footer />
    </>
  );
}
