import { Award, CalendarCheck, Code, Globe, Handshake, Rocket, Star, Users } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import { getSiteStats } from "@/lib/queries";
import { DEFAULT_STATS, resolveStat } from "@/lib/stats";
import { cn } from "@/lib/utils";

const ICONS = {
  calendar: CalendarCheck,
  rocket: Rocket,
  handshake: Handshake,
  users: Users,
  star: Star,
  award: Award,
  globe: Globe,
  code: Code,
} as const;

/** Kartu ringkasan angka (diatur dari admin). Ditaruh di bagian bawah Why Us. */
export default async function Stats() {
  const rows = await getSiteStats();
  if (rows && rows.length === 0) return null;

  const now = new Date();
  const stats = (rows ?? DEFAULT_STATS).map((s) => resolveStat(s, now));

  return (
    <div aria-label="StackPlus in numbers" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
      {stats.map((stat, i) => {
        const Icon = ICONS[stat.icon as keyof typeof ICONS] ?? Rocket;
        const active = i === 0;
        return (
          <Reveal key={stat.id} delay={i * 90} className="h-full">
            <div
              data-blue-section={active ? true : undefined}
              className={cn(
                "group flex h-full items-center gap-3 rounded-2xl px-4 py-4",
                active
                  ? "bg-primary text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-1"
                  : "card-hover border border-line bg-surface text-ink-dark"
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110",
                  active ? "bg-white/20 text-white" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                )}
              >
                <Icon size={18} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-2xl font-bold leading-none tracking-tight">
                  <CountUp to={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </p>
                <p className={cn("mt-1.5 text-xs font-semibold leading-tight", active ? "text-white" : "text-ink-dark")}>{stat.label}</p>
                {stat.unit && <p className={cn("text-[11px] leading-tight", active ? "text-white/75" : "text-ink/60")}>{stat.unit}</p>}
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}