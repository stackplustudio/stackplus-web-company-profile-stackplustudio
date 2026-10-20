-- CreateEnum
CREATE TYPE "StatSource" AS ENUM ('MANUAL', 'YEARS_SINCE_FOUNDING');

-- CreateTable
CREATE TABLE "site_stats" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "unit" TEXT NOT NULL DEFAULT '',
    "icon" TEXT NOT NULL DEFAULT 'rocket',
    "source" "StatSource" NOT NULL DEFAULT 'MANUAL',
    "value" INTEGER NOT NULL DEFAULT 0,
    "suffix" TEXT NOT NULL DEFAULT '',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "site_stats_published_sortOrder_idx" ON "site_stats"("published", "sortOrder");
