import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/data/projects";
import { site } from "@/data/site";
import { InterfaceFrame } from "@/components/InterfaceFrame";
import { SystemMap } from "@/components/SystemMap";
import { StatusPill, StackList } from "@/components/bits";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${site.name}`,
      description: project.summary,
      url: `${site.url}/work/${project.slug}`,
    },
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article>
      {/* Header */}
      <header className="wrap pt-14 pb-10 sm:pt-20 sm:pb-14">
        <Link
          href="/work"
          className="mono text-xs text-[var(--muted)] transition-colors hover:text-[var(--text)]"
        >
          ← Work
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <StatusPill status={project.status} />
          <span className="mono text-xs text-[var(--faint)]">{project.year}</span>
        </div>

        <h1
          className="mt-4 max-w-4xl font-display font-semibold leading-[1.02] tracking-tight"
          style={{ fontSize: "var(--text-2xl)" }}
        >
          {project.name}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-[var(--accent)]">
          {project.kicker}
        </p>
        <p className="mt-5 max-w-2xl text-[var(--muted)] leading-relaxed">
          {project.summary}
        </p>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Visit the live ${project.name} app (opens in a new tab)`}
            className="mt-7 inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Visit live app
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </header>

      {/* Interface frame */}
      <div className="wrap">
        <InterfaceFrame project={project} />
        <p className="mono mt-3 text-[0.68rem] text-[var(--faint)]">
          Schematic interface abstraction — not a product screenshot.
        </p>
      </div>

      {/* Metadata strip */}
      <div className="wrap mt-12">
        <dl className="grid gap-6 border-y border-[var(--border)] py-7 sm:grid-cols-3">
          <div>
            <dt className="eyebrow mb-1.5">Role</dt>
            <dd className="text-sm">{project.role}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-1.5">Domain</dt>
            <dd className="text-sm">{project.domain}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-1.5">Stack</dt>
            <dd className="mt-1 text-sm">
              {project.stack.length > 0 ? (
                <StackList stack={project.stack} />
              ) : (
                <span className="text-[var(--faint)]">Not published</span>
              )}
            </dd>
          </div>
        </dl>
      </div>

      {/* Narrative + system map */}
      <div className="wrap mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          {project.accentNote && (
            <p className="mb-10 border-l-2 border-[var(--accent)] pl-4 text-[var(--muted)] leading-relaxed">
              {project.accentNote}
            </p>
          )}
          <div className="flex flex-col gap-12">
            {project.sections.map((section, i) => (
              <section key={section.heading} aria-labelledby={`sec-${i}`}>
                <div className="flex items-baseline gap-3">
                  <span className="mono text-xs text-[var(--faint)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 id={`sec-${i}`} className="text-xl font-semibold">
                    {section.heading}
                  </h2>
                </div>
                <div className="mt-4 space-y-4 pl-[1.9rem]">
                  {section.body.map((p, j) => (
                    <p key={j} className="max-w-prose text-[var(--muted)] leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            {project.systemMap ? (
              <SystemMap nodes={project.systemMap} />
            ) : (
              <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--border)] p-6 text-sm text-[var(--muted)]">
                A system map for {project.name} will be added as the architecture
                is finalized.
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Next project */}
      <nav
        aria-label="Next project"
        className="wrap mt-24 border-t border-[var(--border)] pt-8"
      >
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-wrap items-baseline justify-between gap-2"
        >
          <span className="eyebrow">Next project</span>
          <span className="text-2xl font-semibold sm:text-3xl">
            <span className="link-underline">{next.name}</span>
            <span className="accent-link ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>
      </nav>
    </article>
  );
}
