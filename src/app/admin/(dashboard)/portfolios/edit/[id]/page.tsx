"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { portfolioCategories } from "@/data";
import Link from "next/link";
import { uploadPortfolioImage } from "@/lib/uploadImage";

export default function EditPortfolioPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [uploadStatus, setUploadStatus] = useState("");

  // State untuk form
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(portfolioCategories[0]);
  const [year, setYear] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  
  // images simpan URL string (untuk data lama), imageFiles simpan File (untuk upload baru)
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data, error } = await supabase
          .from("portfolios")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        if (data) {
          setTitle(data.title);
          setCategory(data.category);
          setYear(data.year);
          setFeatures(data.features || [""]);
          setImages(data.images || []);
          // Inisialisasi slot file sebanyak gambar yang ada
          setImageFiles(new Array(data.images?.length || 1).fill(null));
        }
      } catch (error) {
        console.error("Error fetching:", error);
        alert("Gagal mengambil data proyek.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = [...imageFiles];
      newFiles[index] = e.target.files[0];
      setImageFiles(newFiles);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      setUploadStatus("Processing images...");
      
      // Proses upload: Jika ada file baru, upload. Jika tidak, pakai URL lama.
      const finalUrls = await Promise.all(
        imageFiles.map(async (file, index) => {
          if (file) {
            const uploadedUrl = await uploadPortfolioImage(file);
            return uploadedUrl;
          }
          return images[index]; // Pakai URL lama jika tidak pilih file baru
        })
      );

      const cleanUrls = finalUrls.filter((url) => url !== null) as string[];

      setUploadStatus("Updating database...");
      const { error } = await supabase
        .from("portfolios")
        .update({
          title,
          category,
          year,
          features: features.filter(f => f.trim() !== ""),
          images: cleanUrls,
        })
        .eq("id", id);

      if (error) throw error;

      alert("Proyek berhasil diperbarui! 🚀");
      router.push("/admin/portfolios");
      router.refresh();
    } catch (error) {
      console.error("Error updating:", error);
      alert("Gagal memperbarui proyek.");
    } finally {
      setIsLoading(false);
      setUploadStatus("");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus proyek ini? Tindakan ini tidak bisa dibatalkan.")) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase.from("portfolios").delete().eq("id", id);
      if (error) throw error;
      alert("Proyek berhasil dihapus.");
      router.push("/admin/portfolios");
      router.refresh();
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Gagal menghapus proyek.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <div className="p-10 text-center font-bold">Loading data...</div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <Link href="/admin/portfolios" className="text-[#0053f1] text-xs font-bold mb-4 inline-block hover:underline">
            ← BACK TO LIST
          </Link>
          <h1 className="text-4xl font-bold text-[#423E3A]">Edit Project</h1>
        </div>
        <button 
          onClick={handleDelete}
          type="button"
          className="text-red-500 text-xs font-bold border border-red-200 px-4 py-2 rounded-full hover:bg-red-50 transition-all"
        >
          DELETE PROJECT
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-10 rounded-[16px] border border-gray-100 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Project Title</label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="px-4 py-3 rounded-[16px] border border-gray-200 focus:border-[#0053f1] outline-none text-sm" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-3 rounded-[16px] border border-gray-200 outline-none text-sm bg-white">
              {portfolioCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold">Features / Scope</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <input key={index} type="text" value={feature} onChange={(e) => updateFeature(index, e.target.value)} className="px-4 py-3 rounded-[16px] border border-gray-200 outline-none text-sm" />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold">Project Images (Choose file to replace current image)</label>
          <div className="grid grid-cols-1 gap-6">
            {images.map((url, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 items-center p-4 border border-dashed border-gray-200 rounded-[16px]">
                {/* Preview Gambar Sekarang */}
                <div className="w-32 h-20 relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={url} alt="Current" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(index, e)}
                    className="text-xs w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700"
                  />
                  <p className="text-[10px] text-gray-400 mt-2 truncate">Current: {url}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0053f1] text-white py-4 rounded-[16px] font-bold hover:bg-[#003cb3] disabled:bg-gray-400 transition-all shadow-lg"
          >
            {isLoading ? "Saving Changes..." : "UPDATE PROJECT"}
          </button>
          {uploadStatus && <span className="text-center text-sm text-blue-600 font-medium animate-pulse">{uploadStatus}</span>}
        </div>
      </form>
    </div>
  );
}