/** Logika kartu statistik: pembulatan pengalaman dan data cadangan. */

export const FOUNDING_YEAR = 2026; // StackPlus berdiri Januari 2026
export const FOUNDING_MONTH = 0; // 0 = Januari

/**
 * Lama berdiri dalam tahun, dibulatkan ke BAWAH ke kelipatan 0,5 (0; 0,5; 1; 1,5; ...).
 * Selalu ditampilkan dengan "+" karena artinya "lebih dari". Contoh: 9 bulan → 0,5+; 14 bulan → 1+.
 */
export function experienceYears(now: Date = new Date()): number {
  const months = (now.getFullYear() - FOUNDING_YEAR) * 12 + (now.getMonth() - FOUNDING_MONTH);
  return Math.floor(Math.max(0, months) / 12 * 2) / 2;
}

export type StatRecord = {
  id: string;
  label: string;
  unit: string;
  icon: string;
  source: "MANUAL" | "YEARS_SINCE_FOUNDING";
  value: number;
  suffix: string;
};

export type StatView = { id: string; label: string; unit: string; icon: string; value: number; decimals: number; suffix: string };

export function resolveStat(stat: StatRecord, now: Date = new Date()): StatView {
  const base = { id: stat.id, label: stat.label, unit: stat.unit, icon: stat.icon };
  if (stat.source === "YEARS_SINCE_FOUNDING") {
    const value = experienceYears(now);
    return { ...base, value, decimals: Number.isInteger(value) ? 0 : 1, suffix: "+" };
  }
  return { ...base, value: stat.value, decimals: 0, suffix: stat.suffix };
}

export const formatStat = (v: StatView) => `${v.value.toFixed(v.decimals)}${v.suffix}`;

/** Dipakai hanya bila database tidak terjangkau. */
export const DEFAULT_STATS: StatRecord[] = [
  { id: "d0", label: "Experience", unit: "Years", icon: "calendar", source: "YEARS_SINCE_FOUNDING", value: 0, suffix: "+" },
  { id: "d1", label: "Products", unit: "Delivered", icon: "rocket", source: "MANUAL", value: 11, suffix: "" },
  { id: "d2", label: "Clients", unit: "Happy clients", icon: "handshake", source: "MANUAL", value: 7, suffix: "" },
  { id: "d3", label: "Team", unit: "Members", icon: "users", source: "MANUAL", value: 6, suffix: "" },
];