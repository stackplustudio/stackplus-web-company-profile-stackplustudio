import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/ui/Chatbot";

const jakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stack Plus Studio",
  description: "Digital product solution agency",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* Kita tambahkan background warna cream terang di tag body */}
      <body className={`${jakartaSans.className} bg-[#FCFBF6] text-gray-900 antialiased`}>
        <Navbar />
        {/* Tambahkan padding-top agar konten tidak tertutup navbar yang fixed */}
        <main className="min-h-screen pt-28">
          {children}
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}