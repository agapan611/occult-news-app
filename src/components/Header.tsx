export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
        <h1 className="text-lg font-bold tracking-wider">
          <span className="text-accent">OCCULT</span>
          <span className="text-muted ml-1 text-sm font-normal">WIRE</span>
        </h1>
        <span className="text-xs text-muted">AI考察ニュース</span>
      </div>
    </header>
  );
}
