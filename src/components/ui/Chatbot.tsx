"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles, MessageSquare, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mengambil URL dari env, fallback ke localhost jika tidak ada
  const API_URL = process.env.NEXT_PUBLIC_AI_API_URL || "http://127.0.0.1:8000";

  // Pesan Awal
  const [messages, setMessages] = useState([
    { 
      role: "bot", 
      text: "Halo! Saya AI Assistant StackPlus. Ada yang ingin kamu ketahui tentang layanan kami?" 
    }
  ]);

  // Efek auto-scroll ke bawah tiap ada pesan baru atau loading
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Fungsi pengiriman pesan ke Backend FastAPI
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      
      // Ambil field 'answer' dari response backend
      setMessages((prev) => [
        ...prev, 
        { role: "bot", text: data.answer || "Maaf, saya tidak mendapatkan jawaban." }
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev, 
        { role: "bot", text: "Maaf, terjadi gangguan koneksi ke server AI kami. Silakan coba lagi nanti." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* --- JENDELA CHAT --- */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[85vw] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-[#0053f1] p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold flex items-center gap-1">
                  StackPlus AI <Sparkles size={14} className="text-yellow-300" />
                </h3>
                <p className="text-[10px] text-blue-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Area Chat (Body) */}
          <div className="h-[350px] overflow-y-auto p-4 bg-[#FDFBF7] flex flex-col gap-3">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex w-full",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div 
                  className={cn(
                    "max-w-[85%] p-3 text-sm rounded-2xl shadow-sm",
                    msg.role === "user" 
                      ? "bg-[#0053f1] text-white rounded-tr-sm" 
                      : "bg-white border border-gray-100 text-gray-700 rounded-tl-sm"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Indicator Loading saat AI Berpikir */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2 text-gray-400 text-xs italic">
                  <Loader2 size={14} className="animate-spin" />
                  AI sedang mengetik...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Area Input (Footer) */}
          <div className="p-3 bg-white border-t border-gray-100">
            <form onSubmit={handleSend} className="flex gap-2 items-center relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isLoading ? "AI sedang memproses..." : "Tanya apa saja..."} 
                disabled={isLoading}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:border-[#0053f1] transition-colors disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-1 top-1 w-8 h-8 bg-[#0053f1] rounded-full flex items-center justify-center text-white disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
              >
                {isLoading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Send size={14} className="ml-0.5" />
                )}
              </button>
            </form>
          </div>
          
        </div>
      )}

      {/* --- TOMBOL BUBBLE (TRIGGER) --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 bg-[#0053f1] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300 relative group",
          isOpen ? "bg-red-500 rotate-90" : "hover:shadow-[#0053f1]/30"
        )}
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#0053f1] opacity-40 animate-ping"></span>
        )}
        
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

    </div>
  );
}