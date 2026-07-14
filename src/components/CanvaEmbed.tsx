/**
 * Lazy Canva watch embed for hardware anatomy (e.g. Apache 110).
 * Static-export friendly: plain iframe, no runtime Canva SDK.
 */
export function CanvaEmbed({
  embedSrc,
  watchUrl,
  title,
}: {
  embedSrc: string;
  watchUrl: string;
  title: string;
}) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
      <p className="eyebrow mb-2">360° Anatomy</p>
      <p className="mb-4 max-w-prose text-sm text-[var(--muted)] leading-relaxed">
        Use fullscreen in the player controls to expand.
      </p>
      <div
        className="relative w-full overflow-hidden rounded-[var(--radius-sm)] bg-[var(--surface-alt)]"
        style={{ paddingTop: "79.8898%" }}
      >
        <iframe
          loading="lazy"
          title={title}
          src={embedSrc}
          allowFullScreen
          allow="fullscreen"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <p className="mt-3 text-sm text-[var(--faint)]">
        <a
          href={watchUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="link-underline text-[var(--muted)] hover:text-[var(--accent)]"
        >
          Design
        </a>{" "}
        by Jack Cooper
      </p>
    </div>
  );
}
