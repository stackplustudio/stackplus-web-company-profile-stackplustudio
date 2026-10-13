import { z } from "zod";
import { MAX_PORTFOLIO_IMAGES, PORTFOLIO_CATEGORIES, SERVICE_TYPES } from "@/lib/categories";
import { isBlobUrl } from "@/lib/blob";

const text = (max: number) => z.string().trim().max(max);
const optionalText = (max: number) => text(max).transform((v) => (v === "" ? null : v)).nullable();
const list = (max: number, items: number) =>
  z.array(text(max)).transform((arr) => arr.filter(Boolean)).pipe(z.array(z.string()).max(items));

export const portfolioSchema = z.object({
  title: text(120).min(2, "Title is required."),
  slug: text(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and dashes only.").or(z.literal("")),
  category: z.enum(PORTFOLIO_CATEGORIES.map((c) => c.value) as [string, ...string[]]),
  year: text(10).regex(/^\d{4}$/, "Use a 4-digit year."),
  summary: text(280).min(10, "Add a short summary (min 10 characters)."),
  role: optionalText(120),
  problem: optionalText(1500),
  solution: optionalText(1500),
  results: optionalText(1500),
  metric: optionalText(80),
  features: list(80, 12),
  techStack: list(40, 16),
  images: z.array(z.string().refine(isBlobUrl, "Invalid image URL."))
    .min(1, "Upload at least one image.").max(MAX_PORTFOLIO_IMAGES, `Maximum ${MAX_PORTFOLIO_IMAGES} images.`),
  demoUrl: z.string().trim().max(300)
    .refine((v) => v === "" || /^https?:\/\//i.test(v), "Demo link must start with http(s)://")
    .transform((v) => (v === "" ? null : v)).nullable(),
  featured: z.boolean(),
  published: z.boolean(),
  sortOrder: z.number().int().min(0).max(9999),
});
export type PortfolioInput = z.input<typeof portfolioSchema>;

export const serviceSchema = z.object({
  serviceType: z.enum(SERVICE_TYPES.map((s) => s.value) as [string, ...string[]]),
  category: text(60).min(1),
  name: text(60).min(1, "Package name is required."),
  description: text(300),
  isPro: z.boolean(),
  benefits: list(160, 30),
  codeTypes: list(80, 20),
  techTools: list(80, 20),
  sortOrder: z.number().int().min(0).max(9999),
}).refine(
  (v) => SERVICE_TYPES.find((s) => s.value === v.serviceType)?.categories.some((c) => c === v.category),
  { message: "Category does not belong to this service type.", path: ["category"] },
);
export type ServiceInput = z.input<typeof serviceSchema>;