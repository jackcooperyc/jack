import Link from "next/link";
import { projects, featuredProjects } from "@/data/projects";
import { site } from "@/data/site";
import { WorkRow } from "@/components/WorkRow";

export default function Home() {
  return (
    <>
      {/* Hero — leads with a statement of work, not a bio */}
      <section className="wrap pt-16 pb-14 sm:pt-24 sm:pb-20">
        <p className="eyebrow reveal">Selected work · {site.location}</p>
        <h1
          className="reveal mt-5 max-w-4xl font-display font-semibold leading-[1.02] tracking-tight"
          style={{ fontSize: "var(--text-hero)" }}
        >
          Product systems for regulated, real-world work.
        </h1>
        <p
          className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]"
          style={{ animationDelay: "0.05s" }}
        >
          {site.tagline}
        </p>
        <div
          className="reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
          style={{ animationDelay: "0.1s" }}
        >
          <Link
            href="/work"
            className="rounded-[var(--radius-sm)] bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            View the work
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="link-underline text-sm text-[var(--muted)] hover:text-[var(--text)]"
          >
            {site.email}
          </a>
        </div>
      </section>

      <div className="wrap">
        <div className="rule" />
      </div>

      {/* Featured work */}
      <section className="wrap py-16 sm:py-24" aria-labelledby="work-heading">
        <div className="mb-14 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">01 — Selected work</p>
            <h2 id="work-heading" className="mt-3 text-2xl font-semibold sm:text-3xl">
              What I&apos;m building
            </h2>
          </div>
          <Link
            href="/work"
            className="accent-link hidden shrink-0 text-sm font-medium sm:inline"
          >
            All projects →
          </Link>
        </div>

        <div className="flex flex-col gap-20 sm:gap-28">
          {featuredProjects.map((p, i) => (
            <WorkRow key={p.slug} project={p} index={i} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      <div className="wrap">
        <div className="rule" />
      </div>

      {/* Approach — a compact bridge to the About page, kept product-led */}
      <section className="wrap py-16 sm:py-24" aria-labelledby="approach-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">02 — Approach</p>
            <h2
              id="approach-heading"
              className="mt-3 text-2xl font-semibold sm:text-3xl"
            >
              How the work fits together
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {approach.map((a) => (
                <div key={a.title}>
                  <h3 className="text-lg font-semibold">{a.title}</h3>
                  <p className="mt-2 text-[var(--muted)] leading-relaxed">
                    {a.body}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="accent-link mt-10 inline-block text-sm font-medium"
            >
              More about how I work →
            </Link>
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="rule" />
      </div>

      {/* Contact */}
      <section className="wrap py-16 sm:py-24" aria-labelledby="contact-heading">
        <p className="eyebrow">03 — Contact</p>
        <h2
          id="contact-heading"
          className="mt-3 max-w-3xl text-2xl font-semibold sm:text-3xl"
        >
          Working on something in a regulated or operations-heavy space?
        </h2>
        <p className="mt-4 max-w-xl text-[var(--muted)] leading-relaxed">
          The best way to reach me is email. I read everything and reply to
          messages that are specific.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={`mailto:${site.email}`}
            className="rounded-[var(--radius-sm)] bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            {site.email}
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer noopener"
            className="link-underline text-sm text-[var(--muted)] hover:text-[var(--text)]"
          >
            GitHub ↗
          </a>
        </div>
      </section>

      {/* Structured hint for crawlers: how many projects */}
      <div className="sr-only">
        {projects.length} projects · {site.name}, {site.role}.
      </div>
    </>
  );
}

const approach = [
  {
    title: "Product architecture",
    body: "I start from the data model and the constraints, then design the interfaces on top. The system's shape comes first; the screens follow from it.",
  },
  {
    title: "Systems integration",
    body: "Most of my work connects tools that weren't built to talk to each other — point-of-sale, compliance, maps, lab data — into one coherent record.",
  },
  {
    title: "Compliance-aware workflows",
    body: "In regulated spaces, the rules aren't a review step at the end. I model them once and reuse them across every surface a product touches.",
  },
  {
    title: "Shipping across disciplines",
    body: "Founder-built means I move between schema, backend, interface, and copy. The product ships because one person can carry it end to end.",
  },
];
