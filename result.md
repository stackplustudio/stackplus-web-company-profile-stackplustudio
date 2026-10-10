# 📘 Dokumentasi Lengkap: StackPlus Studio Web — Struktur, Direktori & Arsitektur

Dokumen ini menjelaskan **seluruh** isi proyek `stackplus-web` secara lengkap: daftar dokumen, struktur direktori, arsitektur aplikasi, alur data, integrasi eksternal, hingga catatan temuan penting.

> 🔒 Repositori ini bersifat **CONFIDENTIAL & PROPRIETARY** milik **StackPlus Studio**. Dilarang menyalin/mendistribusikan tanpa izin.

---

## 1. Ringkasan Proyek

| Atribut | Nilai |
|---|---|
| Nama paket | `stackplus-web` |
| Versi | `0.1.0` (private) |
| Jenis proyek | **Web App** — Company Profile + Admin Panel (CMS) |
| Klien/Perusahaan | StackPlus Studio (digital product agency, Indonesia) |
| Bahasa utama | TypeScript (`.tsx` / `.ts`) |
| Framework | **Next.js 16.2.4** (App Router) |
| UI Library | React 19.2.4 + React DOM 19.2.4 |
| Styling | Tailwind CSS (+ PostCSS & autoprefixer) |
| Database & Auth | Supabase (`@supabase/supabase-js`) |
| Ikon | `lucide-react` + inline SVG |
| Utilitas kelas | `clsx` + `tailwind-merge` (helper `cn`) |
| Domain produksi | `https://stackplustudio.com` |

---

## 2. Dokumen Konfigurasi & Meta (root)

| File | Fungsi |
|---|---|
| `package.json` | Manifest npm: scripts (`dev`, `build`, `start`, `lint`) & dependency. |
| `package-lock.json` | Lockfile dependency (npm). |
| `tsconfig.json` | Konfigurasi TypeScript. Alias path `@/*` → `./src/*`. `strict: true`, `jsx: react-jsx`, plugin `next`. |
| `next.config.ts` | Config Next.js. Mengizinkan `next/image` memuat gambar remote dari Supabase Storage (`rqtxwkwlgrzluxxrtnga.supabase.co`, pattern `/storage/v1/object/public/**`). |
| `tailwind.config.ts` | Config Tailwind: `content` scan `src/{pages,components,app}`, warna custom & animasi `marquee`. |
| `postcss.config.mjs` | PostCSS pipeline (plugin `tailwindcss` + `autoprefixer`). |
| `eslint.config.mjs` | ESLint flat config memakai `eslint-config-next/core-web-vitals` + `typescript`; mengabaikan `.next`, `out`, `build`, `next-env.d.ts`. |
| `next-env.d.ts` | Deklarasi tipe bawaan Next (jangan diedit). |
| `README.md` | Dokumentasi resmi singkat (tech stack, setup lokal, security notes). |
| `AGENTS.md` | Instruksi agent: "**This is NOT the Next.js you know**" — wajib baca `node_modules/next/dist/docs/` sebelum menulis kode. |
| `CLAUDE.md` | Hanya berisi `@AGENTS.md` (impor instruksi). |
| `.env.local` | Kredensial rahasia (BLOCKED / tidak untuk di-commit). |
| `.gitignore` | Mengabaikan `node_modules`, `.next`, build, dan **semua file `.env*`** (sangat penting). |
| `.freebuff/project-id` | Metadata internal tooling Freebuff. |
| `.snapshots/` | Direktori snapshot (tooling). |
| `node_modules/next/dist/docs/` | Dokumentasi Next.js 16 lokal (01-app, 02-pages, 03-architecture, 04-community). |

### Catatan Next.js versi ini
Proyek memakai **Next.js 16.2.4** yang memiliki *breaking changes* dari versi sebelumnya. `AGENTS.md` menegaskan agar membaca dokumentasi lokal di `node_modules/next/dist/docs/` sebelum menulis kode. Seluruh `page.tsx` di proyek ini masih mengikuti konvensi App Router (folder-based routing, `layout.tsx`, `page.tsx`).

---

