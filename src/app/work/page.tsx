import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectLogo } from "@/components/ProjectLogo";
import { StatusPill, StackList } from "@/components/bits";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work by Jack Cooper — compliance software, product intelligence, and operations tooling. CŪPR.OS, BudBook, the Vineyard platform, BudBeat, and Matchbox.",
  alternates: { canonical: "/work" },
};

export default function WorkIndex() {
  return (
    <>
      <section className="wrap pt-16 pb-10 sm:pt-24 sm:pb-14">
        <p className="eyebrow">Work</p>
        <h1
          className="mt-4 max-w-3xl font-display font-semibold leading-[1.05] tracking-tight"
          style={{ fontSize: "var(--text-2xl)" }}
        >
          Five projects, one throughline: software for work that has rules.
        </h1>
        <p className="mt-5 max-w-2xl text-[var(--muted)] leading-relaxed">
          Each case study follows the same structure — context, problem, system,
          decisions, and current state. Where work is still in development, it&apos;s
          labeled as such. No outcomes are claimed before they exist.
        </p>
      </section>

      <section className="wrap pb-16 sm:pb-24" aria-label="All projects">
        <ul className="border-t border-[var(--border)]">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className="group grid gap-4 border-b border-[var(--border)] py-8 transition-colors hover:bg-[var(--surface)] sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:px-2"
              >
                <div className="flex items-center gap-4 sm:col-span-4">
                  <span className="mono text-xs text-[var(--faint)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <ProjectLogo project={p} size="sm" className="mb-2" />
                    <h2 className="text-xl font-semibold">
                      <span className="link-underline">{p.name}</span>
                    </h2>
                    <p className="mt-0.5 text-sm text-[var(--accent)]">
                      {p.kicker}
                    </p>
                  </div>
                </div>

                <p className="text-[var(--muted)] leading-relaxed sm:col-span-5 sm:text-sm">
                  {p.summary}
                </p>

                <div className="flex flex-col gap-2 sm:col-span-3 sm:items-end">
                  <StatusPill status={p.status} />
                  <span className="mono text-xs text-[var(--faint)]">{p.year}</span>
                  <div className="sm:hidden">
                    <StackList stack={p.stack} />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
