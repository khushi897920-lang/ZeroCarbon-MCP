import type { Metadata } from "next";
import { Newsreader, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import ScrollProvider from "./ScrollProvider";

import ThemeProvider from "./ThemeProvider";

// Load Google Fonts using Next.js optimization
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

// Enterprise-grade SEO Metadata using Next.js Metadata API
export const metadata: Metadata = {
  title: "ZeroCarbon | Enterprise Carbon Accounting API & BRSR Reporting Platform India",
  description: "India's #1 AI-powered carbon accounting platform. Track Scope 1, 2 & 3 emissions, automate BRSR compliance, purchase carbon offsets, and connect AI agents via MCP. Free carbon footprint calculator for enterprises.",
  metadataBase: new URL("https://zerocarbon.org.in"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "carbon accounting api",
    "enterprise carbon accounting",
    "BRSR reporting software india",
    "carbon footprint calculator india",
    "scope 3 emissions tracking",
    "carbon emissions api",
    "carbon offset api",
    "carbon accounting software india",
    "zero carbon",
    "zerocarbon",
    "carbon credit api",
    "carbon reporting india",
    "GHG protocol scope 1 2 3",
    "carbon compliance reporting",
    "enterprise decarbonization platform",
    "carbon footprint calculator free",
    "net zero software india",
    "carbon accounting saas india",
    "MCP carbon accounting",
    "carbon ledger api",
  ],
  openGraph: {
    title: "ZeroCarbon | Enterprise Carbon Accounting API & BRSR Reporting — India",
    description: "AI-native carbon accounting OS for Indian enterprises. Automate BRSR compliance, track Scope 1–3 via REST API, purchase carbon offsets, and connect Claude/Cursor/Gemini via MCP.",
    url: "https://zerocarbon.org.in",
    siteName: "ZeroCarbon",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ZeroCarbon — Enterprise Carbon Accounting API Platform India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeroCarbon | Carbon Accounting API & BRSR Reporting Platform India",
    description: "Track Scope 1–3 emissions, automate BRSR compliance, and purchase carbon offsets via API. India's AI-native carbon OS.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "ZeroCarbon",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "url": "https://zerocarbon.org.in",
        "description": "AI-native enterprise carbon accounting platform with REST API, BRSR compliance automation, Scope 1-3 emissions tracking, and carbon offset marketplace for Indian enterprises.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
        },
        "featureList": [
          "Carbon Accounting API",
          "BRSR Reporting Automation",
          "Scope 1 2 3 Emissions Tracking",
          "Carbon Offset Marketplace",
          "AI Agent MCP Integration",
          "GHG Protocol Compliance",
          "Carbon Footprint Calculator",
        ],
        "applicationSubCategory": "Carbon Management Software",
        "countryOfOrigin": "IN",
      },
      {
        "@type": "Organization",
        "name": "ZeroCarbon",
        "url": "https://zerocarbon.org.in",
        "logo": "https://zerocarbon.org.in/logo.png",
        "sameAs": [
          "https://developer.zerocarbon.org.in",
          "https://api.zerocarbon.org.in",
        ],
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN",
        },
      },
      {
        "@type": "WebSite",
        "name": "ZeroCarbon",
        "url": "https://zerocarbon.org.in",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://zerocarbon.org.in/docs?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en-IN" className={`${newsreader.variable} ${hankenGrotesk.variable}`} suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect to fonts gstatic to speed up external assets (Material Symbols) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-off-white text-text-main selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ScrollProvider>
            {children}
          </ScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
