import "server-only";
import { db } from "@/lib/db";
import type { PortfolioCategory, ServiceType } from "@/generated/prisma/enums";

// Halaman publik tidak boleh gagal total bila DB sementara tak terjangkau.
async function safe<T>(run: () => Promise<T>, fallback: T): Promise<T> {
  try { return await run(); } catch (error) { console.error("[queries] database error:", error); return fallback; }
}

const publicWhere = { published: true } as const;
const ordering = [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }] as const;

export const getPublishedPortfolios = (category?: PortfolioCategory) =>
  safe(() => db.portfolio.findMany({
    where: { ...publicWhere, ...(category ? { category } : {}) }, orderBy: [...ordering],
  }), []);

export const getLatestPortfolios = (take = 4) =>
  safe(() => db.portfolio.findMany({ where: publicWhere, orderBy: [...ordering], take }), []);

export const getPortfolioBySlug = (slug: string) =>
  safe(() => db.portfolio.findFirst({ where: { slug, ...publicWhere } }), null);

export const getServicePlans = (serviceType: ServiceType, category?: string) =>
  safe(() => db.servicePricing.findMany({
    where: { serviceType, ...(category ? { category } : {}) },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  }), []);