## 3. Struktur Direktori Lengkap

```
stackplus-web/
├── .freebuff/                     # metadata tooling
├── .snapshots/                    # snapshot tooling
├── node_modules/                  # dependency (termasuk docs Next.js 16)
├── public/                        # aset statis
│   ├── icons/                     # logo, favicon, brand assets (.png, .ai, .pdf)
│   ├── images/                    # foto tim, mockup, foto area kerja
│   ├── file.svg, globe.svg, next.svg, vercel.svg, window.svg
│   └── googlea6e12e7e24adf393.html  # verifikasi Google Search Console
├── src/
│   ├── app/                       # ROUTER (App Router) — halaman & layout
│   │   ├── layout.tsx             # Root layout (Navbar, Footer, Chatbot, SEO, font)
│   │   ├── page.tsx               # Halaman Home (/)
│   │   ├── globals.css            # Tailwind directives + style global
│   │   ├── icon.png               # Favicon
│   │   ├── sitemap.ts             # Generator sitemap XML
│   │   ├── about/page.tsx         # (/about)
│   │   ├── contact/page.tsx       # (/contact)
│   │   ├── portfolio/page.tsx     # (/portfolio)
│   │   ├── service/
│   │   │   ├── page.tsx           # (/service)
│   │   │   ├── ai-chatbot/page.tsx
│   │   │   ├── branding-design/page.tsx
│   │   │   ├── mobile-development/page.tsx
│   │   │   ├── ui-ux-design/page.tsx
│   │   │   └── web-development/page.tsx
│   │   └── admin/                 # Area CMS (dilindungi auth)
│   │       ├── login/page.tsx     # Halaman login admin
│   │       └── (dashboard)/       # Route group (URL tidak menyertakan "(dashboard)")
│   │           ├── layout.tsx     # Shell admin + proteksi sesi + navbar admin
│   │           ├── page.tsx       # /admin (overview)
│   │           ├── portfolios/
│   │           │   ├── page.tsx           # /admin/portfolios (list)
│   │           │   ├── create/page.tsx    # /admin/portfolios/create
│   │           │   └── edit/[id]/page.tsx # /admin/portfolios/edit/:id
│   │           └── services/
│   │               ├── page.tsx           # /admin/services (list)
│   │               ├── create/page.tsx    # /admin/services/create
│   │               └── edit/[id]/page.tsx # /admin/services/edit/:id
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # Navbar glassmorphism, scroll-aware, sembunyi di /admin
│   │   │   └── Footer.tsx         # Footer, sembunyi di /admin
│   │   ├── sections/              # Blok konten halaman publik
│   │   │   ├── Hero.tsx           # Home: hero + input email
│   │   │   ├── Marquee.tsx        # Pita berjalan (pita biru & gelap)
│   │   │   ├── Expertise.tsx      # Home: kartu layanan
│   │   │   ├── Portfolio.tsx      # Home: 4 portofolio terbaru (live Supabase)
│   │   │   ├── WhyUs.tsx          # Home: bento grid "Why Us"
│   │   │   ├── CTA.tsx            # CTA + form FormSubmit
│   │   │   ├── WhoWeAre.tsx       # About
│   │   │   ├── VisionMission.tsx  # About
│   │   │   ├── ValueSection.tsx   # About: core values glassmorphism
│   │   │   ├── Team.tsx           # About: kartu anggota tim
│   │   │   ├── AllServices.tsx    # /service: daftar semua layanan
│   │   │   ├── PortfolioShowcase.tsx # /portfolio: filter kategori + galeri
│   │   │   └── ReachUs.tsx        # /contact: info + form FormSubmit
│   │   └── ui/
│   │       ├── Button.tsx         # ⚠️ KOSONG (0 baris) — belum dipakai
│   │       ├── Card.tsx           # ⚠️ KOSONG (0 baris) — belum dipakai
│   │       └── Chatbot.tsx        # Widget chat AI (floating)
│   ├── data/
│   │   └── index.ts               # Sumber data statis (nav, footer, portfolio, tim, pricing, lifecycle)
│   ├── lib/
│   │   ├── supabase.ts            # Client Supabase (URL + anon key dari env)
│   │   ├── uploadImage.ts         # Upload gambar ke Supabase Storage
│   │   ├── utils.ts               # Helper `cn()` (clsx + tailwind-merge)
│   │   └── whatsapp.ts            # Generator link WhatsApp
│   └── services/
│       └── chatService.ts         # HTTP client ke backend AI (FastAPI)
├── AGENTS.md / CLAUDE.md / README.md
├── next.config.ts / tailwind.config.ts / postcss.config.mjs / eslint.config.mjs
├── tsconfig.json / next-env.d.ts
├── package.json / package-lock.json
└── .env.local (rahasia)
```

