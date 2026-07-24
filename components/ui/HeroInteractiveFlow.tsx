"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

// --- PRE-SEEDED MOCK DATA FOR ENTERPRISE CARBON INTELLIGENCE ---
interface Metric {
  label: string;
  value: string;
  trend?: string;
  trendColor?: string;
}

interface AgentResponse {
  query: string;
  responseTitle: string;
  metrics: Metric[];
  alertText?: string;
  summaryText: string;
}

const MOCK_AGENT_DATA: Record<string, AgentResponse> = {
  CBAM: {
    query: "Calculate CBAM carbon price exposure for Q3 steel imports.",
    responseTitle: "EU CBAM Exposure Audit (Q3)",
    metrics: [
      { label: "Import Volume", value: "14,250 tonnes", trend: "Steel & Al", trendColor: "text-text-muted" },
      { label: "Embedded Carbon", value: "26,362 tCO2e", trend: "+4.2% QoQ", trendColor: "text-red-600" },
      { label: "Certificate Cost", value: "€1,845,340", trend: "Est. @ €90/t", trendColor: "text-accent-green" }
    ],
    alertText: "⚠️ Risk: Supplier 'Huanan Steel' exceeds EU carbon intensity benchmark by 18%.",
    summaryText: "CBAM exposure calculated. Suggest shifting 15% of allocation to low-carbon suppliers to reduce carbon tariff liabilities by €270k."
  },
  "GHG Protocol": {
    query: "Audit corporate greenhouse gas emissions inventory by Scope.",
    responseTitle: "GHG Protocol Corporate Footprint",
    metrics: [
      { label: "Scope 1 (Direct)", value: "2,450 tCO2e", trend: "-2.1% YoY", trendColor: "text-accent-green" },
      { label: "Scope 2 (Indirect)", value: "4,120 tCO2e", trend: "Grid Intensity", trendColor: "text-text-muted" },
      { label: "Scope 3 (Value Chain)", value: "18,920 tCO2e", trend: "+12.4% YoY", trendColor: "text-red-600" }
    ],
    summaryText: "Footprint audit complete. Scope 3 transport logistics remains the primary emissions driver, accounting for 74.2% of corporate footprint."
  },
  CDP: {
    query: "Analyze CDP Climate Change score gaps.",
    responseTitle: "CDP Climate Disclosure Gap Audit",
    metrics: [
      { label: "Target Grade", value: "A (Leadership)", trend: "Current: A-", trendColor: "text-accent-green" },
      { label: "Section Completion", value: "88%", trend: "11/13 Completed", trendColor: "text-text-muted" },
      { label: "Primary Risk", value: "Water Stress", trend: "Scope 3 Supply", trendColor: "text-red-600" }
    ],
    summaryText: "To reach A grade, expand disclosure section C4.2 (Targets) with science-based net-zero trajectories aligned with 1.5°C limits."
  },
  CSRD: {
    query: "Draft CSRD ESRS E1 Climate double materiality assessment.",
    responseTitle: "CSRD Double Materiality - ESRS E1",
    metrics: [
      { label: "Impact Materiality", value: "High (9.2/10)", trend: "Decarbonization", trendColor: "text-accent-green" },
      { label: "Financial Materiality", value: "High (8.4/10)", trend: "Carbon Pricing", trendColor: "text-red-600" },
      { label: "Audit Readiness", value: "96.4%", trend: "CSRD Aligned", trendColor: "text-accent-green" }
    ],
    alertText: "⚠️ Gap: Scope 3 Category 11 (Use of sold products) lacks primary supplier telemetry.",
    summaryText: "ESRS E1 materiality matrix completed. Recommended action: Ingest live telemetry for product line 'MCP Router v2'."
  },
  "ISO 14083": {
    query: "Verify logistics emissions compliance with ISO 14083.",
    responseTitle: "Logistics Carbon Accounting - ISO 14083",
    metrics: [
      { label: "Audited Shipments", value: "8,940 runs", trend: "100% Tracked", trendColor: "text-accent-green" },
      { label: "Cargo Intensity", value: "48 gCO2e/t-km", trend: "-5.8% YoY", trendColor: "text-accent-green" },
      { label: "Compliance Status", value: "Verified", trend: "SGS Audited", trendColor: "text-accent-green" }
    ],
    summaryText: "Logistics emissions factors mapped from primary telematics. Calculated gross ton-kilometer loads align with ISO 14083 auditing."
  },
  "EU Taxonomy": {
    query: "Calculate EU Taxonomy Alignment for capital expenditures.",
    responseTitle: "EU Taxonomy Capex Alignment",
    metrics: [
      { label: "Taxonomy Eligible", value: "72.4%", trend: "€42.4M Capex", trendColor: "text-text-muted" },
      { label: "Taxonomy Aligned", value: "48.2%", trend: "DNSH Verified", trendColor: "text-accent-green" },
      { label: "Alignment Gap", value: "24.2%", trend: "Contrib. Check", trendColor: "text-red-600" }
    ],
    summaryText: "Taxonomy compliance assessment complete. 48.2% of operations meet green criteria. 24.2% gap is due to missing supplier EPDs."
  },
  LCA: {
    query: "Generate cradle-to-grave Lifecycle Assessment for hardware.",
    responseTitle: "LCA Lifecycle Audit: MCP Hub v4",
    metrics: [
      { label: "Lifecycle Impact", value: "46.2 kgCO2e", trend: "Cradle-to-Grave", trendColor: "text-text-muted" },
      { label: "Manufacturing", value: "78.4%", trend: "Semiconductors", trendColor: "text-red-600" },
      { label: "Recyclability", value: "92.1%", trend: "Circular Design", trendColor: "text-accent-green" }
    ],
    summaryText: "Lifecycle Assessment complete. Sourcing recycled aluminum casings for MCP Hub v4 will reduce cradle-to-gate impact by 14.8%."
  },
  BRSR: {
    query: "Format BRSR Core Principle 6 environmental disclosures.",
    responseTitle: "SEBI BRSR Core Principles Disclosures",
    metrics: [
      { label: "Disclosures Done", value: "9 / 9 Principles", trend: "100% Compliant", trendColor: "text-accent-green" },
      { label: "Scope 3 Reported", value: "Yes", trend: "Verified Supply", trendColor: "text-accent-green" },
      { label: "Assurance Level", value: "Reasonable", trend: "Third-Party", trendColor: "text-accent-green" }
    ],
    summaryText: "Principle 6 formatted in standard XBRL schema. Ready for submission to Indian stock exchanges (BSE & NSE)."
  },
  "Bill of Lading": {
    query: "Extract carbon logistics data from shipping Bill of Lading.",
    responseTitle: "Bill of Lading Telemetry Extraction",
    metrics: [
      { label: "Parsed Documents", value: "142 Bills", trend: "OCR Clean", trendColor: "text-accent-green" },
      { label: "Gross Weight", value: "8,940 tonnes", trend: "Verified Gross", trendColor: "text-text-muted" },
      { label: "Logistics Carbon", value: "412 tCO2e", trend: "EcoTransit API", trendColor: "text-accent-green" }
    ],
    summaryText: "Extracted cargo weights and port-pairs from shipping PDFs. Mapped cargo parameters to compute logistics carbon loads."
  },
  SBTi: {
    query: "Audit SBTi Net-Zero alignment path progress.",
    responseTitle: "SBTi Net-Zero Target Tracker",
    metrics: [
      { label: "Target Reduction", value: "-46% by 2030", trend: "SBTi Approved", trendColor: "text-accent-green" },
      { label: "Current Progress", value: "-22.4%", trend: "On Trajectory", trendColor: "text-accent-green" },
      { label: "Offset Credit Use", value: "0.0%", trend: "Direct Only", trendColor: "text-text-muted" }
    ],
    summaryText: "SBTi target trajectory audit complete. Current annual reduction rate is 4.8%, aligning with the 1.5°C net-zero pathway."
  },
  CUSTOM: {
    query: "",
    responseTitle: "AI Carbon Audit Report",
    metrics: [
      { label: "Query Context", value: "Custom Ingest", trend: "Resolved", trendColor: "text-accent-green" },
      { label: "Data Quality", value: "98.2%", trend: "Audited", trendColor: "text-accent-green" },
      { label: "LEDGER Log", value: "Immutable", trend: "Timestamped", trendColor: "text-accent-green" }
    ],
    summaryText: "Query processed by ZeroCarbon Agent. Carbon factors matched against IPCC and GHG Protocol databases. Records written to ledger."
  }
};

