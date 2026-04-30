"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

// Mapping Kategori berdasarkan Tipe Layanan (Diambil dari index.ts)
const categoryMap: Record<string, string[]> = {
  "WEB DEVELOPMENT": ["GENERAL", "COMPANY PROFILE", "E-COMMERCE", "CORPORATE", "LANDING PAGE", "LMS", "NEWS", "WEB APPS", "PERSONAL WEB", "BLOG"],
  "MOBILE DEVELOPMENT": ["GENERAL", "E-COMMERCE MOBILE APP", "LMS MOBILE APPS", "HRIS MOBILE APPS"],
  "AI CHATBOT": ["GENERAL", "CUSTOMER SERVICE", "SALES & MARKETING BOT", "KNOWLEDGE ASSISTANT RAG", "AGENTIC AUTOMATION SYSTEM"],
  "BRANDING": ["LOGO", "SOCIAL MEDIA DESIGN"],
  "UI/UX DESIGN": ["GENERAL"] // UI/UX biasanya tidak pakai tab bersarang
};

const serviceTypes = Object.keys(categoryMap);

export default function CreateServicePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // State untuk form
  const [serviceType, setServiceType] = useState(serviceTypes[0]);
  const [category, setCategory] = useState(categoryMap[serviceTypes[0]][0]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPro, setIsPro] = useState(false);
  
  // State untuk Array (Fitur, Bahasa, Tools)
  const [benefits, setBenefits] = useState<string[]>([""]);
  const [codeTypes, setCodeTypes] = useState<string[]>([""]);
  const [techTools, setTechTools] = useState<string[]>([""]);

  // Update opsi kategori setiap kali Tipe Layanan berubah
  useEffect(() => {
    setCategory(categoryMap[serviceType][0]);
  }, [serviceType]);

  // Handler Array Dinamis
  const handleArrayChange = (setter: any, array: string[], index: number, value: string) => {
    const newArray = [...array];
    newArray[index] = value;
    setter(newArray);
  };
  const addArrayItem = (setter: any, array: string[]) => setter([...array, ""]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Bersihkan array dari string kosong
      const cleanBenefits = benefits.filter(i => i.trim() !== "");
      const cleanCodeTypes = codeTypes.filter(i => i.trim() !== "");
      const cleanTechTools = techTools.filter(i => i.trim() !== "");

      const { error } = await supabase.from("services_pricing").insert([
        {
          service_type: serviceType,
          category,
          name,
          description,
          is_pro: isPro,
          benefits: cleanBenefits,
          code_types: cleanCodeTypes,
          tech_tools: cleanTechTools
        }
      ]);

      if (error) throw error;

      alert("Paket Layanan berhasil ditambahkan! 🚀");
      router.push("/admin/services");
      router.refresh();
    } catch (error) {
      console.error("Error creating service:", error);
      alert("Gagal menyimpan paket layanan. Cek konsol.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/services" className="text-[#0053f1] text-xs font-bold mb-4 inline-block hover:underline">
          ← BACK TO LIST
        </Link>
        <h1 className="text-4xl font-bold text-[#423E3A] tracking-tight">Add New Package</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-10 rounded-[16px] border border-gray-100 shadow-sm">
        
        {/* Baris 1: Klasifikasi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FDFBF7] p-6 rounded-[16px] border border-[#EAE5D9]">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#423E3A]">Service Type</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="px-4 py-3 rounded-[16px] border border-gray-200 focus:outline-none focus:border-[#0053f1] text-sm transition-all bg-white font-medium"
            >
              {serviceTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#423E3A]">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 rounded-[16px] border border-gray-200 focus:outline-none focus:border-[#0053f1] text-sm transition-all bg-white font-medium"
            >
              {categoryMap[serviceType].map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        {/* Baris 2: Detail Paket */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#423E3A]">Package Name</label>
            <input
              type="text" required value={name} onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Lite, Pro, Advance, Custom"
              className="px-4 py-3 rounded-[16px] border border-gray-200 focus:outline-none focus:border-[#0053f1] text-sm transition-all"
            />
          </div>
          <div className="flex items-center gap-4 mt-6">
            <input 
              type="checkbox" id="isPro" checked={isPro} onChange={(e) => setIsPro(e.target.checked)}
              className="w-5 h-5 accent-[#0053f1] rounded cursor-pointer"
            />
            <label htmlFor="isPro" className="text-sm font-bold text-[#423E3A] cursor-pointer">
              Highlight as "PRO" Package (Warna Biru) ✨
            </label>
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-bold text-[#423E3A]">Short Description</label>
            <input
              type="text" value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. For solo creators or small teams launching their first site."
              className="px-4 py-3 rounded-[16px] border border-gray-200 focus:outline-none focus:border-[#0053f1] text-sm transition-all"
            />
          </div>
        </div>

        <div className="h-px bg-gray-100 my-8"></div>

        {/* Baris 3: Array Dinamis (Benefits, Code Types, Tech Tools) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Benefits */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-[#423E3A]">Benefits / Features</label>
              <button type="button" onClick={() => addArrayItem(setBenefits, benefits)} className="text-[#0053f1] text-xs font-bold hover:underline">+ Add</button>
            </div>
            {benefits.map((item, index) => (
              <input key={index} type="text" value={item} onChange={(e) => handleArrayChange(setBenefits, benefits, index, e.target.value)} placeholder="e.g. Free Domain" className="w-full px-4 py-3 rounded-[16px] border border-gray-200 focus:outline-none focus:border-[#0053f1] text-sm transition-all mb-2"/>
            ))}
          </div>

          {/* Code Types */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-[#423E3A]">Programming / Stack</label>
              <button type="button" onClick={() => addArrayItem(setCodeTypes, codeTypes)} className="text-[#0053f1] text-xs font-bold hover:underline">+ Add</button>
            </div>
            {codeTypes.map((item, index) => (
              <input key={index} type="text" value={item} onChange={(e) => handleArrayChange(setCodeTypes, codeTypes, index, e.target.value)} placeholder="e.g. Next.js, TailwindCSS" className="w-full px-4 py-3 rounded-[16px] border border-gray-200 focus:outline-none focus:border-[#0053f1] text-sm transition-all mb-2"/>
            ))}
          </div>

          {/* Tech Tools */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-[#423E3A]">Tech / Tools</label>
              <button type="button" onClick={() => addArrayItem(setTechTools, techTools)} className="text-[#0053f1] text-xs font-bold hover:underline">+ Add</button>
            </div>
            {techTools.map((item, index) => (
              <input key={index} type="text" value={item} onChange={(e) => handleArrayChange(setTechTools, techTools, index, e.target.value)} placeholder="e.g. Vercel, Figma" className="w-full px-4 py-3 rounded-[16px] border border-gray-200 focus:outline-none focus:border-[#0053f1] text-sm transition-all mb-2"/>
            ))}
          </div>
          
        </div>

        {/* Submit Button */}
        <div className="pt-8">
          <button
            type="submit" disabled={isLoading}
            className="w-full bg-[#0053f1] text-white py-4 rounded-[16px] font-bold hover:bg-[#003cb3] transition-all shadow-lg shadow-[#0053f1]/20 disabled:bg-gray-400"
          >
            {isLoading ? "Saving to Database..." : "SAVE PACKAGE"}
          </button>
        </div>
      </form>
    </div>
  );
}