# Lattice — Build at the Speed of Thought

A dark-themed SaaS product landing page built with Next.js, featuring a CSS Grid Bento layout, scroll-driven animations, and a fully responsive design system.

## What it is

Lattice is a marketing landing page concept for a developer infrastructure platform — edge computing, vector databases, automated workflows, and enterprise security. The page communicates product value through motion, density, and interactive layout rather than static copy alone.

## Sections

| Section | Description |
|---|---|
| **Hero — Grid Puzzle** | Asymmetric Bento grid. Row 1 occupies 60vh. Contains headline + CTA, a vertical partner marquee (infinite loop), a live interactive spotlight grid demo, an animated counter, and a real-time stat cell. |
| **Sticky Scroll** | Scroll-driven storytelling: each of 5 product features snaps into view as you scroll, updating a synced phone mockup with animated bar charts. On mobile, renders as a static card list. |
| **Tech Hover Reveal** | 6-card grid of core technologies. Hovering any card expands the entire row to reveal a code illustration and description — row height stays uniform across all siblings. |
| **Curtain Footer** | Parallax reveal footer that slides up over the previous section. Contains a full-width CTA banner, navigation columns, and a bottom bar. |

## Tech stack

- **[Next.js 16](https://nextjs.org)** — App Router, React Server Components, static export
- **[React 19](https://react.dev)** — `"use client"` components for animation-heavy sections
- **[Tailwind CSS v4](https://tailwindcss.com)** — `@import "tailwindcss"` + `@theme inline` syntax, no config file
- **[Framer Motion 12](https://motion.dev)** — `useScroll`, `useTransform`, staggered entry animations, CSS var-driven spotlight effects
- **[Lucide React](https://lucide.dev)** — icon set throughout
- **[clsx](https://github.com/lukeed/clsx)** — conditional class merging via `cn()` utility
- **TypeScript 5** — strict mode

## Design system

- **Background**: `#09090b` (near-black zinc)
- **Accent**: violet-600 → indigo-400 gradient
- **Typography**: Geist Sans (variable font via `next/font`)
- **Borders**: `white/[0.06]` — subtle frosted dividers
- **Motion philosophy**: entrance animations on scroll entry (`IntersectionObserver`), no layout shift, `prefers-reduced-motion` respected

## Project structure

```
app/
├── components/
│   ├── hero-section.tsx          # Bento hero grid
│   ├── sticky-scroll-section.tsx # Scrollytelling + phone mock
│   ├── tech-hover-section.tsx    # Row-expand hover cards
│   └── curtain-footer.tsx        # Parallax footer
├── hooks/
│   └── use-animations.ts         # useCountUp, useScrollProgress, useInView, useMousePosition
├── lib/
│   └── utils.ts                  # cn() helper
├── globals.css                   # Tailwind import + .hero-grid responsive class
├── layout.tsx                    # Root layout, Geist font, dark meta
└── page.tsx                      # Server Component, composes all sections
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # ESLint (0 errors expected)
```
