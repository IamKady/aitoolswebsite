import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "AIToolHunt — Find the Perfect AI Tool in Seconds",
    template: "%s | AIToolHunt",
  },
  description:
    "Search, compare, review, and discover the world's best AI tools with intelligent recommendations. Find the perfect AI tool for writing, coding, image generation, video, and more.",
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
  authors: [{ name: "AIToolHunt" }],
  creator: "AIToolHunt",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "AIToolHunt",
    title: "AIToolHunt — Find the Perfect AI Tool in Seconds",
    description:
      "Search, compare, review, and discover the world's best AI tools with intelligent recommendations.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AIToolHunt — AI Tool Search Engine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIToolHunt — Find the Perfect AI Tool in Seconds",
    description:
      "Search, compare, review, and discover the world's best AI tools.",
    images: ["/og-image.png"],
    creator: "@aitoolhunt",
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
  verification: {
    google: "your-google-verification-code",
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
