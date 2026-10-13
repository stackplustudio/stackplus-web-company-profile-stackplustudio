import { config } from "dotenv";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";
import ws from "ws";
import { PrismaClient } from "../src/generated/prisma/client";

config({ path: ".env.local" });
config({ path: ".env" });
if (typeof globalThis.WebSocket === "undefined") neonConfig.webSocketConstructor = ws;

const url = process.env.DATABASE_URL || process.env.DIRECT_URL;
if (!url) throw new Error("DATABASE_URL kosong");
const db = new PrismaClient({ adapter: new PrismaNeon({ connectionString: url }) });

(async () => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "";
  console.log("ADMIN_EMAIL terbaca :", email ?? "(KOSONG)");
  console.log("Panjang password    :", password.length, "karakter");
  const users = await db.adminUser.findMany({ select: { email: true, passwordHash: true } });
  console.log("Admin di database   :", users.map((u) => u.email));
  const me = users.find((u) => u.email === email);
  console.log("Email ada di DB     :", !!me);
  if (me) console.log("Password cocok      :", await bcrypt.compare(password, me.passwordHash));
})().finally(() => db.$disconnect());