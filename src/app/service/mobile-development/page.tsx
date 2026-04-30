"use client";

import { useState, useEffect } from "react";
// mobileDevPricingData dihapus dari import karena kita pakai database sekarang
import { mobileDevPricingTabs, expertiseData, lifecycleData } from "@/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CTA from "@/components/sections/CTA";
import { supabase } from "@/lib/supabase"; // Import Supabase

export default function MobileDevPricingPage() {
  const [activeTab, setActiveTab] = useState("GENERAL");

  // State baru untuk menampung data dari Supabase
  const [pricingData, setPricingData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter agar "Mobile Development" tidak muncul di "Explore Other Services"
  const otherServices = expertiseData.filter(
    (item) => item.title !== "Mobile Development"
  );

  // Fungsi untuk mengambil data dari Supabase berdasarkan Tab yang aktif
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("services_pricing")
          .select("*")
          .eq("service_type", "MOBILE DEVELOPMENT") // Pastikan Tipe Layanan sesuai
          .eq("category", activeTab)                // Kategori sesuai tab yang diklik
          .order("created_at", { ascending: true }); // Mengurutkan dari yang pertama dibuat

        if (error) throw error;
        setPricingData(data || []);
      } catch (error) {
        console.error("Error fetching pricing:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPricing();
  }, [activeTab]);

  return (
    <main className="min-h-screen pt-10">
      
      {/* SECTION 1: PRICING PLAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">› PRICING ‹</p>
          <h1 className="text-5xl md:text-6xl font-medium text-[#423E3A] tracking-tight mb-2">Pricing Plan</h1>
          <h2 className="text-5xl md:text-6xl font-bold text-[#0053f1] tracking-tight mb-12">Mobile Development</h2>
          
          {/* PERBAIKAN DI SINI: Class 'w-full' dihapus agar lebar pill mengikuti isinya */}
          <div className="flex justify-center w-full">
            <div className="inline-flex items-center justify-center bg-[#FCFBF6] border border-[#EAE5D9] rounded-full p-2 shadow-sm overflow-x-auto max-w-full hide-scrollbar">
              {mobileDevPricingTabs.map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)} 
                  className={cn(
                    "px-6 py-3 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300", 
                    activeTab === tab ? "bg-[#423E3A] text-white shadow-md" : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Grid 4 Kolom Pricing dengan Efek Hover & Tinggi Sama (Flex-grow) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12">
          {/* Logika Loading & Empty State */}
          {isLoading ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0053f1]"></div>
            </div>
          ) : pricingData.length === 0 ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-4 text-center py-10 text-gray-400">
               Belum ada paket tersedia untuk kategori ini.
            </div>
          ) : (
            pricingData.map((plan) => (
              <div 
                key={plan.id} 
                className={cn(
                  "rounded-[16px] p-8 lg:p-10 flex flex-col transition-all duration-500 ease-out group h-full",
                  plan.is_pro // Di database menggunakan is_pro
                    ? "bg-[#0053f1] text-white transform lg:-translate-y-4 shadow-xl shadow-primary/20 hover:lg:-translate-y-6 hover:shadow-2xl hover:shadow-[#0053f1]/40 animate-in fade-in slide-in-from-bottom-4" 
                    : "bg-[#FDFBF7] border border-[#EAE5D9] text-gray-900 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-[#0053f1]/30 animate-in fade-in slide-in-from-bottom-4"
                )}
              >
                <h3 className="text-3xl font-bold mb-4">{plan.name}</h3>
                <p className={cn("text-sm mb-8 leading-relaxed", plan.is_pro ? "text-white/80" : "text-gray-500")}>{plan.description}</p>
                <div className={cn("w-full h-px mb-8", plan.is_pro ? "bg-white/20" : "bg-gray-200")}></div>
                <div className="mb-8 flex-grow">
                  <p className="text-sm font-bold mb-6">Benefits included:</p>
                  <ul className="space-y-4">
                    {plan.benefits?.map((benefit: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={cn("mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300", plan.is_pro ? "bg-white text-[#0053f1]" : "bg-[#0053f1] text-white group-hover:bg-[#003cb3]")}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                        <span className={cn("text-sm", plan.is_pro ? "text-white/90" : "text-gray-600")}>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={cn("w-full border-t border-dashed mb-8 mt-auto", plan.is_pro ? "border-white/30" : "border-gray-200")}></div>
                <div className="mb-8">
                  <p className="text-sm font-bold mb-6">Code Type</p>
                  <ul className="space-y-4">
                    {plan.code_types?.map((code: string, i: number) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className={cn("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300", plan.is_pro ? "bg-white text-[#0053f1]" : "bg-[#0053f1] text-white group-hover:bg-[#003cb3]")}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                        <span className={cn("text-sm", plan.is_pro ? "text-white/90" : "text-gray-600")}>{code}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={cn("w-full border-t border-dashed mb-8", plan.is_pro ? "border-white/30" : "border-gray-200")}></div>
                <div className="mb-12">
                  <p className="text-sm font-bold mb-6">Tech tools</p>
                  <div className="flex flex-wrap gap-3">
                    {plan.tech_tools?.map((tool: string, i: number) => (
                      <span key={i} className={cn("px-4 py-2 rounded-full text-xs font-medium border transition-colors duration-300", plan.is_pro ? "bg-white/10 border-white/20 text-white" : "bg-transparent border-gray-200 text-gray-500 group-hover:border-gray-300")}>{tool}</span>
                    ))}
                  </div>
                </div>
                <button className={cn("w-full py-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] mt-auto", plan.is_pro ? "bg-[#423E3A] text-white hover:bg-[#2A2724]" : "bg-[#423E3A] text-white hover:bg-[#2A2724] hover:shadow-lg")}>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> DISCUSS NOW
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* SECTION 2: EXPLORE OTHER SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="w-full h-px bg-gray-200 mb-16"></div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">Explore Other Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherServices.map((item, index) => (
            <div key={index} className="bg-[#FDFBF7] border border-[#EAE5D9] p-8 rounded-2xl flex flex-col justify-between h-[280px] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-primary/10 text-primary">
                <div className="w-5 h-5 border-2 rounded-sm border-current border-dashed"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-sm mb-6 line-clamp-2 text-gray-500">{item.desc}</p>
                <Link href="#" className="inline-flex items-center text-sm font-bold gap-2 group text-primary">
                  Learn More 
                  <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: LIFECYCLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-200">
        <h2 className="text-5xl md:text-6xl font-medium text-[#0053f1] tracking-tight mb-16 md:mb-24">Lifecycle</h2>
        <div className="flex flex-col relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-x-12 lg:gap-y-6">
            {lifecycleData.slice(0, 4).map((item, index) => (
              <div key={index} className="relative h-full flex flex-col">
                <div className="h-full flex flex-col bg-[#FDFBF7] border border-[#EAE5D9] p-6 lg:p-8 rounded-[1.5rem] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group z-10 relative">
                  <div className="bg-[#423E3A] text-white text-[10px] sm:text-xs font-bold px-2 py-3.5 rounded-full text-center w-full shadow-md mb-6 tracking-wide group-hover:bg-primary transition-colors">{item.title}</div>
                  <div className="w-full h-px bg-[#EAE5D9] mb-6"></div>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed flex-grow">{item.desc}</p>
                </div>
                {index !== 3 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-9 w-6 items-center justify-center -translate-y-1/2 text-[#EAE5D9] z-0"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
                )}
                <div className="flex lg:hidden justify-center items-center py-4 text-[#EAE5D9]"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
              </div>
            ))}
          </div>
          <div className="hidden lg:block h-20 relative w-full z-0">
            <div className="absolute right-[12.5%] top-0 w-[3px] h-10 bg-[#EAE5D9]"></div>
            <div className="absolute right-[12.5%] top-10 w-[75%] h-[3px] bg-[#EAE5D9]"></div>
            <div className="absolute left-[12.5%] top-10 w-[3px] h-10 bg-[#EAE5D9]"></div>
            <div className="absolute left-[12.5%] bottom-[-10px] -translate-x-1/2 text-[#EAE5D9]"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 24l-12-18h24z"/></svg></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-x-12 lg:gap-y-6">
            {lifecycleData.slice(4, 7).map((item, index) => (
              <div key={index} className="relative h-full flex flex-col">
                <div className="h-full flex flex-col bg-[#FDFBF7] border border-[#EAE5D9] p-6 lg:p-8 rounded-[1.5rem] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group z-10 relative">
                  <div className="bg-[#423E3A] text-white text-[10px] sm:text-xs font-bold px-2 py-3.5 rounded-full text-center w-full shadow-md mb-6 tracking-wide group-hover:bg-primary transition-colors">{item.title}</div>
                  <div className="w-full h-px bg-[#EAE5D9] mb-6"></div>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed flex-grow">{item.desc}</p>
                </div>
                {index !== 2 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-9 w-6 items-center justify-center -translate-y-1/2 text-[#EAE5D9] z-0"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
                )}
                <div className="flex lg:hidden justify-center items-center py-4 text-[#EAE5D9]"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
              </div>
            ))}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}