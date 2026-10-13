import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "UI/UX Design Services",
  description:
    "User-centered UI/UX design, from research and wireframes to polished prototypes, by StackPlus Studio.",
  alternates: { canonical: "/service/ui-ux-design" },
};

export default function Page() {
  return <Client />;
}