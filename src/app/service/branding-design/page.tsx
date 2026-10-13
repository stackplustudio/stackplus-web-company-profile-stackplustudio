import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Branding & Logo Design",
  description:
    "Logo and social media design that makes your brand memorable. Branding packages from StackPlus Studio.",
  alternates: { canonical: "/service/branding-design" },
};

export default function Page() {
  return <Client />;
}