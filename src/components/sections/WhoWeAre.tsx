import Link from "next/link";
import Image from "next/image";

export default function WhoWeAre() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      {/* Title Section */}
      <div className="text-center mb-16">
        <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">
          › ABOUT US ‹
        </p>
        <h1 className="text-5xl md:text-6xl font-medium text-[#423E3A] tracking-tight">
          Who <span className="text-[#0053f1] font-bold">We</span> Are
        </h1>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Card: Text & CTA */}
        <div className="bg-[#FDFBF7] border border-[#EAE5D9] rounded-[16px] p-10 lg:p-14 flex flex-col justify-between shadow-sm">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight max-w-sm mb-16">
            A Digital Product Solution Studio
          </h2>
          
          <div>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8">
              &quot;We are a digital product agency, applying stack-based thinking to structure every project in layers, creating products that are functional, effective, and deliver real business value.&quot;
            </p>
            <Link 
              href="#contact" 
              className="inline-block bg-[#0053f1] text-white px-8 py-3.5 rounded-xl text-sm font-medium hover:bg-[#003cb3] transition-colors shadow-md"
            >
              Start a project
            </Link>
          </div>
        </div>

        {/* Right Card: Logo */}
        <div className="bg-[#0053f1] rounded-[16px] flex items-center justify-center p-10 lg:p-14 min-h-[400px] shadow-lg relative overflow-hidden">
          {/* Latar Belakang Dekoratif (Glow) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          {/* StackPlus Logo Image */}
          <div className="relative z-10 w-full h-full min-h-[250px]"> 
            <Image 
              src="/icons/Logo Text 1.png" 
              alt="StackPlus Logo" 
              fill 
              className="object-contain" 
            />
          </div>
        </div>

      </div>
    </section>
  );
}