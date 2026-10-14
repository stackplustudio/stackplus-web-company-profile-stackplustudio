import Link from "next/link";
import { expertiseData } from "@/data";
import Reveal from "@/components/ui/Reveal";
import ServiceCard from "@/components/ui/ServiceCard";

export default function Expertise() {
  return (
    <section id="service" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="max-w-md">
          <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">› EXPERTISE ‹</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Our Expertise That <br />
            <span className="text-primary">Drives Impact</span>
          </h2>
        </div>
        <div className="max-w-sm">
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            We offer a comprehensive range of services to cover every aspect of your digital journey, from initial strategy to final launch.
          </p>
          <Link href="#contact" className="inline-flex items-center bg-ink text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-ink-dark transition-all gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            Book a Call
          </Link>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expertiseData.map((item, index) => (
          <Reveal key={item.title} delay={index * 90} className="h-full">
            <ServiceCard title={item.title} desc={item.desc} active={item.isActive} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}