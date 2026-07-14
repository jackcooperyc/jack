/**
 * Compact archive / hardware record strip (serial, status, clearance, specs).
 */
export function ArchiveRecord({
  serial,
  status,
  clearance,
  specs,
}: {
  serial: string;
  status: string;
  clearance: string;
  specs: string[];
}) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
      <p className="eyebrow mb-4">Archive record</p>
      <dl className="grid gap-4 sm:grid-cols-3">
        <div>
          <dt className="mono text-[0.68rem] text-[var(--faint)]">Serial</dt>
          <dd className="mt-1 font-mono text-sm tracking-wide">{serial}</dd>
        </div>
        <div>
          <dt className="mono text-[0.68rem] text-[var(--faint)]">Status</dt>
          <dd className="mt-1 text-sm">{status}</dd>
        </div>
        <div>
          <dt className="mono text-[0.68rem] text-[var(--faint)]">Clearance</dt>
          <dd className="mt-1 font-mono text-sm tracking-wide">{clearance}</dd>
        </div>
      </dl>
      {specs.length > 0 && (
        <ul className="mt-5 space-y-2 border-t border-[var(--border)] pt-5">
          {specs.map((spec) => (
            <li key={spec} className="flex gap-2 text-sm text-[var(--muted)]">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
              {spec}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
