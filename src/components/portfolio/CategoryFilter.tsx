import Link from "next/link";
import { PORTFOLIO_CATEGORIES } from "@/lib/categories";
import { cn } from "@/lib/utils";

/** Filter berbasis URL (?cat=WEB) supaya bisa dibagikan dan tetap server-rendered. */
export default function CategoryFilter({ active }: { active?: string }) {
  const tabs = [{ value: "", label: "All" }, ...PORTFOLIO_CATEGORIES.map((c) => ({ value: c.value, label: c.label }))];
  return (
    <nav aria-label="Project categories" className="flex w-full justify-center">
      <ul className="hide-scrollbar inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-line bg-surface p-2 shadow-sm">
        {tabs.map((tab) => {
          const isActive = (active ?? "") === tab.value;
          return (
            <li key={tab.value || "all"}>
              <Link
                href={tab.value ? `/portfolio?cat=${tab.value}` : "/portfolio"}
                scroll={false}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "block whitespace-nowrap rounded-full px-5 py-2.5 text-xs font-bold tracking-wide transition-all duration-300",
                  isActive ? "bg-primary text-white shadow-md" : "text-ink hover:bg-surface-alt hover:text-primary"
                )}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}