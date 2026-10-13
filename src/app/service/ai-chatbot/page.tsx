import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "AI Chatbot Development",
  description:
    "Custom AI chatbots for customer service, sales and knowledge assistants, plus agentic automation, built by StackPlus Studio.",
  alternates: { canonical: "/service/ai-chatbot" },
};

export default function Page() {
  return <Client />;
}