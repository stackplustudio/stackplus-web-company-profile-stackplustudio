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
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Sembunyikan Navbar Web ini kalau lagi di halaman admin!
  if (pathname?.startsWith("/admin")) return null;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

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
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 flex flex-col items-center transition-all duration-300",
      // PERUBAHAN DI SINI: Ditambah rounded-b-3xl (melengkung bawah) saat di-scroll
      isScrolled ? "bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-200 pb-3 rounded-b-3xl" : "bg-transparent pt-0"
    )}>
      {/* Top Banner */}
      <div className="bg-[#3A3831] text-white text-xs font-medium px-6 py-1.5 rounded-b-2xl flex items-center gap-2 shadow-md">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
        Available for new projects
      </div>

      <nav className={cn(
        "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500",
        isScrolled ? "mt-3" : "mt-4" 
      )}>
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
            <Link 
              href="https://calendly.com/stackplustudio/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#423E3A] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#2A2724] transition-all flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              BOOK A SESSION
            </Link>
          </div>

          <div className="md:hidden flex items-center bg-white/50 backdrop-blur-sm p-1.5 rounded-lg border border-gray-100">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-[#0053f1] transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden w-full absolute top-full left-0 bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 py-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-300 rounded-b-3xl">
          {navLinks.map((link) => {
            const isActive = link.name === "HOME" ? pathname === "/" : pathname.includes(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-4 py-3 font-bold rounded-xl transition-all",
                  isActive 
                    ? "bg-[#0053f1]/10 text-[#0053f1]" 
                    : "text-gray-700 hover:bg-gray-50 hover:text-[#0053f1]"
                )}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="https://calendly.com/stackplustudio/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-4 mt-6 text-center bg-[#423E3A] text-white text-sm font-bold rounded-xl hover:bg-[#2A2724] transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            BOOK A SESSION
          </Link>
        </div>
      )}
    </header>
  );
}