import { teamData } from "@/data";
import Image from "next/image"; // 1. Tambahkan import ini

export default function Team() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      {/* Title Section */}
      <div className="text-center mb-12">
        <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">
          › TEAM ‹
        </p>
        <h2 className="text-5xl md:text-6xl font-medium text-[#423E3A] tracking-tight">
          People Behind <span className="text-[#0053f1] font-bold">The Work</span>
        </h2>
      </div>

      {/* Grid Container (Background Krem Terang) */}
      <div className="bg-[#F6F3EC] rounded-[16px] p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {teamData.map((member, index) => (
            <div 
              key={index} 
              className="bg-[#FDFBF7] rounded-[1.5rem] p-4 flex gap-5 shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-200"
            >
              {/* Foto Profil (Sekarang mengambil gambar asli) */}
              <div className="w-[100px] h-[130px] bg-gray-200 rounded-xl overflow-hidden flex-shrink-0 relative">
                 {/* 2. Ganti placeholder div dengan komponen Image */}
                 <Image 
                   src={member.image} // Mengambil dari data '/images/...'
                   alt={member.name}
                   fill // Memenuhi kotak pembungkus
                   className="object-cover" // Agar gambar tidak gepeng
                 />
              </div>

              {/* Info Kanan */}
              <div className="flex flex-col flex-1 py-1">
                
                {/* Nama & Role */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">
                    {/* Memecah nama menjadi baris baru agar pas seperti di desain */}
                    {member.name.split(' ').map((n, i) => (
                      <span key={i} className="block">{n}</span>
                    ))}
                  </h3>
                  <p className="text-[9px] font-bold text-gray-500 mt-2 uppercase tracking-widest">
                    {member.role}
                  </p>
                </div>

                {/* Garis Pemisah Dashed */}
                <div className="w-full border-t border-dashed border-gray-200 my-auto py-2"></div>

                {/* Social Icons */}
                <div className="flex gap-2">
                  <a href="#" className="w-6 h-6 bg-[#0053f1] rounded-md flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="#" className="w-6 h-6 bg-[#0053f1] rounded-md flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>

    </section>
  );
}