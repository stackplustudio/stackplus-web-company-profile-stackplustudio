"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import type { PortfolioCategory, ServiceType, StatSource } from "@/generated/prisma/enums";
import { db } from "@/lib/db";
import {
  checkLoginRateLimit, clearFailedLogins, clearSessionCookie, recordFailedLogin,
  requireAdmin, setSessionCookie, verifyAdminCredentials,
} from "@/lib/auth";
import { deleteBlobs } from "@/lib/blob";
import { portfolioSchema, serviceSchema, statSchema, type PortfolioInput, type ServiceInput, type StatInput } from "@/lib/validation";

export type ActionResult = { ok: true } | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

// ---------- AUTH ----------
export async function loginAction(_prev: { error?: string } | undefined, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = `${ip}:${email}`;

  if (!checkLoginRateLimit(key).allowed) return { error: "Too many attempts. Please try again in a few minutes." };

  const session = email && password ? await verifyAdminCredentials(email, password) : null;
  if (!session) {
    recordFailedLogin(key);
    return { error: "Invalid email or password." };
  }
  clearFailedLogins(key);
  await setSessionCookie(session);
  redirect("/admin");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

// ---------- PORTFOLIO ----------
function slugify(input: string) {
  return input.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "project";
}

async function uniqueSlug(base: string, ignoreId?: string) {
  let slug = base;
  for (let i = 2; ; i++) {
    const existing = await db.portfolio.findUnique({ where: { slug }, select: { id: true } });
    if (!existing || existing.id === ignoreId) return slug;
    slug = `${base}-${i}`;
  }
}

function revalidatePortfolio(slug?: string) {
  revalidatePath("/");
  revalidatePath("/portfolio");
  if (slug) revalidatePath(`/portfolio/${slug}`);
  revalidatePath("/sitemap.xml");
}

export async function savePortfolio(id: string | null, input: PortfolioInput): Promise<ActionResult> {
  await requireAdmin();
  const parsed = portfolioSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }
  const { slug: rawSlug, category, ...rest } = parsed.data;
  const slug = await uniqueSlug(rawSlug || slugify(rest.title), id ?? undefined);
  const data = { ...rest, slug, category: category as PortfolioCategory };

  try {
    if (id) {
      const before = await db.portfolio.findUnique({ where: { id }, select: { images: true, slug: true } });
      if (!before) return { ok: false, error: "Project not found." };
      await db.portfolio.update({ where: { id }, data });
      await deleteBlobs(before.images.filter((url) => !data.images.includes(url)));
      revalidatePortfolio(before.slug);
    } else {
      await db.portfolio.create({ data });
    }
  } catch (error) {
    console.error("savePortfolio failed:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002")
      return { ok: false, error: "That slug is already used by another project." };
    return { ok: false, error: "Could not save the project. Please try again." };
  }
  revalidatePortfolio(slug);
  return { ok: true };
}

export async function deletePortfolio(id: string): Promise<ActionResult> {
  await requireAdmin();
  try {
    const item = await db.portfolio.delete({ where: { id } });
    await deleteBlobs(item.images);
    revalidatePortfolio(item.slug);
    return { ok: true };
  } catch (error) {
    console.error("deletePortfolio failed:", error);
    return { ok: false, error: "Could not delete the project." };
  }
}

// ---------- SERVICES / PRICING ----------
export async function saveService(id: string | null, input: ServiceInput): Promise<ActionResult> {
  await requireAdmin();
  const parsed = serviceSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }
  const data = { ...parsed.data, serviceType: parsed.data.serviceType as ServiceType };
  try {
    if (id) await db.servicePricing.update({ where: { id }, data });
    else await db.servicePricing.create({ data });
  } catch (error) {
    console.error("saveService failed:", error);
    return { ok: false, error: "Could not save the package. Please try again." };
  }
  return { ok: true };
}

export async function deleteService(id: string): Promise<ActionResult> {
  await requireAdmin();
  try { await db.servicePricing.delete({ where: { id } }); return { ok: true }; }
  catch (error) { console.error("deleteService failed:", error); return { ok: false, error: "Could not delete the package." }; }
}

// ---------- STAT CARDS (Why Us) ----------
export async function saveStat(id: string | null, input: StatInput): Promise<ActionResult> {
  await requireAdmin();
  const parsed = statSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }
  const data = { ...parsed.data, source: parsed.data.source as StatSource };
  try {
    if (id) await db.siteStat.update({ where: { id }, data });
    else await db.siteStat.create({ data });
  } catch (error) {
    console.error("saveStat failed:", error);
    return { ok: false, error: "Could not save the card. Please try again." };
  }
  revalidatePath("/");
  return { ok: true };
}

export async function deleteStat(id: string): Promise<ActionResult> {
  await requireAdmin();
  try {
    await db.siteStat.delete({ where: { id } });
    revalidatePath("/");
    return { ok: true };
  } catch (error) {
    console.error("deleteStat failed:", error);
    return { ok: false, error: "Could not delete the card." };
  }
}