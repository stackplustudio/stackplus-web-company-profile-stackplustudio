"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function PortfoliosAdminPage() {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi untuk mengambil data dari Supabase
  const fetchPortfolios = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("portfolios")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setPortfolios(data);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Panggil fungsi saat halaman pertama kali dibuka
  useEffect(() => {
    fetchPortfolios();
  }, []);

  // FUNGSI BARU: Untuk menghapus data
  const handleDelete = async (id: string, title: string) => {
    // 1. Munculkan pop-up konfirmasi
    const isConfirmed = window.confirm(`Apakah Anda yakin ingin menghapus proyek "${title}"? Data yang dihapus tidak dapat dikembalikan.`);
    
    if (!isConfirmed) return; // Kalau user klik Cancel, batalkan proses

    try {
      // 2. Hapus data dari Supabase berdasarkan ID
      const { error } = await supabase
        .from("portfolios")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // 3. Update tampilan tabel secara instan (tanpa perlu refresh web)
      setPortfolios(portfolios.filter((item) => item.id !== id));
      alert("Proyek berhasil dihapus! 🗑️");
      
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      alert("Gagal menghapus proyek. Cek konsol untuk detailnya.");
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-2">› MANAGEMENT ‹</p>
          <h1 className="text-4xl font-bold text-[#423E3A] tracking-tight">Portfolios</h1>
        </div>
        <Link 
          href="/admin/portfolios/create" 
          className="bg-[#0053f1] text-white px-6 py-3 rounded-[16px] text-sm font-bold hover:bg-[#003cb3] transition-colors shadow-md shadow-[#0053f1]/20 flex items-center gap-2"
        >
          <span className="text-lg">+</span> Add New Project
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-100 rounded-[16px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FDFBF7] border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Project Name</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Year</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-8 px-6 text-center text-gray-400 text-sm">
                    Memuat data dari database...
                  </td>
                </tr>
              ) : portfolios.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 px-6 text-center text-gray-400 text-sm">
                    Belum ada data portofolio. Silakan tambah proyek baru!
                  </td>
                </tr>
              ) : (
                portfolios.map((item) => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-[#423E3A]">{item.title}</td>
                    <td className="py-4 px-6">
                      <span className="bg-[#EAE5D9]/30 text-[#423E3A] px-3 py-1 rounded-[16px] text-xs font-bold">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 text-sm">{item.year}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        {/* Tombol Edit (Kita siapkan link-nya untuk nanti) */}
                        <Link href={`/admin/portfolios/edit/${item.id}`} className="text-gray-400 hover:text-[#0053f1] transition-colors text-sm font-medium px-2 py-1">
                          Edit
                        </Link>
                        {/* Tombol Delete yang sudah nyala */}
                        <button 
                          onClick={() => handleDelete(item.id, item.title)} 
                          className="text-gray-400 hover:text-red-500 transition-colors text-sm font-medium px-2 py-1"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}