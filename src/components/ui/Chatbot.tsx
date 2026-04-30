"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Pesan bawaan (Dummy)
  const [messages, setMessages] = useState([
    { 
      role: "bot", 
      text: "Halo! Saya AI Assistant StackPlus. Ada yang ingin kamu ketahui tentang layanan kami?" 
    },
    { 
      role: "bot", 
      text: "⚠️ Info: Saat ini saya (Chatbot RAG) masih dalam tahap development oleh tim AI kami ya. Segera hadir dengan kepintaran penuh! 🚀" 
    }
  ]);

  // Efek auto-scroll ke bawah tiap ada pesan baru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Simulasi pengiriman pesan (Biar UI-nya kerasa hidup meski belum connect backend)
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Masukkan pesan user
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");

    // Balasan otomatis dari bot (karena masih development)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev, 
        { role: "bot", text: "Terima kasih pesannya! Seperti yang diinfokan, saya masih dalam tahap development dan belum terhubung ke database. Harap maklum ya! 🙏" }
      ]);
    }, 1000);
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
                  In Development
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
            <div ref={messagesEndRef} />
          </div>

          {/* Area Input (Footer) */}
          <div className="p-3 bg-white border-t border-gray-100">
            <form onSubmit={handleSend} className="flex gap-2 items-center relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanya apa saja..." 
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:border-[#0053f1] transition-colors"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="absolute right-1 top-1 w-8 h-8 bg-[#0053f1] rounded-full flex items-center justify-center text-white disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
              >
                <Send size={14} className="ml-0.5" />
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
        {/* Efek Ping / Glow di belakang tombol saat belum dibuka */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#0053f1] opacity-40 animate-ping"></span>
        )}
        
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

    </div>
  );
}