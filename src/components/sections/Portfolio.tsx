"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Portfolio() {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fungsi memanggil data dari Supabase
    const fetchPortfolios = async () => {
      try {
        // Ambil 4 portofolio terbaru untuk di halaman Home
        const { data, error } = await supabase
          .from("portfolios")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(4);

        if (error) throw error;
        if (data) setPortfolios(data);
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  return (
    <section id="portofolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">› PORTOFOLIO ‹</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#423E3A] tracking-tight">
              Our Digital <br className="hidden md:block" />
              <span className="text-[#0053f1]">Creations</span>
            </h2>
          </div>
          
          {/* PERBAIKAN DI SINI: Dibuat items-start dan text-left agar sama persis dengan Why Us */}
          <div className="max-w-md flex flex-col items-start text-left md:pb-2">
            <p className="text-gray-500 mb-6 leading-relaxed">
              A glimpse into the digital solutions we've crafted for forward-thinking brands. We don't just build products, we build solutions.
            </p>
            <Link href="/portfolio" className="bg-[#423E3A] text-white px-6 py-3 rounded-[16px] text-sm font-bold hover:bg-[#0053f1] transition-all flex items-center justify-center gap-2 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> View All Projects
            </Link>
          </div>
        </div>

        {/* Portfolio Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0053f1]"></div>
          </div>
        ) : portfolios.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            Belum ada proyek portofolio.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {portfolios.map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-[16px] bg-[#FDFBF7] border border-[#EAE5D9] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-[400px]">
                
                {/* Image Section */}
                <div className="relative w-full flex-1 overflow-hidden">
                  {/* Karena di database kita simpan images sebagai array, kita panggil gambar pertama [0] */}
                  {item.images && item.images.length > 0 ? (
                    <Image 
                      src={item.images[0]} 
                      alt={item.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                      No Image
                    </div>
                  )}
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#423E3A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content Section */}
                <div className="p-8 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/95 to-transparent pt-12 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[#0053f1] text-xs font-bold tracking-wider mb-2 uppercase">{item.category}</p>
                      <h3 className="text-2xl font-bold text-[#423E3A]">{item.title}</h3>
                    </div>
                    <Link href="/portfolio" className="w-12 h-12 rounded-full bg-[#0053f1] text-white flex items-center justify-center hover:bg-[#003cb3] hover:scale-110 transition-all duration-300 shadow-md">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-[#0053f1] font-bold hover:gap-4 transition-all duration-300">
            VIEW ALL PROJECTS <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </Link>
        </div>

      </div>
    </section>
  );
}