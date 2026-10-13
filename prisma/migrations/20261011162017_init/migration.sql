-- CreateEnum
CREATE TYPE "PortfolioCategory" AS ENUM ('UI_UX', 'WEB', 'APPS', 'AI_CHATBOT', 'BRANDING');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('WEB_DEVELOPMENT', 'MOBILE_DEVELOPMENT', 'AI_CHATBOT', 'BRANDING', 'UI_UX_DESIGN');

-- CreateTable
CREATE TABLE "portfolios" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "PortfolioCategory" NOT NULL,
    "year" TEXT NOT NULL,
    "summary" TEXT NOT NULL DEFAULT '',
    "role" TEXT,
    "problem" TEXT,
    "solution" TEXT,
    "results" TEXT,
    "metric" TEXT,
    "features" TEXT[],
    "techStack" TEXT[],
    "images" TEXT[],
    "demoUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portfolios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services_pricing" (
    "id" TEXT NOT NULL,
    "serviceType" "ServiceType" NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "isPro" BOOLEAN NOT NULL DEFAULT false,
    "benefits" TEXT[],
    "codeTypes" TEXT[],
    "techTools" TEXT[],
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "portfolios_slug_key" ON "portfolios"("slug");

-- CreateIndex
CREATE INDEX "portfolios_category_published_idx" ON "portfolios"("category", "published");

-- CreateIndex
CREATE INDEX "portfolios_published_featured_sortOrder_idx" ON "portfolios"("published", "featured", "sortOrder");

-- CreateIndex
CREATE INDEX "services_pricing_serviceType_category_idx" ON "services_pricing"("serviceType", "category");

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");
