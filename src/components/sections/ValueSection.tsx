import Image from "next/image";

export default function ValueSection() {
  const coreValues = [
    "Innovation",
    "Collaboration",
    "Integrity",
    "Passion",
    "Excellent"
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      {/* Header Text */}
      <div className="mb-12">
        <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">
          › VALUE ‹
        </p>
        <h2 className="text-5xl md:text-6xl font-medium text-[#423E3A] leading-[1.1] tracking-tight">
          Creating Smart Lasting <br />
          <span className="text-[#0053f1] font-bold">Digital Solutions</span>
        </h2>
      </div>

      {/* Image & Glassmorphism Card Container */}
      <div className="relative w-full h-[500px] md:h-[600px] bg-gray-200 rounded-3xl overflow-hidden shadow-xl">
        
        {/* Latar Belakang Gambar */}
        <Image 
          src="/images/zauzan.png" // Pastikan nama file ini sesuai dengan yang ada di foldermu
          alt="Tim Meeting StackPlus" 
          fill 
          className="object-cover" 
        />

        {/* Gradient gelap opsional agar card glassmorphism lebih menonjol jika fotonya terlalu terang */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-black/40"></div>

        {/* Glassmorphism Card - Core Values */}
        <div className="absolute right-4 md:right-12 lg:right-20 top-1/2 -translate-y-1/2 w-[280px] md:w-[320px] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
          
          <h3 className="text-white text-2xl font-medium mb-4">Core Values</h3>
          
          {/* Garis Pemisah */}
          <div className="w-full h-px bg-white/20 mb-6"></div>
          
          {/* List Values */}
          <ul className="space-y-4 mb-8">
            {coreValues.map((value, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#0053f1"/>
                    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-white text-base font-medium">{value}</span>
              </li>
            ))}
          </ul>
          
          {/* Footer Card */}
          <p className="text-white/60 text-xs mt-4 pt-4 border-t border-white/10">
            © 2026 Stackplus Studio
          </p>
          
        </div>
      </div>

    </section>
  );
}