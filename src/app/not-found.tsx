import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllStories } from "@/lib/stories";

export const metadata = {
  title: "ページが見つかりません",
  description:
    "お探しのページは存在しないか、異界に迷い込んでしまったようです。OCCULT WIRE のトップ、または GRIMOIRE からお探しください。",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const latestStories = getAllStories().slice(0, 3);

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-10">
        <section className="mb-8 text-center">
          <p className="mb-2 text-[11px] tracking-[0.3em] text-muted">
            ERROR 404 / NOT FOUND
          </p>
          <h1 className="mb-6 text-2xl font-bold leading-tight">
            この記事は
            <br />
            <span className="text-accent">闇に呑まれた</span>
            みたい
          </h1>

          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/shuna.png"
                alt="シュナ"
                width={48}
                height={48}
                className="rounded-full border border-card-border"
              />
              <span className="text-xs text-accent">シュナ</span>
            </div>
            <span className="text-muted/40">×</span>
            <div className="flex items-center gap-2">
              <Image
                src="/raika.png"
                alt="ライカ"
                width={48}
                height={48}
                className="rounded-full border border-card-border"
              />
              <span className="text-xs text-cyan">ライカ</span>
            </div>
          </div>

          <div className="space-y-3 rounded-lg border border-card-border bg-card/60 p-4 text-left">
            <p className="text-sm leading-relaxed">
              <span className="mr-2 text-accent">シュナ「</span>
              あれ？ここ、どの記事にも繋がってないよ…URLを踏み外したのかも？
              <span className="text-accent">」</span>
            </p>
            <p className="text-sm leading-relaxed">
              <span className="mr-2 text-cyan">ライカ「</span>
              HTTP 404。要求されたリソースは存在しない。タイプミスか、古いリンクを踏んだ可能性が高い。
              <span className="text-cyan">」</span>
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-foreground/90">
            <span className="h-4 w-1 bg-accent" />
            戻る
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/"
              className="rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-center text-sm font-bold text-accent hover:bg-accent/20 transition-colors"
            >
              トップへ戻る
            </Link>
            <Link
              href="/grimoire"
              className="rounded-lg border border-cyan/40 bg-cyan/10 px-4 py-3 text-center text-sm font-bold text-cyan hover:bg-cyan/20 transition-colors"
            >
              GRIMOIRE を開く
            </Link>
            <Link
              href="/grimoire/random"
              prefetch={false}
              className="col-span-2 rounded-lg border border-card-border bg-card px-4 py-3 text-center text-sm text-foreground/90 hover:border-accent hover:text-accent transition-colors"
            >
              ランダムな1冊を引く
            </Link>
          </div>
        </section>

        {latestStories.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-foreground/90">
              <span className="h-4 w-1 bg-accent" />
              最新の GRIMOIRE
            </h2>
            <ul className="space-y-2">
              {latestStories.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/grimoire/${s.id}`}
                    className="block rounded-lg border border-card-border bg-card/60 px-4 py-3 text-sm text-foreground/90 hover:border-accent hover:text-accent transition-colors"
                  >
                    {s.title}
                    <span className="ml-2 text-[11px] text-muted">
                      {s.date}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-foreground/90">
            <span className="h-4 w-1 bg-accent" />
            サイト内検索
          </h2>
          <p className="text-xs leading-relaxed text-foreground/70">
            全ページ一覧は{" "}
            <Link
              href="/sitemap"
              className="text-accent underline underline-offset-2 hover:text-accent-dim"
            >
              サイトマップ
            </Link>
            {" "}から。
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
