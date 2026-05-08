import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/ui/Chatbot";

const jakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StackPlus Studio | Custom Web Development & Agentic AI Solutions",
  description: "StackPlus Studio is a premium digital agency specializing in high-performance web development, intuitive UI/UX design, and advanced AI agent integration.",
  keywords: [
    "Web Development Services", 
    "Software House Indonesia", 
    "AI Engineering Agency", 
    "Custom AI Chatbot Development", 
    "UI/UX Design Studio", 
    "StackPlus Studio"
  ],
  authors: [{ name: "StackPlus Studio" }],
  openGraph: {
    title: "StackPlus Studio | Building Digital Excellence",
    description: "Turning ideas into actionable digital solutions. Expert in UI/UX, Web Dev, and Agentic AI.",
    url: "https://stackplustudio.com", 
    siteName: "StackPlus Studio",
    images: [
      {
        url: "/icons/logo4.png",
        width: 1200,
        height: 630,
        alt: "StackPlus Studio Digital Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StackPlus Studio | Digital Solutions",
    description: "Custom Web Development & AI Engineering.",
    images: ["/icons/logo4.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Data JSON-LD untuk SEO Organisasi
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "StackPlus Studio",
    "url": "https://stackplustudio.com",
    "logo": "https://stackplustudio.com/icons/logo4.png",
    "sameAs": [
      "https://www.instagram.com/stackplus.studio/",
      "https://www.tiktok.com/@stackplustudio826",
      "https://www.linkedin.com/in/stackplus-studio-9440873a6/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "stackplustudio@gmail.com",
      "contactType": "customer service"
    },
    "description": "Premium digital agency specializing in high-performance web development and advanced AI agent integration."
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jakartaSans.className} bg-[#FCFBF6] text-gray-900 antialiased`}>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <Navbar />
        <main className="min-h-screen pt-28">
          {children}
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}