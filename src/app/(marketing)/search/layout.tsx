import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search AI Tools",
  description: "Search AI tools by task, category, platform, and pricing.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
