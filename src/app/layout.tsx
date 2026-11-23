import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ToolWire AI — Explore AI Tools & Practical Guides",
    template: "%s | ToolWire AI",
  },
  description:
    "Explore AI tools, compare features and pricing, read practical guides, and find alternatives for work, study, creativity, and everyday tasks.",
  keywords: [
    "AI tools",
    "artificial intelligence",
    "AI software",
    "best AI tools",
    "AI tool directory",
    "AI comparison",
    "machine learning tools",
    "ChatGPT alternatives",
    "AI for business",
  ],
  authors: [{ name: "ToolWire AI" }],
  creator: "ToolWire AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ToolWire AI",
    title: "ToolWire AI — Explore AI Tools & Practical Guides",
    description:
      "Explore AI tools, compare features and pricing, and read practical guides.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "ToolWire AI — discover AI tools and practical guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolWire AI — Explore AI Tools & Practical Guides",
    description:
      "Explore AI tools, compare features and pricing, and read practical guides.",
    images: ["/api/og"],
    creator: "@toolwireai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
