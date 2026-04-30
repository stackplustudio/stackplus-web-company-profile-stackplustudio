export default function CTA() {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-20">
      <div className="relative bg-[#0053f1] rounded-[16px] overflow-hidden px-8 py-16 md:p-16 lg:p-20 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Latar Belakang Dekoratif */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/2 blur-[80px]"></div>
        <div className="absolute -bottom-10 left-0 w-full flex justify-center pointer-events-none opacity-10 select-none">
          <span className="text-[18vw] leading-none font-bold text-white whitespace-nowrap tracking-tighter">
            STACKPLUS
          </span>
        </div>

        {/* Konten Kiri (Teks) */}
        <div className="relative z-10 max-w-xl w-full text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Ready to start <br />
            your next project?
          </h2>
          <p className="text-white/80 text-base md:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
            Turning ideas into actionable digital solutions. Focus is on creating meaningful and impactful products.
          </p>
        </div>

        {/* Konten Kanan (Form Input) */}
        <div className="relative z-10 w-full max-w-md lg:w-auto flex-shrink-0">
          <p className="text-white mb-4 font-medium text-center lg:text-left">Stay up to date</p>
          
          {/* PERBAIKAN: Form Layout Responsive */}
          <form 
            action="https://formsubmit.co/stackplustudio@gmail.com" 
            method="POST" 
            className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl sm:rounded-full p-2 w-full shadow-lg gap-2 sm:gap-0"
          >
            <div className="flex items-center flex-1 px-2 py-2 sm:py-0">
              <div className="pr-2 text-gray-400 hidden sm:block">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <input 
                type="email" 
                name="email"
                required
                placeholder="Enter your email here!" 
                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700 w-full text-center sm:text-left"
              />
            </div>
            
            {/* Konfigurasi Tambahan FormSubmit (Hidden) */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="[Lead Baru] Email dari CTA Website StackPlus!" />
            
            <button 
              type="submit" 
              className="bg-[#0053f1] text-white w-full sm:w-auto px-8 py-3.5 rounded-xl sm:rounded-full text-xs font-bold hover:bg-[#003cb3] transition-all whitespace-nowrap"
            >
              CONTACT US
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}