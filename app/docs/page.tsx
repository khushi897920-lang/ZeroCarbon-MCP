"use client";

import React, { useState } from "react";
import { DocsSidebar, DocCategory } from "@/components/ui/docs-sidebar";
import { DocsContent } from "@/components/ui/docs-content";
import { DocsOutline, OutlineItem } from "@/components/ui/docs-outline";
import NotchNavbar from "@/components/ui/notch-navbar";

const CATEGORIES: DocCategory[] = [
  {
    title: "Getting Started",
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "quickstart", label: "Quick Start Guide" },
      { id: "authentication", label: "Authentication" },
    ],
  },
  {
    title: "Core APIs",
    items: [
      { id: "ingest-telemetry", label: "Ingest Telemetry" },
      { id: "emission-factors", label: "Emission Factors" },
    ],
  },
];

const OUTLINE_ITEMS: OutlineItem[] = [
  { id: "introduction", label: "Introduction" },
  { id: "quickstart", label: "Quick Start Guide" },
  { id: "authentication", label: "Authentication" },
  { id: "ingest-telemetry", label: "Ingest Telemetry" },
  { id: "emission-factors", label: "Emission Factors" },
];

export default function DocsPage() {
  const [activeSectionId, setActiveSectionId] = useState("introduction");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [copiedTextId, setCopiedTextId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTextId(id);
    setTimeout(() => setCopiedTextId(null), 2000);
  };

  const handleSelectSection = (id: string) => {
    setActiveSectionId(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 90; // Header offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col font-sans">
      {/* Notch Navbar */}
      <NotchNavbar />

      {/* Main Layout Container */}
      <div className="w-full max-w-[90rem] mx-auto flex flex-row flex-1 pt-24">
        
        {/* Left Sidebar Navigation */}
        <DocsSidebar
          categories={CATEGORIES}
          activeId={activeSectionId}
          onSelect={handleSelectSection}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Center / Right Content wrapper */}
        <main className="flex-1 min-w-0 md:pl-72 xl:pr-64 flex flex-col">
          {/* Mobile Table of Contents Toggle bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-100 dark:border-outline-variant/10 md:hidden bg-white/80 dark:bg-[#0B0F0D]/80 backdrop-blur-md sticky top-[72px] z-20 select-none">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex items-center gap-2 text-xs font-bold text-accent-green hover:underline cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">menu</span>
              Table of Contents
            </button>
            <span className="text-[10px] text-text-muted">
              ZeroCarbon MCP SDK v0.1.0
            </span>
          </div>

          {/* Core Content area */}
          <div className="px-6 sm:px-8 py-8 md:py-12 max-w-3xl w-full mx-auto">
            <DocsContent
              activeSectionId={activeSectionId}
              onCopy={handleCopy}
              copiedTextId={copiedTextId}
            />
          </div>
        </main>

        {/* Right Sidebar Scrollspy Outline */}
        <DocsOutline items={OUTLINE_ITEMS} />
      </div>
    </div>
  );
}
