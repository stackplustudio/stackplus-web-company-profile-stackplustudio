import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { db } from "@/lib/db";
import { deleteStat } from "@/app/admin/actions";
import { buttonStyles } from "@/components/ui/Button";
import DeleteButton from "@/components/admin/DeleteButton";
import { EmptyState, PageHeader, StatusBadge } from "@/components/admin/ui";
import { formatStat, resolveStat } from "@/lib/stats";

export const dynamic = "force-dynamic";

export default async function StatsPage() {
  const stats = await db.siteStat.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });

  const create = (
    <Link href="/admin/stats/create" className={buttonStyles("primary", "md")}>
      <Plus size={16} aria-hidden /> New card
    </Link>
  );

  return (
    <>
      <PageHeader title="Stat Cards" description="Small number cards at the bottom of the Why Us section on the home page." actions={create} />

      {stats.length === 0 ? (
        <EmptyState title="No cards yet" description="Add a card such as Products or Clients and it will appear on the home page." action={create} />
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-[16px] border border-line bg-surface shadow-sm">
          {stats.map((s) => {
            const view = resolveStat(s);
            return (
              <li key={s.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink-dark">
                    {s.label}
                    {s.source === "YEARS_SINCE_FOUNDING" && <StatusBadge tone="blue">Auto</StatusBadge>}
                    {!s.published && <StatusBadge tone="gray">Hidden</StatusBadge>}
                  </p>
                  <p className="truncate text-xs text-ink/60">
                    {formatStat(view)} · {s.unit || "no description"} · order {s.sortOrder}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Link
                    href={`/admin/stats/edit/${s.id}`}
                    aria-label={`Edit ${s.label}`}
                    title="Edit"
                    className="rounded-full p-2 text-ink/50 transition hover:bg-surface-alt hover:text-primary"
                  >
                    <Pencil size={16} aria-hidden />
                  </Link>
                  <DeleteButton id={s.id} action={deleteStat} label={s.label} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}