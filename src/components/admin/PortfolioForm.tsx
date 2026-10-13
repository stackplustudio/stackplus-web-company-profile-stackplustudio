"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { savePortfolio } from "@/app/admin/actions";
import { MAX_PORTFOLIO_IMAGES, PORTFOLIO_CATEGORIES } from "@/lib/categories";
import type { PortfolioInput } from "@/lib/validation";
import { buttonStyles } from "@/components/ui/Button";
import { Card } from "./ui";
import { ChipsField, Field, LinesField, SelectInput, TextArea, TextInput, Toggle } from "./fields";
import ImageUploader from "./ImageUploader";
import Link from "next/link";

const EMPTY: PortfolioInput = {
  title: "",
  slug: "",
  category: "WEB",
  year: String(new Date().getFullYear()),
  summary: "",
  role: "",
  problem: "",
  solution: "",
  results: "",
  metric: "",
  features: [],
  techStack: [],
  images: [],
  demoUrl: "",
  featured: false,
  published: true,
  sortOrder: 0,
};

export default function PortfolioForm({ id, initial }: { id?: string; initial?: PortfolioInput }) {
  const router = useRouter();
  const [values, setValues] = useState<PortfolioInput>(initial ?? EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof PortfolioInput>(key: K, value: PortfolioInput[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));
  const err = (key: string) => errors[key]?.[0];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setErrors({});
    startTransition(async () => {
      const res = await savePortfolio(id ?? null, values);
      if (res.ok) {
        router.push("/admin/portfolios");
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
          <Card title="Basic info" description="Shown on the project card and the top of the case study.">
            <div className="space-y-5">
              <Field label="Title" htmlFor="title" required error={err("title")}>
                <TextInput id="title" value={values.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Kopi Nusantara Company Profile" />
              </Field>
              <Field label="Short summary" htmlFor="summary" required error={err("summary")} hint={`${values.summary.length}/280 · shown on the card (1–2 lines).`}>
                <TextArea id="summary" rows={3} maxLength={280} value={values.summary} onChange={(e) => set("summary", e.target.value)} />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your role" htmlFor="role" error={err("role")} hint="e.g. Full-stack development">
                  <TextInput id="role" value={values.role ?? ""} onChange={(e) => set("role", e.target.value)} />
                </Field>
                <Field label="Key result (one line)" htmlFor="metric" error={err("metric")} hint="e.g. +45% online enquiries">
                  <TextInput id="metric" value={values.metric ?? ""} onChange={(e) => set("metric", e.target.value)} />
                </Field>
              </div>
              <Field label="Demo link" htmlFor="demoUrl" error={err("demoUrl")} hint="Optional. The Demo button only appears when this is filled.">
                <TextInput id="demoUrl" type="url" inputMode="url" value={values.demoUrl ?? ""} onChange={(e) => set("demoUrl", e.target.value)} placeholder="https://" />
              </Field>
            </div>
          </Card>

          <Card title="Images" description={`Up to ${MAX_PORTFOLIO_IMAGES} landscape images. The first one is the card preview; the rest appear in the case study gallery.`}>
            <ImageUploader value={values.images} onChange={(urls) => set("images", urls)} max={MAX_PORTFOLIO_IMAGES} error={err("images")} />
          </Card>

          <Card title="Case study" description="Shown on the project detail page. Leave blank to hide a section.">
            <div className="space-y-5">
              <Field label="The problem" htmlFor="problem" error={err("problem")}>
                <TextArea id="problem" value={values.problem ?? ""} onChange={(e) => set("problem", e.target.value)} />
              </Field>
              <Field label="Our solution" htmlFor="solution" error={err("solution")}>
                <TextArea id="solution" value={values.solution ?? ""} onChange={(e) => set("solution", e.target.value)} />
              </Field>
              <Field label="Key features" htmlFor="features" error={err("features")} hint="One feature per line (max 12).">
                <LinesField id="features" rows={5} value={values.features} onChange={(v) => set("features", v)} placeholder={"Online booking\nAdmin dashboard"} />
              </Field>
              <Field label="Results" htmlFor="results" error={err("results")}>
                <TextArea id="results" value={values.results ?? ""} onChange={(e) => set("results", e.target.value)} />
              </Field>
              <Field label="Tech stack" htmlFor="techStack" error={err("techStack")} hint="Type a name and press Enter. The card shows the first 4.">
                <ChipsField id="techStack" value={values.techStack} onChange={(v) => set("techStack", v)} placeholder="Next.js, Prisma…" max={16} />
              </Field>
            </div>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card title="Publishing">
            <div className="space-y-5">
              <Toggle checked={values.published} onChange={(v) => set("published", v)} label="Published" description="Draft projects are hidden from the website." />
              <div className="border-t border-line" />
              <Toggle checked={values.featured} onChange={(v) => set("featured", v)} label="Featured" description="Shown as a large card at the top (max 3 are displayed)." />
            </div>
          </Card>

          <Card title="Classification">
            <div className="space-y-5">
              <Field label="Category" htmlFor="category" required error={err("category")}>
                <SelectInput id="category" value={values.category} onChange={(e) => set("category", e.target.value)}>
                  {PORTFOLIO_CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Year" htmlFor="year" required error={err("year")}>
                <TextInput id="year" inputMode="numeric" maxLength={4} value={values.year} onChange={(e) => set("year", e.target.value)} />
              </Field>
              <Field label="URL slug" htmlFor="slug" error={err("slug")} hint="Optional. Leave blank to generate from the title.">
                <TextInput id="slug" value={values.slug} onChange={(e) => set("slug", e.target.value)} placeholder="kopi-nusantara" />
              </Field>
              <Field label="Display order" htmlFor="sortOrder" error={err("sortOrder")} hint="Lower numbers come first.">
                <TextInput id="sortOrder" type="number" min={0} max={9999} value={values.sortOrder} onChange={(e) => set("sortOrder", Number(e.target.value) || 0)} />
              </Field>
            </div>
          </Card>
        </aside>
      </div>

      <div className="sticky bottom-0 z-10 -mx-4 mt-8 flex items-center justify-between gap-4 border-t border-line bg-background/95 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8">
        <p role="alert" className="min-w-0 truncate text-sm font-medium text-red-600">{error}</p>
        <div className="flex flex-shrink-0 items-center gap-3">
          <Link href="/admin/portfolios" className={buttonStyles("outline", "md")}>Cancel</Link>
          <button type="submit" disabled={pending} className={buttonStyles("primary", "md")}>
            {pending ? "Saving…" : id ? "Save changes" : "Create project"}
          </button>
        </div>
      </div>
    </form>
  );
}