**Total berkas sumber terindeks:** 113 file proyek.

---

## 4. Arsitektur Aplikasi

### 4.1 Pola Umum
Aplikasi ini adalah **Next.js App Router** monolitik (front-end + BaaS Supabase), dibagi menjadi **dua domain besar**:

1. **Public Facing Website** — halaman marketing (Home, About, Service + 5 sub-layanan, Portfolio, Contact).
2. **Admin Panel / CMS** — CRUD Portofolio & Layanan, dilindungi autentikasi Supabase.

### 4.2 Lapisan (Layers)

```
┌─────────────────────────────────────────────────────────────┐
│  APP LAYER (src/app)  — Routing, Layout, Pages, SEO         │
│  • Server Components (Home, About, Contact, Service list)  │
│  • Client Components ("use client") untuk interaksi/DB     │
└───────────────▲───────────────────────────┬─────────────────┘
                │ render/import             │ fetch data
┌───────────────┴───────────────┐  ┌────────▼─────────────────┐
│  COMPONENTS LAYER (src/       │  │  INTEGRATION LAYER        │
│  components)                  │  │  (src/lib, src/services)  │
│  • layout/ (Navbar, Footer)   │  │  • supabase.ts            │
│  • sections/ (blok halaman)   │  │  • uploadImage.ts         │
│  • ui/ (Chatbot)              │  │  • whatsapp.ts            │
└───────────────▲───────────────┘  │  • chatService.ts         │
                │                   └────────┬─────────────────┘
┌───────────────┴────────────────┐          │
│  DATA LAYER (src/data/index.ts)│          ▼
│  • konten statis/tema/copy     │   ┌──────────────────────┐
└────────────────────────────────┘   │  EXTERNAL SERVICES   │
                                     │  • Supabase (DB/SSO/ │
                                     │    Storage)          │
                                     │  • FastAPI AI chatbot│
                                     │  • WhatsApp / Calendly│
                                     │  • FormSubmit.co     │
                                     └──────────────────────┘
```

**Pemisahan tanggung jawab:**
- `src/app/*` → routing & komposisi halaman.
- `src/components/*` → UI reusable (`sections` = blok per-halaman, `layout` = kerangka, `ui` = widget).
- `src/data/index.ts` → semua **konten statis** (bukan dari DB): navigasi, daftar tim, template pricing, teks lifecycle, dll.
- `src/lib/*` → integrasi & utilitas lintas fitur.
- `src/services/*` → klien layanan eksternal (AI backend).

### 4.3 Server vs Client Components

**Client Components (`"use client"`)** — yang butuh state/effect/DB-browser:
- `admin/(dashboard)/layout.tsx`, seluruh halaman admin (login, list, create, edit)
- Semua `service/*/page.tsx` (5 halaman pricing: fetch Supabase + state tab)
- `components/layout/Navbar.tsx`, `Footer.tsx`
- `components/sections/Portfolio.tsx`, `PortfolioShowcase.tsx`
- `components/ui/Chatbot.tsx`

**Server Components (default)** — statis/SEO:
- `app/layout.tsx`, `app/page.tsx`, `about`, `contact`, `service/page.tsx`
- `Hero`, `Marquee`, `Expertise`, `WhyUs`, `CTA`, `WhoWeAre`, `VisionMission`, `ValueSection`, `Team`, `AllServices`, `ReachUs`

