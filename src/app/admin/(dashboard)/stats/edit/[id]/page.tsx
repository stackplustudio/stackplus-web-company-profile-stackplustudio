import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/admin/ui";
import StatForm from "@/components/admin/StatForm";

export const dynamic = "force-dynamic";

export default async function EditStatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.siteStat.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <>
      <PageHeader title="Edit stat card" description={item.label} backHref="/admin/stats" backLabel="All cards" />
      <StatForm
        id={item.id}
        initial={{
          label: item.label,
          unit: item.unit,
          icon: item.icon,
          source: item.source,
          value: item.value,
          suffix: item.suffix,
          sortOrder: item.sortOrder,
          published: item.published,
        }}
      />
    </>
  );
}