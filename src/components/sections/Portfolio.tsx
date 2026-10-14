import Link from "next/link";
import ProjectMarquee from "@/components/portfolio/ProjectMarquee";
import ProjectTile from "@/components/portfolio/ProjectTile";
import Reveal from "@/components/ui/Reveal";
import { buttonStyles } from "@/components/ui/Button";
import { getLatestPortfolios } from "@/lib/queries";

const MARQUEE_MIN = 4; // di bawah ini tampil sebagai grid biasa

/** Home: proyek (featured lebih dulu) dalam dua baris yang berjalan berlawanan arah. */
export default async function Portfolio() {
  const projects = await getLatestPortfolios(12);

  return (
    <section id="portfolio" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">› PORTFOLIO ‹</p>
            <h2 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              Our Digital <br className="hidden md:block" />
              <span className="text-primary">Creations</span>
            </h2>
          </div>
          <div className="flex max-w-sm flex-col items-start text-left">
            <p className="mb-6 text-sm leading-relaxed text-gray-500">
              A glimpse into the digital solutions we have crafted for forward-thinking brands. We don&apos;t just build products, we build solutions.
            </p>
            <Link href="/portfolio" className={buttonStyles("secondary", "md")}>
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-red-500" /> View All Projects
            </Link>
          </div>
        </div>

        {projects.length === 0 && (
          <div className="rounded-[16px] border border-line bg-surface py-20 text-center text-ink/60">New projects are coming soon.</div>
        )}

        {projects.length > 0 && projects.length < MARQUEE_MIN && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 90} className="h-full">
                <ProjectTile project={p} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Marquee tampil selebar layar */}
      {projects.length >= MARQUEE_MIN && <ProjectMarquee projects={projects} />}
    </section>
  );
}