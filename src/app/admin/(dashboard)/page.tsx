import Link from "next/link";
import { FolderKanban, Plus, Star, Tags, Eye } from "lucide-react";
import { db } from "@/lib/db";
import { portfolioCategoryLabel } from "@/lib/categories";
import { buttonStyles } from "@/components/ui/Button";
import { Card, EmptyState, PageHeader, StatusBadge } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [total, published, featured, packages, recent] = await Promise.all([
    db.portfolio.count(),
    db.portfolio.count({ where: { published: true } }),
    db.portfolio.count({ where: { featured: true, published: true } }),
    db.servicePricing.count(),
    db.portfolio.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
  ]);

  const stats = [
    { label: "Projects", value: total, icon: FolderKanban },
    { label: "Published", value: published, icon: Eye },
    { label: "Featured", value: featured, icon: Star },
    { label: "Service packages", value: packages, icon: Tags },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="A quick look at your website content."
        actions={
          <Link href="/admin/portfolios/create" className={buttonStyles("primary", "md")}>
            <Plus size={16} aria-hidden /> New project
          </Link>
        }
      />

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-[16px] border border-line bg-surface p-5 shadow-sm">
            <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon size={18} aria-hidden />
            </span>
            <p className="text-3xl font-bold text-ink-dark">{value}</p>
            <p className="text-xs font-bold text-ink/60">{label}</p>
          </div>
        ))}
      </div>

      <Card title="Recently updated projects">
        {recent.length === 0 ? (
          <EmptyState
            title="No projects yet"
            description="Add your first project and it will appear on your website."
            action={<Link href="/admin/portfolios/create" className={buttonStyles("primary", "md")}>Create project</Link>}
          />
        ) : (
          <ul className="divide-y divide-line">
            {recent.map((p) => (
              <li key={p.id}>
                <Link href={`/admin/portfolios/edit/${p.id}`} className="flex items-center gap-4 py-3 hover:opacity-80">
                  <span className="relative h-12 w-20 flex-shrink-0 overflow-hidden rounded-[8px] border border-line bg-surface-alt">
                    {p.images[0] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-ink-dark">{p.title}</span>
                    <span className="block text-xs text-ink/60">{portfolioCategoryLabel(p.category)} · {p.year}</span>
                  </span>
                  <StatusBadge tone={p.published ? "green" : "gray"}>{p.published ? "Published" : "Draft"}</StatusBadge>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}