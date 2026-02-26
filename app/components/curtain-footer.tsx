"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Twitter, Linkedin, ArrowUpRight } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap", "Integrations"],
  Developers: ["Documentation", "API Reference", "SDKs", "CLI", "Status"],
  Company: ["About", "Blog", "Careers", "Press", "Contact"],
  Legal: ["Privacy", "Terms", "Security", "DPA"],
};

export default function CurtainFooter() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Curtain overlay on content above */}
      <div className="pointer-events-none relative z-10 h-32 bg-gradient-to-b from-[#09090b] to-transparent" />

      <motion.footer
        style={{ y, opacity, scale }}
        className="relative -mt-32 overflow-hidden bg-[#09090b] px-4 pb-8 pt-20 sm:px-6 lg:px-8"
      >
        {/* Top glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-1/2 -translate-x-1/2 bg-violet-600/5 blur-[80px]" />

        <div className="mx-auto max-w-6xl">
          {/* CTA Banner */}
          <div className="mb-20 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-violet-950/30 to-indigo-950/30 p-8 text-center sm:p-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to build faster?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-zinc-400">
              Join thousands of teams shipping with Lattice. Free to start, no
              credit card required.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#"
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-violet-600 px-8 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/25"
              >
                Start Building
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 px-8 py-3 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:border-white/20 hover:text-white"
              >
                Talk to Sales
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  {category}
                </h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="cursor-pointer text-sm text-zinc-500 transition-colors duration-200 hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-white">Lattice</span>
            </div>

            <p className="text-xs text-zinc-600">
              &copy; {new Date().getFullYear()} Lattice, Inc. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="cursor-pointer text-zinc-600 transition-colors duration-200 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
