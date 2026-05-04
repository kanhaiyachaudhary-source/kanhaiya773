import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kanhaiya Chaudhary — GenAI Developer",
  description: "GenAI Developer at PwC. Building production AI applications with RAG, Agentic AI, and Conversational AI. AWS Certified.",
  keywords: "GenAI, AI Developer, RAG, Agentic AI, LLM, Kanhaiya Chaudhary, PwC, AWS Certified",
  authors: [{ name: "Kanhaiya Chaudhary" }],
  openGraph: {
    title: "Kanhaiya Chaudhary — GenAI Developer",
    description: "Building production AI applications.",
    url: "https://kanhaiya772.vercel.app",
    siteName: "Kanhaiya Chaudhary",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="neon">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Orbitron:wght@400;500;700;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Press+Start+2P&family=Space+Grotesk:wght@400;500;600;700&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
