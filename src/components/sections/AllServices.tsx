import { expertiseData } from "@/data";
import Link from "next/link";
import { Layout, Code, Smartphone, Bot, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

// Fungsi pintar untuk memilih ikon berdasarkan judul layanan
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

export default function AllServices() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      {/* Header Section (Centered) */}
      <div className="text-center mb-16">
        <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">
          › SERVICE ‹
        </p>
        <h1 className="text-5xl md:text-6xl font-medium text-[#423E3A] tracking-tight">
          Our Expertise That <br />
          <span className="text-[#0053f1] font-bold">Drives Impact</span>
        </h1>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expertiseData.map((item, index) => (
          <div 
            key={index}
            className={cn(
              "p-8 rounded-2xl flex flex-col justify-between h-[280px] transition-all duration-300",
              item.isActive 
                ? "bg-primary text-white shadow-xl shadow-primary/20" 
                : "bg-[#FDFBF7] border border-[#EAE5D9] text-gray-900 hover:shadow-md"
            )}
          >
            {/* Ikon Dinamis yang sudah diganti */}
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center mb-6",
              item.isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
            )}>
              {getIcon(item.title)}
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className={cn(
                "text-sm mb-6 line-clamp-2",
                item.isActive ? "text-white/80" : "text-gray-500"
              )}>
                {item.desc}
              </p>
              
              <Link 
                href={
                  item.title === "Web Development" ? "/service/web-development" : 
                  item.title === "UI/UX Design" ? "/service/ui-ux-design" : 
                  item.title === "Mobile Development" ? "/service/mobile-development" : 
                  item.title === "AI ChatBot" ? "/service/ai-chatbot" : 
                  item.title === "Branding Design" ? "/service/branding-design" : 
                  "#"
                } 
                className={cn(
                  "inline-flex items-center text-sm font-bold gap-2 group",
                  item.isActive ? "text-white" : "text-primary"
                )}
              >
                Learn More 
                <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
}