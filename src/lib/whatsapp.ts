// src/lib/whatsapp.ts

export const getWhatsAppLink = (planName: string, serviceType: string) => {
  const phoneNumber = "6281398410264"; // GANTI: Pakai nomor WA StackPlus (awali angka 62)
  const message = `Halo StackPlus Studio! Saya tertarik dengan layanan *${serviceType}* khususnya paket *${planName}*. Bisa bantu informasi lebih lanjut?`;
  
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};