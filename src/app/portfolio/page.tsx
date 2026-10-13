import type { Metadata } from "next";
import Link from "next/link";
import CTA from "@/components/sections/CTA";
import CategoryFilter from "@/components/portfolio/CategoryFilter";
import ProjectGrid from "@/components/portfolio/ProjectGrid";
import { getPublishedPortfolios } from "@/lib/queries";
import { isPortfolioCategory, portfolioCategoryLabel } from "@/lib/categories";

export const revalidate = 60;

type Props = { searchParams: Promise<{ cat?: string | string[] }> };

export const metadata: Metadata = {
  title: "Portfolio – Web, App, AI Chatbot & UI/UX Projects",
  description:
    "Explore projects by StackPlus Studio: custom websites, mobile apps, AI chatbots, UI/UX design and branding built for growing businesses.",
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage({ searchParams }: Props) {
  const raw = (await searchParams).cat;
  const cat = Array.isArray(raw) ? raw[0] : raw;
  const category = isPortfolioCategory(cat) ? cat : undefined;
  const projects = await getPublishedPortfolios(category);

  return (
    <>
      <section className="bg-surface-alt py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-12 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-ink/50">› Portfolio ‹</p>
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-ink-dark md:text-6xl">
              All <span className="text-primary">Projects</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-ink/70">
              Websites, apps, AI chatbots and designs we have shipped for forward-thinking brands. Pick a category or open a case study.
            </p>
            <CategoryFilter active={category} />
          </header>

          {projects.length === 0 ? (
            <div className="rounded-[16px] border border-line bg-surface py-20 text-center">
              <p className="text-ink/60">
                {category ? `No ${portfolioCategoryLabel(category)} projects yet.` : "No projects yet."}
              </p>
              {category && (
                <Link href="/portfolio" className="mt-4 inline-block font-bold text-primary hover:underline">
                  View all projects
                </Link>
              )}
            </div>
          ) : (
            <ProjectGrid projects={projects} />
          )}
        </div>
      </section>
      <CTA />
    </>
  );
}