// src/app/admin/(dashboard)/portfolios/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { portfolioCategories } from "@/data";
import Link from "next/link";
import { uploadPortfolioImage } from "@/lib/uploadImage"; // Pastikan file ini sudah dibuat

export default function CreatePortfolioPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  // State untuk form
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(portfolioCategories[0]);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [features, setFeatures] = useState<string[]>([""]);
  
  // State untuk menyimpan object File (bukan string URL lagi)
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([null]);

  // Handler untuk menambah/mengurangi field fitur
  const addFeature = () => setFeatures([...features, ""]);
  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  // Handler untuk menambah slot gambar
  const addImageSlot = () => setImageFiles([...imageFiles, null]);
  
  // Handler ketika user memilih file dari komputernya
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
      // 1. Filter fitur yang kosong
      const cleanFeatures = features.filter((f) => f.trim() !== "");
      
      // 2. Filter slot gambar yang benar-benar ada file-nya
      const filesToUpload = imageFiles.filter((file) => file !== null) as File[];
      
      if (filesToUpload.length === 0) {
        alert("Mohon pilih setidaknya satu gambar portfolio.");
        setIsLoading(false);
        return;
      }

      setUploadStatus("Uploading images to Supabase...");
      
      // 3. Upload semua file gambar ke Supabase Storage (secara paralel)
      const uploadPromises = filesToUpload.map((file) => uploadPortfolioImage(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      
      // Pastikan tidak ada url yang null (gagal upload)
      const cleanUrls = uploadedUrls.filter((url) => url !== null) as string[];

      if (cleanUrls.length === 0) {
        throw new Error("Semua gambar gagal diupload.");
      }

      setUploadStatus("Saving data to database...");

      // 4. Simpan URL publik dari Storage beserta data teks lainnya ke tabel
      const { error } = await supabase.from("portfolios").insert([
        {
          title,
          category,
          year,
          features: cleanFeatures,
          images: cleanUrls, // Sekarang kita masukkan URL live-nya
        },
      ]);

      if (error) throw error;

      alert("Proyek berhasil ditambahkan! 🎉");
      router.push("/admin/portfolios");
      router.refresh();
    } catch (error) {
      console.error("Error creating portfolio:", error);
      alert("Gagal menambahkan proyek. Cek konsol untuk detailnya.");
    } finally {
      setIsLoading(false);
      setUploadStatus("");
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="mb-8">
        <Link href="/admin/portfolios" className="text-[#0053f1] text-xs font-bold mb-4 inline-block hover:underline">
          ← BACK TO LIST
        </Link>
        <h1 className="text-4xl font-bold text-[#423E3A] tracking-tight">Add New Project</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-10 rounded-[16px] border border-gray-100 shadow-sm">
        {/* Basic Info Row (TETAP SAMA SEPERTI ASLINYA) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#423E3A]">Project Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Faheema Academy"
              className="px-4 py-3 rounded-[16px] border border-gray-200 focus:outline-none focus:border-[#0053f1] text-sm transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#423E3A]">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 rounded-[16px] border border-gray-200 focus:outline-none focus:border-[#0053f1] text-sm transition-all bg-white"
            >
              {portfolioCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#423E3A]">Year</label>
            <input
              type="text"
              required
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="px-4 py-3 rounded-[16px] border border-gray-200 focus:outline-none focus:border-[#0053f1] text-sm transition-all"
            />
          </div>
        </div>

        {/* Dynamic Features Section (TETAP SAMA SEPERTI ASLINYA) */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-[#423E3A]">Features / Scope</label>
            <button type="button" onClick={addFeature} className="text-[#0053f1] text-xs font-bold hover:underline">
              + Add Feature
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <input
                key={index}
                type="text"
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                placeholder="e.g. Responsive Design"
                className="px-4 py-3 rounded-[16px] border border-gray-200 focus:outline-none focus:border-[#0053f1] text-sm transition-all"
              />
            ))}
          </div>
        </div>

        {/* --- BAGIAN YANG DIUBAH: DARI TEXT INPUT MENJADI FILE INPUT --- */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-[#423E3A]">Upload Images</label>
            <button type="button" onClick={addImageSlot} className="text-[#0053f1] text-xs font-bold hover:underline">
              + Add Another Image
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {imageFiles.map((file, index) => (
              <div key={index} className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={(e) => handleFileChange(index, e)}
                  className="px-4 py-3 rounded-[16px] border border-gray-200 focus:outline-none focus:border-[#0053f1] text-sm transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {/* Preview nama file jika sudah dipilih */}
                {file && <span className="text-xs text-gray-500 ml-2">Selected: {file.name}</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 flex flex-col items-center gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0053f1] text-white py-4 rounded-[16px] font-bold hover:bg-[#003cb3] transition-all shadow-lg shadow-[#0053f1]/20 disabled:bg-gray-400"
          >
            {isLoading ? "Processing..." : "SAVE PROJECT"}
          </button>
          {uploadStatus && <span className="text-sm font-semibold text-blue-600 animate-pulse">{uploadStatus}</span>}
        </div>
      </form>
    </div>
  );
}