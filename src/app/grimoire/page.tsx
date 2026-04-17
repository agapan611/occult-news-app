import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoryFilter from "@/components/StoryFilter";
import { getAllStories } from "@/lib/stories";

export const metadata = {
  title: "GRIMOIRE | OCCULT WIRE",
  description: "シュナとライカが綴るオカルト・都市伝説の長編考察。神秘の書庫。",
};

export default function GrimoirePage() {
  const stories = getAllStories();

  return (
    <>
      <Header />
      <StoryFilter stories={stories} />
      <Footer />
    </>
  );
}
