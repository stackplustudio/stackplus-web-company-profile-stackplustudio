import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Portfolio } from "@/generated/prisma/client";
import { portfolioCategoryLabel } from "@/lib/categories";

/** Kartu proyek ukuran sedang untuk Home (marquee). Seluruh kartu adalah satu tautan. */
export default function ProjectTile({ project, focusable = true }: { project: Portfolio; focusable?: boolean }) {
  const src = project.images[0];
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      tabIndex={focusable ? undefined : -1}
      className="card-hover group block h-full overflow-hidden rounded-[16px] border border-line bg-surface shadow-sm"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-alt">
        {src && (
          <Image
            src={src}
            alt={focusable ? `${project.title} preview` : ""}
            fill
            sizes="364px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">{portfolioCategoryLabel(project.category)}</span>
          <span className="text-ink/50">{project.year}</span>
        </div>
        <h3 className="truncate text-lg font-bold text-ink-dark">{project.title}</h3>
        <p className="mt-1 line-clamp-1 text-sm text-ink/60">{project.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">
          View case study
          <ArrowUpRight size={14} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}