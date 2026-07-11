import Link from "next/link";
import { Monogram } from "./Monogram";
import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-[var(--border)]">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <Monogram size={24} />
            <span className="font-display text-base font-semibold">Jack Cooper</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--muted)]">
            {site.role} in {site.location}.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-3">Site</p>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            <li>
              <Link href="/work" className="link-underline hover:text-[var(--text)]">
                Work
              </Link>
            </li>
            <li>
              <Link href="/about" className="link-underline hover:text-[var(--text)]">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-3">Contact</p>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="link-underline hover:text-[var(--text)]"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline hover:text-[var(--text)]"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap flex flex-col gap-2 border-t border-[var(--border)] py-6 text-xs text-[var(--faint)] sm:flex-row sm:items-center sm:justify-between">
        <span className="mono">© {year} Jack Cooper</span>
        <span className="mono">Missoula, MT · 46.87°N 113.99°W</span>
      </div>
    </footer>
  );
}
