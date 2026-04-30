import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Kiri: Teks & Input */}
        <div className="max-w-xl z-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <p className="text-sm font-medium text-gray-500">Trusted by founders</p>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight">
            Build Digital <br />
            Products That <br />
            <span className="text-primary">Actually Work</span>
          </h1>
          
          <p className="text-gray-500 mb-10 max-w-md text-base leading-relaxed">
            Turning ideas into actionable digital solutions. Focus is on creating meaningful and impactful products.
          </p>
          
          {/* Input Form Email */}
          <div className="flex items-center bg-white rounded-full p-2 shadow-lg shadow-gray-200/50 max-w-md border border-gray-100">
            <div className="pl-4 pr-2 text-gray-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <input 
              type="email" 
              placeholder="Enter your email here" 
              className="flex-1 bg-transparent border-none focus:outline-none text-sm px-2 text-gray-700"
            />
            <button className="bg-primary text-white px-6 py-3 rounded-full text-xs font-bold hover:bg-primary/90 transition-all whitespace-nowrap">
              CONTACT US
            </button>
          </div>
        </div>

        {/* Kanan: Mockup Area (Estetik Logo) */}
        <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center">
          
          {/* Latar belakang grid & gradient glow */}
          <div className="absolute right-0 top-0 w-3/4 h-3/4 bg-[#F2EFE9] rounded-full opacity-40 blur-3xl"></div>
          <div className="absolute left-10 bottom-10 w-64 h-64 bg-[#0053f1] opacity-10 rounded-full blur-3xl animate-pulse"></div>
          
          {/* Container Logo dengan animasi melayang (bounce) halus */}
          <div className="relative z-10 flex items-center justify-center animate-[bounce_4s_ease-in-out_infinite]">
             
             {/* Efek cahaya biru pekat tepat di belakang logo */}
             <div className="absolute inset-0 bg-[#0053f1] opacity-20 blur-2xl rounded-full"></div>

             {/* GANTI PATH INI DENGAN ICON STACKPLUS KAMU (Contoh: /icons/logo-icon.png) */}
             <Image 
               src="/icons/logo4.png" // <-- Ubah nama file ini ke icon khusus kamu
               alt="StackPlus Aesthetic Logo" 
               width={250} 
               height={250}
               className="object-contain drop-shadow-2xl relative z-10" 
               priority 
             />
          </div>

        </div>
        
      </div>
    </section>
  );
}