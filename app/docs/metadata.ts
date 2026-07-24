import type { Metadata } from "next";

/**
 * Docs page metadata — targets the API/developer keyword cluster from GSC:
 * "carbon accounting api", "carbon emissions api", "carbon offset api",
 * "BRSR reporting software india", "scope 3 emissions tracking"
 */
export const metadata: Metadata = {
  title: "ZeroCarbon Developer Docs | Carbon Accounting API, BRSR & MCP Integration Guide",
  description: "Complete developer documentation for ZeroCarbon's carbon accounting API. Connect AI agents via MCP, track Scope 1-3 emissions, automate BRSR reporting, and purchase carbon offsets via REST API. SDKs for Python & Node.js.",
  alternates: {
    canonical: "/docs",
  },
  keywords: [
    "carbon accounting api documentation",
    "carbon emissions api",
    "carbon offset api",
    "BRSR reporting api india",
    "scope 3 emissions tracking api",
    "MCP carbon server",
    "carbon footprint calculator api",
    "carbon credit api",
    "enterprise carbon accounting api",
    "carbon ledger api",
    "GHG protocol api",
    "carbon reporting api india",
    "carbon data api",
    "emissions api",
    "carbon accounting sdk python nodejs",
  ],
  openGraph: {
    title: "ZeroCarbon Developer Docs | Carbon Accounting API & MCP Integration",
    description: "Complete docs for ZeroCarbon's carbon accounting REST API. Connect Claude, Cursor, Gemini via MCP. Track Scope 1–3, automate BRSR, buy carbon offsets.",
    url: "https://zerocarbon.org.in/docs",
    siteName: "ZeroCarbon",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeroCarbon Developer Docs | Carbon API & BRSR Reporting Integration",
    description: "REST API docs for carbon accounting, BRSR compliance, Scope 1–3 tracking, and carbon offset marketplace. Python & Node.js SDKs included.",
  },
};
