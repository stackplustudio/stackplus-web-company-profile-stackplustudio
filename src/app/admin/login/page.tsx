"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Jika berhasil, lempar ke dashboard admin
      router.push("/admin");
      router.refresh();
    } catch (error: any) {
      setErrorMsg("Email atau Password salah, Bud! Coba cek lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[24px] border border-line p-8 md:p-12 shadow-sm animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-ink tracking-tight">
            Stack<span className="text-primary">Admin</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2 font-medium uppercase tracking-widest text-[10px]">› restricted area ‹</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-ink">Admin Email</label>
            <input
              type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 rounded-[16px] border border-gray-100 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm"
              placeholder="budi@stackplus.studio"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-ink">Password</label>
            <input
              type="password" required value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 rounded-[16px] border border-gray-100 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm"
              placeholder="••••••••"
            />
          </div>

          {errorMsg && (
            <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-[12px] text-center">
              {errorMsg}
            </p>
          )}

          <button
            type="submit" disabled={isLoading}
            className="w-full bg-ink text-white py-4 rounded-[16px] font-bold hover:bg-primary transition-all duration-300 shadow-lg shadow-ink/10 disabled:bg-gray-300"
          >
            {isLoading ? "Authenticating..." : "LOGIN TO DASHBOARD"}
          </button>
        </form>
      </div>
    </div>
  );
}