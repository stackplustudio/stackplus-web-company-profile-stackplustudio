import type { Portfolio } from "@/generated/prisma/client";
import ProjectCard from "./ProjectCard";

const MAX_FEATURED = 3;

/** Featured besar di atas (maks 3, satu per baris), sisanya grid 3/2/1 kolom. */
export default function ProjectGrid({ projects }: { projects: Portfolio[] }) {
  const featured = projects.filter((p) => p.featured).slice(0, MAX_FEATURED);
  const featuredIds = new Set(featured.map((p) => p.id));
  const rest = projects.filter((p) => !featuredIds.has(p.id));

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {featured.map((p, i) => (
        <ProjectCard key={p.id} project={p} featured priority={i === 0} />
      ))}
      {rest.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
}