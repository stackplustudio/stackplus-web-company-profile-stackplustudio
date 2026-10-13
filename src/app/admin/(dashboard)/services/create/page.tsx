import { PageHeader } from "@/components/admin/ui";
import ServiceForm from "@/components/admin/ServiceForm";

export default function CreateServicePage() {
  return (
    <>
      <PageHeader title="New package" backHref="/admin/services" backLabel="All packages" />
      <ServiceForm />
    </>
  );
}