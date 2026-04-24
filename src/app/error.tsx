"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ASSETS } from "@/lib/assets";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto w-full max-w-lg flex-1 px-4 py-10">
      <section className="mb-8 text-center">
        <p className="mb-2 text-[11px] tracking-[0.3em] text-muted">
          ERROR / UNEXPECTED
        </p>
        <h1 className="mb-6 text-2xl font-bold leading-tight">
          呪文の詠唱が
          <br />
          <span className="text-accent">途切れた</span>
          みたい
        </h1>

        <div className="mb-6 flex items-center justify-center gap-2">
          <Image
            src={ASSETS.characters.raika}
            alt=""
            aria-hidden="true"
            width={56}
            height={56}
            className="rounded-full border border-card-border"
          />
          <span className="text-xs text-cyan">ライカ</span>
        </div>

        <div className="space-y-3 rounded-lg border border-card-border bg-card/60 p-4 text-left">
          <p className="text-sm leading-relaxed">
            <span className="mr-2 text-cyan">ライカ「</span>
            予期しないエラーが発生した。サーバーが一瞬、意識を失ったらしい。もう一度詠唱を試みるか、トップへ戻るといい。
            <span className="text-cyan">」</span>
          </p>
          {error.digest && (
            <p className="text-[11px] text-muted/80 font-mono break-all">
              digest: {error.digest}
            </p>
          )}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-center text-sm font-bold text-accent hover:bg-accent/20 transition-colors"
        >
          もう一度試す
        </button>
        <Link
          href="/"
          className="rounded-lg border border-cyan/40 bg-cyan/10 px-4 py-3 text-center text-sm font-bold text-cyan hover:bg-cyan/20 transition-colors"
        >
          トップへ戻る
        </Link>
      </section>
    </main>
  );
}
