import type { Metadata } from "next";
import ReachUs from "@/components/sections/ReachUs";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Contact Us – Start Your Project",
  description:
    "Talk to StackPlus Studio about your website, mobile app, AI chatbot or design project. Reach us by email, WhatsApp or book a free 30-minute call.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <ReachUs />
      <CTA />
    </>
  );
}