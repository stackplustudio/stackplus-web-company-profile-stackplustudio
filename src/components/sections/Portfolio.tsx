import Link from "next/link";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { buttonStyles } from "@/components/ui/Button";
import { getLatestPortfolios } from "@/lib/queries";

export default async function Portfolio() {
  const projects = await getLatestPortfolios(4);

  return (
    <section id="portfolio" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-ink/50">› Portfolio ‹</p>
            <h2 className="text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl">
              Our Digital <br className="hidden md:block" />
              <span className="text-primary">Creations</span>
            </h2>
          </div>
          <div className="flex max-w-md flex-col items-start text-left md:pb-2">
            <p className="mb-6 leading-relaxed text-ink/70">
              A glimpse into the digital solutions we have crafted for forward-thinking brands. We don&apos;t just build products, we build solutions.
            </p>
            <Link href="/portfolio" className={buttonStyles("secondary", "md")}>
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-red-500" /> View All Projects
            </Link>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-[16px] border border-line bg-surface py-20 text-center text-ink/60">
            New projects are coming soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} priority={i < 2} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}