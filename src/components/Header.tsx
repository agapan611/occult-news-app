import Image from "next/image";
import Link from "next/link";
import HeaderNav from "./HeaderNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-card-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-lg items-center gap-3 px-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex -space-x-2">
            <Image
              src="/shuna.png"
              alt="シュナ"
              width={28}
              height={28}
              className="rounded-full border-2 border-background z-10"
            />
            <Image
              src="/raika.png"
              alt="ライカ"
              width={28}
              height={28}
              className="rounded-full border-2 border-background"
            />
          </div>
          <h1 className="text-sm font-bold tracking-[0.15em]">
            <span className="text-accent">OCCULT</span>
            <span className="text-muted ml-1 text-[11px] font-normal">WIRE</span>
          </h1>
        </Link>
        <div className="flex-1" />
        <a
          href="https://x.com/occult_wire"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="OCCULT WIRE on X"
          className="shrink-0 text-muted hover:text-accent transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            width={14}
            height={14}
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <Link
          href="/about"
          className="shrink-0 text-[11px] text-muted hover:text-accent transition-colors"
        >
          管理人
        </Link>
      </div>
      <HeaderNav />
    </header>
  );
}
