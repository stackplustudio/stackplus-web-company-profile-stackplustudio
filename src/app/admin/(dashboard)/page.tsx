export default function AdminDashboard() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-2">› OVERVIEW ‹</p>
        <h1 className="text-4xl font-bold text-[#423E3A] tracking-tight">Dashboard</h1>
      </div>

      <div className="bg-white border border-gray-100 p-10 rounded-[16px] shadow-sm">
        <h2 className="text-2xl font-bold text-[#423E3A] mb-4">
          Welcome back, StackPlus Studio! 👋
        </h2>
        <p className="text-gray-500 leading-relaxed max-w-2xl">
          Sistem manajemen konten StackPlus Studio sudah aktif. Anda dapat mulai mengelola data proyek portofolio, mengatur paket layanan, dan memonitor aktivitas website langsung dari panel ini. Silakan pilih menu di *Navbar* untuk memulai.
        </p>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-[#FDFBF7] p-6 rounded-[16px] border border-[#EAE5D9]">
              <div className="text-3xl mb-2">💼</div>
              <h3 className="font-bold text-[#423E3A] mb-1">Kelola Portofolio</h3>
              <p className="text-xs text-gray-500">Tambah, edit, atau hapus *showcase* proyek terbaru.</p>
           </div>
           <div className="bg-[#FDFBF7] p-6 rounded-[16px] border border-[#EAE5D9]">
              <div className="text-3xl mb-2">🛠️</div>
              <h3 className="font-bold text-[#423E3A] mb-1">Update Service</h3>
              <p className="text-xs text-gray-500">Sesuaikan fitur dan harga paket layanan StackPlus.</p>
           </div>
        </div>
      </div>
    </div>
  );
}