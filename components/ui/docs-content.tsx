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

  // Active tab for local MCP agent connection instructions
  const [activeMcpTab, setActiveMcpTab] = useState<"claude" | "cursor" | "claude-code" | "gemini" | "api">("claude");

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
        <div className="rounded-2xl border border-neutral-800 overflow-hidden shadow-sm bg-[#0B0F0D]">
          {/* Header Tab List */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#121815] border-b border-neutral-800 select-none">
            <div className="flex items-center gap-1">
              {(["curl", "js", "py", "go"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all duration-200 cursor-pointer ${
                    activeLang === lang
                      ? "bg-accent-green text-white shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {lang === "curl" ? "cURL" : lang === "js" ? "JS" : lang === "py" ? "Python" : "Go"}
                </button>
              ))}
            </div>
            {/* Copy button */}
            <button
              onClick={() => onCopy(installCode[activeLang], "install")}
              className="p-1.5 rounded-lg border border-neutral-700 bg-[#161F1A] hover:bg-[#1E2B24] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copiedTextId === "install" ? "done" : "content_copy"}
              </span>
            </button>
          </div>
          {/* Code Area */}
          <div className="p-5 overflow-x-auto bg-[#0A0E0C]">
            <pre className="font-mono text-xs text-emerald-400 leading-relaxed select-all">
              {installCode[activeLang]}
            </pre>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 2.5: CONNECT AI AGENT (MCP) ---------------- */}
      <section id="mcp-connection" className="scroll-mt-24 space-y-6">
        <h2 className="font-display-md text-2xl font-bold tracking-tight text-neutral-800 dark:text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-2">
          Connect AI Agent (MCP)
        </h2>
        <p className="font-body-md text-xs sm:text-sm text-text-muted leading-relaxed">
          ZeroCarbon runs as a standard Model Context Protocol (MCP) server. You can connect it directly to your local developer workspace and AI tools.
        </p>

        {/* Step 1 Card */}
        <div className="bg-step-bg border border-accent-green-text/15 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-text-main flex items-center gap-2">
              Step 1: Download MCP Bridge Client Script
              <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-badge-bg text-accent-green-text border border-accent-green-text/10">
                REQUIRED
              </span>
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Download <code className="font-mono text-accent-green-text font-bold">zerocarbon-mcp-client.js</code> and save it to a folder on your computer (e.g., <code className="font-mono bg-code-inline-bg px-1 py-0.5 rounded text-code-inline-text font-semibold">C:\\mcp\\zerocarbon-mcp-client.js</code> or <code className="font-mono bg-code-inline-bg px-1 py-0.5 rounded text-code-inline-text font-semibold">~/mcp/zerocarbon-mcp-client.js</code>).
            </p>
          </div>
          <a
            href="/zerocarbon-mcp-client.js"
            download="zerocarbon-mcp-client.js"
            className="bg-[#00875A] hover:bg-[#006C48] text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-sm shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">download</span>
            Download Script (.js)
          </a>
        </div>

        {/* 4 Steps Instructions */}
        <div className="border border-outline-variant/40 p-5 rounded-2xl space-y-3 bg-instructions-bg">
          <h4 className="text-xs font-bold text-text-main flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-accent-green-text">
              assignment
            </span>
            How to Connect Your AI Agent (4 Steps):
          </h4>
          <ol className="list-decimal list-inside text-xs text-text-muted space-y-2 leading-relaxed pl-1">
            <li>
              <span className="font-bold text-text-main pl-1">Download:</span> Click the button above to download <code className="font-mono text-accent-green-text font-bold">zerocarbon-mcp-client.js</code> to your local machine.
            </li>
            <li>
              <span className="font-bold text-text-main pl-1">Node.js Requirement:</span> Ensure Node.js (v18+) is installed on your machine (<code className="font-mono bg-code-inline-bg px-1 rounded text-code-inline-text">node -v</code>).
            </li>
            <li>
              <span className="font-bold text-text-main pl-1">Select AI Editor below:</span> Choose your platform tab below (Claude Desktop, Cursor, Claude Code, Gemini CLI) and copy the configuration.
            </li>
            <li>
              <span className="font-bold text-text-main pl-1">Set File Path:</span> In your AI editor configuration, replace <code className="font-mono text-accent-green-text font-bold">/path/to/zerocarbon-mcp-client.js</code> with the actual file path where you saved the downloaded script.
            </li>
          </ol>
        </div>

        {/* Horizontal Tab Navigation in Docs */}
        <div className="rounded-2xl border border-neutral-800 overflow-hidden shadow-sm bg-[#0B0F0D]">
          <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#121815] border-b border-neutral-800 select-none overflow-x-auto">
            {[
              { id: "claude", label: "Claude Desktop" },
              { id: "cursor", label: "Cursor IDE" },
              { id: "claude-code", label: "Claude Code" },
              { id: "gemini", label: "Gemini / CLIs" },
              { id: "api", label: "API / cURL" },
            ].map((tab) => {
              const isActive = activeMcpTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveMcpTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all duration-200 cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-accent-green text-white shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-6 space-y-4 bg-[#0A0E0C]">
            {activeMcpTab === "claude" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-zinc-100">
                    1. Locate Claude Desktop config file:
                  </p>
                  <ul className="list-disc list-inside text-xs text-zinc-300 space-y-1.5 pl-1 leading-relaxed">
                    <li>
                      Windows: <code className="font-mono bg-[#161F1A] px-1.5 py-0.5 rounded text-emerald-400 font-semibold">%APPDATA%\\Claude\\claude_desktop_config.json</code>
                    </li>
                    <li>
                      macOS: <code className="font-mono bg-[#161F1A] px-1.5 py-0.5 rounded text-emerald-400 font-semibold">~/Library/Application Support/Claude/claude_desktop_config.json</code>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-zinc-100">
                      2. Paste this configuration into the file:
                    </p>
                    <button
                      onClick={() => onCopy(`{\\n  "mcpServers": {\\n    "zerocarbon-mcp": {\\n      "command": "node",\\n      "args": [\\n        "/path/to/zerocarbon-mcp-client.js"\\n      ],\\n      "env": {\\n        "ZEROCARBON_API_KEY": "zc_test_f079482xxxxxxxxxxxxxxxxxxxxxxxx",\\n        "ZEROCARBON_API_URL": "https://zerocarbon-mcp.onrender.com/api/v1/mcp"\\n      }\\n    }\\n  }\\n}`, "docs-claude-json")}
                      className="p-1.5 rounded-lg border border-neutral-700 bg-[#161F1A] hover:bg-[#1E2B24] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer shrink-0"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {copiedTextId === "docs-claude-json" ? "done" : "content_copy"}
                      </span>
                    </button>
                  </div>
                  <pre className="text-xs font-mono p-4 bg-[#050706] text-zinc-100 border border-neutral-850 rounded-xl overflow-x-auto leading-relaxed select-all">
{`{
  `}<span className="text-teal-400">"mcpServers"</span>{`: {
    `}<span className="text-teal-400">"zerocarbon-mcp"</span>{`: {
      `}<span className="text-teal-400">"command"</span>{`: `}<span className="text-amber-200">"node"</span>{`,
      `}<span className="text-teal-400">"args"</span>{`: [
        `}<span className="text-amber-200">"/path/to/zerocarbon-mcp-client.js"</span>{`
      ],
      `}<span className="text-teal-400">"env"</span>{`: {
        `}<span className="text-teal-400">"ZEROCARBON_API_KEY"</span>{`: `}<span className="text-amber-200">"zc_test_f079482xxxxxxxxxxxxxxxxxxxxxxxx"</span>{`,
        `}<span className="text-teal-400">"ZEROCARBON_API_URL"</span>{`: `}<span className="text-amber-200">"https://zerocarbon-mcp.onrender.com/api/v1/mcp"</span>{`
      }
    }
  }
}`}
                  </pre>
                </div>
              </div>
            )}

            {activeMcpTab === "cursor" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-zinc-100">
                    1. Open Cursor Settings:
                  </p>
                  <p className="text-xs text-zinc-300">
                    Navigate to <span className="font-semibold text-emerald-400">Settings &rarr; Features &rarr; MCP</span> and click <span className="font-semibold text-emerald-400">+ Add New MCP Server</span>.
                  </p>
                </div>

                <div className="grid gap-3">
                  {[
                    { label: "SERVER NAME", value: "ZeroCarbon", id: "docs-cursor-name" },
                    { label: "TYPE", value: "command", id: "docs-cursor-type", noCopy: true },
                    { label: "COMMAND", value: "node", id: "docs-cursor-cmd" },
                    { label: "ARGUMENTS (JSON STRING)", value: "/path/to/zerocarbon-mcp-client.js", id: "docs-cursor-args" },
                    { label: "ENVIRONMENT VARIABLES (ENV)", value: "ZEROCARBON_API_KEY = zc_2a982b2b0xxxxxxxxxxxxxxxxxxxxxxxx ZEROCARBON_API_URL = https://zerocarbon-mcp.onrender.com/api/v1/mcp", id: "docs-cursor-env" },
                  ].map((field) => (
                    <div key={field.label} className="p-4 bg-[#0C120F] border border-neutral-800 rounded-xl flex items-center justify-between gap-4">
                      <div className="space-y-1 min-w-0 flex-1">
                        <p className="text-[10px] font-bold text-zinc-500 tracking-wider">
                          {field.label}
                        </p>
                        <p className="font-mono text-xs font-bold text-zinc-200 break-all select-all leading-normal">
                          {field.value === "ZEROCARBON_API_KEY = zc_2a982b2b0xxxxxxxxxxxxxxxxxxxxxxxx ZEROCARBON_API_URL = https://zerocarbon-mcp.onrender.com/api/v1/mcp" ? (
                            <>
                              <span className="text-teal-400 font-bold">ZEROCARBON_API_KEY</span>=<span className="text-amber-200">"zc_2a982b2b0xxxxxxxxxxxxxxxxxxxxxxxx"</span>
                              <br />
                              <span className="text-teal-400 font-bold">ZEROCARBON_API_URL</span>=<span className="text-amber-200">"https://zerocarbon-mcp.onrender.com/api/v1/mcp"</span>
                            </>
                          ) : field.value}
                        </p>
                      </div>
                      {!field.noCopy && (
                        <button
                          onClick={() => onCopy(field.value, field.id)}
                          className="p-1.5 rounded-lg border border-neutral-700 bg-[#161F1A] hover:bg-[#1E2B24] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer shrink-0"
                        >
                          <span className="material-symbols-outlined text-[16px] text-neutral-500">
                            {copiedTextId === field.id ? "done" : "content_copy"}
                          </span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeMcpTab === "claude-code" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-zinc-100">
                      Install via Claude CLI:
                    </p>
                    <button
                      onClick={() => onCopy(`claude mcp add zerocarbon node /path/to/zerocarbon-mcp-client.js --env ZEROCARBON_API_KEY=zc_2a982b2b0xxxxxxxxxxxxxxxxxxxxxxxx ZEROCARBON_API_URL=https://zerocarbon-mcp.onrender.com/api/v1/mcp`, "docs-claude-code-cli")}
                      className="p-1.5 rounded-lg border border-neutral-700 bg-[#161F1A] hover:bg-[#1E2B24] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer shrink-0"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {copiedTextId === "docs-claude-code-cli" ? "done" : "content_copy"}
                      </span>
                    </button>
                  </div>
                  <p className="text-xs text-zinc-300 mb-2">
                    Run the following command directly inside your terminal window to bind ZeroCarbon:
                  </p>
                  <pre className="text-xs font-mono p-4 bg-[#050706] text-zinc-100 border border-neutral-850 rounded-xl overflow-x-auto whitespace-pre-wrap break-all pr-12 leading-relaxed select-all">
                    <span className="text-emerald-400 font-semibold">claude mcp add</span> zerocarbon node <span className="text-amber-200">/path/to/zerocarbon-mcp-client.js</span> --env <span className="text-teal-300">ZEROCARBON_API_KEY</span>=zc_2a982b2b0xxxxxxxxxxxxxxxxxxxxxxxx <span className="text-teal-300">ZEROCARBON_API_URL</span>=https://zerocarbon-mcp.onrender.com/api/v1/mcp
                  </pre>
                </div>
              </div>
            )}

            {activeMcpTab === "gemini" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-zinc-100">
                      Launch with Local Environment Settings:
                    </p>
                    <button
                      onClick={() => onCopy(`$env:ZEROCARBON_API_KEY="zc_2a982b2b0xxxxxxxxxxxxxxxxxxxxxxxx"; $env:ZEROCARBON_API_URL="https://zerocarbon-mcp.onrender.com/api/v1/mcp"\n\nexport ZEROCARBON_API_KEY="zc_2a982b2b0xxxxxxxxxxxxxxxxxxxxxxxx"\nexport ZEROCARBON_API_URL="https://zerocarbon-mcp.onrender.com/api/v1/mcp"\nnode /path/to/zerocarbon-mcp-client.js`, "docs-gemini-cli")}
                      className="p-1.5 rounded-lg border border-neutral-700 bg-[#161F1A] hover:bg-[#1E2B24] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer shrink-0"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {copiedTextId === "docs-gemini-cli" ? "done" : "content_copy"}
                      </span>
                    </button>
                  </div>
                  <p className="text-xs text-zinc-300 mb-2">
                    Execute the command line below directly in your CLI tool terminal (e.g. Gemini Code Assist CLI, mcp-cli):
                  </p>
                  <pre className="text-xs font-mono p-4 bg-[#050706] text-zinc-100 border border-neutral-850 rounded-xl overflow-x-auto leading-relaxed select-all">
                    <span className="text-zinc-500 italic font-semibold"># Windows Powershell</span>{`
`}<span className="text-teal-300">$env:ZEROCARBON_API_KEY</span>{`=`}<span className="text-amber-200">"zc_2a982b2b0xxxxxxxxxxxxxxxxxxxxxxxx"</span>{`; `}<span className="text-teal-300">$env:ZEROCARBON_API_URL</span>{`=`}<span className="text-amber-200">"https://zerocarbon-mcp.onrender.com/api/v1/mcp"</span>{`

`}<span className="text-zinc-500 italic font-semibold"># macOS / Linux</span>{`
`}<span className="text-emerald-400 font-semibold">export</span>{` `}<span className="text-teal-300">ZEROCARBON_API_KEY</span>{`=`}<span className="text-amber-200">"zc_2a982b2b0xxxxxxxxxxxxxxxxxxxxxxxx"</span>{`
`}<span className="text-emerald-400 font-semibold">export</span>{` `}<span className="text-teal-300">ZEROCARBON_API_URL</span>{`=`}<span className="text-amber-200">"https://zerocarbon-mcp.onrender.com/api/v1/mcp"</span>{`
`}<span className="text-emerald-400 font-semibold">node</span>{` /path/to/zerocarbon-mcp-client.js`}
                  </pre>
                </div>
              </div>
            )}

            {activeMcpTab === "api" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-zinc-100">
                      List Available Tools (cURL):
                    </p>
                    <button
                      onClick={() => onCopy(`curl -X POST \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer zc_2a982b2b0xxxxxxxxxxxxxxxxxxxxxxxx" \\\n  -d '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' \\\n  https://zerocarbon-mcp.onrender.com/api/v1/mcp`, "docs-api-curl")}
                      className="p-1.5 rounded-lg border border-neutral-700 bg-[#161F1A] hover:bg-[#1E2B24] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer shrink-0"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {copiedTextId === "docs-api-curl" ? "done" : "content_copy"}
                      </span>
                    </button>
                  </div>
                  <p className="text-xs text-zinc-300 mb-2">
                    Execute tools manually using JSON-RPC requests via HTTP POST:
                  </p>
                  <pre className="text-xs font-mono p-4 bg-[#050706] text-zinc-100 border border-neutral-855 rounded-xl overflow-x-auto font-mono leading-relaxed select-all">
                    <span className="text-emerald-400 font-semibold">curl</span> -X POST \{`
  `}-H <span className="text-amber-200">"Content-Type: application/json"</span> \{`
  `}-H <span className="text-amber-200">"Authorization: Bearer zc_2a982b2b0xxxxxxxxxxxxxxxxxxxxxxxx"</span> \{`
  `}-d <span className="text-emerald-400 font-semibold">{"'{"}</span><span className="text-teal-300">"jsonrpc"</span>: <span className="text-amber-200">"2.0"</span>, <span className="text-teal-300">"id"</span>: 1, <span className="text-teal-300">"method"</span>: <span className="text-amber-200">"tools/list"</span><span className="text-emerald-400 font-semibold">{"}'"}</span> \{`
  `}<span className="text-amber-200">https://zerocarbon-mcp.onrender.com/api/v1/mcp</span>
                  </pre>
                </div>

                <div className="space-y-2 mt-4 pt-4 border-t border-neutral-800">
                  <p className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-accent-green">
                      chat_bubble
                    </span>
                    TEST DISCOVERY PROMPT:
                  </p>
                  <div className="flex items-start gap-2 p-3 bg-accent-green/5 border border-accent-green/10 rounded-xl bg-[#050706]">
                    <p className="text-xs text-zinc-300 italic flex-1 leading-relaxed">
                      "Describe what tools you offer from ZeroCarbon and list my latest audit records summary."
                    </p>
                    <button
                      onClick={() => onCopy("Describe what tools you offer from ZeroCarbon and list my latest audit records summary.", "docs-api-prompt")}
                      className="p-1.5 rounded-lg border border-accent-green/20 bg-[#161F1A] hover:bg-[#1E2B24] text-emerald-400 transition-colors cursor-pointer shrink-0"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {copiedTextId === "docs-api-prompt" ? "done" : "content_copy"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
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
        <div className="rounded-2xl border border-neutral-800 overflow-hidden shadow-sm bg-[#0B0F0D]">
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#121815] border-b border-neutral-800 select-none">
            <div className="flex items-center gap-1">
              {(["curl", "js", "py", "go"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all duration-200 cursor-pointer ${
                    activeLang === lang
                      ? "bg-accent-green text-white shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {lang === "curl" ? "cURL" : lang === "js" ? "JS" : lang === "py" ? "Python" : "Go"}
                </button>
              ))}
            </div>
            <button
              onClick={() => onCopy(initCode[activeLang], "init")}
              className="p-1.5 rounded-lg border border-neutral-700 bg-[#161F1A] hover:bg-[#1E2B24] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copiedTextId === "init" ? "done" : "content_copy"}
              </span>
            </button>
          </div>
          <div className="p-5 overflow-x-auto bg-[#0A0E0C]">
            {activeLang === "curl" && (
              <pre className="font-mono text-xs text-zinc-100 leading-relaxed select-all">
                <span className="text-emerald-400 font-semibold">curl</span> -X POST https://api.zerocarbon.dev/v1/auth/login \{`
  `}-H <span className="text-amber-200">"Content-Type: application/json"</span> \{`
  `}-d <span className="text-emerald-400 font-semibold">{"'{"}</span><span className="text-teal-300">"apiKey"</span>: <span className="text-amber-200">"zc_live_8f3a..."</span><span className="text-emerald-400 font-semibold">{"}'"}</span>
              </pre>
            )}
            {activeLang === "js" && (
              <pre className="font-mono text-xs text-zinc-100 leading-relaxed select-all">
                <span className="text-emerald-400 font-semibold">import</span> {`{ ZeroCarbonClient } `}<span className="text-emerald-400 font-semibold">from</span>{` `}<span className="text-amber-200">"@zerocarbon/mcp-server"</span>{`;

`}<span className="text-emerald-400 font-semibold">const</span>{` client = `}<span className="text-emerald-400 font-semibold">new</span>{` `}<span className="text-teal-300">ZeroCarbonClient</span>{`({
  apiKey: `}<span className="text-amber-200">"zc_live_8f3a..."</span>{`,
  environment: `}<span className="text-amber-200">"production"</span>{`
});`}
              </pre>
            )}
            {activeLang === "py" && (
              <pre className="font-mono text-xs text-zinc-100 leading-relaxed select-all">
                <span className="text-emerald-400 font-semibold">from</span>{` zerocarbon `}<span className="text-emerald-400 font-semibold">import</span>{` ZeroCarbonClient

client = `}<span className="text-teal-300">ZeroCarbonClient</span>{`(
    api_key=`}<span className="text-amber-200">"zc_live_8f3a..."</span>{`,
    environment=`}<span className="text-amber-200">"production"</span>{`
)`}
              </pre>
            )}
            {activeLang === "go" && (
              <pre className="font-mono text-xs text-zinc-100 leading-relaxed select-all">
                <span className="text-emerald-400 font-semibold">package</span>{` main

`}<span className="text-emerald-400 font-semibold">import</span>{` `}<span className="text-amber-200">"github.com/zerocarbon-mcp/go-sdk/client"</span>{`

`}<span className="text-emerald-400 font-semibold">func</span>{` `}<span className="text-teal-300">main</span>{`() {
    zc := client.`}<span className="text-teal-300">NewClient</span>{`(`}<span className="text-amber-200">"zc_live_8f3a..."</span>{`, `}<span className="text-amber-200">"production"</span>{`)
}`}
              </pre>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 3.5: AI DEVELOPER GUIDE ---------------- */}
      <section id="ai-guide" className="scroll-mt-24 space-y-6">
        <h2 className="font-display-md text-2xl font-bold tracking-tight text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-2">
          AI Developer Guide
        </h2>
        <p className="font-body-md text-xs sm:text-sm text-text-muted leading-relaxed">
          This context guide helps AI agents (like Claude Desktop, Cursor, Gemini) quickly understand the structure, schemas, and endpoints of your ZeroCarbon installation.
        </p>

        <div className="p-4 sm:p-5 rounded-2xl border border-outline-variant/40 bg-instructions-bg space-y-4">
          <h4 className="text-xs font-bold text-text-main flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-accent-green-text">
              smart_toy
            </span>
            AI Integration Context
          </h4>
          <p className="text-xs text-text-muted leading-relaxed">
            ZeroCarbon utilizes an ultra-condensed guide for future AI agents to quickly understand the structure, data models, and logic of the ZeroCarbon project without needing to blindly search the entire repository. You can copy the guide configuration or download the full guide below:
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/zerocarbon-ai-guide.md"
              download="zerocarbon-ai-guide.md"
              className="bg-[#00875A] hover:bg-[#006C48] text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">download</span>
              Download AI_GUIDE.md
            </a>
            <button
              onClick={() => onCopy(
                `# ZeroCarbon Core Stack\n- Framework: Next.js 15.5.12\n- Database: PostgreSQL (Neon + Prisma ORM)\n- Payments: Dodo Payments (MoR)\n- AI/LLM: Gemini 2.5\n- Vector: pgvector`,
                "docs-ai-guide-snippet"
              )}
              className="border border-outline-variant/40 bg-surface hover:bg-instructions-bg text-text-main px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">
                {copiedTextId === "docs-ai-guide-snippet" ? "done" : "content_copy"}
              </span>
              Copy Core Snippet
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-text-main">AI Engine Integration Properties</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-4 border border-outline-variant/30 bg-instructions-bg rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-accent-green-text tracking-wider uppercase">ReAct Reasoning Loop</span>
              <p className="text-xs text-text-muted leading-relaxed">
                Loops up to 10 times to let the LLM autonomously decide which carbon estimation and auditing tools to trigger sequentially.
              </p>
            </div>
            <div className="p-4 border border-outline-variant/30 bg-instructions-bg rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-accent-green-text tracking-wider uppercase">Self-Healing Backend</span>
              <p className="text-xs text-text-muted leading-relaxed">
                If the AI triggers a database or tool exception, the backend catches it and feeds the raw log back to the LLM to rewrite parameters.
              </p>
            </div>
          </div>
        </div>

        {/* SDK Tabs */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-text-main">Advanced SDK Integrations</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-text-main">Python SDK v3 Usage:</h4>
                <button
                  onClick={() => onCopy(
                    `from zerocarbon import ZeroCarbon, ActivityBuilder\n\nclient = ZeroCarbon(api_key="zc_live_...", environment="production")\nbuilder = ActivityBuilder(org_id="your_org")\n\nactivity = builder.electricity(\n    kwh=1500,\n    period="2026-02",\n    location={"country": "IN", "state": "MH"},\n    source={"type": "meter", "confidence": 0.95}\n)\n\nresult = client.activities.ingest([activity])\nprint(f"Confidence: {result['data']['activities'][0]['confidence']['overall']}%")`,
                    "docs-sdk-py"
                  )}
                  className="p-1.5 rounded-lg border border-neutral-700 bg-[#161F1A] hover:bg-[#1E2B24] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copiedTextId === "docs-sdk-py" ? "done" : "content_copy"}
                  </span>
                </button>
              </div>
              <pre className="text-xs font-mono p-4 bg-[#0A0E0C] text-zinc-100 border border-neutral-800 rounded-xl overflow-x-auto leading-relaxed select-all">
                <span className="text-emerald-400">from</span> zerocarbon <span className="text-emerald-400">import</span> ZeroCarbon, ActivityBuilder<br />
                <br />
                client = <span className="text-teal-300">ZeroCarbon</span>(api_key=<span className="text-amber-200">"zc_live_..."</span>, environment=<span className="text-amber-200">"production"</span>)<br />
                builder = <span className="text-teal-300">ActivityBuilder</span>(org_id=<span className="text-amber-200">"your_org"</span>)<br />
                <br />
                activity = builder.<span className="text-teal-300">electricity</span>(<br />
                &nbsp;&nbsp;&nbsp;&nbsp;kwh=<span className="text-amber-200">1500</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;period=<span className="text-amber-200">"2026-02"</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;location={"{"}<span className="text-teal-400">"country"</span>: <span className="text-amber-200">"IN"</span>, <span className="text-teal-400">"state"</span>: <span className="text-amber-200">"MH"</span>{"}"},<br />
                &nbsp;&nbsp;&nbsp;&nbsp;source={"{"}<span className="text-teal-400">"type"</span>: <span className="text-amber-200">"meter"</span>, <span className="text-teal-400">"confidence"</span>: <span className="text-amber-200">0.95</span>{"}"}<br />
                )<br />
                <br />
                result = client.activities.<span className="text-teal-300">ingest</span>([activity])<br />
                <span className="text-emerald-400">print</span>(f<span className="text-amber-200">{"\"Confidence: {result['data']['activities'][0]['confidence']['overall']}%\""}</span>)
              </pre>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-text-main">Node.js SDK v3 Usage:</h4>
                <button
                  onClick={() => onCopy(
                    `import { ZeroCarbon } from 'zerocarbon-nodejs-sdk';\n\nconst client = new ZeroCarbon({\n  apiKey: 'zc_live_...',\n  retryConfig: { maxRetries: 3, retryDelay: 1000 }\n});\n\nconst activity = client.activities.electricity({\n  kwh: 1500,\n  period: '2026-02',\n  location: { country: 'IN', state: 'MH' }\n});\n\nconst result = await client.activities.ingest({ activities: [activity] });`,
                    "docs-sdk-node"
                  )}
                  className="p-1.5 rounded-lg border border-neutral-700 bg-[#161F1A] hover:bg-[#1E2B24] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copiedTextId === "docs-sdk-node" ? "done" : "content_copy"}
                  </span>
                </button>
              </div>
              <pre className="text-xs font-mono p-4 bg-[#0A0E0C] text-zinc-100 border border-neutral-800 rounded-xl overflow-x-auto leading-relaxed select-all">
                <span className="text-emerald-400">import</span> {`{ ZeroCarbon }`} <span className="text-emerald-400">from</span> <span className="text-amber-200">'zerocarbon-nodejs-sdk'</span>;<br />
                <br />
                <span className="text-emerald-400">const</span> client = <span className="text-emerald-400">new</span> <span className="text-teal-300">ZeroCarbon</span>({"{"}<br />
                &nbsp;&nbsp;apiKey: <span className="text-amber-200">'zc_live_...'</span>,<br />
                &nbsp;&nbsp;retryConfig: {"{ maxRetries: 3, retryDelay: 1000 }"}<br />
                {"});"}<br />
                <br />
                <span className="text-emerald-400">const</span> activity = client.activities.<span className="text-teal-300">electricity</span>({"{"}<br />
                &nbsp;&nbsp;kwh: <span className="text-amber-200">1500</span>,<br />
                &nbsp;&nbsp;period: <span className="text-amber-200">'2026-02'</span>,<br />
                &nbsp;&nbsp;location: {"{ country: 'IN', state: 'MH' }"}<br />
                {"});"}<br />
                <br />
                <span className="text-emerald-400">const</span> result = <span className="text-emerald-400">await</span> client.activities.<span className="text-teal-300">ingest</span>({"{"} activities: [activity] {"}"});
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 3.6: CANONICAL ACTIVITY MODEL ---------------- */}
      <section id="canonical-model" className="scroll-mt-24 space-y-6">
        <h2 className="font-display-md text-2xl font-bold tracking-tight text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-2">
          Canonical Activity Model
        </h2>
        <p className="font-body-md text-xs sm:text-sm text-text-muted leading-relaxed">
          ZeroCarbon relies on a single canonical activity model. All carbon activities ingested across the organization are validated against this strict structure.
        </p>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-text-main">Standardized Fields</h3>
          <div className="border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-[1fr_2fr] gap-4 p-4 bg-instructions-bg border-b border-outline-variant/20 text-[10px] font-bold uppercase text-text-muted tracking-wide">
              <div>Field Name</div>
              <div>Type & Validation Description</div>
            </div>
            <div className="divide-y divide-outline-variant/10 text-xs leading-relaxed">
              {[
                { name: "activity_type", desc: "String (e.g. 'electricity', 'fuel', 'shipping'). Maps to standard emission categories." },
                { name: "scope", desc: "Integer [1, 2, 3]. Automatically validated based on the activity type." },
                { name: "quantity", desc: "Float. The actual magnitude of the activity (must be positive)." },
                { name: "unit", desc: "String. Standardized measurement unit (e.g., 'kwh', 'liters', 'km', 'kg')." },
                { name: "location", desc: "Object. Contains country and subdivision/state codes for regional grid factors." },
                { name: "idempotency_key", desc: "SHA-256 string. Prevents duplicate ledger entries from bulk AI uploads." },
              ].map((field) => (
                <div key={field.name} className="grid grid-cols-[1fr_2fr] gap-4 p-4 text-text-muted">
                  <div>
                    <code className="font-mono text-accent-green-text font-bold">{field.name}</code>
                  </div>
                  <div>{field.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 3.7: CONFIDENCE SCORING SYSTEM ---------------- */}
      <section id="confidence-scoring" className="scroll-mt-24 space-y-6">
        <h2 className="font-display-md text-2xl font-bold tracking-tight text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-2">
          Confidence Scoring System
        </h2>
        <p className="font-body-md text-xs sm:text-sm text-text-muted leading-relaxed">
          Every emission calculation is graded dynamically using a 5-factor weighted algorithm to quantify data reliability.
        </p>

        <div className="border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-[1.5fr_1fr_3.5fr] gap-4 p-4 bg-instructions-bg border-b border-outline-variant/20 text-[10px] font-bold uppercase text-text-muted tracking-wide">
            <div>Factor</div>
            <div>Weight</div>
            <div>Scoring Protocol</div>
          </div>
          <div className="divide-y divide-outline-variant/10 text-xs leading-relaxed text-text-muted">
            {[
              { factor: "Source Quality", weight: "25%", desc: "Direct Utility Meter (95%) > Ingested API (90%) > Supplier Invoice (80%) > Manual Log (70%) > Regional Estimate (50%)" },
              { factor: "Data Completeness", weight: "25%", desc: "Checks for non-empty optional parameters and rich context metadata variables." },
              { factor: "Emission Factor Quality", weight: "20%", desc: "Regional factors mapped dynamically (e.g. eGRID) > national averages > global default conversion rates." },
              { factor: "Temporal Accuracy", weight: "15%", desc: "Real-time automated sync > daily batch feeds > monthly utilities bills > annualized estimates." },
              { factor: "Methodological Rigor", weight: "15%", desc: "Rigor calculated based on GHG Protocol Tiers (Tier 4 direct reporting down to Tier 1 emissions activity estimates)." },
            ].map((row) => (
              <div key={row.factor} className="grid grid-cols-[1.5fr_1fr_3.5fr] gap-4 p-4">
                <div className="font-bold text-text-main">{row.factor}</div>
                <div className="font-semibold text-accent-green-text">{row.weight}</div>
                <div>{row.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 3.8: CARBON LEDGER & BOOKKEEPING ---------------- */}
      <section id="carbon-ledger" className="scroll-mt-24 space-y-6">
        <h2 className="font-display-md text-2xl font-bold tracking-tight text-text-main border-b border-neutral-100 dark:border-outline-variant/10 pb-2">
          Carbon Ledger (Double-Entry Bookkeeping)
        </h2>
        <p className="font-body-md text-xs sm:text-sm text-text-muted leading-relaxed">
          ZeroCarbon implements accounting-grade double-entry bookkeeping to track Scope 1, 2, and 3 activities. This ensures auditable balance checks for compliance reports.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-4 bg-step-bg border border-accent-green-text/10 rounded-xl space-y-1">
            <h5 className="text-xs font-bold text-text-main">Audit Trail</h5>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Every document uploaded or ingested logs the exact AI Agent or User ID responsible to generate tamper-proof reports.
            </p>
          </div>
          <div className="p-4 bg-step-bg border border-accent-green-text/10 rounded-xl space-y-1">
            <h5 className="text-xs font-bold text-text-main">RAG Vector Search</h5>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Integrates Neon's `pgvector` index to semantically retrieve invoices, fuel receipts, and utility bills instantly during carbon audits.
            </p>
          </div>
          <div className="p-4 bg-step-bg border border-accent-green-text/10 rounded-xl space-y-1">
            <h5 className="text-xs font-bold text-text-main">Ledger Segregation</h5>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Ledger transactions support segregation of emissions: `emission_add`, `emission_reduce`, `offset_purchase`, and `offset_retire`.
            </p>
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
        <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-surface-container-low border border-neutral-200/80 dark:border-outline-variant/15 flex items-center gap-2">
          <code className="text-xs text-neutral-800 dark:text-zinc-200 font-mono break-all select-all flex-1">
            https://api.zerocarbon.dev/v1/telemetry/ingest
          </code>
        </div>

        {/* Parameters Grid */}
        <div className="space-y-4">
          <h4 className="font-display-md text-xs font-bold uppercase tracking-wider text-neutral-550 dark:text-text-muted">
            Request Body Parameters
          </h4>

          <div className="border border-neutral-200/60 dark:border-outline-variant/15 rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-[1fr_1.5fr] gap-4 p-4 bg-neutral-50/70 dark:bg-surface-container-low border-b border-neutral-200/50 dark:border-outline-variant/10 text-[10px] font-bold uppercase text-neutral-550 dark:text-text-muted tracking-wide">
              <div>Parameter</div>
              <div>Description</div>
            </div>

            <div className="divide-y divide-neutral-150 dark:divide-outline-variant/10 text-xs leading-relaxed">
              <div className="grid grid-cols-[1fr_1.5fr] gap-4 p-4">
                <div>
                  <code className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">sourceId</code>
                  <span className="block text-[10px] text-red-600 dark:text-red-400 font-semibold mt-0.5">Required</span>
                </div>
                <div className="text-neutral-700 dark:text-zinc-300">
                  Unique identifier of the ingestion sensor or IoT node.
                </div>
              </div>

              <div className="grid grid-cols-[1fr_1.5fr] gap-4 p-4">
                <div>
                  <code className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">valueKw</code>
                  <span className="block text-[10px] text-red-600 dark:text-red-400 font-semibold mt-0.5">Required</span>
                </div>
                <div className="text-neutral-700 dark:text-zinc-300">
                  Power consumption measured in kilowatts (kW).
                </div>
              </div>

              <div className="grid grid-cols-[1fr_1.5fr] gap-4 p-4">
                <div>
                  <code className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">timestamp</code>
                  <span className="block text-[10px] text-neutral-400 dark:text-zinc-500 font-semibold mt-0.5">Optional</span>
                </div>
                <div className="text-neutral-700 dark:text-zinc-300">
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

        <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-surface-container-low border border-neutral-200/80 dark:border-outline-variant/15 flex items-center gap-2">
          <code className="text-xs text-neutral-800 dark:text-zinc-200 font-mono break-all select-all flex-1">
            https://api.zerocarbon.dev/v1/factors/query?region=US-EAST
          </code>
        </div>
      </section>

      {/* ---------------- SECTION 5.5: CARBON OFFSET MARKETPLACE ---------------- */}
      <section id="offset-marketplace" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-neutral-100 dark:border-outline-variant/10 pb-2">
          <span className="px-2.5 py-1 text-[10px] font-bold rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/10 flex items-center select-none uppercase tracking-wider self-start sm:self-center">
            POST
          </span>
          <h2 className="font-display-md text-2xl font-bold tracking-tight text-text-main">
            Carbon Offset Marketplace (Dodo MoR)
          </h2>
        </div>
        
        <p className="font-body-md text-xs sm:text-sm text-text-muted leading-relaxed">
          ZeroCarbon features an offset marketplace powered by **Dodo Payments** as the Merchant of Record (MoR) to calculate base credit price + 3% fee, automatically handling localized taxes and VAT globally.
        </p>

        <div className="p-3.5 bg-code-inline-bg border border-outline-variant/20 rounded-xl flex items-center gap-2">
          <code className="text-xs text-code-inline-text font-mono break-all select-all flex-1">
            POST https://api.zerocarbon.dev/v1/marketplace/checkout
          </code>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold text-text-main">Fulfillment Webhook Endpoint</h4>
          <p className="text-xs text-text-muted leading-relaxed">
            Successful checkouts trigger automated webhook fulfillments which generate compliant certificates:
          </p>
          <div className="p-3.5 bg-code-inline-bg border border-outline-variant/20 rounded-xl flex items-center gap-2">
            <code className="text-xs text-code-inline-text font-mono break-all select-all flex-1">
              POST https://api.zerocarbon.dev/v1/webhooks/dodo-payments
            </code>
          </div>
        </div>
      </section>

    </div>
  );
}
export default DocsContent;
