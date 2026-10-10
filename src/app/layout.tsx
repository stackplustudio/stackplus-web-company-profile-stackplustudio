import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/ui/Chatbot";
import { SITE } from "@/lib/site";

// Satu font untuk seluruh situs. Dimuat lokal (self-hosted) sebagai variable font 200-800,
// diekspos sebagai CSS variable --font-sans yang dipakai Tailwind (font-sans).
const jakartaSans = localFont({
  src: "../fonts/PlusJakartaSans-Variable.woff2",
  weight: "200 800",
  variable: "--font-sans",
  display: "swap",
});

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
    "sameAs": [SITE.social.instagram, SITE.social.tiktok, SITE.social.linkedin],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": SITE.email,
      "contactType": "customer service"
    },
    "description": "Premium digital agency specializing in high-performance web development and advanced AI agent integration."
  };

  return (
    <html lang="en" className={`${jakartaSans.variable} scroll-smooth`}>
      <body className="font-sans bg-background text-gray-900 antialiased">
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