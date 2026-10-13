"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveService } from "@/app/admin/actions";
import { SERVICE_TYPES } from "@/lib/categories";
import type { ServiceInput } from "@/lib/validation";
import { buttonStyles } from "@/components/ui/Button";
import { Card } from "./ui";
import { ChipsField, Field, LinesField, SelectInput, TextArea, TextInput, Toggle } from "./fields";

const EMPTY: ServiceInput = {
  serviceType: "WEB_DEVELOPMENT",
  category: "GENERAL",
  name: "",
  description: "",
  isPro: false,
  benefits: [],
  codeTypes: [],
  techTools: [],
  sortOrder: 0,
};

export default function ServiceForm({ id, initial }: { id?: string; initial?: ServiceInput }) {
  const router = useRouter();
  const [values, setValues] = useState<ServiceInput>(initial ?? EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof ServiceInput>(key: K, value: ServiceInput[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));
  const err = (key: string) => errors[key]?.[0];

  const categories: readonly string[] = SERVICE_TYPES.find((s) => s.value === values.serviceType)?.categories ?? [];

  function changeType(serviceType: string) {
    const first = SERVICE_TYPES.find((s) => s.value === serviceType)?.categories[0] ?? "GENERAL";
    setValues((prev) => ({ ...prev, serviceType, category: first }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setErrors({});
    startTransition(async () => {
      const res = await saveService(id ?? null, values);
      if (res.ok) {
        router.push("/admin/services");
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
          <Card title="Package details">
            <div className="space-y-5">
              <Field label="Package name" htmlFor="name" required error={err("name")}>
                <TextInput id="name" value={values.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Basic" />
              </Field>
              <Field label="Description" htmlFor="description" error={err("description")} hint="One or two sentences shown under the package name.">
                <TextArea id="description" rows={3} value={values.description} onChange={(e) => set("description", e.target.value)} />
              </Field>
            </div>
          </Card>

          <Card title="What's included">
            <div className="space-y-5">
              <Field label="Benefits" htmlFor="benefits" error={err("benefits")} hint="One benefit per line (max 30).">
                <LinesField id="benefits" rows={8} value={values.benefits} onChange={(v) => set("benefits", v)} />
              </Field>
              <Field label="Code types" htmlFor="codeTypes" error={err("codeTypes")} hint="Type and press Enter.">
                <ChipsField id="codeTypes" value={values.codeTypes} onChange={(v) => set("codeTypes", v)} />
              </Field>
              <Field label="Tech & tools" htmlFor="techTools" error={err("techTools")} hint="Type and press Enter.">
                <ChipsField id="techTools" value={values.techTools} onChange={(v) => set("techTools", v)} />
              </Field>
            </div>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card title="Placement">
            <div className="space-y-5">
              <Field label="Service" htmlFor="serviceType" required error={err("serviceType")}>
                <SelectInput id="serviceType" value={values.serviceType} onChange={(e) => changeType(e.target.value)}>
                  {SERVICE_TYPES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Category" htmlFor="category" required error={err("category")}>
                <SelectInput id="category" value={values.category} onChange={(e) => set("category", e.target.value)}>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Display order" htmlFor="sortOrder" error={err("sortOrder")} hint="Lower numbers come first.">
                <TextInput id="sortOrder" type="number" min={0} max={9999} value={values.sortOrder} onChange={(e) => set("sortOrder", Number(e.target.value) || 0)} />
              </Field>
            </div>
          </Card>

          <Card title="Highlight">
            <Toggle checked={values.isPro} onChange={(v) => set("isPro", v)} label="Recommended (blue card)" description="Highlights this package on the pricing page." />
          </Card>
        </aside>
      </div>

      <div className="sticky bottom-0 z-10 -mx-4 mt-8 flex items-center justify-between gap-4 border-t border-line bg-background/95 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8">
        <p role="alert" className="min-w-0 truncate text-sm font-medium text-red-600">{error}</p>
        <div className="flex flex-shrink-0 items-center gap-3">
          <Link href="/admin/services" className={buttonStyles("outline", "md")}>Cancel</Link>
          <button type="submit" disabled={pending} className={buttonStyles("primary", "md")}>
            {pending ? "Saving…" : id ? "Save changes" : "Create package"}
          </button>
        </div>
      </div>
    </form>
  );
}