"use client";

import Link from "next/link";
import { footerLinks } from "@/data";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Sembunyikan Footer di halaman admin
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/60 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Kolom 1: Logo & Deskripsi */}
        <div className="col-span-1">
          <Link href="/" className="inline-block mb-6">
            <Image 
              src="/icons/logo3 - Copy.png" 
              alt="StackPlus Studio Logo" 
              width={70} 
              height={40} 
              className="w-auto h-8 md:h-10 object-contain" 
            />
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed pr-4">
            Building digital excellence through innovative design and development solutions.
          </p>
        </div>

        {/* Kolom 2: Quick Links */}
        <div>
          <h4 className="text-primary font-bold text-sm mb-6">Quick Links</h4>
          <ul className="space-y-4">
            {footerLinks.quickLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-gray-500 text-sm hover:text-primary transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3: Services */}
        <div>
          <h4 className="text-primary font-bold text-sm mb-6">Services</h4>
          <ul className="space-y-4">
            {footerLinks.services.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-gray-500 text-sm hover:text-primary transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 4: Connect */}
        <div>
          <h4 className="text-primary font-bold text-sm mb-6">Connect</h4>
          <div className="flex gap-3">
            
            {/* Custom SVG untuk Instagram */}
            <Link 
              href="https://www.instagram.com/stackplus.studio/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-[#0053f1] rounded-lg flex items-center justify-center text-white hover:opacity-90 transition-opacity"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>

            {/* Custom SVG untuk LinkedIn */}
            <Link 
              href="https://www.linkedin.com/in/stackplus-studio-9440873a6/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-[#0053f1] rounded-lg flex items-center justify-center text-white hover:opacity-90 transition-opacity"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
            
            {/* Custom SVG untuk TikTok */}
            <Link 
              href="https://www.tiktok.com/@stackplustudio826?_r=1&_t=ZS-95xyaQqXIW7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-[#0053F1] rounded-lg flex items-center justify-center text-white hover:opacity-90 transition-opacity"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 6.27 6.28A6.35 6.35 0 0 0 17.5 15.63V8.81a8.3 8.3 0 0 0 4.19 1.25V6.62a4.8 4.8 0 0 1-2.1-.68z"/>
              </svg>
            </Link>

          </div>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200/60">
        <p className="text-gray-400 text-sm mb-4 md:mb-0">
          © 2026 StackPlus. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-gray-400">
          {/* Ganti dengan link halaman Privacy & Terms asli kamu jika sudah ada */}
          <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}