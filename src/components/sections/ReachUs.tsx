export default function ReachUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      {/* Title Section */}
      <div className="text-center mb-16">
        <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">
          › CONTACT ‹
        </p>
        <h1 className="text-5xl md:text-6xl font-medium tracking-tight">
          <span className="text-[#0053f1] font-bold">Reach</span> <span className="text-[#423E3A]">Us</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Kolom Kiri: Info Kontak & Sosial Media */}
        <div className="flex flex-col gap-6">
          
          {/* Card Email */}
          <div className="bg-[#FDFBF7] border border-[#EAE5D9] rounded-[16px] p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[#0053f1] rounded-2xl flex items-center justify-center text-white shadow-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Email Us</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Facing technical challenges or product concerns?<br/>We&apos;re here to assist
            </p>
            <a href="mailto:stackplustudio@gmail.com" className="text-[#0053f1] font-medium text-sm hover:underline decoration-2 underline-offset-4">
              stackplustudio@gmail.com
            </a>
          </div>

          {/* Card Contact Sales */}
          <div className="bg-[#FDFBF7] border border-[#EAE5D9] rounded-[16px] p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[#0053f1] rounded-2xl flex items-center justify-center text-white shadow-md">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Contact Sales</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Let&apos;s collaborate on custom solutions or discuss<br/>product insights
            </p>
            <a href="#" className="text-[#0053f1] font-medium text-sm hover:underline decoration-2 underline-offset-4">
              Book a call
            </a>
          </div>

          {/* Card Social Media */}
          <div className="bg-[#FDFBF7] border border-[#EAE5D9] rounded-[16px] p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Follow Social Media</h3>
            <div className="flex gap-3">
              <a href="#" className="w-12 h-12 bg-[#0053f1] rounded-xl flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-12 h-12 bg-[#0053f1] rounded-xl flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="w-12 h-12 bg-[#0053f1] rounded-xl flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 6.27 6.28A6.35 6.35 0 0 0 17.5 15.63V8.81a8.3 8.3 0 0 0 4.19 1.25V6.62a4.8 4.8 0 0 1-2.1-.68z"/></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Kolom Kanan: Form Kontak */}
        <div className="bg-[#FDFBF7] border border-[#EAE5D9] rounded-[16px] p-8 lg:p-12 shadow-sm">
          
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-14 h-14 bg-[#0053f1] rounded-2xl flex items-center justify-center text-white shadow-md mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              We&apos;d love to help! Let us know how
            </h3>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
              <input 
                type="text" 
                placeholder="Ojan" 
                className="w-full bg-[#F6F3EC] border border-transparent focus:border-[#0053f1] focus:bg-white focus:outline-none rounded-xl px-4 py-3.5 text-sm text-gray-700 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="ojan@gmail.com" 
                className="w-full bg-[#F6F3EC] border border-transparent focus:border-[#0053f1] focus:bg-white focus:outline-none rounded-xl px-4 py-3.5 text-sm text-gray-700 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Subject Of Interest</label>
              <input 
                type="text" 
                placeholder="Regarding Product" 
                className="w-full bg-[#F6F3EC] border border-transparent focus:border-[#0053f1] focus:bg-white focus:outline-none rounded-xl px-4 py-3.5 text-sm text-gray-700 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">How may we assist you?</label>
              <textarea 
                rows={4}
                placeholder="Give us more info.." 
                className="w-full bg-[#F6F3EC] border border-transparent focus:border-[#0053f1] focus:bg-white focus:outline-none rounded-xl px-4 py-3.5 text-sm text-gray-700 transition-colors resize-none"
              ></textarea>
            </div>

            <button 
              type="button" 
              className="w-full bg-[#0053f1] text-white py-4 rounded-xl font-bold hover:bg-[#003cb3] transition-colors shadow-lg shadow-primary/20 mt-4"
            >
              Send Your Message
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}