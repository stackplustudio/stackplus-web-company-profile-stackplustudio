import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Portfolio } from "@/generated/prisma/client";
import { portfolioCategoryLabel } from "@/lib/categories";
import { cn } from "@/lib/utils";
import ProjectImage from "./ProjectImage";

type Props = { project: Portfolio; featured?: boolean; priority?: boolean };

const MAX_TAGS = 4;

function Thumb({ project, priority, sizes }: { project: Portfolio; priority?: boolean; sizes: string }) {
  const src = project.images[0];
  return src ? (
    <ProjectImage src={src} alt={`${project.title} preview`} sizes={sizes} priority={priority} />
  ) : (
    <div className="flex h-full w-full items-center justify-center text-sm text-ink/40">No image</div>
  );
}

function Tags({ tags, featured }: { tags: string[]; featured?: boolean }) {
  if (tags.length === 0) return null;
  const shown = tags.slice(0, MAX_TAGS);
  const extra = tags.length - shown.length;
  const chip = cn(
    "rounded-full border px-3 py-1 text-xs font-semibold",
    featured ? "border-white/30 text-white" : "border-line text-ink"
  );
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
      {shown.map((t) => (
        <li key={t} className={chip}>{t}</li>
      ))}
      {extra > 0 && <li className={chip}>+{extra}</li>}
    </ul>
  );
}

export default function ProjectCard({ project, featured = false, priority = false }: Props) {
  const href = `/portfolio/${project.slug}`;
  const buttonBase =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30";

  return (
    <article
      className={cn(
        "group flex overflow-hidden rounded-[16px] border",
        featured
          ? "flex-col border-primary bg-primary text-white md:col-span-2 md:flex-row lg:col-span-3"
          : "flex-col border-line bg-surface text-ink shadow-sm transition-shadow duration-300 hover:shadow-xl"
      )}
    >
      <Link
        href={href}
        aria-label={`View case study: ${project.title}`}
        className={cn("relative block aspect-[16/10] overflow-hidden", featured && "md:aspect-auto md:w-1/2")}
      >
        <Thumb
          project={project}
          priority={priority}
          sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
        />
      </Link>

      <div className={cn("flex flex-1 flex-col gap-4 p-6", featured && "md:w-1/2 md:p-10")}>
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider">
          <span
            className={cn(
              "rounded-full px-3 py-1",
              featured ? "bg-white text-primary" : "bg-primary/10 text-primary"
            )}
          >
            {portfolioCategoryLabel(project.category)}
          </span>
          <span className={featured ? "text-white/80" : "text-ink/60"}>{project.year}</span>
          {project.role && (
            <span className={featured ? "text-white/80" : "text-ink/60"}>· {project.role}</span>
          )}
        </div>

        <h3 className={cn("font-bold tracking-tight", featured ? "text-3xl md:text-4xl" : "text-xl")}>
          <Link href={href} className="hover:underline underline-offset-4">{project.title}</Link>
        </h3>

        <p className={cn("leading-relaxed", featured ? "text-white/90" : "line-clamp-2 text-ink/70", "text-sm md:text-base")}>
          {project.summary}
        </p>

        {project.metric && (
          <p className={cn("text-sm font-bold", featured ? "text-white" : "text-primary")}>
            {project.metric}
          </p>
        )}

        <Tags tags={project.techStack} featured={featured} />

        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          <Link
            href={href}
            className={cn(
              buttonBase,
              featured ? "bg-white text-primary hover:bg-surface-alt" : "bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary-dark"
            )}
          >
            Case Study <ArrowUpRight size={14} aria-hidden />
          </Link>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonBase,
                "border",
                featured ? "border-white text-white hover:bg-white hover:text-primary" : "border-ink text-ink hover:bg-ink hover:text-white"
              )}
            >
              Demo <ExternalLink size={14} aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}