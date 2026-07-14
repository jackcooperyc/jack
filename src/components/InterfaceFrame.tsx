import Image from "next/image";
import type { Project } from "@/data/projects";

/**
 * Product visual for a project — real in-app screenshot when available,
 * otherwise an abstract schematic that suggests the product shape without
 * fabricating a UI. Schematics use theme currentColor + accent.
 */

function Chrome({
  children,
  label,
  bare = false,
}: {
  children: React.ReactNode;
  label: string;
  bare?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)]">
      <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface-alt)] px-3.5 py-2">
        <span className="h-2 w-2 rounded-full border border-[var(--border-strong)]" />
        <span className="h-2 w-2 rounded-full border border-[var(--border-strong)]" />
        <span className="h-2 w-2 rounded-full border border-[var(--border-strong)]" />
        <span className="mono ml-2 truncate text-[0.68rem] text-[var(--faint)]">
          {label}
        </span>
      </div>
      {bare ? children : <div className="p-4 sm:p-5">{children}</div>}
    </div>
  );
}

function ScreenshotFrame({ project }: { project: Project }) {
  const shot = project.screenshot!;
  const hostLabel =
    project.liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "") ??
    project.name.toLowerCase();

  return (
    <Chrome label={hostLabel} bare>
      <div className="relative aspect-[16/10] w-full bg-[var(--surface-alt)]">
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          className="object-cover object-top"
          sizes="(min-width: 1024px) 50vw, 100vw"
          unoptimized
        />
      </div>
    </Chrome>
  );
}

function Bar({ w, accent = false }: { w: string; accent?: boolean }) {
  return (
    <span
      className="block h-2 rounded-full"
      style={{
        width: w,
        background: accent ? "var(--accent)" : "var(--border-strong)",
      }}
    />
  );
}

function Compliance() {
  return (
    <Chrome label="cupr.os / compliance-studio">
      <div className="grid gap-4 sm:grid-cols-[1fr_1.4fr]">
        <div className="space-y-2.5">
          <Bar w="60%" />
          <Bar w="80%" />
          <Bar w="45%" accent />
          <Bar w="70%" />
        </div>
        <div className="rounded-[var(--radius-sm)] border border-[var(--border)] p-3.5">
          <div className="mono mb-2 text-[0.66rem] text-[var(--faint)]">
            RULE CHECK · MT
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <Bar w="70%" />
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <Bar w="55%" />
            </div>
            <div className="flex items-center gap-2 opacity-50">
              <span className="h-1.5 w-1.5 rounded-full border border-[var(--border-strong)]" />
              <Bar w="60%" />
            </div>
          </div>
        </div>
      </div>
    </Chrome>
  );
}

function Journal() {
  return (
    <Chrome label="budbook / journal">
      <div className="grid gap-3 sm:grid-cols-3">
        {["Stash", "Journal", "Cannadex"].map((t, i) => (
          <div
            key={t}
            className="rounded-[var(--radius-sm)] border border-[var(--border)] p-3"
          >
            <span
              className="mb-2 block h-6 w-6 rounded-[var(--radius-xs)]"
              style={{
                background: i === 1 ? "var(--accent)" : "var(--surface-alt)",
              }}
            />
            <div className="mono text-[0.66rem] text-[var(--muted)]">{t}</div>
            <div className="mt-2 space-y-1.5">
              <Bar w="80%" />
              <Bar w="55%" />
            </div>
          </div>
        ))}
      </div>
    </Chrome>
  );
}

function Vineyard() {
  return (
    <Chrome label="vineyard / field-mode (offline)">
      <div className="grid gap-4 sm:grid-cols-[1.4fr_1fr]">
        <div className="grid-field rounded-[var(--radius-sm)] border border-[var(--border)]">
          <div className="grid h-full grid-cols-4 gap-px p-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="rounded-[1px]"
                style={{
                  background:
                    i === 5 || i === 6 ? "var(--accent)" : "var(--border)",
                  opacity: i === 5 || i === 6 ? 1 : 0.6,
                  minHeight: 14,
                }}
              />
            ))}
          </div>
        </div>
        <div className="space-y-2.5">
          <div className="mono flex items-center gap-2 text-[0.66rem] text-[var(--accent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            OFFLINE · 3 queued
          </div>
          <Bar w="70%" />
          <Bar w="90%" />
          <Bar w="50%" />
          <div className="mono pt-1 text-[0.66rem] text-[var(--faint)]">
            Block 4 · Row 12
          </div>
        </div>
      </div>
    </Chrome>
  );
}

function Events() {
  return (
    <Chrome label="budbeat / community">
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <span
              className="mono flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-xs)] border border-[var(--border)] text-[0.62rem] text-[var(--muted)]"
              style={
                i === 0
                  ? { borderColor: "var(--accent)", color: "var(--accent)" }
                  : undefined
              }
            >
              {i === 0 ? "LIVE" : "SAT"}
            </span>
            <div className="flex-1 space-y-1.5">
              <Bar w={i === 0 ? "60%" : "45%"} accent={i === 0} />
              <Bar w="80%" />
            </div>
          </div>
        ))}
      </div>
    </Chrome>
  );
}

function Generic({ name }: { name: string }) {
  return (
    <Chrome label={name.toLowerCase()}>
      <div className="space-y-3">
        <Bar w="40%" accent />
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Bar w="90%" />
            <Bar w="70%" />
            <Bar w="80%" />
          </div>
          <div className="space-y-2">
            <Bar w="75%" />
            <Bar w="60%" />
            <Bar w="85%" />
          </div>
        </div>
      </div>
    </Chrome>
  );
}

function Schematic({ project }: { project: Project }) {
  switch (project.frame) {
    case "compliance":
      return <Compliance />;
    case "journal":
      return <Journal />;
    case "vineyard":
      return <Vineyard />;
    case "events":
      return <Events />;
    default:
      return <Generic name={project.name} />;
  }
}

export function InterfaceFrame({ project }: { project: Project }) {
  if (project.screenshot) {
    return <ScreenshotFrame project={project} />;
  }
  return <Schematic project={project} />;
}
