import type { ProjectStatus } from "@/data/projects";

export function StatusPill({ status }: { status: ProjectStatus }) {
  const live = status === "Live / in use";
  return (
    <span className="mono inline-flex items-center gap-1.5 text-[0.68rem] uppercase tracking-wider text-[var(--muted)]">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: live ? "var(--accent)" : "var(--border-strong)" }}
        aria-hidden="true"
      />
      {status}
    </span>
  );
}

export function StackList({ stack }: { stack: readonly string[] }) {
  if (stack.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-x-2 gap-y-1">
      {stack.map((s, i) => (
        <li key={s} className="mono text-xs text-[var(--muted)]">
          {s}
          {i < stack.length - 1 && (
            <span className="ml-2 text-[var(--faint)]" aria-hidden="true">
              /
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
