"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ServicesAdminPage() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi memanggil data services dari database
  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("services_pricing")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Fungsi untuk menghapus data service
  const handleDelete = async (id: string, name: string, category: string) => {
    const isConfirmed = window.confirm(`Yakin ingin menghapus paket "${name}" dari kategori "${category}"? Data yang dihapus tidak bisa dikembalikan.`);
    
    if (!isConfirmed) return;

    try {
      const { error } = await supabase
        .from("services_pricing")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Update UI langsung
      setServices(services.filter((item) => item.id !== id));
      alert("Paket layanan berhasil dihapus! 🗑️");
      
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Gagal menghapus layanan.");
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-2">› MANAGEMENT ‹</p>
          <h1 className="text-4xl font-bold text-[#423E3A] tracking-tight">Services & Pricing</h1>
        </div>
        <Link 
          href="/admin/services/create" 
          className="bg-[#0053f1] text-white px-6 py-3 rounded-[16px] text-sm font-bold hover:bg-[#003cb3] transition-colors shadow-md shadow-[#0053f1]/20 flex items-center gap-2"
        >
          <span className="text-lg">+</span> Add New Package
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-100 rounded-[16px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FDFBF7] border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Service Type</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Package Name</th>
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
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 px-6 text-center text-gray-400 text-sm">
                    Belum ada data paket layanan. Silakan tambah paket baru!
                  </td>
                </tr>
              ) : (
                services.map((item) => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-[#423E3A]">{item.service_type}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{item.category}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-[16px] text-xs font-bold ${
                        item.is_pro ? 'bg-[#0053f1]/10 text-[#0053f1]' : 'bg-[#EAE5D9]/30 text-[#423E3A]'
                      }`}>
                        {item.name} {item.is_pro && '✨'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        {/* Tombol Edit untuk tahap selanjutnya */}
                        <Link href={`/admin/services/edit/${item.id}`} className="text-gray-400 hover:text-[#0053f1] transition-colors text-sm font-medium px-2 py-1">
                          Edit
                        </Link>
                        {/* Tombol Delete yang sudah berfungsi */}
                        <button 
                          onClick={() => handleDelete(item.id, item.name, item.category)} 
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