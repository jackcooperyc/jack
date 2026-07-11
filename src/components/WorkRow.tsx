import Link from "next/link";
import type { Project } from "@/data/projects";
import { InterfaceFrame } from "./InterfaceFrame";
import { StatusPill, StackList } from "./bits";

/**
 * Asymmetric editorial work row. Alternating layout (interface frame left/right)
 * is controlled by `flip`. Text column carries index, name, summary, metadata.
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
  return (
    <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div
        className={
          "lg:col-span-6 " + (flip ? "lg:order-2" : "lg:order-1")
        }
      >
        <Link
          href={`/work/${project.slug}`}
          aria-label={`Read the ${project.name} case study`}
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

        <Link
          href={`/work/${project.slug}`}
          className="accent-link mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
        >
          Read the case study
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
