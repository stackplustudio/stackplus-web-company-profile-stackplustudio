import { PageHeader } from "@/components/admin/ui";
import PortfolioForm from "@/components/admin/PortfolioForm";

export default function CreatePortfolioPage() {
  return (
    <>
      <PageHeader title="New project" backHref="/admin/portfolios" backLabel="All projects" />
      <PortfolioForm />
    </>
  );
}