import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
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
          <h1 className="text-sm font-bold tracking-wider">
            <span className="text-accent">OCCULT</span>
            <span className="text-muted ml-0.5 text-[11px] font-normal">WIRE</span>
          </h1>
        </Link>

        <nav className="flex-1 flex justify-end items-center gap-3 text-[11px]">
          <Link href="/stories" className="text-muted hover:text-accent transition-colors">
            読み物
          </Link>
          <Link href="/about" className="text-muted hover:text-accent transition-colors">
            管理人
          </Link>
        </nav>
      </div>
    </header>
  );
}