### 4.4 Root Layout (`src/app/layout.tsx`)
- Font: **Plus Jakarta Sans** (`next/font/google`).
- `metadata`: title, description global, keywords SEO, Open Graph, Twitter Card, robots (`index: true, follow: true`).
- **JSON-LD Schema.org** `Organization` (nama, url, logo, social `sameAs`, contactPoint email) — untuk SEO.
- Struktur body: `<Navbar />` → `<main className="min-h-screen pt-28">{children}</main>` → `<Footer />` → `<Chatbot />`.
- Body background `#FCFBF6`, teks `gray-900`, `antialiased`.

---

## 5. Peta Routing (App Router)

| Route | File | Tipe | Deskripsi |
|---|---|---|---|
| `/` | `app/page.tsx` | Server | Hero → Marquee → Expertise → Portfolio → WhyUs → CTA |
| `/about` | `app/about/page.tsx` | Server | WhoWeAre → VisionMission → ValueSection → Team → CTA |
| `/service` | `app/service/page.tsx` | Server | AllServices → CTA |
| `/service/web-development` | `.../web-development/page.tsx` | Client | Pricing tab + lifecycle (data Supabase) |
| `/service/ui-ux-design` | `.../ui-ux-design/page.tsx` | Client | Pricing UI/UX |
| `/service/mobile-development` | `.../mobile-development/page.tsx` | Client | Pricing Mobile |
| `/service/ai-chatbot` | `.../ai-chatbot/page.tsx` | Client | Pricing AI Chatbot |
| `/service/branding-design` | `.../branding-design/page.tsx` | Client | Pricing Branding |
| `/portfolio` | `app/portfolio/page.tsx` | Server | PortfolioShowcase (+CTA) |
| `/contact` | `app/contact/page.tsx` | Server | ReachUs → CTA |
| `/sitemap.xml` | `app/sitemap.ts` | — | Sitemap (hanya homepage terdaftar) |
| `/admin/login` | `admin/login/page.tsx` | Client | Login Supabase |
| `/admin` | `admin/(dashboard)/page.tsx` | Client (shell) | Dashboard overview |
| `/admin/portfolios` | `.../portfolios/page.tsx` | Client | Tabel daftar portofolio |
| `/admin/portfolios/create` | `.../create/page.tsx` | Client | Form tambah + upload gambar |
| `/admin/portfolios/edit/[id]` | `.../edit/[id]/page.tsx` | Client | Form edit + ganti gambar |
| `/admin/services` | `.../services/page.tsx` | Client | Tabel daftar paket layanan |
| `/admin/services/create` | `.../create/page.tsx` | Client | Form tambah paket |
| `/admin/services/edit/[id]` | `.../edit/[id]/page.tsx` | Client | Form edit paket |

> `(dashboard)` adalah **route group** — tidak muncul di URL, hanya untuk berbagi layout admin.

---

## 6. Data Layer & Skema Database

### 6.1 `src/data/index.ts` (konten statis)
Kumpulan konstanta yang dipakai lintas halaman:

| Ekspor | Isi |
|---|---|
| `navLinks` | Menu navbar: HOME, ABOUT, SERVICE, PORTOFOLIO, CONTACT |
| `footerLinks` | `quickLinks` & `services` untuk footer |
| `expertiseData` | 5 layanan (UI/UX, Web, Mobile, AI ChatBot, Branding) + `isActive`, `href` |
| `portfolioData` | Dummy portofolio (hardcoded) |
| `teamData` | 6 anggota tim (nama, role, foto, Instagram, LinkedIn) |
| `portfolioCategories` | `UI/UX DESIGN`, `WEB DEVELOPMENT`, `APPS DEVELOPMENT`, `AI CHATBOT`, `BRANDING` |
| `detailedPortfolioData` | Data detail portofolio (hardcoded) |
| `webDevPricingTabs` / `webDevPricingData` | Tab & template harga Web Dev (10 kategori) |
| `uiUxPricingPlans` / `uiUxLifecycleData` | Harga & lifecycle UI/UX |
| `mobileDevPricingTabs` / `mobileDevPricingData` | Tab & harga Mobile Dev |
| `aiChatbotPricingTabs` / `aiChatbotPricingData` | Tab & harga AI Chatbot |
| `brandingPricingTabs` / `brandingPricingData` | Tab & harga Branding |
| `lifecycleData` | 7 tahap lifecycle Web/Mobile |
| `aiChatbotLifecycleData`, `brandingLifecycleData` | Lifecycle khusus |
| `whyUsData` | Path 2 gambar section WhyUs |

