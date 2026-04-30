"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { portfolioCategories } from "@/data";
import Link from "next/link";

export default function EditPortfolioPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string; // Mengambil ID dari URL

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // State untuk form
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(portfolioCategories[0]);
  const [year, setYear] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  const [images, setImages] = useState<string[]>(["/images/"]);

  // Mengambil data lama dari Supabase berdasarkan ID
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
          // Jika array dari database ada isinya, pakai itu. Jika kosong, beri 1 inputan kosong.
          setFeatures(data.features?.length > 0 ? data.features : [""]);
          setImages(data.images?.length > 0 ? data.images : ["/images/"]);
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        alert("Gagal mengambil data proyek.");
      } finally {
        setIsFetching(false);
      }
    };

    if (id) fetchPortfolio();
  }, [id]);

  // Handler untuk menambah/mengurangi field
  const addFeature = () => setFeatures([...features, ""]);
  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addImage = () => setImages([...images, "/images/"]);
  const updateImage = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Filter array agar tidak ada data kosong yang masuk ke database
      const cleanFeatures = features.filter((f) => f.trim() !== "");
      const cleanImages = images.filter((img) => img.trim() !== "" && img !== "/images/");

      // FUNGSI UPDATE DATA
      const { error } = await supabase
        .from("portfolios")
        .update({
          title,
          category,
          year,
          features: cleanFeatures,
          images: cleanImages,
        })
        .eq("id", id); // Pastikan hanya mengupdate ID ini saja

      if (error) throw error;

      alert("Proyek berhasil diperbarui! ✨");
      router.push("/admin/portfolios");
      router.refresh();
    } catch (error) {
      console.error("Error updating portfolio:", error);
      alert("Gagal memperbarui proyek. Cek konsol untuk detailnya.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0053f1]"></div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="mb-8">
        <Link href="/admin/portfolios" className="text-[#0053f1] text-xs font-bold mb-4 inline-block hover:underline">
          ← BACK TO LIST
        </Link>
        <h1 className="text-4xl font-bold text-[#423E3A] tracking-tight">Edit Project</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-10 rounded-[16px] border border-gray-100 shadow-sm">
        {/* Basic Info Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#423E3A]">Project Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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

        {/* Dynamic Features Section */}
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
                className="px-4 py-3 rounded-[16px] border border-gray-200 focus:outline-none focus:border-[#0053f1] text-sm transition-all"
              />
            ))}
          </div>
        </div>

        {/* Dynamic Images Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-[#423E3A]">Image Paths</label>
            <button type="button" onClick={addImage} className="text-[#0053f1] text-xs font-bold hover:underline">
              + Add Image Path
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {images.map((image, index) => (
              <input
                key={index}
                type="text"
                value={image}
                onChange={(e) => updateImage(index, e.target.value)}
                className="px-4 py-3 rounded-[16px] border border-gray-200 focus:outline-none focus:border-[#0053f1] text-sm transition-all"
              />
            ))}
          </div>
        </div>

        <div className="pt-4 flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-[#0053f1] text-white py-4 rounded-[16px] font-bold hover:bg-[#003cb3] transition-all shadow-lg shadow-[#0053f1]/20 disabled:bg-gray-400"
          >
            {isLoading ? "Updating..." : "UPDATE PROJECT"}
          </button>
        </div>
      </form>
    </div>
  );
}