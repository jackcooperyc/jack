import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Jack Cooper is a startup founder and full-stack product builder in Missoula, Montana, working across product architecture, systems integration, and compliance-aware workflows.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <section className="wrap pt-16 pb-12 sm:pt-24 sm:pb-16">
        <p className="eyebrow">About</p>
        <h1
          className="mt-4 max-w-3xl font-display font-semibold leading-[1.05] tracking-tight"
          style={{ fontSize: "var(--text-2xl)" }}
        >
          I build product systems end to end — from the data model to the copy on
          the button.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
          {site.name} is a startup founder and full-stack product builder based in{" "}
          {site.location}. My work sits where operations, regulation, and software
          meet — the places where the rules are real and the data has to be right.
        </p>
      </section>

      <div className="wrap">
        <div className="rule" />
      </div>

      {/* Approach detail */}
      <section className="wrap py-16 sm:py-20" aria-labelledby="approach">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="approach" className="text-2xl font-semibold sm:text-3xl">
              How I work
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="flex flex-col divide-y divide-[var(--border)]">
              {pillars.map((p, i) => (
                <div key={p.title} className="grid gap-2 py-7 first:pt-0 sm:grid-cols-12 sm:gap-6">
                  <span className="mono text-xs text-[var(--faint)] sm:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold sm:col-span-4">{p.title}</h3>
                  <p className="text-[var(--muted)] leading-relaxed sm:col-span-7">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="rule" />
      </div>

      {/* Context / bio, kept short and grounded */}
      <section className="wrap py-16 sm:py-20" aria-labelledby="context">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="context" className="text-2xl font-semibold sm:text-3xl">
              Where the work comes from
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-4 max-w-prose text-[var(--muted)] leading-relaxed">
            <p>
              Most of what I build shares a starting point: a real operation
              running on tools that don&apos;t fit it. A dispensary reconciling
              sales against compliance by hand. A cannabis user with no reliable
              record of what worked. A vineyard crew logging fieldwork on paper
              because the software gives up when the signal does.
            </p>
            <p>
              I take those constraints seriously and design the system around them
              first. Compliance, offline reliability, and trustworthy data
              aren&apos;t features bolted on at the end — they&apos;re the shape of
              the product from the first schema.
            </p>
            <p>
              As a founder, I carry projects across disciplines: data modeling,
              backend, interface design, and the writing that makes a product
              legible. That range is what lets these systems actually ship.
            </p>
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="rule" />
      </div>

      {/* Contact */}
      <section className="wrap py-16 sm:py-20" aria-labelledby="contact">
        <h2 id="contact" className="text-2xl font-semibold sm:text-3xl">
          Get in touch
        </h2>
        <p className="mt-4 max-w-xl text-[var(--muted)] leading-relaxed">
          Email is best. If you&apos;re building in a regulated or
          operations-heavy space, tell me the specific problem you&apos;re stuck
          on.
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
          <Link
            href="/work"
            className="link-underline text-sm text-[var(--muted)] hover:text-[var(--text)]"
          >
            See the work →
          </Link>
        </div>
      </section>
    </>
  );
}

const pillars = [
  {
    title: "Product architecture",
    body: "I design from the data model outward. Getting the entities, relationships, and constraints right first means the interface has something solid to stand on — and stays coherent as the product grows.",
  },
  {
    title: "Systems integration",
    body: "The interesting work is usually in the seams: connecting point-of-sale, compliance rules, mapping data, and lab records into one system that agrees with itself. I build the connective layer, not just another silo.",
  },
  {
    title: "Compliance-aware workflows",
    body: "In regulated industries, the rules shape everything. I model them as first-class data and reuse them across every surface — so a product can't quietly do something it isn't allowed to.",
  },
  {
    title: "Shipping across disciplines",
    body: "Founder-built means moving fluidly between schema, backend, frontend, and copy. I'd rather own the whole path from problem to shipped product than hand it off at every boundary.",
  },
];
