import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Expertise from "@/components/sections/Expertise";
import Portfolio from "@/components/sections/Portfolio";
import WhyUs from "@/components/sections/WhyUs";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Expertise />
      <Portfolio />
      <WhyUs />
      <CTA />
    </>
  );
}