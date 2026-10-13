import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

// Memaksa dotenv membaca variabel dari file .env.local
dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { 
    path: "prisma/migrations", 
    seed: "tsx prisma/seed.ts" 
  },
  // Menggunakan DATABASE_URL (dengan pooler) untuk transaksi Prisma CLI
  datasource: { 
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  },
});


