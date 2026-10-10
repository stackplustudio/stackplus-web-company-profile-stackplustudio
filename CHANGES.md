# StackPlus Web: Langkah 1 (Fondasi)

## Cara pasang
1. Backup dulu (atau pastikan sudah di-commit ke git).
2. Timpa isi folder proyek dengan file di zip ini: folder `src/`, `tailwind.config.ts`, `package.json`, `package-lock.json`.
3. Jalankan:
   npm install
   npm run dev
4. Isi `.env.local` (opsional): NEXT_PUBLIC_WHATSAPP_NUMBER=6285769042975
   (kalau kosong, nomor ini sudah jadi default)

## Yang berubah
**Font dan Tailwind**
- Satu font: Plus Jakarta Sans (variable 200-800), dimuat lokal lewat `src/fonts/` dan dipakai lewat `font-sans`. Admin yang tadinya jatuh ke font sistem sekarang ikut sama.
- Bobot font Portfolio disamakan (font-extrabold dan tracking lebar diganti font-bold).
- Hapus `@tailwindcss/postcss` (v4, tidak terpakai). Tetap Tailwind v3.4.
- Pasang `tailwindcss-animate`: kelas animate-in / fade-in / slide-in-from-* di 16 file sebelumnya tidak berfungsi.
- Kelas `hide-scrollbar` sekarang didefinisikan.
- Design tokens: primary (#0053F1, dipertahankan), primary-dark, background, surface, surface-alt, line, ink, ink-dark. Tiga krem yang hampir sama dilebur jadi satu. Warna hardcoded diganti token (nilai sama, tampilan tidak berubah).

**Bug**
- Navbar: `return null` dipindah setelah `useEffect` (melanggar aturan hooks).
- Deteksi logo putih di Navbar sekarang memakai atribut `data-blue-section`, bukan kelas `.bg-primary`.
- Input email di Hero sekarang benar-benar terkirim (FormSubmit, sama seperti CTA).
- Link mati di halaman Contact (Book a call, Instagram, LinkedIn, TikTok) sekarang terisi.
- Spasi di depan URL LinkedIn Arief dihapus.

**Kode bersama**
- `src/lib/whatsapp.ts`: satu helper untuk 5 halaman layanan. Nomor baru 085769042975 (dipakai sebagai 6285769042975). Pesan WhatsApp berbahasa Inggris.
- `src/lib/site.ts`: email, Calendly, dan tautan sosial dalam satu tempat.
- `Button.tsx` dan `Card.tsx` sebelumnya kosong, sekarang terisi (dipakai di langkah 3).

**Bahasa Inggris (sisi publik)**
- Chatbot, label PORTOFOLIO menjadi PORTFOLIO, pesan "belum ada data", id section.

## Belum dikerjakan (langkah berikut)
- Admin dan data (Supabase ke Neon + Prisma): langkah 2. Sisa error lint (any, setState di effect) semuanya ada di file yang diganti di langkah 2.
- Konten di database (benefit paket dll.) masih bahasa Indonesia: perlu diterjemahkan saat migrasi data.
