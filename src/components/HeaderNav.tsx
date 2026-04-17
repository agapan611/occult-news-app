"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems: { href: string; label: string; match: (p: string) => boolean }[] = [
  { href: "/", label: "NEWS", match: (p) => p === "/" },
  {
    href: "/grimoire",
    label: "GRIMOIRE",
    match: (p) => p === "/grimoire" || p.startsWith("/grimoire/"),
  },
];

export default function HeaderNav() {
  const pathname = usePathname() ?? "/";

  return (
    <nav className="border-t border-card-border/40">
      <div className="mx-auto flex max-w-lg">
        {navItems.map((item) => {
          const active = item.match(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex-1 py-3 text-center text-[13px] font-bold tracking-[0.25em] transition-colors ${
                active ? "text-accent" : "text-muted hover:text-foreground"
              }`}
            >
              {item.label}
              {active && (
                <span className="absolute inset-x-0 -bottom-px h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
