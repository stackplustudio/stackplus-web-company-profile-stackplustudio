// Satu sumber untuk data kontak dan tautan sosial StackPlus Studio.
export const SITE = {
  name: "StackPlus Studio",
  url: "https://stackplustudio.com",
  email: "stackplustudio@gmail.com",
  calendly: "https://calendly.com/stackplustudio/30min",
  social: {
    instagram: "https://www.instagram.com/stackplus.studio/",
    linkedin: "https://www.linkedin.com/in/stackplus-studio-9440873a6/",
    tiktok: "https://www.tiktok.com/@stackplustudio826",
  },
} as const;

export const FORMSUBMIT_ACTION = `https://formsubmit.co/${SITE.email}`;
