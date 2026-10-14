import Link from "next/link";
import { ArrowRight, Bot, Code, Layout, Palette, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

// Satu-satunya tempat ikon dan tautan layanan (dipakai Home dan halaman Service).
const ICONS: Record<string, typeof Layout> = {
  "UI/UX Design": Layout,
  "Web Development": Code,
  "Mobile Development": Smartphone,
  "AI ChatBot": Bot,
  "Branding Design": Palette,
};

const HREFS: Record<string, string> = {
  "UI/UX Design": "/service/ui-ux-design",
  "Web Development": "/service/web-development",
  "Mobile Development": "/service/mobile-development",
  "AI ChatBot": "/service/ai-chatbot",
  "Branding Design": "/service/branding-design",
};

export default function ServiceCard({ title, desc, active }: { title: string; desc: string; active?: boolean }) {
  const Icon = ICONS[title] ?? Layout;
  return (
    <div
      data-blue-section={active ? true : undefined}
      className={cn(
        "group flex h-[280px] flex-col justify-between rounded-2xl p-8",
        active
          ? "bg-primary text-white shadow-xl shadow-primary/20 transition-transform duration-300 hover:-translate-y-1"
          : "card-hover border border-line bg-surface text-gray-900"
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110",
          active ? "bg-white/20 text-white" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
        )}
      >
        <Icon size={24} aria-hidden />
      </div>
      <div>
        <h3 className="mb-3 text-xl font-bold">{title}</h3>
        <p className={cn("mb-6 line-clamp-2 text-sm", active ? "text-white/80" : "text-gray-500")}>{desc}</p>
        <Link
          href={HREFS[title] ?? "#"}
          className={cn("inline-flex items-center gap-2 text-sm font-bold", active ? "text-white" : "text-primary")}
        >
          Learn More
          <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}