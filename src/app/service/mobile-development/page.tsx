import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Mobile App Development (iOS & Android)",
  description:
    "Build fast, scalable iOS and Android apps with StackPlus Studio. Clear packages for e-commerce, LMS and HRIS mobile apps.",
  alternates: { canonical: "/service/mobile-development" },
};

export default function Page() {
  return <Client />;
}