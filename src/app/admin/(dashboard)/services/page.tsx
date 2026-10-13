import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { db } from "@/lib/db";
import { deleteService } from "@/app/admin/actions";
import { SERVICE_TYPES, isServiceType, serviceTypeLabel } from "@/lib/categories";
import { buttonStyles } from "@/components/ui/Button";
import DeleteButton from "@/components/admin/DeleteButton";
import { EmptyState, PageHeader, StatusBadge } from "@/components/admin/ui";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ServicesPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const active = isServiceType(type) ? type : undefined;

  const [packages, counts] = await Promise.all([
    db.servicePricing.findMany({
      where: active ? { serviceType: active } : undefined,
      orderBy: [{ serviceType: "asc" }, { category: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
    }),
    db.servicePricing.groupBy({ by: ["serviceType"], _count: { _all: true } }),
  ]);
  const countOf = (value: string) => counts.find((c) => c.serviceType === value)?._count._all ?? 0;
  const totalCount = counts.reduce((sum, c) => sum + c._count._all, 0);

  const tabs = [{ value: "", label: "All", count: totalCount }, ...SERVICE_TYPES.map((s) => ({ value: s.value, label: s.label, count: countOf(s.value) }))];

  const create = (
    <Link href="/admin/services/create" className={buttonStyles("primary", "md")}>
      <Plus size={16} aria-hidden /> New package
    </Link>
  );

  return (
    <>
      <PageHeader title="Services & Pricing" description="Packages shown on the five service pages." actions={create} />

      <nav aria-label="Service filter" className="hide-scrollbar mb-6 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const isActive = (active ?? "") === tab.value;
          return (
            <Link
              key={tab.value || "all"}
              href={tab.value ? `/admin/services?type=${tab.value}` : "/admin/services"}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "whitespace-nowrap rounded-full border px-4 py-2 text-xs font-bold transition",
                isActive ? "border-primary bg-primary text-white" : "border-line bg-surface text-ink hover:border-primary/40 hover:text-primary"
              )}
            >
              {tab.label} <span className={isActive ? "text-white/80" : "text-ink/50"}>{tab.count}</span>
            </Link>
          );
        })}
      </nav>

      {packages.length === 0 ? (
        <EmptyState title="No packages here yet" description="Add a package and it will appear on the matching service page." action={create} />
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-[16px] border border-line bg-surface shadow-sm">
          {packages.map((s) => (
            <li key={s.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-bold text-ink-dark">
                  {s.name}
                  {s.isPro && <StatusBadge tone="blue">Recommended</StatusBadge>}
                </p>
                <p className="truncate text-xs text-ink/60">
                  {serviceTypeLabel(s.serviceType)} · {s.category} · {s.benefits.length} benefit{s.benefits.length === 1 ? "" : "s"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Link
                  href={`/admin/services/edit/${s.id}`}
                  aria-label={`Edit ${s.name}`}
                  title="Edit"
                  className="rounded-full p-2 text-ink/50 transition hover:bg-surface-alt hover:text-primary"
                >
                  <Pencil size={16} aria-hidden />
                </Link>
                <DeleteButton id={s.id} action={deleteService} label={s.name} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}