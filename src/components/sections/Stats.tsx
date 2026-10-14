import { CalendarCheck, Handshake, Rocket, Users } from "lucide-react";
import { statsData } from "@/data";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import { cn } from "@/lib/utils";

const ICONS = { experience: CalendarCheck, products: Rocket, clients: Handshake, team: Users } as const;

/** Kartu kecil ringkasan angka, tepat di bawah Hero. Angka menghitung dari 0 saat terlihat. */
export default function Stats() {
  return (
    <section aria-label="StackPlus in numbers" className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {statsData.map((stat, i) => {
          const Icon = ICONS[stat.key];
          const active = i === 0;
          return (
            <Reveal key={stat.key} delay={i * 90} className="h-full">
              <div
                data-blue-section={active ? true : undefined}
                className={cn(
                  "group flex h-full items-center gap-3 rounded-2xl px-4 py-3.5",
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
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className={cn("mt-1 truncate text-xs font-medium", active ? "text-white/80" : "text-ink/60")}>
                    {stat.label} · {stat.unit}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}