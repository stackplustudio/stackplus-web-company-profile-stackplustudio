# 🚀 StackPlus Studio - Company Profile & CMS

> 🔒 **CONFIDENTIAL & PROPRIETARY**
> This repository contains proprietary source code and assets belonging to **StackPlus Studio**. Unauthorized copying, distribution, modification, or public display of this code, via any medium, is strictly prohibited.

## 📖 Overview
Repositori ini memuat *source code* terintegrasi untuk *website* Company Profile dan Admin Panel (CMS) dari **StackPlus Studio**. Proyek ini dikembangkan untuk menampilkan layanan digital, portofolio proyek, dan memfasilitasi manajemen konten internal secara dinamis.

## 🛠️ Tech Stack
Proyek ini dibangun menggunakan teknologi *front-end* dan *back-end* modern:
* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Library UI:** [React](https://reactjs.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Database & Auth:** [Supabase](https://supabase.com/)
* **Icons:** [Lucide React](https://lucide.dev/)

## 📂 Key Features
* **Public Facing Website:** Halaman beranda yang responsif (*mobile-friendly*), estetik, dengan dukungan efek UI modern (seperti *glassmorphism* dan *scroll-aware navbar*).
* **Admin Dashboard:** Panel manajemen terenkripsi (dilindungi sistem otentikasi) untuk melakukan operasi CRUD pada data Portofolio dan Layanan (Services).
* **Role-Based Access:** Sistem *routing* aman yang mencegah pengguna tanpa sesi (*unauthenticated users*) untuk mengakses rute `/admin`.

## 💻 Local Development Setup
Bagi *developer* internal yang ingin menjalankan proyek ini di *environment* lokal, ikuti langkah-langkah berikut:

1. **Clone repositori ini:**
   ```bash
   git clone [REPOSITORY_URL]
   ```
2. **Install dependensi:**
   ```bash
   cd stackplus-web
   npm install
   ```
3. **Set up Environment Variables:**
   Minta akses file kredensial ke Lead Developer/Admin. Buat file .env.local di root directory dan masukkan keys berikut:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
(Peringatan: File .env.local sudah masuk ke dalam .gitignore dan dilarang keras untuk di-commit ke repositori).

4. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Buka http://localhost:3000 di browser untuk melihat hasil render aplikasi.

## 🛡️ Security Notes
Pastikan tidak pernah mengunggah/melakukan commit pada file konfigurasi lokal (.env, .env.local).

Kunci Supabase (Anon Key) di sisi client diatur menggunakan Row Level Security (RLS) di sisi database untuk keamanan maksimal.

Akses ke fitur CMS hanya diizinkan melalui proses login di /admin/login.

© 2026 StackPlus Studio. All rights reserved.