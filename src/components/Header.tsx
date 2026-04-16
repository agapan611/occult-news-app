import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-lg items-center gap-3 px-4">
        <Image
          src="/shuna.png"
          alt="シュナ"
          width={32}
          height={32}
          className="rounded-full border border-accent/30"
        />
        <div className="flex-1">
          <h1 className="text-base font-bold tracking-wider">
            <span className="text-accent">OCCULT</span>
            <span className="text-muted ml-1 text-sm font-normal">WIRE</span>
          </h1>
        </div>
        <span className="text-[10px] text-muted">管理人: シュナ</span>
      </div>
    </header>
  );
}
