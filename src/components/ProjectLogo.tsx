import Image from "next/image";
import type { Project } from "@/data/projects";

type Size = "sm" | "md" | "lg";

const sizeClass: Record<Size, string> = {
  sm: "h-7 max-w-[9rem] sm:h-8 sm:max-w-[11rem]",
  md: "h-9 max-w-[12rem] sm:h-10 sm:max-w-[14rem]",
  lg: "h-11 max-w-[16rem] sm:h-14 sm:max-w-[20rem]",
};

/**
 * Product brand mark on a dark plate so logos with black/matte artboards
 * read correctly in both light and dark portfolio themes.
 */
export function ProjectLogo({
  project,
  size = "md",
  className = "",
}: {
  project: Project;
  size?: Size;
  className?: string;
}) {
  if (!project.logo) return null;

  return (
    <div
      className={
        "inline-flex items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[#0a0a0a] px-3 py-2 " +
        className
      }
    >
      <Image
        src={project.logo.src}
        alt={project.logo.alt}
        width={640}
        height={360}
        className={"w-auto object-contain object-left " + sizeClass[size]}
        unoptimized
      />
    </div>
  );
}
