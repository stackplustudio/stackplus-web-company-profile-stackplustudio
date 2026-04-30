"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { portfolioCategories } from "@/data";
import { cn } from "@/lib/utils";

export default function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter Kategori (tambah opsi ALL di depan)
  const categories = ["ALL", ...portfolioCategories];

  useEffect(() => {
    const fetchAllPortfolios = async () => {
      try {
        setIsLoading(true);
        // Ambil SEMUA data tanpa dilimit
        const { data, error } = await supabase
          .from("portfolios")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setPortfolios(data);
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPortfolios();
  }, []);

  // Logika Filter
  const filteredPortfolios = activeCategory === "ALL" 
    ? portfolios 
    : portfolios.filter(item => item.category === activeCategory);

  return (
    <section className="py-20 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Tabs */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">› PORTOFOLIO ‹</p>
          <h1 className="text-5xl md:text-6xl font-bold text-[#423E3A] tracking-tight mb-6">
            All <span className="text-[#0053f1]">Projects</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto mb-10">
            Explore our complete catalog of digital innovations, sorted by expertise.
          </p>

          {/* Kategori Filter Tabs (Desain dibungkus seperti Navbar) */}
          <div className="flex justify-center w-full">
            <div className="inline-flex items-center justify-center bg-white border border-gray-100 rounded-full p-2 shadow-sm overflow-x-auto max-w-full hide-scrollbar gap-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-6 py-3 rounded-full text-xs font-extrabold tracking-[0.10em] whitespace-nowrap transition-all duration-300",
                    activeCategory === category
                      ? "bg-[#0053f1] text-white shadow-md"
                      : "text-gray-500 hover:text-[#0053f1] hover:bg-gray-50"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0053f1]"></div>
          </div>
        ) : filteredPortfolios.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[16px] border border-gray-100">
            <p className="text-gray-400">Belum ada proyek di kategori ini.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredPortfolios.map((item) => (
              /* Card Wrapper (Latar Krem & Border) */
              <div key={item.id} className="bg-[#FCFBF6] border border-[#EAE5D9] rounded-[24px] p-6 md:p-8 flex flex-col lg:flex-row gap-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                
                {/* Bagian Kiri (Teks & Fitur) */}
                <div className="w-full lg:w-1/3 flex flex-col justify-between space-y-8">
                  <div>
                    {/* Header Card (Tahun & Judul menyamping) */}
                    <div className="flex items-center gap-4 mb-8">
                      <span className="bg-[#423E3A] text-white px-5 py-2 rounded-full text-sm font-bold">
                        {item.year || "2026"}
                      </span>
                      <h3 className="text-2xl font-bold text-[#423E3A]">{item.title}</h3>
                    </div>
                    
                    {/* List Fitur dengan Checklist Biru */}
                    <ul className="space-y-4">
                      {item.features && item.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#0053f1] flex items-center justify-center flex-shrink-0">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <span className="text-[#423E3A] font-medium text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Kategori Pill di bagian bawah */}
                  <div>
                    <span className="inline-flex bg-[#0053f1] text-white px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-widest shadow-md shadow-[#0053f1]/20">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Bagian Kanan (Galeri Gambar - Berdampingan) */}
                <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {item.images && item.images.length > 0 ? (
                    item.images.map((imgStr: string, idx: number) => (
                      <div key={idx} className="relative w-full h-[300px] md:h-[400px] rounded-[16px] overflow-hidden border border-gray-100">
                        <Image src={imgStr} alt={`${item.title} preview`} fill className="object-cover hover:scale-105 transition-transform duration-700" />
                      </div>
                    ))
                  ) : (
                    <div className="w-full h-[300px] bg-gray-200 rounded-[16px] flex items-center justify-center text-gray-400">No Images</div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}