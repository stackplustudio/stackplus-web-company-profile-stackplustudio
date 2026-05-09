"use client";

import { useState, useEffect } from "react";
import { webDevPricingTabs, expertiseData, lifecycleData } from "@/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CTA from "@/components/sections/CTA";
import { supabase } from "@/lib/supabase";
import { ArrowRight, Layout, Code, Smartphone, Bot, Palette } from "lucide-react";

// Fungsi untuk memilih ikon berdasarkan judul layanan
const getIcon = (title: string) => {
  switch (title) {
    case "UI/UX Design": return <Layout size={24} />;
    case "Web Development": return <Code size={24} />;
    case "Mobile Development": return <Smartphone size={24} />;
    case "AI ChatBot": return <Bot size={24} />;
    case "Branding Design": return <Palette size={24} />;
    default: return <Layout size={24} />;
  }
};

// --- FUNGSI WHATSAPP DINAMIS ---
const getWhatsAppLink = (planName: string) => {
  const phoneNumber = "6281398410264"; // GANTI DENGAN NOMOR WA STACKPLUS ANDA (awali 62)
  const message = `Halo StackPlus Studio! Saya ingin diskusi mengenai layanan *Web Development* untuk paket *${planName}*. Bisa bantu informasinya?`;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};

export default function WebDevPricingPage() {
  const [activeTab, setActiveTab] = useState("GENERAL");
  const [pricingData, setPricingData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const otherServices = expertiseData.filter(
    (item) => item.title !== "Web Development"
  );

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("services_pricing")
          .select("*")
          .eq("service_type", "WEB DEVELOPMENT")
          .eq("category", activeTab)
          .order("created_at", { ascending: true });

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
          <h2 className="text-5xl md:text-6xl font-bold text-[#0053f1] tracking-tight mb-12">Web Development</h2>
          <div className="inline-flex items-center justify-start md:justify-center bg-[#FCFBF6] border border-[#EAE5D9] rounded-full p-2 shadow-sm overflow-x-auto max-w-full w-full hide-scrollbar">
            {/* PERBAIKAN: Menggunakan tabName langsung karena data di index.ts adalah Array String */}
            {webDevPricingTabs.map((tabName) => (
              <button 
                key={tabName} 
                onClick={() => setActiveTab(tabName)} 
                className={cn(
                  "px-6 py-3 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300", 
                  activeTab === tabName ? "bg-[#423E3A] text-white shadow-md" : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                {tabName}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12">
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
                  plan.is_pro 
                    ? "bg-[#0053f1] text-white transform lg:-translate-y-4 shadow-xl shadow-primary/20 hover:lg:-translate-y-6 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-4" 
                    : "bg-[#FDFBF7] border border-[#EAE5D9] text-gray-900 shadow-sm hover:-translate-y-2 hover:shadow-xl animate-in fade-in slide-in-from-bottom-4"
                )}
              >
                <h3 className="text-3xl font-bold mb-4">{plan.name}</h3>
                <p className={cn("text-sm mb-8 leading-relaxed", plan.is_pro ? "text-white/80" : "text-gray-500")}>{plan.description}</p>
                <div className={cn("w-full h-px mb-8", plan.is_pro ? "bg-white/20" : "bg-gray-200")}></div>
                
                <div className="mb-8 flex-grow">
                  <p className="text-sm font-bold mb-6">Benefits included:</p>
                  <ul className="space-y-4">
                    {plan.benefits?.map((benefit: string, i: number) => (
                      <li key={`${plan.id}-benefit-${i}`} className="flex items-start gap-3">
                        <div className={cn("mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0", plan.is_pro ? "bg-white text-[#0053f1]" : "bg-[#0053f1] text-white")}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                        <span className={cn("text-sm", plan.is_pro ? "text-white/90" : "text-gray-600")}>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-8">
                  <p className="text-sm font-bold mb-6">Code Type</p>
                  <ul className="space-y-4">
                    {plan.code_types?.map((code: string, i: number) => (
                      <li key={`${plan.id}-code-${i}`} className="flex items-center gap-3">
                        <div className={cn("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0", plan.is_pro ? "bg-white text-[#0053f1]" : "bg-[#0053f1] text-white")}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                        <span className={cn("text-sm", plan.is_pro ? "text-white/90" : "text-gray-600")}>{code}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-auto">
                  <p className="text-sm font-bold mb-6">Tech tools</p>
                  <div className="flex flex-wrap gap-3">
                    {plan.tech_tools?.map((tool: string, i: number) => (
                      <span key={`${plan.id}-tool-${i}`} className={cn("px-4 py-2 rounded-full text-xs font-medium border", plan.is_pro ? "bg-white/10 border-white/20 text-white" : "bg-transparent border-gray-200 text-gray-500")}>{tool}</span>
                    ))}
                  </div>
                </div>

                <a 
                  href={getWhatsAppLink(plan.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("w-full mt-12 py-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] text-center", plan.is_pro ? "bg-[#423E3A] text-white" : "bg-[#423E3A] text-white shadow-md")}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> DISCUSS NOW
                </a>
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
            <div key={`other-service-${index}`} className="bg-[#FDFBF7] border border-[#EAE5D9] p-8 rounded-2xl flex flex-col justify-between h-[280px] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-primary/10 text-primary">
                {getIcon(item.title)}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-sm mb-6 line-clamp-2 text-gray-500">{item.desc}</p>
                <Link 
                  href={
                    item.title === "Web Development" ? "/service/web-development" : 
                    item.title === "UI/UX Design" ? "/service/ui-ux-design" : 
                    item.title === "Mobile Development" ? "/service/mobile-development" : 
                    item.title === "AI ChatBot" ? "/service/ai-chatbot" : 
                    item.title === "Branding Design" ? "/service/branding-design" : 
                    "#"
                  } 
                  className="inline-flex items-center text-sm font-bold gap-2 text-primary"
                >
                  Learn More 
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: LIFECYCLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-200">
        <h2 className="text-5xl md:text-6xl font-medium text-[#0053f1] tracking-tight mb-16">Lifecycle</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lifecycleData.map((item, index) => (
            <div key={`lifecycle-${index}`} className="flex flex-col bg-[#FDFBF7] border border-[#EAE5D9] p-8 rounded-[1.5rem] shadow-sm hover:shadow-md transition-all">
              <div className="bg-[#423E3A] text-white text-[10px] font-bold px-2 py-3 rounded-full text-center w-full mb-6 uppercase tracking-wider">{item.title}</div>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </main>
  );
}