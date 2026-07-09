import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { ToolCard } from "@/components/tools/ToolCard";
import { ToolCardData } from "@/types";

const LATEST_TOOLS: ToolCardData[] = [
  {
    id: "l1",
    name: "Gemini",
    slug: "gemini",
    tagline: "Google's most capable AI model for text, code, images, and audio",
    description: "Gemini is Google's most capable and flexible AI model, designed to be multimodal from the ground up.",
    logo: "https://logo.clearbit.com/gemini.google.com",
    website: "https://gemini.google.com",
    pricing: "FREEMIUM",
    startingPrice: 20,
    hasFreeTrial: true,
    hasApi: true,
    rating: 4.5,
    reviewCount: 934,
    featured: false,
    sponsored: false,
    trending: false,
    verified: true,
    platforms: ["WEB", "IOS", "ANDROID"],
    category: { id: "1", name: "Writing", slug: "writing", icon: "PenTool", color: "#6366f1" },
    tags: [{ tag: { id: "1", name: "AI Chat", slug: "ai-chat" } }],
    createdAt: new Date("2024-05-01"),
  },
  {
    id: "l2",
    name: "Ideogram",
    slug: "ideogram",
    tagline: "AI image generator that excels at text and typography in images",
    description: "Ideogram is an AI image generation tool that's particularly good at generating text within images.",
    logo: "https://logo.clearbit.com/ideogram.ai",
    website: "https://ideogram.ai",
    pricing: "FREEMIUM",
    startingPrice: 7,
    hasFreeTrial: true,
    hasApi: false,
    rating: 4.3,
    reviewCount: 312,
    featured: false,
    sponsored: false,
    trending: false,
    verified: true,
    platforms: ["WEB"],
    category: { id: "2", name: "Image Generation", slug: "image-generation", icon: "Image", color: "#ec4899" },
    tags: [{ tag: { id: "3", name: "Image AI", slug: "image-ai" } }],
    createdAt: new Date("2024-05-10"),
  },
  {
    id: "l3",
    name: "Bolt.new",
    slug: "bolt-new",
    tagline: "Prompt, run, edit and deploy full-stack web apps with AI",
    description: "Bolt is an AI-powered web development platform that lets you create, edit, and deploy full-stack apps directly in the browser.",
    logo: "https://logo.clearbit.com/bolt.new",
    website: "https://bolt.new",
    pricing: "FREEMIUM",
    startingPrice: 10,
    hasFreeTrial: true,
    hasApi: false,
    rating: 4.7,
    reviewCount: 567,
    featured: false,
    sponsored: false,
    trending: true,
    verified: true,
    platforms: ["WEB"],
    category: { id: "3", name: "Coding", slug: "coding", icon: "Code2", color: "#8b5cf6" },
    tags: [{ tag: { id: "5", name: "Code", slug: "code" } }, { tag: { id: "18", name: "Web Dev", slug: "web-dev" } }],
    createdAt: new Date("2024-05-15"),
  },
  {
    id: "l4",
    name: "Descript",
    slug: "descript",
    tagline: "Edit audio and video by editing text — AI-powered media editing",
    description: "Descript is an all-in-one video and audio editor that makes editing as easy as editing a doc.",
    logo: "https://logo.clearbit.com/descript.com",
    website: "https://descript.com",
    pricing: "FREEMIUM",
    startingPrice: 12,
    hasFreeTrial: true,
    hasApi: false,
    rating: 4.4,
    reviewCount: 423,
    featured: false,
    sponsored: false,
    trending: false,
    verified: true,
    platforms: ["WEB", "WINDOWS", "MAC"],
    category: { id: "4", name: "Audio & Voice", slug: "audio", icon: "Mic2", color: "#f59e0b" },
    tags: [{ tag: { id: "7", name: "Voice AI", slug: "voice-ai" } }, { tag: { id: "19", name: "Video Edit", slug: "video-edit" } }],
    createdAt: new Date("2024-05-20"),
  },
];

export function LatestTools() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Recently Added
            </p>
            <h2 className="text-3xl font-bold text-foreground">
              <span className="gradient-text">Latest</span> AI Tools
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">Fresh picks added to our directory this week</p>
          </div>
          <Link href="/tools?sort=newest" className="text-sm text-primary hover:underline hidden sm:block flex items-center gap-1">
            View all
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LATEST_TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
