import "server-only";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";
import { PrismaClient } from "@/generated/prisma/client";

// Node.js 21 ke bawah belum punya WebSocket bawaan (dibutuhkan driver Neon).
if (typeof globalThis.WebSocket === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL belum diset. Lihat .env.example.");
  return new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });
}

export const db = globalForPrisma.prisma ?? createClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;