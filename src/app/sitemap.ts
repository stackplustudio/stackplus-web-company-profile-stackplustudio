import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getPublishedPortfolios } from "@/lib/queries";

export const revalidate = 3600;

const STATIC: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/service", priority: 0.9, changeFrequency: "monthly" },
  { path: "/service/web-development", priority: 0.9, changeFrequency: "monthly" },
  { path: "/service/mobile-development", priority: 0.8, changeFrequency: "monthly" },
  { path: "/service/ai-chatbot", priority: 0.8, changeFrequency: "monthly" },
  { path: "/service/ui-ux-design", priority: 0.8, changeFrequency: "monthly" },
  { path: "/service/branding-design", priority: 0.8, changeFrequency: "monthly" },
  { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getPublishedPortfolios();
  return [
    ...STATIC.map((s) => ({
      url: `${SITE.url}${s.path}`,
      lastModified: new Date(),
      changeFrequency: s.changeFrequency,
      priority: s.priority,
    })),
    ...projects.map((p) => ({
      url: `${SITE.url}/portfolio/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}