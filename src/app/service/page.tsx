import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Professional Website Development",
  description:
    "Custom company profile, e-commerce, landing page and web app development with transparent packages from StackPlus Studio.",
  alternates: { canonical: "/service/web-development" },
};

export default function Page() {
  return <Client />;
}