import Link from "next/link";
import { cn } from "@/lib/utils";

/** Komponen presentasi admin yang aman dipakai di server component. */

export function PageHeader({
  title,
  description,
  actions,
  backHref,
  backLabel = "Back",
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <header className="mb-8">
      {backHref && (
        <Link href={backHref} className="mb-4 inline-flex items-center gap-1 text-xs font-bold text-ink/60 hover:text-primary">
          <span aria-hidden>←</span> {backLabel}
        </Link>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink-dark">{title}</h1>
          {description && <p className="mt-1 text-sm text-ink/60">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
      </div>
    </header>
  );
}

export function Card({
  title,
  description,
  children,
  className,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-[16px] border border-line bg-surface p-6 shadow-sm", className)}>
      {(title || description) && (
        <div className="mb-5">
          {title && <h2 className="text-base font-bold text-ink-dark">{title}</h2>}
          {description && <p className="mt-1 text-xs text-ink/60">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

const TONES = {
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  gray: "bg-surface-alt text-ink/70 border-line",
  blue: "bg-primary/10 text-primary border-primary/20",
} as const;

export function StatusBadge({ tone = "gray", children }: { tone?: keyof typeof TONES; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold", TONES[tone])}>
      {children}
    </span>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-[16px] border border-dashed border-line bg-surface px-6 py-16 text-center">
      <h3 className="text-base font-bold text-ink-dark">{title}</h3>
      {description && <p className="mx-auto mt-1 max-w-sm text-sm text-ink/60">{description}</p>}
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}