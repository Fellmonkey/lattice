"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Database,
  Cloud,
  Lock,
  Workflow,
  TerminalSquare,
} from "lucide-react";

const technologies = [
  {
    icon: Cpu,
    title: "Edge Computing",
    subtitle: "< 50ms latency globally",
    description:
      "Deploy compute to 300+ edge locations. Your code runs milliseconds from every user, automatically.",
    illustration: [
      "const edge = await deploy({",
      "  regions: ['auto'],",
      "  runtime: 'edge',",
      "  maxConcurrency: 1000,",
      "  timeout: '30s',",
      "});",
    ],
    color: "violet",
  },
  {
    icon: Database,
    title: "Vector Database",
    subtitle: "Semantic search at scale",
    description:
      "First-class vector support with HNSW indexing. Hybrid search combines full-text and semantic results in one query.",
    illustration: [
      "await db.vectors.upsert({",
      "  namespace: 'products',",
      "  vectors: embeddings,",
      "  metadata: { category },",
      "  indexType: 'hnsw',",
      "});",
    ],
    color: "sky",
  },
  {
    icon: Cloud,
    title: "Auto Scaling",
    subtitle: "From 0 to 10M requests",
    description:
      "Scale-to-zero during quiet hours, burst to handle viral traffic. Pay only for actual compute consumed.",
    illustration: [
      "export const config = {",
      "  scaling: {",
      "    min: 0,",
      "    max: 'unlimited',",
      "    metric: 'concurrency',",
      "    cooldown: '30s',",
      "  }",
      "};",
    ],
    color: "emerald",
  },
  {
    icon: Lock,
    title: "Zero Trust Auth",
    subtitle: "SOC2 & HIPAA compliant",
    description:
      "mTLS everywhere. Every request is authenticated and authorized at the edge before reaching your origin.",
    illustration: [
      "middleware(req => {",
      "  const token = verify(req);",
      "  if (!token.valid) {",
      "    return Response(401);",
      "  }",
      "  req.context.user = token;",
      "});",
    ],
    color: "amber",
  },
  {
    icon: Workflow,
    title: "Event Mesh",
    subtitle: "Exactly-once delivery",
    description:
      "Durable event streams with replay. Build event-driven architectures with guaranteed delivery and ordering.",
    illustration: [
      "events.on('user.signup',",
      "  async (event) => {",
      "    await sendWelcome(event);",
      "    await createProfile(event);",
      "    await trackAnalytics(event);",
      "  },",
      "  { retry: 3 }",
      ");",
    ],
    color: "rose",
  },
  {
    icon: TerminalSquare,
    title: "Dev CLI",
    subtitle: "Ship from your terminal",
    description:
      "Full development lifecycle in your terminal. Local dev, deploy, logs, rollback — all with one tool.",
    illustration: [
      "$ lattice dev --port 3000",
      "$ lattice deploy --prod",
      "$ lattice logs --tail",
      "$ lattice rollback --to v42",
      "$ lattice scale --region eu",
    ],
    color: "indigo",
  },
];

const colorClasses: Record<string, { icon: string; glow: string; border: string; codeBg: string }> = {
  violet: { icon: "text-violet-400", glow: "shadow-violet-500/20", border: "border-violet-500/30", codeBg: "bg-violet-500/5" },
  sky: { icon: "text-sky-400", glow: "shadow-sky-500/20", border: "border-sky-500/30", codeBg: "bg-sky-500/5" },
  emerald: { icon: "text-emerald-400", glow: "shadow-emerald-500/20", border: "border-emerald-500/30", codeBg: "bg-emerald-500/5" },
  amber: { icon: "text-amber-400", glow: "shadow-amber-500/20", border: "border-amber-500/30", codeBg: "bg-amber-500/5" },
  rose: { icon: "text-rose-400", glow: "shadow-rose-500/20", border: "border-rose-500/30", codeBg: "bg-rose-500/5" },
  indigo: { icon: "text-indigo-400", glow: "shadow-indigo-500/20", border: "border-indigo-500/30", codeBg: "bg-indigo-500/5" },
};

export default function TechHoverSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#09090b] px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      {/* Section header */}
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Built on{" "}
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            modern primitives
          </span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          Every layer of the stack is designed for performance, reliability, and
          developer experience.
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {technologies.map((tech, i) => {
          const isHovered = hoveredIndex === i;
          const colors = colorClasses[tech.color];

          return (
            <motion.div
              key={tech.title}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border transition-colors duration-300 ${
                isHovered
                  ? `${colors.border} ${colors.glow} shadow-lg`
                  : "border-white/[0.06]"
              } bg-white/[0.02]`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              layout
              transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
            >
              {/* Default state */}
              <div className="relative z-10 flex flex-col p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className={`rounded-lg border border-white/[0.06] bg-white/[0.04] p-2.5`}>
                    <tech.icon className={`h-5 w-5 ${colors.icon}`} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {tech.title}
                    </h3>
                    <p className="text-xs text-zinc-500">{tech.subtitle}</p>
                  </div>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mb-4 text-sm leading-relaxed text-zinc-400">
                        {tech.description}
                      </p>

                      {/* Code illustration */}
                      <div className={`rounded-lg border border-white/[0.04] ${colors.codeBg} p-4 font-mono text-xs leading-5`}>
                        {tech.illustration.map((line, j) => (
                          <div key={j} className="text-zinc-400">
                            <span className="select-none text-zinc-600 mr-3">
                              {String(j + 1).padStart(2, " ")}
                            </span>
                            {line}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Hover glow effect */}
              {isHovered && (
                <motion.div
                  className="pointer-events-none absolute inset-0 z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    background: `radial-gradient(300px circle at 50% 0%, ${
                      tech.color === "violet"
                        ? "rgba(139,92,246,0.08)"
                        : tech.color === "sky"
                        ? "rgba(56,189,248,0.08)"
                        : tech.color === "emerald"
                        ? "rgba(52,211,153,0.08)"
                        : tech.color === "amber"
                        ? "rgba(251,191,36,0.08)"
                        : tech.color === "rose"
                        ? "rgba(251,113,133,0.08)"
                        : "rgba(129,140,248,0.08)"
                    }, transparent 70%)`,
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
