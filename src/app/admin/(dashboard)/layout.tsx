"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Menu, X } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    const isConfirmed = window.confirm("Beneran mau keluar dari Admin Panel, Bud?");
    if (!isConfirmed) return;
    try {
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Gagal logout, coba lagi ya.");
    }
  };

  // 🛑 KUNCI PERBAIKAN: Mengembalikan ikon yang tadi corrupt saat dicopy
  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: "📊" },
    { name: "Portfolios", href: "/admin/portfolios", icon: "💼" },
    { name: "Services", href: "/admin/services", icon: "🛠️" },
    { name: "Back to Web", href: "/", icon: "🌍" },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0053f1]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      
      {/* TOP NAVBAR ADMIN */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            <div className="flex-shrink-0 flex items-center gap-4">
              <Link href="/admin" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0053f1] text-white flex items-center justify-center font-black text-xl">
                  S
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#423E3A] tracking-tighter leading-none">
                    Stack<span className="text-[#0053f1]">Admin</span>
                  </h2>
                  <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mt-1">
                    Management Panel
                  </p>
                </div>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-2 bg-[#FDFBF7] border border-gray-100 px-2 py-1.5 rounded-full">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? "bg-[#0053f1] text-white shadow-md shadow-[#0053f1]/20"
                        : "text-gray-500 hover:text-[#423E3A] hover:bg-white"
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 pl-1 pr-3 py-1 rounded-full">
                <div className="w-7 h-7 rounded-full bg-[#0053f1]/10 flex items-center justify-center text-[#0053f1] font-black text-xs">
                  S
                </div>
                <span className="text-xs font-bold text-[#423E3A]">StackPlustudio</span>
              </div>
              
              <div className="h-6 w-px bg-gray-200"></div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition-colors"
              >
                <span>🚪</span> Logout
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-[#0053f1] p-2 bg-gray-50 rounded-lg"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 shadow-lg absolute w-full">
            <nav className="flex flex-col gap-2 mt-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 px-2">Menu Utama</p>
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all ${
                      isActive
                        ? "bg-[#0053f1] text-white shadow-md"
                        : "text-gray-500 bg-gray-50 hover:text-[#423E3A]"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
              
              <div className="w-full h-px bg-gray-100 my-2"></div>
              
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[13px] font-bold text-red-500 bg-red-50 w-full text-left"
              >
                <span className="text-lg">🚪</span>
                Sign Out Admin
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>

    </div>
  );
}