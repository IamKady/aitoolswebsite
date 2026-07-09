"use client";

import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { ToolCard } from "@/components/tools/ToolCard";
import { ToolCardData } from "@/types";
import { useState } from "react";

const CATEGORIES = ["All", "Writing", "Coding", "Image AI", "Video", "Audio", "Design"];

const TRENDING_TOOLS: ToolCardData[] = [
  {
    id: "t1",
    name: "Claude",
    slug: "claude",
    tagline: "Anthropic's AI assistant that's helpful, harmless, and honest",
    description: "Claude is an AI assistant built by Anthropic, focused on being safe, beneficial, and understandable.",
    logo: "https://logo.clearbit.com/anthropic.com",
    website: "https://claude.ai",
    pricing: "FREEMIUM",
    startingPrice: 20,
    hasFreeTrial: true,
    hasApi: true,
    rating: 4.7,
    reviewCount: 1234,
    featured: false,
    sponsored: false,
    trending: true,
    verified: true,
    platforms: ["WEB", "API"],
    category: { id: "1", name: "Writing", slug: "writing", icon: "PenTool", color: "#6366f1" },
    tags: [{ tag: { id: "1", name: "AI Chat", slug: "ai-chat" } }],
    createdAt: new Date("2024-04-01"),
  },
  {
    id: "t2",
    name: "Perplexity AI",
    slug: "perplexity-ai",
    tagline: "AI-powered search engine that answers any question with cited sources",
    description: "Perplexity AI is a conversational search engine that provides real-time, cited answers to any question.",
    logo: "https://logo.clearbit.com/perplexity.ai",
    website: "https://perplexity.ai",
    pricing: "FREEMIUM",
    startingPrice: 20,
    hasFreeTrial: true,
    hasApi: true,
    rating: 4.6,
    reviewCount: 876,
    featured: false,
    sponsored: false,
    trending: true,
    verified: true,
    platforms: ["WEB", "IOS", "ANDROID"],
    category: { id: "6", name: "Research", slug: "research", icon: "Brain", color: "#a855f7" },
    tags: [{ tag: { id: "12", name: "Search", slug: "search" } }, { tag: { id: "13", name: "Research", slug: "research" } }],
    createdAt: new Date("2024-04-05"),
  },
  {
    id: "t3",
    name: "Suno AI",
    slug: "suno-ai",
    tagline: "Create full songs with AI - just describe the music you want",
    description: "Suno AI generates full songs complete with vocals, instruments, and lyrics from simple text prompts.",
    logo: "https://logo.clearbit.com/suno.com",
    website: "https://suno.com",
    pricing: "FREEMIUM",
    startingPrice: 8,
    hasFreeTrial: true,
    hasApi: false,
    rating: 4.5,
    reviewCount: 543,
    featured: false,
    sponsored: false,
    trending: true,
    verified: true,
    platforms: ["WEB"],
    category: { id: "7", name: "Music", slug: "music", icon: "Music", color: "#06b6d4" },
    tags: [{ tag: { id: "14", name: "Music AI", slug: "music-ai" } }],
    createdAt: new Date("2024-04-10"),
  },
  {
    id: "t4",
    name: "HeyGen",
    slug: "heygen",
    tagline: "Create AI avatar videos from text in minutes — no camera needed",
    description: "HeyGen is an AI video generation platform that helps you create professional videos with AI avatars.",
    logo: "https://logo.clearbit.com/heygen.com",
    website: "https://heygen.com",
    pricing: "FREEMIUM",
    startingPrice: 29,
    hasFreeTrial: true,
    hasApi: true,
    rating: 4.4,
    reviewCount: 421,
    featured: false,
    sponsored: false,
    trending: true,
    verified: true,
    platforms: ["WEB"],
    category: { id: "5", name: "Video", slug: "video", icon: "Video", color: "#ef4444" },
    tags: [{ tag: { id: "9", name: "Video AI", slug: "video-ai" } }, { tag: { id: "15", name: "Avatar", slug: "avatar" } }],
    createdAt: new Date("2024-04-12"),
  },
  {
    id: "t5",
    name: "Leonardo AI",
    slug: "leonardo-ai",
    tagline: "AI image generation platform for creatives and game developers",
    description: "Leonardo AI is a powerful AI art generation platform with fine-tuned models for game assets, illustrations, and photography.",
    logo: "https://logo.clearbit.com/leonardo.ai",
    website: "https://leonardo.ai",
    pricing: "FREEMIUM",
    startingPrice: 12,
    hasFreeTrial: true,
    hasApi: true,
    rating: 4.5,
    reviewCount: 678,
    featured: false,
    sponsored: false,
    trending: true,
    verified: true,
    platforms: ["WEB", "API"],
    category: { id: "2", name: "Image Generation", slug: "image-generation", icon: "Image", color: "#ec4899" },
    tags: [{ tag: { id: "3", name: "Image AI", slug: "image-ai" } }],
    createdAt: new Date("2024-04-15"),
  },
  {
    id: "t6",
    name: "Notion AI",
    slug: "notion-ai",
    tagline: "AI that works inside your Notion workspace for writing and analysis",
    description: "Notion AI is built directly into Notion and helps you write, edit, summarize, and brainstorm—all within your workflow.",
    logo: "https://logo.clearbit.com/notion.so",
    website: "https://notion.so",
    pricing: "FREEMIUM",
    startingPrice: 10,
    hasFreeTrial: true,
    hasApi: false,
    rating: 4.4,
    reviewCount: 892,
    featured: false,
    sponsored: false,
    trending: true,
    verified: true,
    platforms: ["WEB", "IOS", "ANDROID", "WINDOWS", "MAC"],
    category: { id: "8", name: "Productivity", slug: "productivity", icon: "Zap", color: "#3b82f6" },
    tags: [{ tag: { id: "16", name: "Productivity", slug: "productivity" } }, { tag: { id: "17", name: "Notes", slug: "notes" } }],
    createdAt: new Date("2024-04-18"),
  },
];

export function TrendingTools() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? TRENDING_TOOLS
    : TRENDING_TOOLS.filter((t) =>
        t.category.name.toLowerCase().includes(activeCategory.toLowerCase()) ||
        t.tags.some((tag) => tag.tag.name.toLowerCase().includes(activeCategory.toLowerCase()))
      );

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              Hot Right Now
            </p>
            <h2 className="text-3xl font-bold text-foreground">
              <span className="gradient-text">Trending</span> AI Tools
            </h2>
          </div>
          <Link href="/tools?sort=trending" className="text-sm text-primary hover:underline hidden sm:block">
            View all →
          </Link>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "gradient-bg text-white shadow-lg"
                  : "border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
