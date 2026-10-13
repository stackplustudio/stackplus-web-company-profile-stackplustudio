import Link from "next/link";
import { ExternalLink, Pencil, Plus, Star } from "lucide-react";
import { db } from "@/lib/db";
import { deletePortfolio } from "@/app/admin/actions";
import { portfolioCategoryLabel } from "@/lib/categories";
import { buttonStyles } from "@/components/ui/Button";
import DeleteButton from "@/components/admin/DeleteButton";
import { EmptyState, PageHeader, StatusBadge } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function PortfoliosPage() {
  const projects = await db.portfolio.findMany({
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
  });

  const create = (
    <Link href="/admin/portfolios/create" className={buttonStyles("primary", "md")}>
      <Plus size={16} aria-hidden /> New project
    </Link>
  );

  return (
    <>
      <PageHeader title="Portfolio" description={`${projects.length} project${projects.length === 1 ? "" : "s"}`} actions={create} />

      {projects.length === 0 ? (
        <EmptyState title="No projects yet" description="Create your first project to show it on the website." action={create} />
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-[16px] border border-line bg-surface shadow-sm">
          {projects.map((p) => (
            <li key={p.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <span className="h-14 w-24 flex-shrink-0 overflow-hidden rounded-[8px] border border-line bg-surface-alt">
                  {p.images[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-2 truncate text-sm font-bold text-ink-dark">
                    {p.title}
                    {p.featured && <Star size={14} className="flex-shrink-0 fill-primary text-primary" aria-label="Featured" />}
                  </p>
                  <p className="truncate text-xs text-ink/60">
                    {portfolioCategoryLabel(p.category)} · {p.year} · /{p.slug}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <StatusBadge tone={p.published ? "green" : "gray"}>{p.published ? "Published" : "Draft"}</StatusBadge>
                <div className="flex items-center gap-1">
                  {p.published && (
                    <a
                      href={`/portfolio/${p.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${p.title} on the website`}
                      title="View on website"
                      className="rounded-full p-2 text-ink/50 transition hover:bg-surface-alt hover:text-primary"
                    >
                      <ExternalLink size={16} aria-hidden />
                    </a>
                  )}
                  <Link
                    href={`/admin/portfolios/edit/${p.id}`}
                    aria-label={`Edit ${p.title}`}
                    title="Edit"
                    className="rounded-full p-2 text-ink/50 transition hover:bg-surface-alt hover:text-primary"
                  >
                    <Pencil size={16} aria-hidden />
                  </Link>
                  <DeleteButton id={p.id} action={deletePortfolio} label={p.title} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}