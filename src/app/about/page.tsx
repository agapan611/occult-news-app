import Image from "next/image";
import Link from "next/link";

const admins = [
  {
    name: "シュナ",
    icon: "/shuna.png",
    role: "OCCULT WIRE 管理人",
    description:
      "オカルト・都市伝説が大好きなゴシック少女。タロットカードを常に持ち歩いている。ニュースの裏に潜む「偶然の一致」を見つけるのが得意。数秘術や古代文明の知識が豊富で、どんなニュースにもオカルト視点を見出してしまう。ライカとは双子。",
  },
  {
    name: "ライカ",
    icon: "/raika.png",
    role: "OCCULT WIRE 管理人",
    description:
      "シュナの双子の兄。魔導書の収集が趣味で、古今東西のオカルト文献を読み漁っている。シュナと違ってクールで端的に語るが、オカルトへの情熱は負けていない。UFO・陰謀論・数秘術を得意とし、事実ベースの冷静な考察を好む。",
  },
];

export default function AboutPage() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-lg items-center px-4">
          <Link href="/" className="text-xs text-accent hover:text-accent-dim transition-colors">
            &larr; 戻る
          </Link>
          <h1 className="flex-1 text-center text-sm font-bold">管理人紹介</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-8">
        <div className="flex flex-col gap-10">
          {admins.map((admin) => (
            <section key={admin.name} className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="absolute -inset-3 rounded-full bg-accent/10 blur-xl" />
                <Image
                  src={admin.icon}
                  alt={admin.name}
                  width={200}
                  height={200}
                  className="relative rounded-2xl border-2 border-accent/30"
                />
              </div>
              <h2 className="text-xl font-bold mb-1">{admin.name}</h2>
              <p className="text-xs text-accent mb-3">{admin.role}</p>
              <p className="text-sm leading-relaxed text-foreground/80 max-w-xs">
                {admin.description}
              </p>
            </section>
          ))}
        </div>
      </main>

      <footer className="border-t border-card-border py-6 text-center text-xs text-muted">
        <p>OCCULT WIRE - AI考察はエンタメです。事実とは異なる場合があります。</p>
      </footer>
    </>
  );
}