> **Catatan penting:** Data pricing (`webDevPricingData`, `aiChatbotPricingData`, dll.) kini **tidak lagi dipakai utama** — halaman pricing mengambil data live dari tabel Supabase `services_pricing`. Konstanta di file ini hanya menyisakan daftar **tab/kategori**. Ini adalah sisa migrasi (lihat §10).

### 6.2 Tabel Supabase (inferred dari kode)

**Tabel `portfolios`**
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid/int | Primary key |
| `title` | text | Judul proyek |
| `category` | text | Salah satu dari `portfolioCategories` |
| `year` | text | Tahun |
| `features` | text[] | Daftar fitur/scope |
| `images` | text[] | Array URL publik (Supabase Storage) |
| `created_at` | timestamp | Untuk pengurutan |

**Tabel `services_pricing`**
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid/int | Primary key |
| `service_type` | text | `WEB DEVELOPMENT`, `MOBILE DEVELOPMENT`, `AI CHATBOT`, `BRANDING`, `UI/UX DESIGN` |
| `category` | text | Sub-kategori / tab |
| `name` | text | Nama paket (Lite/Pro/Advance/Custom) |
| `description` | text | Deskripsi singkat |
| `is_pro` | boolean | Highlight kartu biru |
| `benefits` | text[] | Daftar benefit |
| `code_types` | text[] | Stack/bahasa |
| `tech_tools` | text[] | Tools |
| `created_at` | timestamp | Pengurutan |

**Supabase Storage**: bucket `portfolio-images`, path `portfolio/<timestamp>-<random>.<ext>`.

### 6.3 Integrasi Supabase
- `src/lib/supabase.ts`: `createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)`.
- `src/lib/uploadImage.ts`: `uploadPortfolioImage(file)` → upload ke bucket lalu kembalikan `publicUrl`.
- Auth: `supabase.auth.getSession()`, `signInWithPassword()`, `signOut()`.
- Keamanan data mengandalkan **Row Level Security (RLS)** di sisi database (anon key dipakai di client).

---

## 7. Admin Panel (CMS) — Auth Flow

```
/admin/login  ──signInWithPassword(email,password)──▶ Supabase Auth
     │                                                     │
     │ sukses                                              │
     ▼                                                     │
router.push("/admin") ──▶ (dashboard)/layout.tsx            │
                          └─ useEffect cek getSession()  ───┘
                             • tidak ada sesi → redirect /admin/login
                             • ada sesi → render shell + {children}
```

- **Proteksi**: dilakukan di `admin/(dashboard)/layout.tsx` via `supabase.auth.getSession()`. Selama memeriksa fase auth, ditampilkan spinner. Jika tidak ada sesi → `router.push("/admin/login")`.
- **Shell admin**: header sticky ("StackAdmin / Management Panel"), menu (Dashboard, Portfolios, Services, Back to Web), tombol logout (dengan `window.confirm`), menu mobile.
- **Navbar publik & Footer disembunyikan** saat `pathname.startsWith("/admin")` (return `null`).

### CRUD
- **Portfolios**: list (select + order `created_at` desc), create (upload multi gambar paralel via `Promise.all`, simpan `images[]`), edit (fetch `.single()`, ganti gambar opsional sambil pertahankan URL lama), delete (dari list & dari halaman edit).
- **Services**: list (dari `services_pricing`), create & edit dengan **array dinamis** (benefits / code_types / tech_tools) dan **mapping kategori** (`categoryMap`) berdasarkan `service_type`. Delete dari list.

