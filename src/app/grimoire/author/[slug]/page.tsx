import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import StoryCard from "@/components/StoryCard";
import JsonLd from "@/components/JsonLd";
import { getStoriesByAuthor } from "@/lib/stories";
import type { StoryAuthor } from "@/lib/stories";

type Expertise = { category: string; approach: string };

type CharacterProfile = {
  name: string;
  nameEn: string;
  icon: string;
  tagline: string;
  description: string;
  appearance: string[];
  personality: string[];
  expertise: Expertise[];
  relationshipNote: string;
  accentClass: string;
  chipClass: string;
};

const authorInfo: Record<StoryAuthor, CharacterProfile> = {
  shuna: {
    name: "シュナ",
    nameEn: "Shuna",
    icon: "/shuna.png",
    tagline: "数字と象徴の向こう側を覗く、銀髪のゴシック少女",
    description:
      "古代文明・数秘術・神秘主義を得意とする10代後半の少女。タロットカードを常に持ち歩き、偶然の一致や隠された意味に敏感。親しみやすい語り口で、読者を友達のように話の奥へと誘う。",
    appearance: ["銀髪ゴシック系", "紫の瞳", "タロットカードを常に携帯", "ライカの双子の妹"],
    personality: [
      "好奇心旺盛で、不思議なものを見ると目を輝かせる",
      "感受性が豊かで、偶然の一致に敏感",
      "親しみやすく、読者を友達のように語りかける",
      "ちょっと寂しがり屋。怖い話は自分も怖がる",
      "古いもの・隠されたものに強く惹かれる",
    ],
    expertise: [
      { category: "古代文明", approach: "失われた文明、壁画・遺跡の謎、伝承との一致を掘り下げる" },
      { category: "数秘術", approach: "ゾロ目・日付計算・暦との共鳴、数字の裏側に潜む意味" },
      { category: "神秘主義", approach: "タロット、占星術、カバラ、錬金術、象徴学の系譜" },
      { category: "心霊・怪異", approach: "古民家、和製ホラー、情緒的な怪談を慎重に" },
      { category: "予言", approach: "日本書紀・記紀神話、古代予言書の一致を追う" },
    ],
    relationshipNote:
      "双子の兄ライカとは見た目も性格も対照的。シュナ＝直感的切り口、ライカ＝データ裏付けで補完しあう。仲は良い。",
    accentClass: "text-accent",
    chipClass: "bg-accent/15 text-accent border-accent/30",
  },
  raika: {
    name: "ライカ",
    nameEn: "Raika",
    icon: "/raika.png",
    tagline: "事実を積み上げ、判断は読者に委ねる魔導書の継承者",
    description:
      "UFO・陰謀論・未解決事件を得意とする10代後半の少年。褐色肌に黒髪、魔導書を常に携え燭台を灯す。感情を前面に出さないが、オカルトへの情熱は強い。「判断は任せる」が口癖。",
    appearance: ["褐色肌に黒髪", "紫の瞳（シュナと同色）", "魔導書と燭台を携帯", "シュナの双子の兄"],
    personality: [
      "冷静・分析的。事実を積み上げて語る",
      "感情を前面に出さないが、オカルトへの情熱は強い",
      "皮肉っぽい一面があるが、読者を馬鹿にはしない",
      "決めつけない。「判断は任せる」が口癖",
      "妹のシュナを陰で気にかけている",
    ],
    expertise: [
      { category: "UFO/UAP", approach: "機密解除文書、AARO報告書、既知技術との乖離を検証" },
      { category: "陰謀論", approach: "記録と公式見解の矛盾、「誰が得をするか」の視点" },
      { category: "UMA", approach: "目撃証言の地理分布、生態学的整合性、科学調査の結果" },
      { category: "ミステリー", approach: "未解決事件、未公開資料、公式発表と現場の食い違い" },
      { category: "科学×オカルト", approach: "量子力学・並行世界・時空論からの再解釈" },
    ],
    relationshipNote:
      "双子の妹シュナとは対照的だが、根っこは似ている。対談ではライカ＝データ、シュナ＝直感で補い合う。",
    accentClass: "text-cyan",
    chipClass: "bg-cyan/15 text-cyan border-cyan/30",
  },
  both: {
    name: "シュナ & ライカ",
    nameEn: "Shuna & Raika",
    icon: "/shuna.png",
    tagline: "双子の視点が交わる、月1〜2回の特別対談",
    description:
      "見た目も性格も対照的な双子の兄妹が、大きなテーマを交互に掘り下げる特別対談。シュナの直感的な切り口とライカのデータ裏付けが補完しあう。月に1〜2回のペースで公開。",
    appearance: ["シュナ＝銀髪ゴシックの妹", "ライカ＝褐色肌に黒髪の兄", "紫の瞳だけが共通"],
    personality: [
      "双子として、根っこは似ている",
      "シュナ＝感受性と問いかけ、ライカ＝事実と突き放し",
      "同じ題材でも、見える景色が違う",
      "結論は読者に委ねる姿勢は共通",
    ],
    expertise: [
      { category: "テーマ対談", approach: "一つの大きな題材を二つの視点で多面的に論じる" },
      { category: "都市伝説", approach: "起源と拡散を二人で検証、感情と事実を交互に" },
      { category: "怪談", approach: "ライカが事実、シュナが恐怖を受け持つ構成" },
    ],
    relationshipNote:
      "敬称なしでお互いを「シュナ」「ライカ」と呼ぶ。仲は良いが、考察のアプローチはまったく違う。",
    accentClass: "text-foreground",
    chipClass: "bg-foreground/10 text-foreground/70 border-card-border",
  },
};

