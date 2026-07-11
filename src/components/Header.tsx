"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Monogram } from "./Monogram";
import { ThemeToggle } from "./ThemeToggle";
import { site } from "@/data/site";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[var(--text)]"
          aria-label="Jack Cooper — home"
        >
          <Monogram size={26} />
          <span className="font-display text-[0.98rem] font-semibold tracking-tight whitespace-nowrap">
            Jack Cooper
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {site.nav.map((item) => {
            const href = item.href as string;
            const isExternal = href.startsWith("mailto:");
            const active =
              !isExternal &&
              (href === "/" ? pathname === "/" : pathname.startsWith(href));
            const cls =
              "px-2.5 py-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--text)]" +
              (active ? " text-[var(--text)] font-medium" : "");
            return isExternal ? (
              <a key={href} href={href} className={cls}>
                {item.label}
              </a>
            ) : (
              <Link
                key={href}
                href={href}
                className={cls}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <span className="ml-1.5">
            <ThemeToggle />
          </span>
        </nav>
      </div>
    </header>
  );
}
