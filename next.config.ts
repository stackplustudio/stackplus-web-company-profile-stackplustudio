import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "ws" dipakai driver Neon di Node <= 21; jangan di-bundle oleh Next.
  serverExternalPackages: ["ws"],
  images: {
    // Hanya dev: sebagian jaringan (DNS64/NAT64) membuat host Blob terdeteksi sebagai IP privat.
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;