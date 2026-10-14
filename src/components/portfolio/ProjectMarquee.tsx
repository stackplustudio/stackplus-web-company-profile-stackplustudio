import type { Portfolio } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import ProjectTile from "./ProjectTile";

const MIN_PER_SET = 8; // jumlah kartu minimal dalam satu putaran supaya tidak ada ruang kosong
const SECONDS_PER_CARD = 6; // makin besar makin pelan

/** Membagi proyek ke dua baris. Proyek sedikit: baris kedua memakai urutan terbalik. */
function splitRows(projects: Portfolio[]): [Portfolio[], Portfolio[]] {
  if (projects.length >= 6) {
    return [projects.filter((_, i) => i % 2 === 0), projects.filter((_, i) => i % 2 === 1)];
  }
  return [projects, [...projects].reverse()];
}

function Track({ items, reverse }: { items: Portfolio[]; reverse?: boolean }) {
  const repeats = Math.max(1, Math.ceil(MIN_PER_SET / items.length));
  const oneSet = Array.from({ length: repeats }).flatMap(() => items);
  const duration = oneSet.length * SECONDS_PER_CARD;

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <ul
        style={{ animationDuration: `${duration}s` }}
        className={cn(
          "flex w-max py-3 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]",
          reverse ? "animate-marquee-x-reverse" : "animate-marquee-x"
        )}
      >
        {[0, 1].flatMap((copy) =>
          oneSet.map((project, i) => (
            <li
              key={`${copy}-${i}`}
              aria-hidden={copy === 1 ? true : undefined}
              className={cn("w-[324px] flex-shrink-0 pr-6 sm:w-[364px]")}
            >
              <ProjectTile project={project} focusable={copy === 0} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

/** Dua baris proyek yang bergeser horizontal ke arah berlawanan. Berhenti saat di-hover. */
export default function ProjectMarquee({ projects }: { projects: Portfolio[] }) {
  const [top, bottom] = splitRows(projects);
  return (
    <div className="space-y-2" role="region" aria-label="Featured projects">
      <Track items={top} />
      <Track items={bottom} reverse />
    </div>
  );
}