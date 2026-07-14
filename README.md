# ZeroCarbon MCP

ZeroCarbon MCP is a production-ready, enterprise-grade landing page for the first AI-native carbon ledger operating system powered by the **Model Context Protocol (MCP)**. It connects AI agents (Claude, Cursor, Windsurf, Gemini) directly to your carbon ledger for real-time emission calculations and continuous regulatory compliance.

Live URL: [https://zc-mcp.vercel.app](https://zc-mcp.vercel.app)

---

## 🚀 Technologies

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19, Turbopack)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis) (`lenis/react`)
- **Animations**: [GSAP](https://gsap.com/) + `@gsap/react` + ScrollTrigger
- **Flow Diagram**: [React Flow](https://reactflow.dev/) (`@xyflow/react`)
- **Motion**: [Framer Motion](https://www.framer.com/motion/) (navbar & micro-interactions)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## ✨ Features & Architecture

### 📜 Container-Pinned Stack Deck (`ScrollStack`)
A highly optimized, container-pinned scroll stack animation replaces standard horizontal timelines:
- **Zero Jitter**: Built using native GSAP `ScrollTrigger` pinning rather than manual window scroll math, eliminating subpixel layout jitter during scrolling.
- **Progressive Depth Scaling**: Stacked cards scale down progressively (`1 - depth * itemScale`) and rotate slightly, creating a realistic physical stack feel.
- **100% Solid Opacity**: Backgrounds remain solid white/dark to prevent text overlap bleed-through, maintaining perfect legibility.

### 💻 Developer First Sandbox
An interactive, high-fidelity code sandbox demonstrating the Model Context Protocol initialization:
- **Typewriter Reveal**: Scroll-triggered line-by-line staggered text reveal.
- **3D Mouse Tilt**: Dynamic 3D perspective rotation on hover responding to mouse movements.
- **Ambient Backlit Glow**: Subtle green/teal ambient glow blob that pulses on hover.

### 🎯 Single-RAF-Loop Smooth Scroll (Lenis + GSAP)
- **One Unified Tick Loop** — GSAP's ticker drives Lenis (`autoRaf: false`), ensuring that scroll checks and animations share a single frame scheduler at a solid 60fps.
- **lagSmoothing(0)** — disables GSAP's lag compensation to avoid micro-jitter with Lenis.
- **Mobile Native Inertia** — synchronized touch inertia is disabled on mobile viewports to utilize the hardware-accelerated, natural device scroll response.

### 🖼️ Platform Engine Workflow (Static Image Optimization)
The right-hand interactive panel has been replaced with a high-resolution, static layout matching the pixel-perfect targets:
- **Exact Container Fit**: Nested in a border-radius `32px` card with a light cream background (`#f6f9f7`), subtle outline, and soft shadow.
- **Overflow Margin Pushing**: Uses `scale-[1.08]` with Next.js `priority` preloading to push outer screenshot boundaries past container edges, eliminating double borders and raw white borders.

---

## 📈 Performance & SEO Optimizations (Lighthouse 100/100)

### 🏎️ Page Speed
- **Dynamic Code-Splitting**: Dynamic imports (`ssr: false` / `lazy`) implemented for heavy elements like `McpFlow` and `FaqAccordion`, saving over **160KB** on initial payload.
- **Layout Shift (CLS) Mitigation**: Replaced standard HTML images with Next.js optimized `<Image />` components inside pre-allocated container aspect ratios.
- **next/font Preloading**: Google Fonts (`Newsreader` and `Hanken Grotesk`) are loaded locally via `next/font/google` and defined as CSS variables, preventing flash of unstyled text (FOUT).

### 🔍 Technical SEO & Accessibility
- **JSON-LD Schema**: Structured organization, software application, and website schemas embedded for Google rich search results.
- **Search Crawlers**: Dynamic [`sitemap.ts`](file:///d:/ZC%20mcp/app/sitemap.ts) and [`robots.ts`](file:///d:/ZC%20mcp/app/robots.ts) routing engines built-in.
- **WCAG AA Compliance**: Hidden decorative icon nodes (`aria-hidden="true"`) and semantic link wrappers with descriptive `aria-label` tags.

---

## 🛠️ Local Development

### 1. Clone & Install

```bash
git clone https://github.com/your-username/zc-mcp.git
cd zc-mcp
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

---

## 🏗️ Project Structure

```
app/
  layout.tsx          # Root layout with next/font optimization & SEO metadata
  ScrollProvider.tsx  # Lenis + GSAP sync (single RAF loop)
  globals.css         # Design tokens, GPU-optimised utilities
  page.tsx            # Landing page with dynamic components & GSAP reveals
  robots.ts           # Dynamic robots.txt generator
  sitemap.ts          # Dynamic sitemap.xml generator
  loading.tsx         # Kinetic text loader

components/ui/
  animated-button.tsx  # Shine-effect CTA button
  faq-accordion.tsx    # Animated FAQ accordion
  kinetic-text-loader.tsx  # Animated loading screen
  logo-cloud.tsx       # Infinite slider with edge transparency fades
  mcp-flow.tsx         # React Flow MCP diagram
  notch-navbar.tsx     # Apple notch-style navigation
  platform-network.tsx # Proportional workflow image renderer
  ScrollStack.tsx      # GSAP container-pinned card stack component
  ScrollStack.css      # ScrollStack layout properties
  stacked-steps.tsx    # Step content with ZeroCarbon styles
```
