import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoryFilter from "@/components/StoryFilter";
import JsonLd from "@/components/JsonLd";
import { getAllStories } from "@/lib/stories";

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
      <StoryFilter stories={stories} />
      <Footer />
    </>
  );
}
