import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-card-border py-6 text-center text-xs text-muted">
      <nav className="mb-3 flex flex-wrap justify-center gap-x-4 gap-y-2">
        <Link href="/grimoire/daily" prefetch={false} className="hover:text-accent transition-colors">
          今日の1冊
        </Link>
        <Link href="/grimoire/random" prefetch={false} className="hover:text-accent transition-colors">
          ランダム
        </Link>
        <Link href="/contact" className="hover:text-accent transition-colors">
          お問い合わせ
        </Link>
        <Link href="/legal" className="hover:text-accent transition-colors">
          運営・プライバシー
        </Link>
        <Link href="/legal#disclaimer" className="hover:text-accent transition-colors">
          免責事項
        </Link>
        <Link href="/about" className="hover:text-accent transition-colors">
          管理人
        </Link>
        <a href="/feed.xml" className="hover:text-accent transition-colors">
          RSS
        </a>
      </nav>
      <p className="px-4 leading-relaxed">
        OCCULT WIRE &copy; 2026
        <br />
        本サイトのAI考察はエンタメ目的です。事実とは異なる場合があります。
      </p>
    </footer>
  );
}
