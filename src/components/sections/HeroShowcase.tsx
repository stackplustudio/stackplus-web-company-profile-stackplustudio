"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ProjectImage from "@/components/portfolio/ProjectImage";

export type ShowcaseProject = {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  image: string | null;
};

const ROTATE_MS = 5000;

/** Satu kartu yang isinya berganti ke proyek berikutnya (loncat 2, agar kartu A dan B tidak pernah sama). */
function ShowcaseCard({ projects, start, offsetMs, className, floatClass }: {
  projects: ShowcaseProject[];
  start: number;
  offsetMs: number;
  className: string;
  floatClass: string;
}) {
  const [index, setIndex] = useState(start);

  useEffect(() => {
    if (projects.length < 2) return;
    let interval: ReturnType<typeof setInterval>;
    const first = setTimeout(() => {
      setIndex((i) => i + 2);
      interval = setInterval(() => setIndex((i) => i + 2), ROTATE_MS);
    }, offsetMs + ROTATE_MS);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [projects.length, offsetMs]);

  const project = projects[index % projects.length];

  return (
    <div className={cn("absolute", className)}>
      <div className={floatClass}>
        <Link
          href={`/portfolio/${project.slug}`}
          aria-label={`View ${project.title} case study`}
          className="group relative block aspect-[16/10] overflow-hidden rounded-[22px] bg-primary shadow-2xl shadow-primary/30 ring-1 ring-white/30"
        >
          {/* Isi kartu: berganti dengan fade. Gambar tampil utuh, teks di bar biru bawah. */}
          <div key={project.id} className="absolute inset-0 animate-in fade-in duration-700">
            <div className="absolute inset-x-0 top-0 bottom-[54px] sm:bottom-[64px]">
              {project.image && <ProjectImage src={project.image} alt="" sizes="(min-width: 1024px) 360px, 80vw" />}
            </div>
            <div className="absolute inset-x-0 bottom-0 flex h-[54px] items-center justify-between gap-3 bg-gradient-to-r from-primary to-primary-dark px-3.5 text-white sm:h-[64px] sm:px-5">
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-white/80 sm:text-[10px]">
                  <span className="truncate">{project.category}</span>
                  <span>{project.year}</span>
                </p>
                <h3 className="truncate text-sm font-bold sm:text-lg">{project.title}</h3>
              </div>
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-8 sm:w-8">
                <ArrowUpRight size={15} aria-hidden />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

/** Dua kartu portfolio yang melayang naik-turun bergantian. */
export default function HeroShowcase({ projects }: { projects: ShowcaseProject[] }) {
  if (projects.length === 0) return null;
  return (
    <div className="absolute inset-0">
      {/* Lingkaran dekoratif seperti referensi */}
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[92%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20" />
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[70%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 bg-primary/[0.03]" />

      <ShowcaseCard
        projects={projects}
        start={0}
        offsetMs={0}
        className="right-0 top-[2%] z-10 w-[78%] sm:w-[62%]"
        floatClass="animate-float"
      />
      <ShowcaseCard
        projects={projects}
        start={projects.length > 1 ? 1 : 0}
        offsetMs={2500}
        className="bottom-[2%] left-0 z-20 w-[78%] sm:w-[62%]"
        floatClass="animate-float [animation-delay:-3s] [animation-direction:reverse]"
      />
    </div>
  );
}