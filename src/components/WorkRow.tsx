"use client";

import { useId, useState } from "react";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { InterfaceFrame } from "./InterfaceFrame";
import { CaseNarrative } from "./CaseNarrative";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectLogo } from "./ProjectLogo";
import { StatusPill, StackList } from "./bits";

/**
 * Asymmetric editorial work row. The collapsed summary and the "Read the case
 * study" trigger live in the editorial column; the alternating interface frame
 * sits opposite (controlled by `flip`).
 *
 * When expanded, the full case-study narrative renders in a NEW full-width row
 * BENEATH the two-column presentation — spanning the standard content width of
 * the container rather than being confined to the editorial column. Expansion
 * state is in-memory only. On mobile everything is a single column.
 */
export function WorkRow({
  project,
  index,
  flip = false,
}: {
  project: Project;
  index: number;
  flip?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <article className="group">
      {/* Two-column project presentation */}
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className={"lg:col-span-6 " + (flip ? "lg:order-2" : "lg:order-1")}>
          <Link
            href={`/work/${project.slug}`}
            aria-label={`Open the ${project.name} case study page`}
            className="block transition-transform duration-500 ease-out group-hover:-translate-y-1"
          >
            <InterfaceFrame project={project} />
          </Link>
        </div>

        <div className={"lg:col-span-6 " + (flip ? "lg:order-1" : "lg:order-2")}>
          <div className="flex items-center gap-4">
            <span className="mono text-xs text-[var(--faint)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <StatusPill status={project.status} />
          </div>

          <ProjectLogo project={project} size="md" className="mt-4" />

          <h3 className="mt-3 text-2xl font-semibold sm:text-[2rem]">
            <Link href={`/work/${project.slug}`} className="link-underline">
              {project.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-[var(--accent)]">{project.kicker}</p>

          <p className="mt-4 max-w-md text-[var(--muted)] leading-relaxed">
            {project.summary}
          </p>

          <div className="mt-5">
            <StackList stack={project.stack} />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
              className="accent-link inline-flex items-center gap-1.5 text-sm font-medium"
            >
              {open ? "Hide case study" : "Read the case study"}
              <span
                aria-hidden="true"
                className={
                  "transition-transform duration-300 " +
                  (open ? "rotate-90" : "group-hover:translate-x-0.5")
                }
              >
                →
              </span>
            </button>

            <ProjectLinks project={project} />
          </div>
        </div>
      </div>

      {/* Full-width expandable narrative row */}
      <div
        id={panelId}
        hidden={!open}
        className="border-t border-[var(--border)] mt-10"
      >
        {open && <CaseNarrative project={project} headingId={panelId} />}
      </div>
    </article>
  );
}
