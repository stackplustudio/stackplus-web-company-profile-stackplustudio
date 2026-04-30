import Image from "next/image";

export default function VisionMission() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Kolom Kiri: Header & Cards */}
        <div className="flex flex-col">
          
          {/* Header Text */}
          <div className="mb-10">
            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">
              › VISION & MISSION ‹
            </p>
            <h2 className="text-5xl md:text-6xl font-medium text-[#423E3A] leading-[1.1] tracking-tight">
              Driving <span className="text-[#0053f1] font-bold">Vision</span><br />
              Delivering <span className="text-[#0053f1] font-bold">Mission</span>
            </h2>
          </div>

          {/* Cards Container */}
          <div className="flex flex-col gap-6">
            
            {/* Vision Card */}
            <div className="bg-[#FDFBF7] border border-[#EAE5D9] rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Vision</h3>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#0053f1"/>
                    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  To become a digital product studio that helps businesses build digital products that are relevant, well-structured, and sustainable in the modern era.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-[#FDFBF7] border border-[#EAE5D9] rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mission</h3>
              <ul className="space-y-4">
                {[
                  "Develop visual identities that are ready to be applied across modern digital ecosystems.",
                  "Deliver websites and digital products that are functional, scalable, and performance-driven.",
                  "Integrate design and development into a single, efficient workflow.",
                  "Become a strategic partner for businesses in their digital transformation and growth."
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#0053f1"/>
                        <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Kolom Kanan: Gambar */}
        <div className="w-full h-full min-h-[500px] bg-gray-200 rounded-3xl relative overflow-hidden shadow-lg lg:mt-8">
           <Image 
             src="/images/raisa.png" // Pastikan nama file ini sesuai dengan yang ada di folder public/images kamu
             alt="Tim layanan pelanggan StackPlus siap membantu"
             fill
             className="object-cover"
             priority 
           />
        </div>

      </div>
    </section>
  );
}