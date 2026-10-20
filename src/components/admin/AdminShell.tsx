"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, ExternalLink, FolderKanban, LayoutDashboard, LogOut, Menu, Tags, X } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/portfolios", label: "Portfolio", icon: FolderKanban, exact: false },
  { href: "/admin/services", label: "Services & Pricing", icon: Tags, exact: false },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3, exact: false },
] as const;

export default function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-6 py-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-primary text-sm font-bold text-white">S+</span>
        <div className="leading-tight">
          <p className="text-sm font-bold text-ink-dark">StackPlus Studio</p>
          <p className="text-xs text-ink/50">Admin panel</p>
        </div>
      </div>

      <nav aria-label="Admin" className="flex-1 space-y-1 px-3">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-[12px] px-4 py-2.5 text-sm font-bold transition",
                active ? "bg-primary text-white shadow-md shadow-primary/20" : "text-ink hover:bg-surface-alt"
              )}
            >
              <Icon size={18} aria-hidden /> {label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-line p-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-[12px] px-4 py-2.5 text-sm font-bold text-ink hover:bg-surface-alt"
        >
          <ExternalLink size={18} aria-hidden /> View website
        </a>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-[12px] px-4 py-2.5 text-left text-sm font-bold text-ink hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} aria-hidden /> Sign out
          </button>
        </form>
        <p className="truncate px-4 pt-2 text-xs text-ink/50" title={email}>{email}</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex bg-background text-ink">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 flex-shrink-0 border-r border-line bg-surface lg:block">{sidebar}</aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-10 lg:hidden">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-ink-dark/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-surface shadow-xl">{sidebar}</aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-3 lg:hidden">
          <span className="text-sm font-bold text-ink-dark">StackPlus Admin</span>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2 hover:bg-surface-alt"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}