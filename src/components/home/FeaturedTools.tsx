import Link from "next/link";
import { ToolCard } from "@/components/tools/ToolCard";
import { Flame } from "lucide-react";
import { ToolCardData } from "@/types";

// Static featured tools data - in production this would come from the DB
const FEATURED_TOOLS: ToolCardData[] = [
  {
    id: "1",
    name: "ChatGPT",
    slug: "chatgpt",
    tagline: "The world's most popular AI chatbot for writing, coding, research, and more",
    description: "ChatGPT is an AI language model by OpenAI that can assist with a wide variety of tasks including writing, analysis, coding, math, and creative projects.",
    logo: "https://logo.clearbit.com/openai.com",
    website: "https://chat.openai.com",
    pricing: "FREEMIUM",
    startingPrice: 20,
    hasFreeTrial: true,
    hasApi: true,
    rating: 4.8,
    reviewCount: 2847,
    featured: true,
    sponsored: false,
    trending: true,
    verified: true,
    platforms: ["WEB", "IOS", "ANDROID"],
    category: { id: "1", name: "Writing", slug: "writing", icon: "PenTool", color: "#6366f1" },
    tags: [{ tag: { id: "1", name: "AI Chat", slug: "ai-chat" } }, { tag: { id: "2", name: "Writing", slug: "writing" } }],
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Midjourney",
    slug: "midjourney",
    tagline: "Create stunning AI-generated images from text descriptions",
    description: "Midjourney is an independent research lab that produces an AI program that creates images from natural language descriptions.",
    logo: "https://logo.clearbit.com/midjourney.com",
    website: "https://midjourney.com",
    pricing: "PAID",
    startingPrice: 10,
    hasFreeTrial: false,
    hasApi: false,
    rating: 4.7,
    reviewCount: 1923,
    featured: true,
    sponsored: false,
    trending: true,
    verified: true,
    platforms: ["WEB"],
    category: { id: "2", name: "Image Generation", slug: "image-generation", icon: "Image", color: "#ec4899" },
    tags: [{ tag: { id: "3", name: "Image AI", slug: "image-ai" } }, { tag: { id: "4", name: "Art", slug: "art" } }],
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "3",
    name: "GitHub Copilot",
    slug: "github-copilot",
    tagline: "AI pair programmer that helps you write better code faster",
    description: "GitHub Copilot uses the OpenAI Codex to suggest code and entire functions in real-time from your editor.",
    logo: "https://logo.clearbit.com/github.com",
    website: "https://github.com/features/copilot",
    pricing: "FREEMIUM",
    startingPrice: 10,
    hasFreeTrial: true,
    hasApi: true,
    rating: 4.6,
    reviewCount: 1456,
    featured: true,
    sponsored: false,
    trending: true,
    verified: true,
    platforms: ["WEB", "WINDOWS", "MAC", "LINUX"],
    category: { id: "3", name: "Coding", slug: "coding", icon: "Code2", color: "#8b5cf6" },
    tags: [{ tag: { id: "5", name: "Code", slug: "code" } }, { tag: { id: "6", name: "IDE", slug: "ide" } }],
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "4",
    name: "ElevenLabs",
    slug: "elevenlabs",
    tagline: "Generative AI text to speech & voice cloning in 29 languages",
    description: "ElevenLabs creates the most realistic, versatile and contextually-aware AI speech software.",
    logo: "https://logo.clearbit.com/elevenlabs.io",
    website: "https://elevenlabs.io",
    pricing: "FREEMIUM",
    startingPrice: 5,
    hasFreeTrial: true,
    hasApi: true,
    rating: 4.8,
    reviewCount: 892,
    featured: true,
    sponsored: false,
    trending: true,
    verified: true,
    platforms: ["WEB", "API"],
    category: { id: "4", name: "Audio & Voice", slug: "audio", icon: "Mic2", color: "#f59e0b" },
    tags: [{ tag: { id: "7", name: "Voice AI", slug: "voice-ai" } }, { tag: { id: "8", name: "TTS", slug: "tts" } }],
    createdAt: new Date("2024-02-15"),
  },
  {
    id: "5",
    name: "Runway",
    slug: "runway",
    tagline: "Next-generation AI creative tools for video generation and editing",
    description: "Runway is an applied AI research company shaping the next era of art, entertainment, and human creativity.",
    logo: "https://logo.clearbit.com/runwayml.com",
    website: "https://runwayml.com",
    pricing: "FREEMIUM",
    startingPrice: 15,
    hasFreeTrial: true,
    hasApi: false,
    rating: 4.5,
    reviewCount: 634,
    featured: true,
    sponsored: false,
    trending: true,
    verified: true,
    platforms: ["WEB"],
    category: { id: "5", name: "Video", slug: "video", icon: "Video", color: "#ef4444" },
    tags: [{ tag: { id: "9", name: "Video AI", slug: "video-ai" } }, { tag: { id: "10", name: "Creative", slug: "creative" } }],
    createdAt: new Date("2024-03-01"),
  },
  {
    id: "6",
    name: "Cursor",
    slug: "cursor",
    tagline: "The AI-first code editor built for pair programming with AI",
    description: "Cursor is an AI-first code editor that helps developers be more productive with AI-powered code completion, generation, and chat.",
    logo: "https://logo.clearbit.com/cursor.sh",
    website: "https://cursor.sh",
    pricing: "FREEMIUM",
    startingPrice: 20,
    hasFreeTrial: true,
    hasApi: false,
    rating: 4.9,
    reviewCount: 1124,
    featured: true,
    sponsored: false,
    trending: true,
    verified: true,
    platforms: ["WINDOWS", "MAC", "LINUX"],
    category: { id: "3", name: "Coding", slug: "coding", icon: "Code2", color: "#8b5cf6" },
    tags: [{ tag: { id: "5", name: "Code", slug: "code" } }, { tag: { id: "11", name: "Editor", slug: "editor" } }],
    createdAt: new Date("2024-03-15"),
  },
];

export function FeaturedTools() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500" />
              Editor&apos;s Choice
            </p>
            <h2 className="text-3xl font-bold text-foreground">
              <span className="gradient-text">Featured</span> AI Tools
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">Hand-picked by our team for exceptional quality</p>
          </div>
          <Link href="/tools?featured=true" className="text-sm text-primary hover:underline hidden sm:block">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED_TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
