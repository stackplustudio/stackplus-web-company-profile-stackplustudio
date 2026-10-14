import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Marquee from "@/components/sections/Marquee";
import Expertise from "@/components/sections/Expertise";
import Portfolio from "@/components/sections/Portfolio";
import WhyUs from "@/components/sections/WhyUs";
import CTA from "@/components/sections/CTA";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Marquee />
      <Expertise />
      <Portfolio />
      <WhyUs />
      <CTA />
    </>
  );
}