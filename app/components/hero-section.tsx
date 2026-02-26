"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Globe } from "lucide-react";
import { useCountUp } from "@/app/hooks/use-animations";

/* ─── Vertical Marquee ─── */
const partners = [
  "Stripe", "Vercel", "Linear", "Notion", "Figma",
  "Slack", "GitHub", "Raycast", "Arc", "Resend",
];

function VerticalMarquee() {
  const tripled = [...partners, ...partners, ...partners];
  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-[#09090b] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-[#09090b] to-transparent" />
      <motion.div
        className="flex flex-col gap-4 py-2"
        animate={{ y: ["0%", "-33.333%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      >
        {tripled.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-zinc-400"
          >
            {name}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Counter Cell ─── */
function CounterCell() {
  const { count, start } = useCountUp(99, 2200);
  const { ref, inView } = useInViewOnce();

  useEffect(() => {
    if (inView) start();
  }, [inView, start]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center gap-1 select-none">
      <span className="text-5xl font-bold tracking-tight text-white tabular-nums lg:text-6xl">
        {count}<span className="text-violet-400">%</span>
      </span>
      <span className="text-xs uppercase tracking-widest text-zinc-500">
        Uptime SLA
      </span>
    </div>
  );
}

function useInViewOnce() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

/* ─── Spotlight ─── */
function SpotlightGrid({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const spot = spotRef.current;
    if (!container || !spot) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      spot.style.setProperty("--sx", `${e.clientX - rect.left}px`);
      spot.style.setProperty("--sy", `${e.clientY - rect.top}px`);
    };

    container.addEventListener("mousemove", onMove, { passive: true });
    return () => container.removeEventListener("mousemove", onMove);
  }, [containerRef]);

  return (
    <div
      ref={spotRef}
      className="pointer-events-none absolute inset-0 z-20"
      style={{
        background:
          "radial-gradient(600px circle at var(--sx, -200px) var(--sy, -200px), rgba(139,92,246,0.07), transparent 40%)",
      }}
    />
  );
}

/* ─── Hero ─── */
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const cellBase =
    "relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm";

  const stagger = (i: number) => ({
    initial: { opacity: 0, scale: 0.95 },
    animate: loaded
      ? { opacity: 1, scale: 1 }
      : { opacity: 0, scale: 0.95 },
    transition: { delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <section className="relative overflow-hidden bg-[#09090b] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      {/* Background noise */}
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50" />

      {/* Radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-violet-600/10 blur-[120px]" />

      {/*
        Mobile  (default): 2-column grid, cells stack with fixed heights
        Desktop (lg):      4-column grid, row-1 = 80vh, row-2 = auto
        .hero-grid is defined in globals.css
      */}
      <div ref={containerRef} className="hero-grid relative z-10 mx-auto w-full max-w-6xl">
        <SpotlightGrid containerRef={containerRef} />

        {/* ── Cell 1 — H1 + CTA ──
            mobile:  2 cols wide (full), natural height
            desktop: 3 cols wide, height = 80vh row (set by grid) */}
        <motion.div
          className={`${cellBase} col-span-2 flex flex-col justify-center p-6 sm:p-8 lg:col-span-3 lg:p-12`}
          {...stagger(0)}
        >
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
            <Zap className="h-3 w-3" />
            Now in Public Beta
          </div>
          <h1 className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
            Build products at the{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              speed of thought
            </span>
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-400 sm:text-base lg:mt-4 lg:text-lg">
            The modern platform for teams who ship fast. Real-time collaboration,
            powerful analytics, and seamless integrations — all in one place.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 lg:mt-8">
            <a
              href="#"
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/25 sm:px-6 sm:py-3"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:border-white/20 hover:text-white sm:px-6 sm:py-3"
            >
              View Demo
            </a>
          </div>
        </motion.div>

        {/* ── Cell 2 — Vertical Marquee ──
            mobile:  hidden (too narrow)
            desktop: 1 col wide, same 80vh row as Cell 1 */}
        <motion.div
          className={`${cellBase} hidden p-2 lg:col-span-1 lg:block`}
          {...stagger(1)}
        >
          <VerticalMarquee />
        </motion.div>

        {/* ── Cell 3 — Demo UI ──
            mobile:  2 cols wide, fixed 180px height
            desktop: 2 cols wide, auto height (row 2) */}
        <motion.div
          className={`${cellBase} col-span-2 h-44 overflow-hidden p-0 sm:h-52 lg:col-span-2 lg:h-50`}
          {...stagger(2)}
        >
          <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-950/40 to-indigo-950/40 p-4 sm:p-6">
            <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/[0.06]">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950" />
              <div className="absolute inset-0 flex items-center justify-center">
                <DemoUI />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Cell 4 — Counter ──
            mobile:  1 col wide, fixed 88px height
            desktop: 1 col wide, auto height */}
        <motion.div
          className={`${cellBase} col-span-1 flex h-22 items-center justify-center sm:h-28 lg:col-span-1 lg:h-auto`}
          {...stagger(3)}
        >
          <CounterCell />
        </motion.div>

        {/* ── Cell 5 — Mini stat ──
            mobile:  1 col wide, fixed 88px height
            desktop: 1 col wide, auto height */}
        <motion.div
          className={`${cellBase} col-span-1 flex h-22 items-center justify-center gap-2 px-4 sm:h-28 sm:gap-3 sm:px-6 lg:col-span-1 lg:h-auto`}
          {...stagger(4)}
        >
          <Globe className="h-4 w-4 text-indigo-400 sm:h-5 sm:w-5" />
          <div>
            <div className="text-base font-semibold text-white sm:text-lg">150+</div>
            <div className="text-[10px] text-zinc-500 sm:text-xs">Countries</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Demo UI mockup (instead of real video) ─── */
function DemoUI() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3 p-4">
      {/* Fake toolbar */}
      <div className="flex items-center gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
        <div className="ml-4 h-2 w-24 rounded bg-zinc-800" />
      </div>
      {/* Fake chart bars */}
      <div className="flex items-end gap-1.5 pt-4">
        {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-violet-600 to-indigo-400"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: 0.8 + i * 0.08, duration: 0.6, ease: "easeOut" }}
            style={{ minHeight: 4, maxHeight: 80 }}
          />
        ))}
      </div>
      {/* Fake metrics row */}
      <div className="mt-2 flex justify-between">
        {[
          { label: "Users", val: "12.4k" },
          { label: "Revenue", val: "$84k" },
          { label: "Growth", val: "+23%" },
        ].map((m) => (
          <div key={m.label} className="text-center">
            <div className="text-xs font-semibold text-white">{m.val}</div>
            <div className="text-[10px] text-zinc-500">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
