"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveStat } from "@/app/admin/actions";
import { STAT_ICONS, STAT_SOURCES } from "@/lib/categories";
import { experienceYears } from "@/lib/stats";
import type { StatInput } from "@/lib/validation";
import { buttonStyles } from "@/components/ui/Button";
import { Card } from "./ui";
import { Field, SelectInput, TextInput, Toggle } from "./fields";

const EMPTY: StatInput = {
  label: "",
  unit: "",
  icon: "rocket",
  source: "MANUAL",
  value: 0,
  suffix: "",
  sortOrder: 0,
  published: true,
};

export default function StatForm({ id, initial }: { id?: string; initial?: StatInput }) {
  const router = useRouter();
  const [values, setValues] = useState<StatInput>(initial ?? EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof StatInput>(key: K, value: StatInput[K]) => setValues((prev) => ({ ...prev, [key]: value }));
  const err = (key: string) => errors[key]?.[0];
  const auto = values.source === "YEARS_SINCE_FOUNDING";
  const years = experienceYears();
  const autoText = `${Number.isInteger(years) ? years : years.toFixed(1)}+`;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setErrors({});
    startTransition(async () => {
      const res = await saveStat(id ?? null, values);
      if (res.ok) {
        router.push("/admin/stats");
        router.refresh();
      } else {
        setError(res.error);
        setErrors(res.fieldErrors ?? {});
      }
    });
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card title="Card content">
            <div className="space-y-5">
              <Field label="Label" htmlFor="label" required error={err("label")} hint="Short title, e.g. Products.">
                <TextInput id="label" value={values.label} onChange={(e) => set("label", e.target.value)} placeholder="Products" />
              </Field>
              <Field label="Description" htmlFor="unit" error={err("unit")} hint="Small text under the label, e.g. Delivered.">
                <TextInput id="unit" value={values.unit} onChange={(e) => set("unit", e.target.value)} placeholder="Delivered" />
              </Field>
              <Field label="Number source" htmlFor="source" required error={err("source")}>
                <SelectInput id="source" value={values.source} onChange={(e) => set("source", e.target.value)}>
                  {STAT_SOURCES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </SelectInput>
              </Field>

              {auto ? (
                <p className="rounded-[12px] bg-primary/5 px-4 py-3 text-sm text-ink">
                  Calculated automatically from January 2026 and rounded down to the nearest 0.5 year, always with a “+”.
                  It currently shows <strong className="text-primary">{autoText}</strong>.
                </p>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Number" htmlFor="value" required error={err("value")}>
                    <TextInput id="value" type="number" min={0} value={values.value} onChange={(e) => set("value", Number(e.target.value) || 0)} />
                  </Field>
                  <Field label="Suffix" htmlFor="suffix" error={err("suffix")} hint='Optional, e.g. "+".'>
                    <TextInput id="suffix" maxLength={4} value={values.suffix} onChange={(e) => set("suffix", e.target.value)} placeholder="+" />
                  </Field>
                </div>
              )}
            </div>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card title="Appearance">
            <div className="space-y-5">
              <Field label="Icon" htmlFor="icon" required error={err("icon")}>
                <SelectInput id="icon" value={values.icon} onChange={(e) => set("icon", e.target.value)}>
                  {STAT_ICONS.map((i) => (
                    <option key={i.value} value={i.value}>{i.label}</option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Display order" htmlFor="sortOrder" error={err("sortOrder")} hint="Lower numbers come first. The first card is blue.">
                <TextInput id="sortOrder" type="number" min={0} max={9999} value={values.sortOrder} onChange={(e) => set("sortOrder", Number(e.target.value) || 0)} />
              </Field>
            </div>
          </Card>
          <Card title="Visibility">
            <Toggle checked={values.published} onChange={(v) => set("published", v)} label="Show on website" description="Turn off to hide this card without deleting it." />
          </Card>
        </aside>
      </div>

      <div className="sticky bottom-0 z-10 -mx-4 mt-8 flex items-center justify-between gap-4 border-t border-line bg-background/95 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8">
        <p role="alert" className="min-w-0 truncate text-sm font-medium text-red-600">{error}</p>
        <div className="flex flex-shrink-0 items-center gap-3">
          <Link href="/admin/stats" className={buttonStyles("outline", "md")}>Cancel</Link>
          <button type="submit" disabled={pending} className={buttonStyles("primary", "md")}>
            {pending ? "Saving…" : id ? "Save changes" : "Create card"}
          </button>
        </div>
      </div>
    </form>
  );
}