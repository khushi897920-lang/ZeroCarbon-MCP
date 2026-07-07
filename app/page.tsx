"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const lenis = useLenis();

  // Sync GSAP ScrollTrigger with Lenis
  useEffect(() => {
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  // Navbar Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(targetId, {
        offset: -80,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  useGSAP(() => {
    if (typeof window === "undefined") return;

    // 1. Hero animations on load
    gsap.fromTo(
      ".hero-animate",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "all",
      }
    );

    // 2. Title reveals using clip-path mask
    const titles = gsap.utils.toArray(".gsap-title");
    titles.forEach((title: any) => {
      gsap.fromTo(
        title,
        { clipPath: "inset(0 100% 0 0)", opacity: 0, y: 20 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // 3. Feature Cards Stagger Slide-Up
    gsap.fromTo(
      ".feature-card",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#features",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // 4. Pricing Cards Stagger Slide-Up
    gsap.fromTo(
      ".pricing-card",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#pricing",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // 5. How It Works steps stagger
    gsap.fromTo(
      ".how-item",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#how-it-works",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div ref={containerRef}>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'navbar-scrolled py-2' : 'py-4'}`} id="navbar">
        <div className="max-w-container-max mx-auto px-grid-margin flex justify-between items-center h-16">
          <div className="font-headline-lg text-[24px] font-bold text-primary tracking-tight">ZeroCarbon MCP</div>
          <div className="hidden md:flex items-center gap-8">
            <a className="font-body-md text-body-md hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleNavClick(e, '#hero')}>Home</a>
            <a className="font-body-md text-body-md hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleNavClick(e, '#features')}>Features</a>
            <a className="font-body-md text-body-md hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleNavClick(e, '#pricing')}>Pricing</a>
            <a className="font-body-md text-body-md hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleNavClick(e, '#developers')}>Developers</a>
            <a className="font-body-md text-body-md hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleNavClick(e, '#faq')}>FAQ</a>
            <button className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-body-md text-body-md font-bold hover:bg-opacity-90 transition-all" onClick={(e) => handleNavClick(e, '#contact')}>Request a Demo</button>
          </div>
          <button className="md:hidden">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="hero" className="pt-40 pb-20 px-grid-margin max-w-container-max mx-auto organic-bg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              <h1 className="font-display-lg text-display-lg max-md:text-headline-xl leading-[1.1] hero-animate">
                Enterprise Carbon Intelligence Powered by the Model Context Protocol
              </h1>
              <p className="font-body-xl text-body-xl text-text-muted max-w-xl hero-animate">
                Connect Claude, Cursor, Windsurf, Gemini and enterprise AI agents directly to your carbon ledger.
              </p>
              <div className="hero-animate">
                <button className="bg-primary text-on-primary px-10 py-5 rounded-full font-body-md text-body-md font-bold flex items-center gap-2 hover:shadow-xl transition-all" onClick={(e) => handleNavClick(e, '#contact')}>
                  Request a Demo
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="relative float-animation hero-animate">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Carbon Intelligence Platform UI" className="w-full rounded-3xl shadow-2xl border border-outline-variant/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMkxHkCWXv4XILB5Vrs4VE8rZNnn04ESMJK4xbYfTSJSVUibCJ7a2fMkSl3bIOZN2Xj5Sj-gp8KaAZiAv7OI9TW-y606nLNkaLxCmYlfqEZbj448LyTlEXLICQF-rFPF_AGZUhC8nayLbmecxz86pqTa2uCdN3EsOXo8SonzMOtr-sTvwWrNtNAQ5BmuTxzrzwgqqMBkP_vLwbu0shsLKCrcJKU3ndYm_0lnvhmg8m21Cpzr-d230" />
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 border-y border-outline-variant/20">
          <div className="max-w-container-max mx-auto px-grid-margin">
            <p className="text-center font-label-caps text-label-caps text-text-muted mb-10 tracking-[0.2em] uppercase">Powering emission audits for top AI labs</p>
            <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-60">
              <div className="flex items-center gap-2.5 float-animation" style={{ animationDelay: '0s' }}>
                <span className="material-symbols-outlined text-[28px]">token</span>
                <span className="font-headline-lg text-headline-lg-mobile font-bold">Anthropic</span>
              </div>
              <div className="flex items-center gap-2.5 float-animation" style={{ animationDelay: '0.5s' }}>
                <span className="material-symbols-outlined text-[28px]">hub</span>
                <span className="font-headline-lg text-headline-lg-mobile font-bold">OpenAI</span>
              </div>
              <div className="flex items-center gap-2.5 float-animation" style={{ animationDelay: '1s' }}>
                <span className="material-symbols-outlined text-[28px]">diamond</span>
                <span className="font-headline-lg text-headline-lg-mobile font-bold">Gemini</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Answer */}
        <section className="px-grid-margin py-section-gap-desktop">
          <div className="bg-surface-mint rounded-[48px] p-12 md:p-24 text-center max-w-5xl mx-auto space-y-8">
            <p className="font-label-caps text-label-caps text-accent-green tracking-widest uppercase">Quick Answer</p>
            <h2 className="gsap-title font-headline-xl text-headline-xl max-md:text-headline-lg leading-tight">What is ZeroCarbon MCP?</h2>
            <p className="font-body-xl text-body-xl text-text-main max-w-2xl mx-auto opacity-80">
              ZeroCarbon MCP is the industry&apos;s first AI-native operating system designed to automate carbon referrals, 
              calculate Scope 1-3 emissions in real-time, and maintain continuous regulatory compliance for engineering-heavy enterprises.
            </p>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="px-grid-margin py-section-gap-desktop max-w-container-max mx-auto">
          <div className="text-center space-y-4 mb-16">
            <p className="font-label-caps text-label-caps text-accent-green uppercase">Platform Features</p>
            <h2 className="gsap-title font-headline-xl text-headline-xl">Engineered for absolute accuracy</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card bg-white p-10 rounded-3xl border border-outline-variant/10 shadow-sm transition-all duration-400">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-surface-mint text-accent-green mb-8">
                <span className="material-symbols-outlined">data_usage</span>
              </div>
              <h3 className="font-headline-lg text-[24px] mb-4">Consolidate tools</h3>
              <p className="font-body-md text-text-muted">Unify siloed sustainability trackers, cloud billings, and supply chain data into a single, high-fidelity ledger.</p>
            </div>
            <div className="feature-card bg-white p-10 rounded-3xl border border-outline-variant/10 shadow-sm transition-all duration-400">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-surface-mint text-accent-green mb-8">
                <span className="material-symbols-outlined">description</span>
              </div>
              <h3 className="font-headline-lg text-[24px] mb-4">AI Documentation</h3>
              <p className="font-body-md text-text-muted">Automate the generation of ESG reports and audit trails using LLMs trained on climate accounting standards.</p>
            </div>
            <div className="feature-card bg-white p-10 rounded-3xl border border-outline-variant/10 shadow-sm transition-all duration-400">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-surface-mint text-accent-green mb-8">
                <span className="material-symbols-outlined">security</span>
              </div>
              <h3 className="font-headline-lg text-[24px] mb-4">Real-time compliance</h3>
              <p className="font-body-md text-text-muted">Stay ahead of CSRD and SEC mandates with live emission monitoring and proactive compliance alerting.</p>
            </div>
          </div>
        </section>

        {/* Ecosystem */}
        <section id="architecture" className="bg-primary text-on-primary py-section-gap-desktop overflow-hidden">
          <div className="max-w-container-max mx-auto px-grid-margin grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <p className="font-label-caps text-label-caps text-primary-fixed opacity-70 uppercase">Integration Hub</p>
                <h2 className="gsap-title font-headline-xl text-headline-xl">Broad Ecosystem Support</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-on-primary-fixed-variant/20 p-4 rounded-xl flex items-center gap-3 border border-white/5">
                  <span className="material-symbols-outlined text-primary-fixed">terminal</span>
                  <span className="font-body-md">Claude 3.5</span>
                </div>
                <div className="bg-on-primary-fixed-variant/20 p-4 rounded-xl flex items-center gap-3 border border-white/5">
                  <span className="material-symbols-outlined text-primary-fixed">code</span>
                  <span className="font-body-md">Cursor</span>
                </div>
                <div className="bg-on-primary-fixed-variant/20 p-4 rounded-xl flex items-center gap-3 border border-white/5">
                  <span className="material-symbols-outlined text-primary-fixed">waves</span>
                  <span className="font-body-md">Windsurf</span>
                </div>
                <div className="bg-on-primary-fixed-variant/20 p-4 rounded-xl flex items-center gap-3 border border-white/5">
                  <span className="material-symbols-outlined text-primary-fixed">lan</span>
                  <span className="font-body-md">HTTP Bridge</span>
                </div>
              </div>
              <div className="flex gap-16 pt-6">
                <div>
                  <p className="font-stat-display text-stat-display text-primary-fixed">500+</p>
                  <p className="font-body-md text-primary-fixed/60">Emission Factors</p>
                </div>
                <div>
                  <p className="font-stat-display text-stat-display text-primary-fixed">24/7</p>
                  <p className="font-body-md text-primary-fixed/60">Audit Support</p>
                </div>
              </div>
            </div>
            <div className="relative group stagger-item" style={{ transitionDelay: '200ms' }}>
              <div className="rounded-[40px] overflow-hidden shadow-2xl relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Neural sustainability network illustration" className="w-full aspect-[4/3] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1BQbrQ_6WpbvTn8YQhoiVdUi2QG8rygmz4M0bW1u8XWMSO-YZ9dWKVuQXyiqyYFFIghtSp8kTJg0LwmnWByZHybykPxIdjtMwF32RjrGvsR3mQf0jz5smppkFLfRQJFPvXRE7ggzaLZc2NflI35fjKB-trzRZmRDlnL24xHF18rWonjX-EDeCk_bRazd82syRs8qbYe7nE9skJ6FlNu7wEz5f8qlHvJEWiMTBABcXZYfvD-NBsoWi_hGyr_QFGhAO" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="px-grid-margin py-section-gap-desktop max-w-container-max mx-auto">
          <div className="text-center space-y-4 mb-20">
            <p className="font-label-caps text-label-caps text-accent-green uppercase">The Path To Zero</p>
            <h2 className="gsap-title font-headline-xl text-headline-xl">Simplicity in every step</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-outline-variant/30">
            <div className="p-8 space-y-6 how-item">
              <span className="font-stat-display text-stat-display text-surface-mint">01</span>
              <h4 className="font-headline-lg text-[22px]">Install &amp; Connect</h4>
              <p className="font-body-md text-text-muted">Deploy our lightweight agent across your cloud stack in minutes.</p>
            </div>
            <div className="p-8 space-y-6 how-item">
              <span className="font-stat-display text-stat-display text-surface-mint">02</span>
              <h4 className="font-headline-lg text-[22px]">Discover Tools</h4>
              <p className="font-body-md text-text-muted">AI automatically maps every software tool to its energy footprint.</p>
            </div>
            <div className="p-8 space-y-6 how-item">
              <span className="font-stat-display text-stat-display text-surface-mint">03</span>
              <h4 className="font-headline-lg text-[22px]">Calculate Emissions</h4>
              <p className="font-body-md text-text-muted">Compute real-time Scope 1, 2, and 3 data with certified accuracy.</p>
            </div>
            <div className="p-8 space-y-6 how-item">
              <span className="font-stat-display text-stat-display text-surface-mint">04</span>
              <h4 className="font-headline-lg text-[22px]">Store in Ledger</h4>
              <p className="font-body-md text-text-muted">Immutable audit logs saved to our carbon ledger for reporting.</p>
            </div>
          </div>
        </section>

        {/* Code Section */}
        <section id="developers" className="px-grid-margin py-section-gap-desktop max-w-container-max mx-auto">
          <div className="bg-surface-container-low rounded-[48px] p-8 md:p-16 border border-outline-variant/10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-[#0b1410] rounded-2xl p-6 font-mono text-[14px] text-on-primary shadow-2xl overflow-hidden relative">
                <div className="flex gap-1.5 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <p className="text-white/40 mb-4">// Initializing ZeroCarbon MCP</p>
                <p className="mb-1 text-blue-300">const <span className="text-white">zeroCarbon</span> = new <span className="text-teal-300">MCPCore</span>({'{'}</p>
                <p className="pl-4">auditMode: <span className="text-amber-200">&apos;real-time&apos;</span>,</p>
                <p className="pl-4 text-white">compliance: [<span className="text-amber-200">&apos;CSRD&apos;</span>, <span className="text-amber-200">&apos;SEC&apos;</span>],</p>
                <p className="pl-4 text-white">scopeTracking: <span className="text-amber-200">&apos;3_FULL&apos;</span></p>
                <p className="text-blue-300">{'}'});</p>
                <p className="mt-4 text-blue-300">await <span className="text-white">zeroCarbon</span>.connect(<span className="text-amber-200">&apos;infrastructure&apos;</span>);</p>
                <p className="text-teal-400 mt-2">✓ Ledger ready. Monitoring 4,129 endpoints.</p>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <p className="font-label-caps text-label-caps text-accent-green uppercase">Developer First</p>
              <h2 className="gsap-title font-headline-xl text-headline-xl">An MCP Core designed for how developers actually work.</h2>
              <ul className="space-y-5">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent-green">check_circle</span>
                  <span className="font-body-md font-bold">API-First Architecture</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent-green">check_circle</span>
                  <span className="font-body-md font-bold">Git-Integrated Workflows</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent-green">check_circle</span>
                  <span className="font-body-md font-bold">Automated Security Patching</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="px-grid-margin py-section-gap-desktop max-w-container-max mx-auto">
          <div className="text-center space-y-4 mb-20">
            <p className="font-label-caps text-label-caps text-accent-green uppercase">Flexible Plans</p>
            <h2 className="gsap-title font-headline-xl text-headline-xl">Sized for your operations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="pricing-card bg-white p-10 rounded-3xl border border-outline-variant/10 shadow-sm flex flex-col justify-between transition-all duration-400">
              <div>
                <h3 className="font-headline-lg text-[24px] mb-2">Developer</h3>
                <p className="font-body-md text-text-muted mb-6">Perfect for staging & small team experiments.</p>
                <p className="font-stat-display text-stat-display text-primary mb-6">$0 <span className="text-[16px] font-normal text-text-muted">/ month</span></p>
                <ul className="space-y-4 mb-8 text-body-md text-text-main">
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> Up to 5 projects
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> 5,000 API requests/mo
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> Community support
                  </li>
                </ul>
              </div>
              <button className="w-full bg-surface-mint text-primary py-3 rounded-full font-bold hover:bg-primary hover:text-on-primary transition-all">Get Started</button>
            </div>
            {/* Growth Plan */}
            <div className="pricing-card bg-white p-10 rounded-3xl border-2 border-accent-green shadow-md flex flex-col justify-between relative transition-all duration-400">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-accent-green text-white px-4 py-1 rounded-full text-xs font-bold font-label-caps tracking-wider">Popular</div>
              <div>
                <h3 className="font-headline-lg text-[24px] mb-2">Growth</h3>
                <p className="font-body-md text-text-muted mb-6">For scaling engineering organizations.</p>
                <p className="font-stat-display text-stat-display text-primary mb-6">$499 <span className="text-[16px] font-normal text-text-muted">/ month</span></p>
                <ul className="space-y-4 mb-8 text-body-md text-text-main">
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> Unlimited projects
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> Real-time compliance reporting
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> 100,000 API requests/mo
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> 24/7 Email & Slack support
                  </li>
                </ul>
              </div>
              <button className="w-full bg-primary text-on-primary py-3 rounded-full font-bold hover:bg-opacity-90 transition-all">Start Free Trial</button>
            </div>
            {/* Enterprise Plan */}
            <div className="pricing-card bg-white p-10 rounded-3xl border border-outline-variant/10 shadow-sm flex flex-col justify-between transition-all duration-400">
              <div>
                <h3 className="font-headline-lg text-[24px] mb-2">Enterprise</h3>
                <p className="font-body-md text-text-muted mb-6">Custom architecture for global supply chains.</p>
                <p className="font-stat-display text-stat-display text-primary mb-6">Custom</p>
                <ul className="space-y-4 mb-8 text-body-md text-text-main">
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> Dedicated compliance officer
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> Unlimited API volume
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> Custom integrations & SLA
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-accent-green">check</span> Zero-carbon consulting included
                  </li>
                </ul>
              </div>
              <button className="w-full bg-surface-mint text-primary py-3 rounded-full font-bold hover:bg-primary hover:text-on-primary transition-all" onClick={(e) => handleNavClick(e, '#contact')}>Contact Sales</button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-grid-margin py-section-gap-desktop max-w-4xl mx-auto">
          <h2 className="gsap-title font-headline-xl text-headline-xl mb-16 text-center">Frequently asked questions</h2>
          <div className="space-y-0 divide-y divide-outline-variant/20">
            {/* FAQ 1 */}
            <div className={`group py-6 ${openFaq === 1 ? 'open' : ''}`}>
              <button className="w-full flex justify-between items-center text-left cursor-pointer" onClick={() => toggleFaq(1)}>
                <h4 className="font-headline-lg text-[22px]">Is my data secure with ZeroCarbon?</h4>
                <span className={`material-symbols-outlined transition-transform duration-300 ${openFaq === 1 ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === 1 ? 'max-h-40 mt-4' : 'max-h-0'}`}>
                <p className="font-body-md text-text-muted">Yes. ZeroCarbon MCP uses enterprise-grade AES-256 encryption and is SOC2 Type II compliant. We never train our AI on your sensitive financial or infrastructure data.</p>
              </div>
            </div>
            {/* FAQ 2 */}
            <div className={`group py-6 ${openFaq === 2 ? 'open' : ''}`}>
              <button className="w-full flex justify-between items-center text-left cursor-pointer" onClick={() => toggleFaq(2)}>
                <h4 className="font-headline-lg text-[22px]">Which cloud providers do you support?</h4>
                <span className={`material-symbols-outlined transition-transform duration-300 ${openFaq === 2 ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === 2 ? 'max-h-40 mt-4' : 'max-h-0'}`}>
                <p className="font-body-md text-text-muted">We offer native integrations for AWS, Google Cloud, and Microsoft Azure, along with generic webhooks for private data centers.</p>
              </div>
            </div>
            {/* FAQ 3 */}
            <div className={`group py-6 border-b border-outline-variant/20 ${openFaq === 3 ? 'open' : ''}`}>
              <button className="w-full flex justify-between items-center text-left cursor-pointer" onClick={() => toggleFaq(3)}>
                <h4 className="font-headline-lg text-[22px]">Can it handle Scope 3 emissions?</h4>
                <span className={`material-symbols-outlined transition-transform duration-300 ${openFaq === 3 ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === 3 ? 'max-h-40 mt-4' : 'max-h-0'}`}>
                <p className="font-body-md text-text-muted">Absolutely. Scope 3 is our specialty. Our AI engine scans purchase orders and supply chain contracts to automatically categorize and calculate indirect emissions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="contact" className="px-grid-margin py-section-gap-desktop">
          <div className="bg-primary text-on-primary rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBePr2E7EDaeuOTgkBstVxeaD7kEbSc3jTtQo8MtS06eSACutQ8BleHLS3U144QmfxR9iiz6gZpVrrmqFHekjyzAVw6OuzvtjncyRhYNSx2SLRUMZBMk-pPZn4BnHNE__wf9012x0xTHs0FE2TScdd35OCDIGLdW26GKfutb1vwJJ_WbAh8iKwX7VzVJx7nL9ple2U0I-ltJS47FS4woYcmLIe6-06EajLMSYm4BD-EmmLxeiKLWrg" />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto space-y-12">
              <h2 className="gsap-title font-display-lg text-display-lg max-md:text-headline-xl">Bring carbon intelligence back into your workflow.</h2>
              <p className="font-body-xl text-body-xl opacity-80">Join 200+ sustainable engineering teams reducing their compliance load by 60%.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-surface-mint text-primary px-12 py-6 rounded-full font-body-md text-body-md font-bold hover:bg-white transition-all shadow-2xl" onClick={(e) => handleNavClick(e, '#contact')}>
                  Request Demo
                </button>
                <button className="bg-transparent border border-white/30 text-white px-12 py-6 rounded-full font-body-md text-body-md font-bold hover:bg-white/10 transition-all">
                  Read Documentation
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface-mint py-20 px-grid-margin">
        <div className="max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1 space-y-6">
            <div className="font-headline-lg text-[24px] font-bold text-primary">ZeroCarbon MCP</div>
            <p className="font-body-md text-text-muted">The AI-native OS for sustainable engineering teams.</p>
          </div>
          <div>
            <p className="font-label-caps text-primary mb-6">Product</p>
            <ul className="space-y-4">
              <li><a className="text-body-md text-text-muted hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleNavClick(e, '#features')}>Solutions</a></li>
              <li><a className="text-body-md text-text-muted hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleNavClick(e, '#architecture')}>Architecture</a></li>
              <li><a className="text-body-md text-text-muted hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleNavClick(e, '#pricing')}>Pricing</a></li>
            </ul>
          </div>
          <div>
            <p className="font-label-caps text-primary mb-6">Resources</p>
            <ul className="space-y-4">
              <li><a className="text-body-md text-text-muted hover:text-primary transition-colors" href="#">Documentation</a></li>
              <li><a className="text-body-md text-text-muted hover:text-primary transition-colors" href="#">API Reference</a></li>
              <li><a className="text-body-md text-text-muted hover:text-primary transition-colors" href="#">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <p className="font-label-caps text-primary mb-6">Legal</p>
            <ul className="space-y-4">
              <li><a className="text-body-md text-text-muted hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="text-body-md text-text-muted hover:text-primary transition-colors" href="#">Terms of Service</a></li>
              <li><a className="text-body-md text-text-muted hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleNavClick(e, '#faq')}>FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-container-max mx-auto mt-20 pt-10 border-t border-outline-variant/30 flex justify-between items-center text-body-md text-text-muted">
          <p>© 2024 ZeroCarbon MCP. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">public</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">terminal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
