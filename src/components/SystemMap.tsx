import type { SystemNode } from "@/data/projects";

/**
 * Compact, honest system diagram. Renders the modules/flow of a project as a
 * connected chain of labeled nodes. No fabricated data — just the named parts.
 */
export function SystemMap({ nodes }: { nodes: SystemNode[] }) {
  return (
    <figure className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">
      <figcaption className="eyebrow mb-5">System map</figcaption>
      <ol className="flex flex-col gap-0">
        {nodes.map((n, i) => (
          <li key={n.label} className="relative">
            <div className="flex items-baseline gap-4 py-2.5">
              <span className="mono w-6 shrink-0 text-xs text-[var(--faint)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <span className="font-medium text-[var(--text)]">{n.label}</span>
                <span className="mx-2 text-[var(--faint)]">—</span>
                <span className="text-sm text-[var(--muted)]">{n.detail}</span>
              </div>
            </div>
            {i < nodes.length - 1 && (
              <span
                aria-hidden="true"
                className="ml-[0.7rem] block h-4 w-px bg-[var(--border-strong)]"
              />
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
