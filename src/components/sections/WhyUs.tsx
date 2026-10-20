"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { whyUsData } from "@/data";
import { cn } from "@/lib/utils";

/* ---------- helpers ---------- */

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(REDUCED_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false
  );
}

function useInView<T extends Element>(once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);
  return { ref, inView };
}

function CountUp({ to, active, delay = 0 }: { to: number; active: boolean; delay?: number }) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active || reduced) return;
    let raf = 0;
    const duration = 1600;
    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setValue(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [active, to, delay, reduced]);
  return <>{reduced ? to : value}</>;
}

/* ---------- Box 1: rating slider (emoji slides to the right) ---------- */

const MOUTHS = [
  "M8 16s1.5-2 4-2 4 2 4 2", // sad
  "M8 15h8", // neutral
  "M8 14s1.5 1 4 1 4-1 4-1", // slight smile
  "M8 14s1.5 2 4 2 4-2 4-2", // smile
  "M7 13s2 4 5 4 5-4 5-4", // big smile
];
const LABELS = ["POOR", "FAIR", "GOOD", "GREAT", "EXCELLENT"];
const FACE_STEP = 40; // w-8 (32px) + gap-2 (8px)

function Face({ mouth }: { mouth: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d={mouth} />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

function QualityCard() {
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setTick((t) => (t + 1) % 8), 900);
    return () => clearInterval(id);
  }, [reduced]);
  const idx = reduced ? 4 : Math.min(tick, 4);

  return (
    <div className="lg:col-span-4 bg-surface rounded-[16px] border border-gray-100 p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow h-full min-h-[320px]">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Quality</h3>
      <p className="text-sm text-gray-500 mb-auto">Excellence in<br />every design detail</p>

      <div className="mt-8 w-full">
        <p key={LABELS[idx]} className="text-xs font-bold text-primary tracking-widest uppercase mb-3 animate-in fade-in duration-300">
          {LABELS[idx]}
        </p>
        <div className="relative mx-auto w-fit">
          <div className="flex gap-2">
            {MOUTHS.map((m, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-[#E5E7EB] flex items-center justify-center text-gray-400">
                <Face mouth={m} />
              </div>
            ))}
          </div>
          {/* Blue emoji that slides to the right */}
          <div
            className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(${idx * FACE_STEP}px)` }}
          >
            <div className="absolute inset-0 border-2 border-dashed border-primary rounded-full scale-125 animate-[spin_10s_linear_infinite]" />
            <Face mouth={MOUTHS[idx]} />
          </div>
        </div>
        {/* Blue progress track */}
        <div className="mx-auto mt-4 h-1 w-[168px] rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
            style={{ width: `${((idx + 1) / MOUTHS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Box 2: working slider ---------- */

const SLIDES = [
  {
    image: "two" as const,
    alt: "Team Working Together",
    title: "Product-Driven Approach",
    text: "Design decisions guided by user insights and business strategy.",
  },
  {
    image: "one" as const,
    alt: "Discussion Area",
    title: "Collaborative Workflow",
    text: "We work side by side with your team, from kickoff to launch.",
  },
];

function ApproachCard() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, [reduced, paused, go]);

  const slide = SLIDES[index];
  const btn =
    "w-8 h-8 rounded-md bg-[#F4F1EB] flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors";

  return (
    <div
      className="lg:col-span-8 bg-surface rounded-[16px] border border-gray-100 p-2 flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow h-full min-h-[320px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="w-full md:w-1/2 bg-gray-200 rounded-[1.5rem] relative overflow-hidden min-h-[200px]">
        {SLIDES.map((s, i) => (
          <Image
            key={s.image}
            src={s.image === "two" ? whyUsData.imageTwo : whyUsData.imageOne}
            alt={s.alt}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className={cn("object-cover transition-opacity duration-700", i === index ? "opacity-100" : "opacity-0")}
          />
        ))}
      </div>
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative">
        <div className="absolute top-8 right-8 flex gap-2">
          <button type="button" aria-label="Previous slide" onClick={() => go(-1)} className={btn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button type="button" aria-label="Next slide" onClick={() => go(1)} className={btn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
        </div>
        <div key={index} className="animate-in fade-in slide-in-from-right-4 duration-500">
          <h3 className="text-xl font-bold text-gray-900 mb-3">{slide.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed max-w-sm">{slide.text}</p>
        </div>
        <div className="mt-8 flex gap-2" role="tablist" aria-label="Slides">
          {SLIDES.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn("h-1.5 rounded-full transition-all duration-500", i === index ? "w-8 bg-primary" : "w-3 bg-gray-300 hover:bg-primary/50")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Box 4: animated rings ---------- */

function Ring({ value, label, size, delay }: { value: number; label: string; size: "sm" | "lg"; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const C = 2 * Math.PI * 46;
  const filled = inView || reduced;
  return (
    <div ref={ref} className="flex flex-col items-center">
      <div
        className={cn(
          "relative flex items-center justify-center mb-4",
          size === "lg" ? "w-24 h-24 sm:w-32 sm:h-32" : "w-16 h-16 sm:w-24 sm:h-24"
        )}
      >
        <div className={cn("absolute inset-0 rounded-full bg-primary/5", size === "lg" && "shadow-[0_0_24px_rgba(0,83,241,0.18)]")} />
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden>
          <circle cx="50" cy="50" r="46" fill="none" strokeWidth={size === "lg" ? 4 : 3} className="stroke-primary/15" />
          <circle
            cx="50" cy="50" r="46" fill="none" strokeWidth={size === "lg" ? 4 : 3} strokeLinecap="round"
            className="stroke-primary"
            strokeDasharray={C}
            strokeDashoffset={filled ? C * (1 - value / 100) : C}
            style={{ transition: reduced ? "none" : `stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}
          />
        </svg>
        <span className={cn("relative font-bold text-gray-900", size === "lg" ? "text-2xl sm:text-3xl" : "text-base sm:text-lg")}>
          <CountUp to={value} active={inView} delay={delay} />%
        </span>
      </div>
      <span className="text-[10px] sm:text-xs text-gray-400 text-center">{label}</span>
    </div>
  );
}

/* ---------- Box 6: vertical scroller ---------- */

const PARTNERS = ["MEDIA PUBLISHING", "E-COMMERCE & D2C", "ARCHITECTURE & INTERIORS", "EDUCATION & LEARNING"];
const ROW_H = 44;
const VISIBLE = 5;
const CENTER = Math.floor(VISIBLE / 2);

function PartnershipCard() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(false);
  const n = PARTNERS.length;
  const rows = [...PARTNERS, ...PARTNERS, ...PARTNERS];
  const [pos, setPos] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (reduced || !inView) return;
    const id = setInterval(() => setPos((p) => p + 1), 1800);
    return () => clearInterval(id);
  }, [reduced, inView]);

  // Copies are identical, so after one full loop snap back without a transition.
  useEffect(() => {
    if (pos < n) return;
    const t = setTimeout(() => {
      setAnimate(false);
      setPos(0);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    }, 750);
    return () => clearTimeout(t);
  }, [pos, n]);

  const row = n + pos;
  const active = row % n;

  return (
    <div className="lg:col-span-5 bg-surface rounded-[16px] border border-gray-100 p-6 sm:p-8 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow h-full min-h-[320px]">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Strategic Partnership</h3>
      <div
        ref={ref}
        className="relative w-full max-w-md overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_28%,black_72%,transparent)]"
        style={{ height: ROW_H * VISIBLE }}
      >
        <div
          className={cn("will-change-transform", animate && !reduced && "transition-transform duration-700 ease-in-out")}
          style={{ transform: `translateY(${(CENTER - row) * ROW_H}px)` }}
        >
          {rows.map((item, i) => {
            const isActive = i % n === active && i === row;
            return (
              <div
                key={i}
                className="relative flex items-center justify-center"
                style={{ height: ROW_H }}
              >
                <div
                  className={cn(
                    "flex items-center gap-3 text-xs font-bold tracking-widest uppercase transition-all duration-500",
                    isActive ? "text-primary scale-110" : "text-gray-300"
                  )}
                >
                  <span className={cn("w-1.5 h-1.5 rounded-full bg-current transition-transform duration-500", isActive && "scale-150")} />
                  {item}
                  <span className={cn("w-1.5 h-1.5 rounded-full bg-current transition-transform duration-500", isActive && "scale-150")} />
                </div>
                <div className="absolute bottom-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

export default function WhyUs({ children }: { children?: React.ReactNode }) {
  return (
    <section id="why-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div className="max-w-xl">
          <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">› WHY US ‹</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Why StackPlus Studio <br />
            <span className="text-primary">Product Solution</span>
          </h2>
        </div>
        <div className="max-w-sm">
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Because we don&apos;t just build products, we build solutions that create measurable impact.
          </p>
          <Link href="#contact" className="inline-flex items-center bg-ink text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-ink-dark transition-all gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            Book a Call
          </Link>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <QualityCard />
        <ApproachCard />

        {/* Business-Focused UX */}
        <div className="lg:col-span-7 bg-surface rounded-[16px] border border-gray-100 p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow h-full min-h-[320px]">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Business-Focused UX</h3>
          <p className="text-sm text-gray-500 mb-12">Clear flows built to drive conversion and growth.</p>
          <div className="flex flex-row justify-center items-end gap-4 md:gap-12 w-full">
            <Ring value={98} label="Lead Generation" size="sm" delay={0} />
            <Ring value={100} label="Business impact" size="lg" delay={200} />
            <Ring value={98} label="Conversion" size="sm" delay={400} />
          </div>
        </div>

        <PartnershipCard />
      </div>

      {/* Kartu statistik (Experience, Products, Clients, Team) */}
      {children && <div className="mt-6">{children}</div>}
    </section>
  );
}