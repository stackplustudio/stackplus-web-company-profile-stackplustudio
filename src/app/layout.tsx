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
  metadataBase: new URL(SITE.url),
  title: {
    default: "StackPlus Studio | Web Development, Mobile Apps & AI Chatbot Agency",
    template: "%s | StackPlus Studio",
  },
  description:
    "StackPlus Studio is a digital agency building custom websites, mobile apps, AI chatbots, UI/UX design and branding for growing businesses.",
  applicationName: SITE.name,
  keywords: ["StackPlus Studio", "StackPlus", "web development agency", "software house Indonesia", "AI chatbot development", "mobile app development", "UI/UX design studio"],
  authors: [{ name: SITE.name, url: SITE.url }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "StackPlus Studio | Building Digital Excellence",
    description: "Turning ideas into digital products. Web development, mobile apps, AI chatbots, UI/UX and branding.",
    url: "/",
    siteName: SITE.name,
    images: [{ url: "/icons/logo4.png", width: 1200, height: 630, alt: "StackPlus Studio" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StackPlus Studio | Digital Solutions",
    description: "Custom web development, mobile apps and AI chatbots.",
    images: ["/icons/logo4.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Data JSON-LD untuk SEO Organisasi
    const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      alternateName: ["StackPlus", "Stack Plus Studio"],
      url: SITE.url,
      logo: `${SITE.url}/icons/logo4.png`,
      sameAs: [SITE.social.instagram, SITE.social.tiktok, SITE.social.linkedin],
      contactPoint: [
        { "@type": "ContactPoint", email: SITE.email, telephone: "+6285769042975", contactType: "customer service" },
      ],
      description: "Digital agency for web development, mobile apps, AI chatbots, UI/UX design and branding.",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      name: SITE.name,
      alternateName: "StackPlus",
      url: SITE.url,
      publisher: { "@id": `${SITE.url}/#organization` },
    },
  ];

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