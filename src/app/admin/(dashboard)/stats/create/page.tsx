import { PageHeader } from "@/components/admin/ui";
import StatForm from "@/components/admin/StatForm";

export default function CreateStatPage() {
  return (
    <>
      <PageHeader title="New stat card" backHref="/admin/stats" backLabel="All cards" />
      <StatForm />
    </>
  );
}