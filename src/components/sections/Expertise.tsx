import { expertiseData } from "@/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Expertise() {
  return (
    <section id="service" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="max-w-md">
          <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">
            › EXPERTISE ‹
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Our Expertise That <br />
            <span className="text-primary">Drives Impact</span>
          </h2>
        </div>
        <div className="max-w-sm">
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            We offer a comprehensive range of services to cover every aspect of your digital journey, from initial strategy to final launch.
          </p>
          <Link href="#contact" className="inline-flex items-center bg-[#423E3A] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#2A2724] transition-all gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            Book a Call
          </Link>
        </div>
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
                : "bg-[#F8F6F0] text-gray-900 hover:bg-[#F0EBE0]"
            )}
          >
            {/* Icon Placeholder (Lingkaran) */}
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center mb-6",
              item.isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
            )}>
              <div className="w-5 h-5 border-2 rounded-sm border-current border-dashed"></div>
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
                href="#" 
                className={cn(
                  "inline-flex items-center text-sm font-bold gap-2 group",
                  item.isActive ? "text-white" : "text-primary"
                )}
              >
                Learn More 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
}