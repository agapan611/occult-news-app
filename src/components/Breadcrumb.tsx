import Link from "next/link";

export type BreadcrumbItem = {
  name: string;
  href?: string;
};

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="パンくずリスト" className="border-b border-card-border">
      <ol className="mx-auto flex w-full max-w-lg flex-wrap items-center gap-1.5 px-4 py-2 text-[11px] text-muted">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <span className="text-muted/40" aria-hidden>
                /
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-accent transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span
                className="truncate max-w-[200px] text-foreground/70"
                aria-current="page"
              >
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