| `categoryMap` di form service |
|---|
| `WEB DEVELOPMENT`: GENERAL, COMPANY PROFILE, E-COMMERCE, CORPORATE, LANDING PAGE, LMS, NEWS, WEB APPS, PERSONAL WEB, BLOG |
| `MOBILE DEVELOPMENT`: GENERAL, E-COMMERCE MOBILE APP, LMS MOBILE APPS, HRIS MOBILE APPS |
| `AI CHATBOT`: GENERAL, CUSTOMER SERVICE, SALES & MARKETING BOT, KNOWLEDGE ASSISTANT RAG, AGENTIC AUTOMATION SYSTEM |
| `BRANDING`: LOGO, SOCIAL MEDIA DESIGN |
| `UI/UX DESIGN`: GENERAL |

---

## 8. Integrasi Eksternal

| Layanan | Lokasi kode | Fungsi |
|---|---|---|
| **Supabase** | `src/lib/supabase.ts`, seluruh halaman admin & pricing | Database (`portfolios`, `services_pricing`), Storage (`portfolio-images`), Auth admin |
| **FastAPI AI Backend** | `src/services/chatService.ts`, `src/components/ui/Chatbot.tsx` | `POST {API_URL}/chat` dengan `{ message }` → `{ answer }`. URL dari `NEXT_PUBLIC_AI_API_URL` (fallback `http://127.0.0.1:8000`) |
| **WhatsApp** | `src/lib/whatsapp.ts` + fungsi lokal di tiap halaman service | Link `wa.me/6281398410264` dengan pesan berisi nama paket & layanan |
| **FormSubmit.co** | `CTA.tsx`, `ReachUs.tsx` | Form kontak → email `stackplustudio@gmail.com` (action POST) |
| **Calendly** | `Navbar.tsx` | Tombol "BOOK A SESSION" → `calendly.com/stackplustudio/30min` |
| **Google** | `public/googlea6e12e7e24adf393.html` | Verifikasi Search Console |

### Chatbot (widget AI)
- Floating widget kanan-bawah; bisa dibuka/maksimalkan (full-screen) & ditutup.
- State pesan, indikator loading, auto-scroll.
- Mengirim ke backend FastAPI, menampilkan field `answer`.
- Menangani error koneksi dengan pesan fallback.

---

## 9. Styling, Tema & Aset

### 9.1 Tema (Tailwind + nilai hardcoded)
| Warna | Nilai | Pemakaian |
|---|---|---|
| Primary (biru elektrik) | `#0053F1` (alias `primary`) | Tombol, aksen, kartu aktif |
| Secondary / background | `#FCFBF6` (off-white) | Background situs |
| Gelap (coklat tua) | `#423E3A` | Tombol sekunder, header kartu |
| Border krem | `#EAE5D9` | Border kartu |
| Krem kartu | `#FDFBF7` | Background kartu |
| Krem muda | `#F6F3EC` / `#F8F6F0` / `#F2EFE9` | Variasi background |

- `tailwind.config.ts`: warna `primary` (`#0053F1`) & `secondary` (`#FCFBF6`), keyframes/animation `marquee`.
- `globals.css`: tiga direktif `@tailwind`, memaksa body terang (`!important`), `scroll-behavior: smooth`.
- Kelas kustom `hide-scrollbar` dan animasi `animate-in`/`fade-in`/`slide-in-from-*` dipakai (dari plugin/utility animasi).

