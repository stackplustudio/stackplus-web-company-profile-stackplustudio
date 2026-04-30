import Link from "next/link";
import Image from "next/image";
import { whyUsData } from "@/data";

export default function WhyUs() {
  return (
    <section id="why-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div className="max-w-xl">
          <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">
            › WHY US ‹
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Why Vision Digital <br />
            <span className="text-primary">Product Solution</span>
          </h2>
        </div>
        <div className="max-w-sm">
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Because we don&apos;t just build products, we build solutions that create measurable impact.
          </p>
          <Link href="#contact" className="inline-flex items-center bg-[#423E3A] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#2A2724] transition-all gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            Book a Call
          </Link>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Box 1: Quality */}
        <div className="lg:col-span-4 bg-[#FDFBF7] rounded-[16px] border border-gray-100 p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow h-full min-h-[320px]">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Quality</h3>
          <p className="text-sm text-gray-500 mb-auto">Excellence in<br/>every design detail</p>
          
          <div className="mt-8 w-full">
            <p className="text-xs font-bold text-primary tracking-widest uppercase mb-3">EXCELLENT</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-[#E5E7EB] flex items-center justify-center text-gray-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white relative">
                 <div className="absolute inset-0 border-2 border-dashed border-primary rounded-full animate-[spin_10s_linear_infinite]"></div>
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Box 2: Product-Driven Approach */}
        <div className="lg:col-span-8 bg-[#FDFBF7] rounded-[16px] border border-gray-100 p-2 flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow h-full min-h-[320px]">
          <div className="w-full md:w-1/2 bg-gray-200 rounded-[1.5rem] relative overflow-hidden min-h-[200px]">
             {/* Ganti Placeholder Foto Tim Bekerja */}
             <div className="relative w-full h-full overflow-hidden rounded-2xl">
               <Image 
                 src={whyUsData.imageTwo} 
                 alt="Team Working Together" 
                 fill 
                 className="object-cover" 
               />
             </div>
          </div>
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative">
            <div className="absolute top-8 right-8 flex gap-2">
              <button className="w-8 h-8 rounded-md bg-[#F4F1EB] flex items-center justify-center text-gray-400 hover:text-gray-900"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
              <button className="w-8 h-8 rounded-md bg-[#F4F1EB] flex items-center justify-center text-gray-400 hover:text-gray-900"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg></div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Product-Driven Approach</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">Design decisions guided by user insights and business strategy.</p>
          </div>
        </div>

        {/* Box 3: One Integrated Stack */}
        <div className="lg:col-span-5 bg-primary rounded-[16px] p-8 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden h-full min-h-[320px]">
          <h3 className="text-2xl font-medium text-white mb-auto mt-4">One Integrated Stack</h3>
          <div className="mt-8 relative w-full flex flex-col items-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-12 bg-[#8B5CF6] blur-2xl opacity-70"></div>
            <div className="relative bg-white text-primary px-6 py-3 rounded-xl text-sm font-bold shadow-xl border border-white/50 w-full max-w-[280px]">Design, Development, and AI in one unified workflow.</div>
            <p className="text-white/80 text-xs mt-4">Built for meaningful conversations.</p>
          </div>
        </div>

        {/* Box 4: Business-Focused UX */}
        <div className="lg:col-span-7 bg-[#FDFBF7] rounded-[16px] border border-gray-100 p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow h-full min-h-[320px]">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Business-Focused UX</h3>
          <p className="text-sm text-gray-500 mb-12">Clear flows built to drive conversion and growth.</p>
          <div className="flex flex-wrap justify-center items-end gap-6 md:gap-12 w-full">
            <div className="flex flex-col items-center"><div className="w-24 h-24 rounded-full border-2 border-primary flex items-center justify-center mb-4 bg-primary/5"><span className="text-lg font-bold text-gray-900">98%</span></div><span className="text-xs text-gray-400">Lead Generation</span></div>
            <div className="flex flex-col items-center"><div className="w-32 h-32 rounded-full border-[3px] border-primary flex items-center justify-center mb-4 bg-primary/5 shadow-[0_0_20px_rgba(59,0,255,0.1)]"><span className="text-3xl font-bold text-gray-900">100%</span></div><span className="text-xs text-gray-400">Business impact</span></div>
            <div className="flex flex-col items-center"><div className="w-24 h-24 rounded-full border-2 border-primary flex items-center justify-center mb-4 bg-primary/5"><span className="text-lg font-bold text-gray-900">98%</span></div><span className="text-xs text-gray-400">Conversion</span></div>
          </div>
        </div>

        {/* Box 5: Built for Modern Standards */}
        <div className="lg:col-span-4 bg-[#FDFBF7] rounded-[16px] border border-gray-100 p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow h-full min-h-[320px]">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Built for<br/>Modern Standards</h3>
          <p className="text-sm text-gray-500 mb-8">Optimized for speed, scalability, and trust.</p>
          <div className="mt-auto w-full h-32 bg-gray-200 rounded-xl overflow-hidden relative">
            {/* Ganti Placeholder Foto Switch/Mixer */}
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
              <Image 
                src={whyUsData.imageOne} 
                alt="Switch and Mixer Setup" 
                fill 
                className="object-cover" 
              />
            </div>
          </div>
        </div>

        {/* Box 6: Strategic Partnership */}
        <div className="lg:col-span-8 bg-[#FDFBF7] rounded-[16px] border border-gray-100 p-8 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow h-full min-h-[320px]">
          <h3 className="text-xl font-bold text-gray-900 mb-8">Strategic Partnership</h3>
          <div className="w-full max-w-md flex flex-col items-center">
            {["MEDIA PUBLISHING", "E-COMMERCE & D2C", "ARCHITECTURE & INTERIORS", "EDUCATION & LEARNING"].map((item, i) => (
              <div key={i} className="flex flex-col items-center w-full">
                <div className={`flex items-center gap-3 text-xs font-bold tracking-widest uppercase ${i === 2 ? "text-primary" : "text-gray-300"}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {item}
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                </div>
                {i !== 3 && <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-5"></div>}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}