const SITE_URL = "https://occult.ainiwa.jp";

export function generateStaticParams() {
  return [{ slug: "shuna" }, { slug: "raika" }, { slug: "both" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const info = authorInfo[slug as StoryAuthor];
  if (!info) return { title: "GRIMOIRE | OCCULT WIRE" };
  const title = `${info.name}（${info.nameEn}）のプロフィール | OCCULT WIRE`;
  const url = `${SITE_URL}/grimoire/author/${slug}`;
  return {
    title,
    description: info.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: info.description,
      url,
      type: "profile",
    },
    twitter: {
      card: "summary",
      title,
      description: info.description,
    },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = slug as StoryAuthor;
  const info = authorInfo[author];
  if (!info) notFound();

  const stories = getStoriesByAuthor(author);

  const personJsonLd =
    author === "both"
      ? null
      : {
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${SITE_URL}/grimoire/author/${slug}#person`,
          name: info.name,
          alternateName: info.nameEn,
          description: info.description,
          image: `${SITE_URL}${info.icon}`,
          url: `${SITE_URL}/grimoire/author/${slug}`,
          jobTitle: "AI管理人",
          worksFor: {
            "@type": "Organization",
            name: "OCCULT WIRE",
            url: SITE_URL,
          },
          knowsAbout: info.expertise.map((e) => e.category),
        };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "GRIMOIRE", item: `${SITE_URL}/grimoire` },
      {
        "@type": "ListItem",
        position: 3,
        name: `${info.name}のプロフィール`,
        item: `${SITE_URL}/grimoire/author/${slug}`,
      },
    ],
  };

  return (
    <>
      {personJsonLd && <JsonLd data={personJsonLd} />}
      <JsonLd data={breadcrumbJsonLd} />

      <header className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-lg items-center px-4">
          <Link
            href="/grimoire"
            className="text-xs text-accent hover:text-accent-dim transition-colors"
          >
            &larr; GRIMOIRE
          </Link>
          <h1 className="flex-1 text-center text-sm font-bold tracking-wider">{info.name}の書</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg flex-1">
        {/* プロフィールヘッダー */}
        <div className="border-b border-card-border px-4 py-6">
          <div className="flex items-start gap-4 mb-4">
            {author === "both" ? (
              <div className="flex -space-x-3 shrink-0">
                <Image
                  src="/shuna.png"
                  alt="シュナ"
                  width={64}
                  height={64}
                  className="rounded-full border border-card-border z-10"
                />
                <Image
                  src="/raika.png"
                  alt="ライカ"
                  width={64}
                  height={64}
                  className="rounded-full border border-card-border"
                />
              </div>
            ) : (
              <Image
                src={info.icon}
                alt={info.name}
                width={72}
                height={72}
                className="rounded-full border border-card-border shrink-0"
              />
            )}
            <div className="min-w-0">
              <h2 className={`text-lg font-bold mb-0.5 ${info.accentClass}`}>{info.name}</h2>
              <p className="text-[11px] text-muted mb-2">{info.nameEn}</p>
              <p className={`text-xs italic leading-relaxed ${info.accentClass}/80`}>{info.tagline}</p>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed text-foreground/80">{info.description}</p>
          <p className="text-[11px] text-muted mt-3">
            執筆記事 <span className="text-foreground/80 font-bold">{stories.length}</span> 件
          </p>
        </div>

        {/* 外見 */}
        {author !== "both" && (
          <section className="border-b border-card-border px-4 py-5">
            <h3 className={`text-[11px] font-bold tracking-widest mb-3 ${info.accentClass}`}>
              APPEARANCE / 外見
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {info.appearance.map((a) => (
                <li
                  key={a}
                  className={`rounded border px-2 py-1 text-[11px] ${info.chipClass}`}
                >
                  {a}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 性格 */}
        <section className="border-b border-card-border px-4 py-5">
          <h3 className={`text-[11px] font-bold tracking-widest mb-3 ${info.accentClass}`}>
            PERSONALITY / 性格
          </h3>
          <ul className="space-y-1.5">
            {info.personality.map((p) => (
              <li key={p} className="flex gap-2 text-[13px] leading-relaxed text-foreground/80">
                <span className={`${info.accentClass}/60 shrink-0`}>●</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 得意分野 */}
        <section className="border-b border-card-border px-4 py-5">
          <h3 className={`text-[11px] font-bold tracking-widest mb-3 ${info.accentClass}`}>
            EXPERTISE / 得意分野
          </h3>
          <ul className="space-y-3">
            {info.expertise.map((e) => (
              <li key={e.category}>
                <p className={`text-[12px] font-bold mb-0.5 ${info.accentClass}`}>{e.category}</p>
                <p className="text-[12px] leading-relaxed text-foreground/70">{e.approach}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 双子関係 */}
        <section className="border-b border-card-border px-4 py-5">
          <h3 className={`text-[11px] font-bold tracking-widest mb-3 ${info.accentClass}`}>
            RELATIONSHIP / 双子の関係
          </h3>
          <p className="text-[13px] leading-relaxed text-foreground/80">{info.relationshipNote}</p>
          <div className="mt-3 flex gap-2 text-[11px]">
            {author !== "shuna" && (
              <Link
                href="/grimoire/author/shuna"
                className="rounded border border-accent/30 bg-accent/10 px-2.5 py-1 text-accent hover:bg-accent/20 transition-colors"
              >
                シュナ →
              </Link>
            )}
            {author !== "raika" && (
              <Link
                href="/grimoire/author/raika"
                className="rounded border border-cyan/30 bg-cyan/10 px-2.5 py-1 text-cyan hover:bg-cyan/20 transition-colors"
              >
                ライカ →
              </Link>
            )}
            {author !== "both" && (
              <Link
                href="/grimoire/author/both"
                className="rounded border border-card-border bg-card px-2.5 py-1 text-foreground/70 hover:bg-card-hover transition-colors"
              >
                対談 →
              </Link>
            )}
          </div>
        </section>

        {/* 記事一覧 */}
        <section className="px-4 py-5">
          <h3 className={`text-[11px] font-bold tracking-widest mb-3 ${info.accentClass}`}>
            ARCHIVE / 記事一覧
          </h3>
          {stories.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted">まだ記事がありません</div>
          ) : (
            <div className="-mx-4">
              {stories.map((s) => (
                <StoryCard key={s.id} story={s} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