// --- CHIPS DEFINITION WITH RELEVANT SVG ICONS ---
interface SuggestionChip {
  id: string;
  label: string;
  iconPath: string;
}

const SUGGESTION_CHIPS: SuggestionChip[] = [
  {
    id: "CBAM",
    label: "CBAM",
    iconPath: "M12 2L2 22h20L12 2zm0 4l6 12H6l6-12zm-1 8h2v2h-2v-2zm0-4h2v3h-2V10z"
  },
  {
    id: "GHG Protocol",
    label: "GHG Protocol",
    iconPath: "M12 3a9 9 0 00-9 9 9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9zm-1 14.5v-2h2v2h-2zm2-4.5H11v-4h2v4z"
  },
  {
    id: "CDP",
    label: "CDP",
    iconPath: "M19.36 10.04a6 6 0 00-11.32 0 4.5 4.5 0 00.32 8.96h11a4.5 4.5 0 000-9z"
  },
  {
    id: "CSRD",
    label: "CSRD",
    iconPath: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2zm0 8H7v-2h10v2z"
  },
  {
    id: "ISO 14083",
    label: "ISO 14083",
    iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z"
  },
  {
    id: "EU Taxonomy",
    label: "EU Taxonomy",
    iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
  },
  {
    id: "LCA",
    label: "LCA",
    iconPath: "M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"
  },
  {
    id: "BRSR",
    label: "BRSR",
    iconPath: "M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"
  },
  {
    id: "Bill of Lading",
    label: "Bill of Lading",
    iconPath: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
  },
  {
    id: "SBTi",
    label: "SBTi",
    iconPath: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"
  }
];

