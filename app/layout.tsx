import type { Metadata } from "next";
import "./globals.css";
import ScrollProvider from "./ScrollProvider";

export const metadata: Metadata = {
  title: "ZeroCarbon MCP | Fewer Clicks, More Carbon Intelligence",
  description: "Enterprise Carbon Intelligence Powered by the Model Context Protocol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-off-white text-text-main selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden">
        <ScrollProvider>
          {children}
        </ScrollProvider>
      </body>
    </html>
  );
}

