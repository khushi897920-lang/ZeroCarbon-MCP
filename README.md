# ZeroCarbon MCP

ZeroCarbon MCP is an enterprise-grade landing page for the first AI-native carbon ledger operating system powered by the **Model Context Protocol (MCP)**. It connects AI agents (Claude, Cursor, Windsurf, Gemini) directly to your carbon ledger for real-time emission calculations and continuous regulatory compliance.

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

## ✨ Features

### 🎯 Ultra-Smooth Scrolling (GPU-Optimised)

A carefully tuned **single-RAF-loop** architecture eliminates the double-requestAnimationFrame problem that causes micro-jitter in most Lenis + GSAP setups:

- **One unified tick loop** — GSAP's ticker drives Lenis (`autoRaf: false`), so both systems share one `requestAnimationFrame` at exactly 60fps
- **`lagSmoothing(0)`** — disables GSAP's artificial lag compensation which fights Lenis's own easing
- **`lerp: 0.08`** with exponential easing — longer, silkier deceleration tail
- **`syncTouch: true`** — mobile gets the same smooth inertia as desktop
- **Scoped ticker cleanup** — the exact same function reference is stored in a `ref` and removed on unmount, preventing memory leaks

### 🖥️ GPU-Composited Animations

All scroll-reveal animations run exclusively on the GPU compositor layer:

- **`force3D: true`** on every GSAP tween — forces `translate3d()`, keeping animations off the main thread
- **`will-change: transform`** on all CSS `@keyframe` animated elements (ambient glows, floating blobs, chips) — pre-allocates GPU layers
- **`backface-visibility: hidden`** — prevents subpixel rendering artifacts during compositing
- **`contain: layout style`** on all scroll-animated cards — isolates each element from triggering full-page layout recalculation
- **`transform: translateZ(0)`** on cards — pre-promotes elements to compositor layers before GSAP runs
- **`clearProps: "transform,opacity"`** after animations — releases GPU layers precisely without stripping inherited CSS

### 📜 GSAP ScrollTrigger Reveals

- **Hero entrance**: Staggered `expo.out` slide-up on mount with `autoAlpha` (prevents invisible elements from capturing pointer events)
- **Title reveals**: Clip-path wipe (`inset(0 100% 0 0)` → `inset(0 0% 0 0)`) with `expo.out`
- **Feature, pricing & engine cards**: Staggered slide-up with eased stagger (`power1.inOut` spread)
- **Timeline cards**: Horizontal slide-in from left (`expo.out`)
- **Counter animation**: JS object interpolation (avoids DOM text reflow on each frame)
- **All triggers**: `once: true` — animations don't re-run on scroll-back, freeing resources

### 🔗 MCP Flow Diagram

Interactive React Flow diagram in the hero section visualising the full MCP tool-call lifecycle: User → AI Client → API → MCP Router → Carbon Tools → Carbon Ledger.

### 🧭 Notch Navbar

Apple-inspired pill/notch navigation with Framer Motion mobile menu, smooth Lenis `scrollTo` with `-80px` header offset on all anchor links.

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

## 📦 Deployment on Vercel

```bash
# Preview deployment
npx vercel

# Production
npx vercel --prod
```

---

## 🏗️ Project Structure

```
app/
  layout.tsx          # Root layout with font imports
  ScrollProvider.tsx  # Lenis + GSAP sync (single RAF loop)
  globals.css         # Design tokens, GPU-optimised animation utilities
  page.tsx            # Main landing page with all GSAP animations
  loading.tsx         # Kinetic text loader

components/ui/
  animated-button.tsx  # Shine-effect CTA button
  faq-accordion.tsx    # Animated FAQ accordion
  kinetic-text-loader.tsx  # Animated loading screen
  mcp-flow.tsx         # React Flow MCP diagram
  notch-navbar.tsx     # Apple notch-style navigation
```
