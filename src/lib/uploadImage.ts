// src/lib/uploadImage.ts
import { supabase } from "./supabase";

export const uploadPortfolioImage = async (file: File) => {
  try {
    // 1. Bikin nama file unik pakai angka random agar file tidak saling timpa
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `portfolio/${fileName}`; // Akan masuk ke dalam folder 'portfolio' di bucket

    // 2. Upload file fisik ke Supabase Storage (Nama Bucket kita: portfolio-images)
    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error("Gagal upload ke Supabase:", uploadError.message);
      throw uploadError;
    }

    // 3. Ambil URL Publik dari gambar yang baru saja diupload
    const { data } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(filePath);

    // 4. Kembalikan URL publik ini untuk disimpan ke database
    return data.publicUrl;

  } catch (error) {
    console.error("Error dalam proses uploadImage:", error);
    return null;
  }
};