import type { Project } from "@/data/projects";

type Variant = "inline" | "button";

/**
 * Live deploy + GitHub links for a project. Renders only the URLs that exist.
 */
export function ProjectLinks({
  project,
  variant = "inline",
  className = "",
}: {
  project: Project;
  variant?: Variant;
  className?: string;
}) {
  if (!project.liveUrl && !project.githubUrl) return null;

  if (variant === "button") {
    return (
      <div className={"flex flex-wrap items-center gap-3 " + className}>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Visit the live ${project.name} app (opens in a new tab)`}
            className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Visit live app
            <span aria-hidden="true">↗</span>
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`View ${project.name} on GitHub (opens in a new tab)`}
            className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            GitHub
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    );
  }

  return (
    <div className={"flex flex-wrap items-center gap-x-6 gap-y-3 " + className}>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Visit the live ${project.name} app (opens in a new tab)`}
          className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text)]"
        >
          Visit live app
          <span aria-hidden="true" className="text-[var(--muted)]">
            ↗
          </span>
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`View ${project.name} on GitHub (opens in a new tab)`}
          className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text)]"
        >
          GitHub
          <span aria-hidden="true" className="text-[var(--muted)]">
            ↗
          </span>
        </a>
      )}
    </div>
  );
}
