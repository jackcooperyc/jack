import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[60vh] flex-col justify-center py-24">
      <p className="mono text-sm text-[var(--accent)]">404</p>
      <h1
        className="mt-3 font-display font-semibold tracking-tight"
        style={{ fontSize: "var(--text-2xl)" }}
      >
        This page isn&apos;t here.
      </h1>
      <p className="mt-4 max-w-md text-[var(--muted)] leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Head back
        to the work.
      </p>
      <div className="mt-8 flex gap-6">
        <Link
          href="/"
          className="rounded-[var(--radius-sm)] bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
        >
          Home
        </Link>
        <Link
          href="/work"
          className="link-underline self-center text-sm text-[var(--muted)] hover:text-[var(--text)]"
        >
          View the work →
        </Link>
      </div>
    </section>
  );
}
