import WhoWeAre from "@/components/sections/WhoWeAre";
import VisionMission from "@/components/sections/VisionMission";
import ValueSection from "@/components/sections/ValueSection";
import Team from "@/components/sections/Team";
import CTA from "@/components/sections/CTA";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us – Our Team, Vision & Values",
  description:
    "Meet StackPlus Studio: a digital agency team building websites, mobile apps, AI chatbots and UI/UX designs, driven by quality and clear communication.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <WhoWeAre />
      <VisionMission />
      <ValueSection />
      <Team />
      <CTA />
    </>
  );
}