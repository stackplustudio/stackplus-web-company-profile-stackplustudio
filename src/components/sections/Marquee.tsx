export default function Marquee() {
  const itemsTop = ["UI/UX Design", "Website Development", "Logo & Branding", "AI Chatbot", "UI/UX Design", "Website Development"];
  const itemsBottom = ["11 Project Delivered", "7 Happy Clients", "1+ Years Experience", "6 Team Member", "11 Project Delivered", "7 Happy Clients"];

  return (
    <div className="relative py-24 overflow-hidden flex flex-col items-center justify-center h-[300px]">
      
      {/* Pita Atas (Biru) - Rotasi ke kanan */}
      <div className="absolute w-[110vw] rotate-3 bg-primary text-white py-4 z-10 shadow-xl border-y border-white/20">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...itemsTop, ...itemsTop, ...itemsTop].map((item, i) => (
            <div key={i} className="flex items-center mx-8">
              <span className="text-xl font-bold">*</span>
              <span className="mx-4 text-lg font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pita Bawah (Gelap) - Rotasi ke kiri */}
      <div className="absolute w-[110vw] -rotate-2 bg-[#423E3A] text-white py-4 z-0 shadow-xl border-y border-white/10">
        <div className="flex whitespace-nowrap animate-marquee" style={{ animationDirection: 'reverse' }}>
          {[...itemsBottom, ...itemsBottom, ...itemsBottom].map((item, i) => (
            <div key={i} className="flex items-center mx-8 text-gray-300">
              <span className="text-xl font-bold">*</span>
              <span className="mx-4 text-lg font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}