// --- ONBOARDING CARDS DEFINITIONS ---
interface OnboardingCard {
  id: string;
  label: string;
  chipId: string;
}

const ONBOARDING_CARDS: OnboardingCard[] = [
  { id: "csrd", label: "Generate a CSRD report", chipId: "CSRD" },
  { id: "scope3", label: "Calculate Scope 3 emissions", chipId: "GHG Protocol" },
  { id: "cbam", label: "Check CBAM compliance", chipId: "CBAM" },
  { id: "suppliers", label: "Analyze supplier emissions", chipId: "LCA" }
];

export default function HeroInteractiveFlow({ containerHeight }: { containerHeight: number }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);
  const [inputText, setInputText] = useState("");
  const [activeQuery, setActiveQuery] = useState<string | null>(null);

  // Interactive animation states
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  // Focus caret simulation
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Dynamic keystroke typing simulation
  const handleChipClick = (chipKey: string) => {
    if (isTyping || isThinking) return;

    setShowOutput(false);
    setActiveQuery(chipKey);
    setIsTyping(true);
    setInputText("");

    const fullText = MOCK_AGENT_DATA[chipKey].query;
    let currentText = "";
    let charIdx = 0;

    const timer = setInterval(() => {
      if (charIdx < fullText.length) {
        currentText += fullText.charAt(charIdx);
        setInputText(currentText);
        charIdx++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
        setIsThinking(true);

        // Simulate thinking delay
        setTimeout(() => {
          setIsThinking(false);
          setShowOutput(true);
        }, 1100);
      }
    }, 18);
  };

  // Submission handler
  const handleSend = () => {
    if (!inputText.trim() || isTyping || isThinking) return;

    setShowOutput(false);
    setIsThinking(true);

    const matchedKey = Object.keys(MOCK_AGENT_DATA).find((key) =>
      inputText.toLowerCase().includes(key.toLowerCase())
    );

    setTimeout(() => {
      setIsThinking(false);
      if (matchedKey) {
        setActiveQuery(matchedKey);
      } else {
        setActiveQuery("CUSTOM");
      }
      setShowOutput(true);
    }, 1100);
  };

  const handleClear = () => {
    setInputText("");
    setShowOutput(false);
    setActiveQuery(null);
  };

  // Floating background particles config
  const particles = [
    { x: "18%", y: "25%", size: 4, delay: 0 },
    { x: "82%", y: "18%", size: 5, delay: 1.5 },
    { x: "32%", y: "78%", size: 3, delay: 2.2 },
    { x: "68%", y: "82%", size: 4, delay: 0.8 },
    { x: "48%", y: "42%", size: 4, delay: 3.1 },
    { x: "22%", y: "82%", size: 3, delay: 1.9 },
    { x: "78%", y: "68%", size: 4, delay: 2.7 }
  ];

  if (!mounted) {
    return (
      <div
        className="w-full bg-surface-mint/35 animate-pulse rounded-[28px]"
        style={{
          height: `${containerHeight * 0.9}px`,
          marginTop: `${containerHeight * 0.1}px`
        }}
      />
    );
  }

  const selectedResponse = activeQuery ? MOCK_AGENT_DATA[activeQuery] : null;

  return (
    <div
      className="w-full relative overflow-hidden rounded-[28px] border select-none flex flex-col justify-between p-6 sm:p-7 transition-all duration-250"
      style={{
        height: `${containerHeight * 0.9}px`,
        marginTop: `${containerHeight * 0.1}px`,
        backgroundColor: isDark ? "rgba(18, 28, 23, 0.85)" : "rgba(218, 226, 222, 0.82)",
        borderColor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.85)",
        boxShadow: isDark
          ? "0 0 0 1.5px rgba(255, 255, 255, 0.25), 0 0 20px 1px rgba(255, 255, 255, 0.12), 0 25px 60px rgba(0, 0, 0, 0.4)"
          : "0 0 0 1.5px rgba(255, 255, 255, 0.9), 0 0 16px 2px rgba(255, 255, 255, 0.6), 0 25px 60px rgba(15, 23, 42, 0.08)"
      }}
    >
      {/* Layer 20: Subtle Inner Border for Glowing boundary */}
      <div
        className="absolute inset-0 rounded-[28px] border pointer-events-none z-20"
        style={{ borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.45)" }}
      />

      {/* Background radial soft green glow & light grid overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft top-left reflection highlight */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-white/20 to-transparent pointer-events-none z-1" />

        {/* Faint bottom-right reflection highlight */}
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-white/10 to-transparent pointer-events-none z-1" />

        {/* Breathing radial mint gradient glow (top-right focused) */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.25, 0.4, 0.25]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-12 -right-12 w-[280px] h-[280px] rounded-full bg-accent-green/5 blur-[50px]"
        />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.012] bg-[radial-gradient(transparent_50%,black_100%),repeating-radial-gradient(circle,black,white_2px)] pointer-events-none" />

        {/* Dot grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,70,45,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,70,45,0.01)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(circle_at_center,black_75%,transparent_100%)]" />

        {/* Lightweight floating background particles */}
        {particles.map((p, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0.08, y: 0 }}
            animate={{
              y: [-8, 8, -8],
              opacity: [0.08, 0.16, 0.08]
            }}
            transition={{
              duration: 6.5 + idx * 1.2,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut"
            }}
            className="absolute rounded-full bg-accent-green/8"
            style={{
              left: p.x,
              top: p.y,
              width: `${p.size}px`,
              height: `${p.size}px`
            }}
          />
        ))}
      </div>

      {/* --- LAYER 1: GLASS HEADER --- */}
      <div
        className="relative z-10 w-full flex items-center justify-between border-b pb-4 mb-2 px-3 bg-transparent"
        style={{ borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(220, 220, 220, 0.6)" }}
      >
        <div className="flex items-center gap-3.5">
          {/* Glowing AI Leaf Icon in rounded white square */}
          <div className="p-2 rounded-xl bg-white dark:bg-surface-container border border-neutral-200/50 dark:border-outline-variant/15 flex items-center justify-center relative shadow-sm">
            <svg className="w-4.5 h-4.5 text-accent-green" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 2H21V6C21 13 14 20 6 20H2V16C2 8 9 2 17 2Z" />
            </svg>
            <span className="absolute -inset-0.5 rounded-xl border border-accent-green/10 animate-pulse" />
          </div>
          <div>
            <h3 className="font-display-md text-[14px] sm:text-[15.5px] font-bold text-text-main leading-tight">
              ZeroCarbon AI
            </h3>
            <p className="font-body-md text-[10.5px] sm:text-xs text-text-muted tracking-wide font-medium">
              Carbon Agent
            </p>
          </div>
        </div>

        {/* Pulsing AI Online Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-surface-container border border-neutral-200/55 dark:border-outline-variant/15 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
          </span>
          <span className="font-body-md text-[10px] sm:text-xs font-semibold text-accent-green tracking-wider">
            AI Online
          </span>
        </div>
      </div>

      {/* --- LAYER 2: INTERACTIVE OUTPUT / ONBOARDING VIEW --- */}
      <div className="relative z-10 flex-1 my-2 overflow-y-auto pr-1">
        <AnimatePresence mode="wait">
          {isThinking ? (
            <motion.div
              key="thinking"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col items-center justify-center gap-3.5 text-center"
            >
              {/* Glowing animated scanner node */}
              <div className="relative flex items-center justify-center h-12 w-12 rounded-full border border-accent-green/20 bg-white shadow-sm">
                <svg className="w-5 h-5 text-accent-green animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
                <span className="absolute -inset-2 rounded-full border border-accent-green/10 animate-ping" />
              </div>
              <div>
                <p className="font-body-md text-xs sm:text-sm font-semibold text-text-main">
                  Auditing emissions datasets...
                </p>
                <p className="font-body-md text-[10px] sm:text-xs text-text-muted mt-1">
                  Querying database parameters
                </p>
              </div>
            </motion.div>
          ) : showOutput && selectedResponse ? (
            <motion.div
              key="output"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full space-y-4 py-1"
            >
              {/* Structured Audit Card */}
              <div 
                className="p-4 sm:p-5 rounded-2xl border bg-[#FAFAFA] dark:bg-surface-container-low/55 shadow-[0_12px_32px_rgba(22,101,52,0.02)]"
                style={{ borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(220, 220, 220, 0.5)" }}
              >
                <div 
                  className="flex items-center justify-between border-b pb-3 mb-3.5"
                  style={{ borderColor: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(220, 220, 220, 0.4)" }}
                >
                  <h4 className="font-display-md text-xs sm:text-sm font-bold text-text-main flex items-center gap-1.5">
                    <svg className="w-4.5 h-4.5 text-accent-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4M7.8 21H16.2C19.5 21 21 19.5 21 16.2V7.8C21 4.5 19.5 3 16.2 3H7.8C4.5 3 3 4.5 3 7.8V16.2C3 19.5 4.5 21 7.8 21Z" />
                    </svg>
                    {selectedResponse.responseTitle}
                  </h4>
                  <button 
                    onClick={handleClear} 
                    className="text-[10px] sm:text-xs text-accent-green font-semibold hover:underline cursor-pointer flex items-center gap-1.5"
                    aria-label="Clear audit results"
                  >
                    Clear Audit
                  </button>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2.5 mb-3.5">
                  {selectedResponse.metrics.map((metric, mIdx) => (
                    <div 
                      key={mIdx} 
                      className="p-2.5 sm:p-3 rounded-xl border bg-[#F5F5F5] dark:bg-surface-container-low/40 shadow-sm"
                      style={{ borderColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(220, 220, 220, 0.5)" }}
                    >
                      <p className="text-[9px] sm:text-[10px] text-text-muted tracking-wider truncate uppercase font-semibold">
                        {metric.label}
                      </p>
                      <p className="mt-1.5 text-xs sm:text-sm font-bold text-text-main truncate">
                        {metric.value}
                      </p>
                      {metric.trend && (
                        <p className={`mt-0.5 text-[8.5px] sm:text-[9px] font-semibold ${metric.trendColor}`}>
                          {metric.trend}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Alert/Warning Area */}
                {selectedResponse.alertText && (
                  <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10 text-[10px] sm:text-xs text-red-600 dark:text-red-400 mb-3.5 leading-relaxed font-semibold">
                    {selectedResponse.alertText}
                  </div>
                )}

                {/* Summary Audit Explanation */}
                <p className="text-[11px] sm:text-xs text-text-muted leading-relaxed font-body-md">
                  {selectedResponse.summaryText}
                </p>

                {/* Action controls */}
                <div 
                  className="flex items-center gap-2 mt-4 pt-3 border-t"
                  style={{ borderColor: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(220, 220, 220, 0.4)" }}
                >
                  <button 
                    className="px-3 py-1.5 rounded-lg border text-[9px] sm:text-[10px] font-bold text-text-muted bg-white/70 dark:bg-surface-container-low/60 hover:bg-neutral-50 dark:hover:bg-surface-mint/15 transition-colors cursor-pointer"
                    style={{ borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(220, 220, 220, 0.7)" }}
                  >
                    Export Audit E1 PDF
                  </button>
                  <button className="px-3 py-1.5 rounded-lg border border-accent-green/20 text-[9px] sm:text-[10px] font-bold text-accent-green bg-accent-green/5 hover:bg-accent-green/10 transition-colors cursor-pointer">
                    Commit to Ledger DB
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col justify-start pt-5"
            >
              {/* Premium Heading */}
              <div className="flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-accent-green/5 border border-accent-green/10 self-start">
                <span className="text-[12px] text-accent-green">✨</span>
                <span className="text-[10px] sm:text-[11px] font-bold text-accent-green tracking-wider uppercase">
                  Ask your carbon agent anything
                </span>
              </div>

              <p className="font-body-md text-[11.5px] sm:text-[12px] text-text-muted max-w-sm mb-5 leading-relaxed text-left">
                Audit emissions footprints, calculate logistics carbon factors, or draft CSRD/CBAM declarations.
              </p>

              {/* Onboarding Action Cards Grid */}
              <div className="grid grid-cols-2 gap-2.5 w-full max-w-md">
                {ONBOARDING_CARDS.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => handleChipClick(card.chipId)}
                    className="p-3 rounded-xl border bg-[#FAFAFA] dark:bg-surface-container-low/40 text-left transition-all duration-250 cursor-pointer group flex flex-col justify-between min-h-[76px] hover:bg-white dark:hover:bg-surface-mint/10 hover:border-accent-green hover:shadow-[0_8px_30px_rgba(15,23,42,0.05)] hover:-translate-y-[3px]"
                    style={{ borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(220, 220, 220, 0.7)" }}
                  >
                    <span className="text-text-main font-body-md text-[11px] font-bold leading-normal">
                      {card.label}
                    </span>
                    <span className="text-[9px] text-text-muted font-body-md mt-1.5 flex items-center gap-1 group-hover:text-accent-green transition-colors">
                      Run Audit &rarr;
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- LAYER 3: INTERACTIVE CHIPS & INPUT --- */}
      <div className="relative z-10 space-y-6 w-full pt-1.5">

        {/* Input box: ChatGPT/Claude style White Elevated Card container */}
        <div
          className={`relative bg-[#FCFCFC] border rounded-[24px] p-6 pr-16 shadow-[0_8px_30px_rgba(15,23,42,0.05)] flex items-center transition-all duration-250 ${isFocused
            ? "border-accent-green ring-4 ring-accent-green/5 shadow-md"
            : "border-neutral-200"
            }`}
          style={{ borderColor: isFocused ? "" : isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(220, 220, 220, 0.7)" }}
        >
          {/* Main prompt input */}
          <textarea
            ref={textareaRef}
            rows={2}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping || isThinking}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask anything about your carbon data, compliance, or sustainability strategy..."
            className="w-full bg-transparent outline-none resize-none font-body-md text-xs sm:text-sm text-text-main placeholder-[#9CA3AF] pr-2 focus:outline-none leading-relaxed align-middle"
          />

          {/* Blink caret simulation inside input when focused and empty */}
          {isFocused && !inputText && (
            <span className="absolute left-[25px] top-[26px] w-0.5 h-4.5 bg-accent-green/60 animate-ping pointer-events-none" />
          )}

          {/* Circular Send Button overlapping input slightly inside wrapper */}
          <motion.button
            onClick={handleSend}
            disabled={!inputText.trim() || isTyping || isThinking}
            whileHover={{ scale: 1.05, boxShadow: "0 0 12px rgba(46, 92, 68, 0.25)" }}
            whileTap={{ scale: 0.95 }}
            className={`absolute right-4 bottom-4 w-9 h-9 rounded-full cursor-pointer flex items-center justify-center transition-all duration-250 ${inputText.trim() && !isTyping && !isThinking
              ? "bg-accent-green text-white"
              : "bg-surface-mint text-text-muted/30 pointer-events-none"
              }`}
          >
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Suggestion Section: TRY ASKING label + Chips (Only shown when not showing output results) */}
        {!showOutput && !isThinking && (
          <div className="space-y-3.5 pt-1.5">
            <h5 className="font-body-md text-[10px] font-bold text-[#9CA3AF] tracking-[0.16em] uppercase text-left px-0.5">
              TRY ASKING
            </h5>

            {/* Suggestion Chips */}
            <div className="w-full flex flex-wrap gap-2.5 justify-start">
              {SUGGESTION_CHIPS.map((chip) => (
                <motion.button
                  key={chip.id}
                  onClick={() => handleChipClick(chip.id)}
                  disabled={isTyping || isThinking}
                  whileHover={{ y: -1.5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-3.5 py-1.5 rounded-full border flex items-center gap-1.5 cursor-pointer shadow-sm select-none text-[10.5px] sm:text-xs font-semibold tracking-wide transition-all duration-250 ${activeQuery === chip.id
                    ? "bg-accent-green text-white border-transparent font-bold z-15"
                    : "bg-[#F8F8F8] dark:bg-surface-container-low/40 border-neutral-200 dark:border-outline-variant/15 text-text-muted hover:shadow-[0_4px_12px_rgba(22,101,52,0.02)] hover:bg-[#22c55e]/6 hover:text-accent-green hover:border-accent-green"
                    }`}
                >
                  {/* Dynamic SVG chip icon */}
                  <svg className="w-3.5 h-3.5 text-accent-green/70 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d={chip.iconPath} />
                  </svg>
                  <span>{chip.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
