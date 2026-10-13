import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/admin/ui";
import ServiceForm from "@/components/admin/ServiceForm";

export const dynamic = "force-dynamic";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.servicePricing.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <>
      <PageHeader title="Edit package" description={item.name} backHref="/admin/services" backLabel="All packages" />
      <ServiceForm
        id={item.id}
        initial={{
          serviceType: item.serviceType,
          category: item.category,
          name: item.name,
          description: item.description,
          isPro: item.isPro,
          benefits: item.benefits,
          codeTypes: item.codeTypes,
          techTools: item.techTools,
          sortOrder: item.sortOrder,
        }}
      />
    </>
  );
}