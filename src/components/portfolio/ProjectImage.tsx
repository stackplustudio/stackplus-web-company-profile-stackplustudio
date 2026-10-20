import Image from "next/image";

/**
 * Gambar memenuhi seluruh kartu (tanpa pita kosong). Bagian yang berlebih dipotong dari
 * sisi kiri/kanan atau bawah, sedangkan bagian ATAS selalu dipertahankan.
 * Induknya harus `relative` dan punya ukuran.
 */
export default function ProjectImage({ src, alt, sizes, priority }: { src: string; alt: string; sizes: string; priority?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-surface-alt">
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
    </div>
  );
}