### 9.2 Aset publik (`public/`)
- `icons/`: logo StackPlus (logo1–3, logonavbar, varian background biru/putih, Primary Logo 1/2, Logo Text 1/2, source `.ai`, kartu daftar `.pdf`, `icon.png`).
- `images/`: foto tim (`zauzan.png`, `valen.png`, `budi.png`, `raisa.png`, `rafael.jpeg`, `arief.jpeg`, `Faheema.png`), foto area kerja/diskusi, mockup (`Mockup*.png`, `iPhone*.png`, `Hexavue.png`, `arsicon.png`, `kerja.png`, `alvi.png`).
- Placeholder bawaan Next (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`).

### 9.3 SEO
- Metadata global (title/description/keywords/OG/Twitter/robots) di root layout.
- JSON-LD `Organization` (schema.org) dengan social links Instagram, TikTok, LinkedIn.
- `sitemap.ts` (hanya homepage — perlu ditambah seiring bertambahnya route).
- Verifikasi Google Search Console.

---

## 10. Catatan Penting & Temuan (untuk perawatan)

1. **Dua file kosong**: `src/components/ui/Button.tsx` dan `src/components/ui/Card.tsx` berukuran **0 baris** (placeholder). Belum dipakai; bisa diisi atau dihapus.
2. **Sisa data statis vs DB**: `src/data/index.ts` masih menyimpan `*PricingData`/`*PricingPlans` yang sudah digantikan data Supabase — hanya tab yang dipakai. Ada risiko *dead code*.
3. **Ketidaksesuaian versi Tailwind**: `package.json` memakai `tailwindcss ^3.4.19` (v3) namun `@tailwindcss/postcss ^4.2.4` (v4) terpasang, dan `postcss.config.mjs` masih format v3 (`tailwindcss: {}`). Perlu diselaraskan.
4. **Duplikasi helper WhatsApp**: fungsi `getWhatsAppLink` diduplikasi manual di setiap halaman service, padahal sudah ada `src/lib/whatsapp.ts` (belum dipakai sejak refactor). Angka WA masih hardcoded `6281398410264` dengan komentar "GANTI".
5. **Data tidak konsisten**: `portfolioCategories` (untuk filter & form admin) berisi `APPS DEVELOPMENT`, tetapi `expertiseData` memakai `Mobile Development` — perlu dicek agar filter portofolio cocok dengan kategori yang diinput.
6. **`chatService.ts` vs `Chatbot.tsx`**: `chatService.ts` mengharapkan `{ response, strategy }`, sedangkan `Chatbot.tsx` membaca `{ answer }`. Backend harus konsisten; `chatService.ts` saat ini tampak tidak dipakai oleh komponen.
7. **Autentikasi hanya client-side**: proteksi `/admin` berbasis `getSession()` di client (bukan middleware/server). Untuk keamanan lebih kuat, pertimbangkan **Next.js middleware** + RLS ketat.
8. **Form CTA di Hero** tidak memiliki `action`/handler (input email saja, non-fungsional), berbeda dengan `CTA.tsx` dan `ReachUs.tsx` yang sudah pakai FormSubmit.
9. **Link footer** `/privacy` dan `/terms` belum memiliki halaman.
10. **`portfolioData` & `detailedPortfolioData`** di `src/data` tampak tidak lagi dirender (halaman portofolio pakai DB) — kandidat pembersihan.

---

## 11. Alur Data (End-to-End)

**Publik — Portofolio:**
```
Supabase tabel `portfolios`
   │ select() order created_at desc (limit 4 di Home / semua di /portfolio)
   ▼
Portfolio.tsx / PortfolioShowcase.tsx  (client component)
   │ render grid / filter kategori
   ▼
next/image (gambar dari URL publik bucket `portfolio-images`)
```

**Admin — Tambah Proyek:**
```
Form create
   │ pilih file gambar
   ▼
uploadPortfolioImage() → Supabase Storage (bucket portfolio-images)
   │ kembalikan publicUrl
   ▼
supabase.from("portfolios").insert({ title, category, year, features, images })
   ▼
redirect /admin/portfolios + router.refresh()
```

**Publik — Pricing Layanan:**
```
Sidebar tab (dari src/data)
   │ pilih tab → useState activeTab
   ▼
supabase.from("services_pricing").select().eq(service_type).eq(category, activeTab)
   ▼
render kartu pricing → tombol "DISCUSS NOW" ke WhatsApp (pesan otomatis)
```

---

## 12. Cara Menjalankan

```bash
npm install
# buat .env.local:
#   NEXT_PUBLIC_SUPABASE_URL=...
#   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
#   NEXT_PUBLIC_AI_API_URL=...   (opsional, untuk chatbot)
npm run dev      # http://localhost:3000
npm run build    # build produksi
npm run start    # jalankan build
npm run lint     # ESLint
```

---

*Dokumen ini dibuat berdasarkan pembacaan seluruh berkas sumber, konfigurasi, dan README proyek. Terakhir disusun: 10 Oktober 2026.*
