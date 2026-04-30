"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoWhite, setIsLogoWhite] = useState(false);
  const pathname = usePathname();

  // Sembunyikan Navbar Web ini kalau lagi di halaman admin!
  if (pathname?.startsWith("/admin")) return null;

  useEffect(() => {
    const handleScroll = () => {
      // PERBAIKAN: Menghapus class dengan kurung siku agar tidak error di browser
      const blueSections = document.querySelectorAll('#blue-section, .bg-blue-600, .bg-primary');
      let isOverBlue = false;

      blueSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom >= 20) {
          isOverBlue = true;
        }
      });

      setIsLogoWhite(isOverBlue);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-0">
      {/* Top Banner */}
      <div className="bg-[#3A3831] text-white text-xs font-medium px-6 py-1.5 rounded-b-2xl flex items-center gap-2 shadow-md">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
        Available for new projects
      </div>

      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 transition-all duration-500">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="relative w-[150px] h-[45px] block">
              <Image 
                src="/icons/logonavbarbackgorund_biru.png" 
                alt="StackPlus Studio Logo" 
                fill
                className={cn(
                  "object-contain object-left transition-opacity duration-500 ease-in-out",
                  isLogoWhite ? "opacity-0" : "opacity-100"
                )}
                priority
              />
              <Image 
                src="/icons/navbarnobackground_putih.png" 
                alt="StackPlus Studio Logo White" 
                fill
                className={cn(
                  "object-contain object-left transition-opacity duration-500 ease-in-out",
                  isLogoWhite ? "opacity-100" : "opacity-0"
                )}
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center bg-white/70 backdrop-blur-md px-2 py-1.5 rounded-full shadow-sm border border-gray-100">
            {navLinks.map((link) => {
              const isActive = link.name === "HOME" ? pathname === "/" : pathname.includes(link.href);
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={cn(
                    "px-6 py-2 rounded-full text-xs font-bold transition-all duration-300",
                    isActive 
                      ? "bg-[#0053f1] text-white shadow-md" 
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center">
            {/* LINK CALENDLY DIINTEGRASIKAN DI SINI */}
            <Link 
              href="https://calendly.com/stackplustudio/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#423E3A] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#2A2724] transition-all flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              DISCUSS NOW
            </Link>
          </div>

          <div className="md:hidden flex items-center bg-white/50 backdrop-blur-sm p-1 rounded-lg">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-[#0053f1]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden w-full bg-white px-4 py-4 space-y-2 shadow-lg absolute top-[100%] mt-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 font-bold text-gray-700 hover:text-[#0053f1]"
            >
              {link.name}
            </Link>
          ))}
          {/* Tambahan opsional: Tombol Discuss Now di versi Mobile Menu agar klien dari HP juga bisa akses */}
          <Link
            href="https://calendly.com/stackplustudio/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 mt-4 text-center bg-[#423E3A] text-white font-bold rounded-lg hover:bg-[#2A2724]"
          >
            DISCUSS NOW
          </Link>
        </div>
      )}
    </header>
  );
}