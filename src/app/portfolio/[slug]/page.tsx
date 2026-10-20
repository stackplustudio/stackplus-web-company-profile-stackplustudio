import type { Metadata } from "next";
import ProjectImage from "@/components/portfolio/ProjectImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, ExternalLink, MessageCircle } from "lucide-react";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { getPortfolioBySlug, getPublishedPortfolios } from "@/lib/queries";
import { portfolioCategoryLabel } from "@/lib/categories";
import { getProjectWhatsAppLink } from "@/lib/whatsapp";
import { SITE } from "@/lib/site";
import { buttonStyles } from "@/components/ui/Button";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortfolioBySlug(slug);
  if (!project) return { title: "Project not found", robots: { index: false } };
  const category = portfolioCategoryLabel(project.category);
  return {
    title: `${project.title} – ${category} Case Study`,
    description: project.summary,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: `${project.title} | ${SITE.name}`,
      description: project.summary,
      url: `/portfolio/${project.slug}`,
      type: "article",
      images: project.images[0] ? [{ url: project.images[0], alt: project.title }] : undefined,
    },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-ink-dark">{title}</h2>
      {children}
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getPortfolioBySlug(slug);
  if (!project) notFound();

  const sameCategory = (await getPublishedPortfolios(project.category as never)).filter((p) => p.id !== project.id);
  const related = sameCategory.slice(0, 3);
  const [hero, ...gallery] = project.images;
  const categoryLabel = portfolioCategoryLabel(project.category);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Portfolio", item: `${SITE.url}/portfolio` },
        { "@type": "ListItem", position: 3, name: project.title, item: `${SITE.url}/portfolio/${project.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description: project.summary,
      url: `${SITE.url}/portfolio/${project.slug}`,
      image: project.images,
      dateCreated: project.year,
      genre: categoryLabel,
      creator: { "@type": "Organization", name: SITE.name, url: SITE.url },
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1 text-xs font-semibold text-ink/60">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight size={12} aria-hidden />
            <Link href="/portfolio" className="hover:text-primary">Portfolio</Link>
            <ChevronRight size={12} aria-hidden />
            <span className="text-ink" aria-current="page">{project.title}</span>
          </nav>

          {hero && (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-[16px] border border-line bg-surface-alt">
              <ProjectImage src={hero} alt={`${project.title} main preview`} priority sizes="(min-width: 1024px) 1024px, 100vw" />
            </div>
          )}

          <header className="mb-12">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider">
              <span className="rounded-full bg-primary px-3 py-1 text-white">{categoryLabel}</span>
              <span className="text-ink/60">{project.year}</span>
              {project.role && <span className="text-ink/60">· {project.role}</span>}
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-ink-dark md:text-5xl">{project.title}</h1>
            <p className="max-w-3xl text-lg leading-relaxed text-ink/80">{project.summary}</p>
            {project.metric && <p className="mt-4 text-base font-bold text-primary">{project.metric}</p>}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles("outline", "md", "mt-6")}>
                Live Demo <ExternalLink size={14} aria-hidden />
              </a>
            )}
          </header>

          {project.problem && <Section title="The Problem"><p className="leading-relaxed text-ink/80 whitespace-pre-line">{project.problem}</p></Section>}
          {project.solution && <Section title="Our Solution"><p className="leading-relaxed text-ink/80 whitespace-pre-line">{project.solution}</p></Section>}

          {project.features.length > 0 && (
            <Section title="Key Features">
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 rounded-[16px] border border-line bg-surface p-4 text-sm font-medium text-ink">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <Check size={12} strokeWidth={4} aria-hidden />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {gallery.length > 0 && (
            <Section title="Gallery">
              <div className="grid gap-4 sm:grid-cols-2">
                {gallery.map((src, i) => (
                  <div key={src} className="relative aspect-[16/10] overflow-hidden rounded-[16px] border border-line bg-surface-alt">
                    <ProjectImage src={src} alt={`${project.title} screenshot ${i + 2}`} sizes="(min-width: 640px) 50vw, 100vw" />
                  </div>
                ))}
              </div>
            </Section>
          )}

          {project.techStack.length > 0 && (
            <Section title="Tech Stack">
              <ul className="flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <li key={t} className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-semibold text-ink">{t}</li>
                ))}
              </ul>
            </Section>
          )}

          {project.results && (
            <Section title="Results">
              <div className="rounded-[16px] bg-primary p-6 text-white md:p-8">
                <p className="leading-relaxed whitespace-pre-line">{project.results}</p>
              </div>
            </Section>
          )}

          <div className="rounded-[16px] border border-line bg-surface-alt p-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-ink-dark">Want something like this?</h2>
            <p className="mb-6 text-ink/70">Tell us about your project and we will reply within one business day.</p>
            <a href={getProjectWhatsAppLink(project.title)} target="_blank" rel="noopener noreferrer" className={buttonStyles("primary", "lg")}>
              <MessageCircle size={16} aria-hidden /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-surface-alt py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold tracking-tight text-ink-dark">Related projects</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}