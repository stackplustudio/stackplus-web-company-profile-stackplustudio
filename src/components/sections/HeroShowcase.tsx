"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
          {/* Isi kartu: berganti dengan fade */}
          <div key={project.id} className="absolute inset-0 animate-in fade-in duration-700">
            {project.image && (
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 360px, 70vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary/60 to-primary/10" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
              <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                <span className="rounded-full bg-white/20 px-2.5 py-1 backdrop-blur-sm">{project.category}</span>
                <span className="text-white/70">{project.year}</span>
              </div>
              <div className="flex items-end justify-between gap-3">
                <h3 className="truncate text-base font-bold sm:text-xl">{project.title}</h3>
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowUpRight size={16} aria-hidden />
                </span>
              </div>
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
        className="right-0 top-[2%] z-10 w-[68%] sm:w-[62%]"
        floatClass="animate-float"
      />
      <ShowcaseCard
        projects={projects}
        start={projects.length > 1 ? 1 : 0}
        offsetMs={2500}
        className="bottom-[2%] left-0 z-20 w-[68%] sm:w-[62%]"
        floatClass="animate-float [animation-delay:-3s] [animation-direction:reverse]"
      />
    </div>
  );
}