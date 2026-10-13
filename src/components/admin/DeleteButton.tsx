"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import type { ActionResult } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

/** Hapus dua langkah (klik, lalu konfirmasi) tanpa window.confirm. */
export default function DeleteButton({
  id,
  action,
  label,
}: {
  id: string;
  action: (id: string) => Promise<ActionResult>;
  label: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function run() {
    startTransition(async () => {
      const res = await action(id);
      if (res.ok) router.refresh();
      else {
        setError(res.error);
        setConfirming(false);
      }
    });
  }

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <button
          type="button"
          onClick={run}
          disabled={pending}
          className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-60"
        >
          {pending ? "Deleting…" : "Confirm"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={pending}
          className="rounded-full border border-line px-3 py-1.5 text-xs font-bold text-ink hover:bg-surface-alt"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <span className="inline-flex flex-col items-end">
      <button
        type="button"
        aria-label={`Delete ${label}`}
        title="Delete"
        onClick={() => setConfirming(true)}
        className={cn("rounded-full p-2 text-ink/50 transition hover:bg-red-50 hover:text-red-600")}
      >
        <Trash2 size={16} aria-hidden />
      </button>
      {error && <span role="alert" className="mt-1 text-[11px] text-red-600">{error}</span>}
    </span>
  );
}