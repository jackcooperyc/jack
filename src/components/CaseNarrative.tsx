import type { Project } from "@/data/projects";
import { SystemMap } from "./SystemMap";

/**
 * Full-width case-study narrative used by the inline expander on the work
 * index. Renders the fixed Context → Problem → System → Decisions →
 * Current state order with the narrative (7 cols) + system-map/sidebar (5
 * cols) layout, matching the standalone case-study page. It spans the full
 * standard content width of its container rather than a nested column, and
 * collapses to a single clean column on mobile.
 */
export function CaseNarrative({
  project,
  headingId,
}: {
  project: Project;
  headingId?: string;
}) {
  return (
    <div className="grid gap-10 pt-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        {project.accentNote && (
          <p className="mb-10 border-l-2 border-[var(--accent)] pl-4 text-[var(--muted)] leading-relaxed">
            {project.accentNote}
          </p>
        )}
        <div className="flex flex-col gap-10 sm:gap-12">
          {project.sections.map((section, i) => (
            <section
              key={section.heading}
              aria-labelledby={`${headingId ?? project.slug}-sec-${i}`}
            >
              <div className="flex items-baseline gap-3">
                <span className="mono text-xs text-[var(--faint)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4
                  id={`${headingId ?? project.slug}-sec-${i}`}
                  className="text-lg font-semibold sm:text-xl"
                >
                  {section.heading}
                </h4>
              </div>
              <div className="mt-4 space-y-4 pl-[1.9rem]">
                {section.body.map((p, j) => (
                  <p
                    key={j}
                    className="max-w-prose text-[var(--muted)] leading-relaxed"
                  >
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
          <dl className="mt-6 grid gap-4 border-t border-[var(--border)] pt-6">
            <div className="flex gap-3">
              <dt className="eyebrow w-24 shrink-0">Role</dt>
              <dd className="text-sm text-[var(--muted)]">{project.role}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="eyebrow w-24 shrink-0">Domain</dt>
              <dd className="text-sm text-[var(--muted)]">{project.domain}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="eyebrow w-24 shrink-0">Year</dt>
              <dd className="text-sm text-[var(--muted)]">{project.year}</dd>
            </div>
          </dl>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Visit the live ${project.name} app (opens in a new tab)`}
              className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Visit live app
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </aside>
    </div>
  );
}
