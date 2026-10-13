import { config } from "dotenv";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";
import ws from "ws";
import { PrismaClient } from "../src/generated/prisma/client";
import type { ServiceType } from "../src/generated/prisma/enums";
import {
  webDevPricingData, uiUxPricingPlans, mobileDevPricingData,
  aiChatbotPricingData, brandingPricingData,
} from "../src/data";

// Seed berjalan di luar Next.js, jadi .env.local harus dibaca manual.
config({ path: ".env.local" });
config({ path: ".env" });

if (typeof globalThis.WebSocket === "undefined") neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DIRECT_URL / DATABASE_URL kosong. Isi di .env.local (lihat .env.example), lalu jalankan ulang.");
  process.exit(1);
}

const db = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });

type Plan = { name: string; desc?: string; benefits?: string[]; codeTypes?: string[]; techTools?: string[]; isPro?: boolean };

function rows(serviceType: ServiceType, byCategory: Record<string, Plan[]>) {
  return Object.entries(byCategory).flatMap(([category, plans]) =>
    plans.map((p, i) => ({
      serviceType, category, name: p.name, description: p.desc ?? "", isPro: !!p.isPro,
      benefits: p.benefits ?? [], codeTypes: p.codeTypes ?? [], techTools: p.techTools ?? [], sortOrder: i,
    })),
  );
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return console.log("• ADMIN_EMAIL / ADMIN_PASSWORD kosong, lewati admin.");
  if (password.length < 12) throw new Error("ADMIN_PASSWORD minimal 12 karakter.");
  const passwordHash = await bcrypt.hash(password, 12);
  await db.adminUser.upsert({ where: { email }, update: { passwordHash }, create: { email, passwordHash } });
  console.log(`✓ Admin siap: ${email}`);
}

async function seedServices() {
  if ((await db.servicePricing.count()) > 0) return console.log("• services_pricing sudah berisi, lewati.");
  const data = [
    ...rows("WEB_DEVELOPMENT", webDevPricingData),
    ...rows("UI_UX_DESIGN", { GENERAL: uiUxPricingPlans }),
    ...rows("MOBILE_DEVELOPMENT", mobileDevPricingData),
    ...rows("AI_CHATBOT", aiChatbotPricingData),
    ...rows("BRANDING", brandingPricingData),
  ];
  await db.servicePricing.createMany({ data });
  console.log(`✓ ${data.length} paket layanan di-seed.`);
}

(async () => { await seedAdmin(); await seedServices(); })()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());