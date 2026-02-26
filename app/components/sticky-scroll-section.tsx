"use client";

import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart3, Shield, Zap, Layers, RefreshCw } from "lucide-react";
import { useScrollProgress } from "@/app/hooks/use-animations";

/* ─── Feature data ─── */
const features = [
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Track every metric in real time. Custom dashboards, intelligent alerts, and predictive insights powered by machine learning.",
    chart: [30, 55, 40, 70, 50, 85, 65, 95],
    color: "violet",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC2 compliant. End-to-end encryption, SSO, role-based access control, and audit logs — built for enterprises from day one.",
    chart: [90, 92, 88, 95, 93, 97, 94, 99],
    color: "emerald",
  },
  {
    icon: Zap,
    title: "Instant Deployments",
    description:
      "Push to production in seconds. Zero-downtime deployments with automatic rollbacks and canary releases.",
    chart: [10, 25, 45, 60, 75, 80, 88, 96],
    color: "amber",
  },
  {
    icon: Layers,
    title: "Modular Architecture",
    description:
      "Compose your stack from 200+ pre-built modules. Every component is independently versioned and tree-shakeable.",
    chart: [50, 45, 60, 55, 70, 65, 80, 75],
    color: "sky",
  },
  {
    icon: RefreshCw,
    title: "Automated Workflows",
    description:
      "Visual workflow builder with branching logic. Trigger actions across your entire tool chain without writing code.",
    chart: [20, 35, 50, 45, 65, 70, 85, 90],
    color: "rose",
  },
];

const colorMap: Record<string, { bar: string; dot: string; bg: string }> = {
  violet: { bar: "from-violet-600 to-violet-400", dot: "bg-violet-400", bg: "bg-violet-500/10" },
  emerald: { bar: "from-emerald-600 to-emerald-400", dot: "bg-emerald-400", bg: "bg-emerald-500/10" },
  amber: { bar: "from-amber-600 to-amber-400", dot: "bg-amber-400", bg: "bg-amber-500/10" },
  sky: { bar: "from-sky-600 to-sky-400", dot: "bg-sky-400", bg: "bg-sky-500/10" },
  rose: { bar: "from-rose-600 to-rose-400", dot: "bg-rose-400", bg: "bg-rose-500/10" },
};

/* ─── Sticky phone mock ─── */
function PhoneMock({ activeIndex }: { activeIndex: number }) {
  const feature = features[activeIndex];
  const colors = colorMap[feature.color];

  return (
    <div className="relative mx-auto h-[420px] w-[260px] overflow-hidden rounded-[2.5rem] border-2 border-white/[0.08] bg-zinc-950 shadow-2xl sm:mt-1 md:mt-0 md:h-[610px] md:w-[320px]">
      {/* Notch */}
      <div className="absolute left-1/2 top-0 z-10 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-zinc-950" />

      {/* Screen content */}
      <div className="flex h-full flex-col p-5 pt-10">
        {/* Status bar */}
        <div className="mb-4 flex items-center justify-between text-[10px] text-zinc-500">
          <span>9:41</span>
          <div className="flex gap-1">
            <div className="h-1.5 w-3 rounded-sm bg-zinc-600" />
            <div className="h-1.5 w-3 rounded-sm bg-zinc-600" />
            <div className="h-1.5 w-3 rounded-sm bg-zinc-600" />
          </div>
        </div>

        {/* Header */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className={`mb-2 inline-flex rounded-lg p-2 ${colors.bg}`}>
            <feature.icon className={`h-4 w-4 ${colors.dot.replace("bg-", "text-")}`} />
          </div>
          <div className="text-sm font-semibold text-white">{feature.title}</div>
        </motion.div>

        {/* Chart */}
        <motion.div
          key={`chart-${activeIndex}`}
          className="flex flex-1 items-end gap-2 pb-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {feature.chart.map((val, i) => (
            <motion.div
              key={i}
              className={`flex-1 rounded-t bg-gradient-to-t ${colors.bar}`}
              variants={{
                hidden: { height: 0, opacity: 0 },
                visible: {
                  height: `${val}%`,
                  opacity: 1,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              style={{ minHeight: 2 }}
            />
          ))}
        </motion.div>

        {/* Bottom metric */}
        <motion.div
          key={`metric-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
        >
          <span className="text-xs text-zinc-400">Performance</span>
          <span className={`text-sm font-bold ${colors.dot.replace("bg-", "text-")}`}>
            +{feature.chart[feature.chart.length - 1]}%
          </span>
        </motion.div>

        {/* Nav dots */}
        <div className="mt-4 flex justify-center gap-1.5">
          {features.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? `w-4 ${colors.dot}`
                  : "w-1.5 bg-zinc-700"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export default function StickyScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(sectionRef);

  const activeIndex = useMemo(() => {
    const idx = Math.floor(progress * features.length);
    return Math.min(idx, features.length - 1);
  }, [progress]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#09090b]"
      style={{ height: `${(features.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 sm:px-6 md:flex-row lg:gap-20 lg:px-8">
          {/* Left — Phone */}
          <div className="flex flex-shrink-0 items-center justify-center md:w-1/2">
            <PhoneMock activeIndex={activeIndex} />
          </div>

          {/* Right — Feature cards */}
          <div className="flex w-full flex-col md:gap-6 md:w-1/2">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything you need,{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                nothing you don&apos;t
              </span>
            </h2>
            <div className="flex flex-col lg:gap-4">
              {features.map((feat, i) => {
                const isActive = i === activeIndex;
                const colors = colorMap[feat.color];
                return (
                  <motion.div
                    key={feat.title}
                    className={`cursor-pointer rounded-xl border p-3 md:p-5 transition-all duration-300 ${
                      isActive
                        ? "border-white/[0.1] bg-white/[0.04]"
                        : "border-transparent bg-transparent"
                    }`}
                    animate={{ opacity: isActive ? 1 : 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`rounded-lg p-2 ${colors.bg}`}>
                        <feat.icon className={`h-3 w-3 md:h-5 md:w-5 ${colors.dot.replace("bg-", "text-")}`} />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white">
                          {feat.title}
                        </h3>
                        <motion.p
                          className="mt-1 text-sm leading-relaxed text-zinc-400"
                          animate={{
                            height: isActive ? "auto" : 0,
                            opacity: isActive ? 1 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: "hidden" }}
                        >
                          {feat.description}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
