# ZeroCarbon MCP

ZeroCarbon MCP is an enterprise-grade landing page for the first AI-native carbon ledger operating system powered by the **Model Context Protocol (MCP)**. It connects AI agents (Claude, Cursor, Windsurf, Gemini) directly to your carbon ledger for real-time emission calculations and continuous regulatory compliance.

Live URL: [https://zc-mcp.vercel.app](https://zc-mcp.vercel.app)

---

## 🚀 Technologies

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Smooth Scroll**: [Lenis React](https://github.com/darkroomengineering/lenis)
- **Animations**: [GSAP](https://gsap.com/) & `@gsap/react` (GreenSock Animation Platform with ScrollTrigger)

---

## ✨ Features

- **Global Smooth Scroll**: Enabled using a custom client-side `ScrollProvider` wrapper (`ReactLenis`), keeping page layout as a server-side component for maximum SEO efficiency.
- **GSAP ScrollTrigger Reveals**:
  - **Page Load Stagger**: Hero heading, text, and illustration animate sequentially on mount.
  - **Section Titles**: Slide up with a high-fidelity CSS `clip-path` mask reveal.
  - **Element Staggering**: Feature cards, step milestones, and pricing cards slide up stagger-item-by-stagger-item.
- **Precise Sticky Navbar Scrolling**: Custom click handlers intercept navigation and scroll with a `-80px` offset, keeping the target section header fully visible beneath the sticky navbar.
- **Neo-Brutalist Pricing**: Custom plans section configured for different stages of developer, growth, and enterprise deployment.

---

## 🛠️ Local Development

### 1. Clone & Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Build for Production

```bash
npm run build
npm start
```

---

## 📦 Deployment on Vercel

The easiest way to deploy this project is via the [Vercel CLI](https://vercel.com/download):

```bash
# Deploy to preview/development
npx vercel

# Deploy to production
npx vercel --prod
```
