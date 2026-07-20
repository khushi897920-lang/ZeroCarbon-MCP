"use client";

import React, { useState } from "react";

export interface DocsContentProps {
  activeSectionId: string;
  onCopy: (text: string, id: string) => void;
  copiedTextId: string | null;
}

export function DocsContent({
  activeSectionId,
  onCopy,
  copiedTextId,
}: DocsContentProps) {
  // Global state for active code block language
  const [activeLang, setActiveLang] = useState<"curl" | "js" | "py" | "go">("curl");

  // Mock code examples for Quick Start
  const installCode = {
    curl: `curl -sSL https://get.zerocarbon.dev | sh`,
    js: `npm install @zerocarbon/mcp-server`,
    py: `pip install zerocarbon-mcp`,
    go: `go get github.com/zerocarbon-mcp/go-sdk`,
  };

  const initCode = {
    curl: `curl -X POST https://api.zerocarbon.dev/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"apiKey": "zc_live_8f3a..."}'`,
    js: `import { ZeroCarbonClient } from "@zerocarbon/mcp-server";

const client = new ZeroCarbonClient({
  apiKey: "zc_live_8f3a...",
  environment: "production"
});`,
    py: `from zerocarbon import ZeroCarbonClient

client = ZeroCarbonClient(
    api_key="zc_live_8f3a...",
    environment="production"
)`,
    go: `package main

import "github.com/zerocarbon-mcp/go-sdk/client"

func main() {
    zc := client.NewClient("zc_live_8f3a...", "production")
}`,
  };

  return (
    <div className="w-full space-y-16 pb-24 text-[#333] dark:text-[#E2E8F0]">
      
      {/* ---------------- SECTION 1: INTRODUCTION ---------------- */}
      <section id="introduction" className="scroll-mt-24 space-y-6">
        <h1 className="font-display-lg text-3xl sm:text-4xl font-bold tracking-tight text-neutral-800 dark:text-text-main">
          ZeroCarbon Developer Docs
        </h1>
        <p className="font-body-md text-sm sm:text-base text-text-muted leading-relaxed">
          Welcome to the developer portal for ZeroCarbon. ZeroCarbon is the first AI-native carbon ledger operating system powered by the **Model Context Protocol (MCP)**. Our platform enables sustainability teams and software engineers to stitch telemetry streams directly into LLM agent interfaces (Claude, ChatGPT, Cursor) for automated carbon tracking, compliance reporting, and real-time calculations.
        </p>

        {/* Tip Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-mint/50 dark:bg-surface-container-low/50 border border-accent-green/10 flex items-start gap-4 shadow-sm backdrop-blur-md">
          <span className="material-symbols-outlined text-accent-green text-[22px] shrink-0 mt-0.5 select-none">
            lightbulb
          </span>
          <div>
            <h5 className="text-xs font-bold text-neutral-800 dark:text-text-main">
              New to MCP?
            </h5>
            <p className="text-xs text-text-muted mt-1 leading-relaxed">
              Model Context Protocol (MCP) is an open standard that allows LLMs to query external databases and run tools securely. Connecting our server enables your AI agents to call real-time carbon auditing tools immediately.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 2: QUICK START ---------------- */}
      <section id="quickstart" className="scroll-mt-24 space-y-6">
        <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-2">
          Quick Start Guide
        </h2>
        <p className="font-body-md text-xs sm:text-sm text-text-muted leading-relaxed">
          Set up ZeroCarbon and connect it to your workspace in under 5 minutes.
        </p>

        {/* Code Tabs Section */}
        <div className="rounded-2xl border border-neutral-200/60 dark:border-outline-variant/15 overflow-hidden shadow-sm bg-white dark:bg-surface-container">
          {/* Header Tab List */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-50/70 dark:bg-surface-container-low border-b border-neutral-200/50 dark:border-outline-variant/10 select-none">
            <div className="flex items-center gap-1">
              {(["curl", "js", "py", "go"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all duration-200 cursor-pointer ${
                    activeLang === lang
                      ? "bg-accent-green text-white shadow-sm"
                      : "text-neutral-500 hover:text-neutral-700 dark:text-text-muted dark:hover:text-text-main"
                  }`}
                >
                  {lang === "curl" ? "cURL" : lang === "js" ? "JS" : lang === "py" ? "Python" : "Go"}
                </button>
              ))}
            </div>
            {/* Copy button */}
            <button
              onClick={() => onCopy(installCode[activeLang], "install")}
              className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-100 dark:border-outline-variant/15 dark:hover:bg-surface-mint/15 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-neutral-500">
                {copiedTextId === "install" ? "done" : "content_copy"}
              </span>
            </button>
          </div>
          {/* Code Area */}
          <div className="p-5 overflow-x-auto bg-transparent">
            <pre className="font-mono text-xs text-accent-green leading-relaxed">
              {installCode[activeLang]}
            </pre>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 3: AUTHENTICATION ---------------- */}
      <section id="authentication" className="scroll-mt-24 space-y-6">
        <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-2">
          Authentication
        </h2>
        <p className="font-body-md text-xs sm:text-sm text-text-muted leading-relaxed">
          ZeroCarbon API requires a bearer API Key to authenticate requests. Do not share your keys or commit them directly to public repositories.
        </p>

        {/* Alert Callout */}
        <div className="p-4 sm:p-5 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-start gap-4 shadow-sm">
          <span className="material-symbols-outlined text-red-500 text-[22px] shrink-0 mt-0.5 select-none">
            warning
          </span>
          <div>
            <h5 className="text-xs font-bold text-red-700 dark:text-red-400">
              Never share credentials
            </h5>
            <p className="text-xs text-red-600/80 dark:text-red-300 mt-1 leading-relaxed">
              Store your secret tokens in environment files (`.env`) and inject them securely into your production containers.
            </p>
          </div>
        </div>

        {/* Initialization Code Tabs */}
        <div className="rounded-2xl border border-neutral-200/60 dark:border-outline-variant/15 overflow-hidden shadow-sm bg-white dark:bg-surface-container">
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-50/70 dark:bg-surface-container-low border-b border-neutral-200/50 dark:border-outline-variant/10 select-none">
            <div className="flex items-center gap-1">
              {(["curl", "js", "py", "go"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all duration-200 cursor-pointer ${
                    activeLang === lang
                      ? "bg-accent-green text-white shadow-sm"
                      : "text-neutral-500 hover:text-neutral-700 dark:text-text-muted dark:hover:text-text-main"
                  }`}
                >
                  {lang === "curl" ? "cURL" : lang === "js" ? "JS" : lang === "py" ? "Python" : "Go"}
                </button>
              ))}
            </div>
            <button
              onClick={() => onCopy(initCode[activeLang], "init")}
              className="p-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-100 dark:border-outline-variant/15 dark:hover:bg-surface-mint/15 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-neutral-500">
                {copiedTextId === "init" ? "done" : "content_copy"}
              </span>
            </button>
          </div>
          <div className="p-5 overflow-x-auto bg-transparent">
            <pre className="font-mono text-xs text-accent-green leading-relaxed">
              {initCode[activeLang]}
            </pre>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 4: INGEST TELEMETRY ---------------- */}
      <section id="ingest-telemetry" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-neutral-100 dark:border-outline-variant/10 pb-2">
          <span className="px-2.5 py-1 text-[10px] font-bold rounded bg-blue-500/10 text-blue-500 border border-blue-500/10 flex items-center select-none uppercase tracking-wider self-start sm:self-center">
            POST
          </span>
          <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main">
            Ingest Telemetry Data
          </h2>
        </div>
        
        <p className="font-body-md text-xs sm:text-sm text-text-muted leading-relaxed">
          Stream raw emission triggers, IoT power ratings, or supply chain factors into the ledger DB.
        </p>

        {/* API Path Box */}
        <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-surface-container-low border border-neutral-200 dark:border-outline-variant/15 flex items-center gap-2">
          <code className="text-xs text-neutral-700 dark:text-text-muted font-mono break-all select-all flex-1">
            https://api.zerocarbon.dev/v1/telemetry/ingest
          </code>
        </div>

        {/* Parameters Grid */}
        <div className="space-y-4">
          <h4 className="font-display-md text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-text-muted">
            Request Body Parameters
          </h4>

          <div className="border border-neutral-200/60 dark:border-outline-variant/15 rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-[1fr_1.5fr] gap-4 p-4 bg-neutral-50/70 dark:bg-surface-container-low border-b border-neutral-200/50 dark:border-outline-variant/10 text-[10px] font-bold uppercase text-neutral-400 dark:text-text-muted tracking-wide">
              <div>Parameter</div>
              <div>Description</div>
            </div>

            <div className="divide-y divide-neutral-150 dark:divide-outline-variant/10 text-xs leading-relaxed">
              <div className="grid grid-cols-[1fr_1.5fr] gap-4 p-4">
                <div>
                  <code className="font-mono text-accent-green font-bold">sourceId</code>
                  <span className="block text-[10px] text-red-500 font-semibold mt-0.5">Required</span>
                </div>
                <div className="text-text-muted">
                  Unique identifier of the ingestion sensor or IoT node.
                </div>
              </div>

              <div className="grid grid-cols-[1fr_1.5fr] gap-4 p-4">
                <div>
                  <code className="font-mono text-accent-green font-bold">valueKw</code>
                  <span className="block text-[10px] text-red-500 font-semibold mt-0.5">Required</span>
                </div>
                <div className="text-text-muted">
                  Power consumption measured in kilowatts (kW).
                </div>
              </div>

              <div className="grid grid-cols-[1fr_1.5fr] gap-4 p-4">
                <div>
                  <code className="font-mono text-accent-green font-bold">timestamp</code>
                  <span className="block text-[10px] text-neutral-400 font-semibold mt-0.5">Optional</span>
                </div>
                <div className="text-text-muted">
                  ISO 8601 formatted ingestion timestamp. Defaults to server local epoch.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 5: EMISSION FACTORS ---------------- */}
      <section id="emission-factors" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-neutral-100 dark:border-outline-variant/10 pb-2">
          <span className="px-2.5 py-1 text-[10px] font-bold rounded bg-green-500/10 text-green-500 border border-green-500/10 flex items-center select-none uppercase tracking-wider self-start sm:self-center">
            GET
          </span>
          <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main">
            Fetch Emission Factors
          </h2>
        </div>
        
        <p className="font-body-md text-xs sm:text-sm text-text-muted leading-relaxed">
          Query regional, product line, or supply chain conversion values from USLCI, DEFRA, or global standards.
        </p>

        <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-surface-container-low border border-neutral-200 dark:border-outline-variant/15 flex items-center gap-2">
          <code className="text-xs text-neutral-700 dark:text-text-muted font-mono break-all select-all flex-1">
            https://api.zerocarbon.dev/v1/factors/query?region=US-EAST
          </code>
        </div>
      </section>

    </div>
  );
}
export default DocsContent;
