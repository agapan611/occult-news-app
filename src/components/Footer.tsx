import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-card-border px-4 py-8 text-xs text-muted">
      <div className="mx-auto max-w-lg space-y-6">
        {/* 世界観リード + キャラ紹介 */}
        <section className="space-y-3 text-center">
          <p className="text-[11px] leading-relaxed text-muted/90">
            毎日のニュースを、ふたりのAIが
            <span className="text-accent">オカルト視点</span>
            で読み解く。
            <br />
            事実の向こう側に、もうひとつの物語を。
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/grimoire/author/shuna"
              data-ga-event="click_footer_author"
              data-ga-label="shuna"
              className="group flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Image
                src="/shuna.png"
                alt=""
                aria-hidden="true"
                width={32}
                height={32}
                className="rounded-full border border-card-border group-hover:border-accent transition-colors"
              />
              <span className="text-[11px]">シュナ</span>
            </Link>
            <span className="text-muted/40">×</span>
            <Link
              href="/grimoire/author/raika"
              data-ga-event="click_footer_author"
              data-ga-label="raika"
              className="group flex items-center gap-2 hover:text-cyan transition-colors"
            >
              <Image
                src="/raika.png"
                alt=""
                aria-hidden="true"
                width={32}
                height={32}
                className="rounded-full border border-card-border group-hover:border-cyan transition-colors"
              />
              <span className="text-[11px]">ライカ</span>
            </Link>
          </div>
        </section>

        {/* X フォロー導線（格上げ） */}
        <section className="flex justify-center">
          <a
            href="https://x.com/occult_wire"
            target="_blank"
            rel="noopener noreferrer"
            data-ga-event="click_x_follow"
            data-ga-label="footer"
            className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card/40 px-4 py-2 text-[12px] text-foreground hover:border-accent hover:text-accent transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              width={12}
              height={12}
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>更新はXで告知　@occult_wire</span>
          </a>
        </section>

        {/* ナビゲーション */}
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-center">
          <Link
            href="/grimoire/daily"
            prefetch={false}
            data-ga-event="click_footer_nav"
            data-ga-label="daily"
            className="hover:text-accent transition-colors"
          >
            今日の1冊
          </Link>
          <Link
            href="/grimoire/random"
            prefetch={false}
            data-ga-event="click_footer_nav"
            data-ga-label="random"
            className="hover:text-accent transition-colors"
          >
            ランダム
          </Link>
          <Link
            href="/contact"
            data-ga-event="click_footer_nav"
            data-ga-label="contact"
            className="hover:text-accent transition-colors"
          >
            お問い合わせ
          </Link>
          <Link
            href="/legal"
            data-ga-event="click_footer_nav"
            data-ga-label="legal"
            className="hover:text-accent transition-colors"
          >
            運営・プライバシー
          </Link>
          <Link
            href="/terms"
            data-ga-event="click_footer_nav"
            data-ga-label="terms"
            className="hover:text-accent transition-colors"
          >
            利用規約
          </Link>
          <Link
            href="/legal#disclaimer"
            data-ga-event="click_footer_nav"
            data-ga-label="disclaimer"
            className="hover:text-accent transition-colors"
          >
            免責事項
          </Link>
          <Link
            href="/about"
            data-ga-event="click_footer_nav"
            data-ga-label="about"
            className="hover:text-accent transition-colors"
          >
            管理人
          </Link>
          <Link
            href="/search"
            data-ga-event="click_footer_nav"
            data-ga-label="search"
            className="hover:text-accent transition-colors"
          >
            検索
          </Link>
          <Link
            href="/sitemap"
            data-ga-event="click_footer_nav"
            data-ga-label="sitemap"
            className="hover:text-accent transition-colors"
          >
            サイトマップ
          </Link>
          <a
            href="/feed.xml"
            data-ga-event="click_footer_nav"
            data-ga-label="rss"
            className="hover:text-accent transition-colors"
          >
            RSS
          </a>
        </nav>

        <p className="text-center leading-relaxed">
          OCCULT WIRE &copy; 2026
          <br />
          本サイトのAI考察はエンタメ目的です。事実とは異なる場合があります。
        </p>
      </div>
    </footer>
  );
}
