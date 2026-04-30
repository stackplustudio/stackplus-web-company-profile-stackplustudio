"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { portfolioCategories } from "@/data";
import Link from "next/link";

export default function CreatePortfolioPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // State untuk form
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(portfolioCategories[0]);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [features, setFeatures] = useState<string[]>([""]);
  const [images, setImages] = useState<string[]>(["/images/"]);

  // Handler untuk menambah/mengurangi field fitur
  const addFeature = () => setFeatures([...features, ""]);
  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  // Handler untuk menambah/mengurangi field gambar
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
      // Filter fitur dan gambar yang kosong
      const cleanFeatures = features.filter((f) => f.trim() !== "");
      const cleanImages = images.filter((img) => img.trim() !== "" && img !== "/images/");

      const { error } = await supabase.from("portfolios").insert([
        {
          title,
          category,
          year,
          features: cleanFeatures,
          images: cleanImages,
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
        {/* Basic Info Row */}
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
                placeholder="e.g. Responsive Design"
                className="px-4 py-3 rounded-[16px] border border-gray-200 focus:outline-none focus:border-[#0053f1] text-sm transition-all"
              />
            ))}
          </div>
        </div>

        {/* Dynamic Images Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-[#423E3A]">Image Paths (Relative to public/images/)</label>
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
                placeholder="/images/your-project.jpg"
                className="px-4 py-3 rounded-[16px] border border-gray-200 focus:outline-none focus:border-[#0053f1] text-sm transition-all"
              />
            ))}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0053f1] text-white py-4 rounded-[16px] font-bold hover:bg-[#003cb3] transition-all shadow-lg shadow-[#0053f1]/20 disabled:bg-gray-400"
          >
            {isLoading ? "Saving to Supabase..." : "SAVE PROJECT"}
          </button>
        </div>
      </form>
    </div>
  );
}