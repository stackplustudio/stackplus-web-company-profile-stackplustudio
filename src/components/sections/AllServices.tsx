import { expertiseData } from "@/data";
import Reveal from "@/components/ui/Reveal";
import ServiceCard from "@/components/ui/ServiceCard";

export default function AllServices() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header Section (Centered) */}
      <div className="text-center mb-16">
        <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">› SERVICE ‹</p>
        <h1 className="text-5xl md:text-6xl font-medium text-ink tracking-tight">
          Our Expertise That <br />
          <span className="text-primary font-bold">Drives Impact</span>
        </h1>
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