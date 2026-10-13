import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/admin/ui";
import PortfolioForm from "@/components/admin/PortfolioForm";

export const dynamic = "force-dynamic";

export default async function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.portfolio.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <>
      <PageHeader title="Edit project" description={item.title} backHref="/admin/portfolios" backLabel="All projects" />
      <PortfolioForm
        id={item.id}
        initial={{
          title: item.title,
          slug: item.slug,
          category: item.category,
          year: item.year,
          summary: item.summary,
          role: item.role ?? "",
          problem: item.problem ?? "",
          solution: item.solution ?? "",
          results: item.results ?? "",
          metric: item.metric ?? "",
          features: item.features,
          techStack: item.techStack,
          images: item.images,
          demoUrl: item.demoUrl ?? "",
          featured: item.featured,
          published: item.published,
          sortOrder: item.sortOrder,
        }}
      />
    </>
  );
}