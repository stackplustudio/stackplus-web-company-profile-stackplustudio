// Satu-satunya tempat membuat tautan WhatsApp.
// Nomor dibaca dari NEXT_PUBLIC_WHATSAPP_NUMBER (format internasional tanpa +, awali 62).
const DEFAULT_WHATSAPP_NUMBER = "6283151195556";

export const WHATSAPP_NUMBER = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? DEFAULT_WHATSAPP_NUMBER
).replace(/\D/g, "");

export const getWhatsAppLink = (planName: string, serviceType: string) => {
  const message = `Hello StackPlus Studio! I'd like to discuss your *${serviceType}* service, specifically the *${planName}* package. Could you share more information?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const getProjectWhatsAppLink = (projectTitle: string) => {
  const message = `Hello StackPlus Studio! I saw your *${projectTitle}* project and I'd like to discuss something similar. Could we talk?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};