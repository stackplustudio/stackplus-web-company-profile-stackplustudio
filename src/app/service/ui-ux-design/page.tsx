"use client";

import { useState, useEffect } from "react";
// uiUxPricingPlans dihapus dari import karena kita pakai database sekarang
import { expertiseData, uiUxLifecycleData } from "@/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CTA from "@/components/sections/CTA";
import { supabase } from "@/lib/supabase"; // Import Supabase
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
  const phoneNumber = "6281398410264"; 
  const message = `Halo StackPlus Studio! Saya ingin diskusi mengenai layanan *UI/UX Design* untuk paket *${planName}*. Bisa bantu informasinya?`;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};

export default function UiUxPricingPage() {
  // State baru untuk menampung data dari Supabase
  const [pricingData, setPricingData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter agar "UI/UX Design" tidak muncul di "Explore Other Services"
  const otherServices = expertiseData.filter(
    (item) => item.title !== "UI/UX Design"
  );

  // Mengambil data dari Supabase
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("services_pricing")
          .select("*")
          .eq("service_type", "UI/UX DESIGN") // Sesuaikan dengan tipe di database
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
  }, []);

  return (
    <main className="min-h-screen pt-10">
      
      {/* SECTION 1: PRICING PLAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">› PRICING ‹</p>
          <h1 className="text-5xl md:text-6xl font-medium text-[#423E3A] tracking-tight mb-2">Pricing Plan</h1>
          <h2 className="text-5xl md:text-6xl font-bold text-[#0053f1] tracking-tight mb-12">UI/UX Design</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {isLoading ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0053f1]"></div>
            </div>
          ) : pricingData.length === 0 ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10 text-gray-400">
               Belum ada paket tersedia untuk layanan ini.
            </div>
          ) : (
            pricingData.map((plan) => (
              <div 
                key={plan.id}
                className={cn(
                  "rounded-[16px] p-8 lg:p-10 flex flex-col transition-all duration-500 ease-out group h-full",
                  plan.is_pro 
                    ? "bg-[#0053f1] text-white transform lg:-translate-y-4 shadow-xl shadow-primary/20 hover:lg:-translate-y-6 hover:shadow-2xl hover:shadow-[#0053f1]/40 animate-in fade-in slide-in-from-bottom-4" 
                    : "bg-[#FDFBF7] border border-[#EAE5D9] text-gray-900 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-[#0053f1]/30 animate-in fade-in slide-in-from-bottom-4"
                )}
              >
                <h3 className="text-3xl font-bold mb-4">{plan.name}</h3>
                <p className={cn("text-sm mb-8 leading-relaxed", plan.is_pro ? "text-white/80" : "text-gray-500")}>{plan.description}</p>
                <div className={cn("w-full h-px mb-8", plan.is_pro ? "bg-white/20" : "bg-gray-200")}></div>
                
                {/* Benefits List */}
                <div className="mb-8 flex-grow">
                  <p className="text-sm font-bold mb-6">Benefits included:</p>
                  <ul className="space-y-4">
                    {plan.benefits?.map((benefit: string, i: number) => (
                      <li key={`${plan.id}-benefit-${i}`} className="flex items-start gap-3">
                        <div className={cn("mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300", plan.is_pro ? "bg-white text-[#0053f1]" : "bg-[#0053f1] text-white group-hover:bg-[#003cb3]")}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <span className={cn("text-sm", plan.is_pro ? "text-white/90" : "text-gray-600")}>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={cn("w-full border-t border-dashed mb-8", plan.is_pro ? "border-white/30" : "border-gray-200")}></div>
                
                {/* WhatsApp Link Dinamis */}
                <a 
                  href={getWhatsAppLink(plan.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-full mt-12 py-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] text-center", 
                    plan.is_pro ? "bg-[#423E3A] text-white hover:bg-[#2A2724]" : "bg-[#423E3A] text-white hover:bg-[#2A2724] hover:shadow-lg"
                  )}
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
                  className="inline-flex items-center text-sm font-bold gap-2 group text-primary"
                >
                  Learn More 
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
            {uiUxLifecycleData.slice(0, 4).map((item, index) => (
              <div key={`lifecycle-top-${index}`} className="relative h-full flex flex-col">
                <div className="h-full flex flex-col bg-[#FDFBF7] border border-[#EAE5D9] p-6 lg:p-8 rounded-[1.5rem] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group z-10 relative">
                  <div className="bg-[#423E3A] text-white text-[10px] sm:text-xs font-bold px-2 py-3.5 rounded-full text-center w-full shadow-md mb-6 tracking-wide group-hover:bg-primary transition-colors">
                    {item.title}
                  </div>
                  <div className="w-full h-px bg-[#EAE5D9] mb-6"></div>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed flex-grow">
                    {item.desc}
                  </p>
                </div>

                {index !== 3 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-9 w-6 items-center justify-center -translate-y-1/2 text-[#EAE5D9] z-0">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </div>
                )}

                {index !== 3 && (
                  <div className="flex lg:hidden justify-center items-center py-4 text-[#EAE5D9]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}