import Link from "next/link";
import {
  ArrowRight, PenTool, Code2, Image, Video, Music, Bot, Zap, Search,
  Share2, Brain, BookOpen, Presentation, Palette, Headphones,
  BarChart3, Shield, Globe, FileText, Layers, Cpu, Mic2,
  GraduationCap, Briefcase, ShoppingCart, Heart, Scale, DollarSign,
} from "lucide-react";

const categories = [
  { name: "Writing", slug: "writing", icon: PenTool, color: "#6366f1", count: 48 },
  { name: "Coding", slug: "coding", icon: Code2, color: "#8b5cf6", count: 35 },
  { name: "Image Generation", slug: "image-generation", icon: Image, color: "#ec4899", count: 42 },
  { name: "Video", slug: "video", icon: Video, color: "#ef4444", count: 29 },
  { name: "Audio & Voice", slug: "audio", icon: Mic2, color: "#f59e0b", count: 24 },
  { name: "Music", slug: "music", icon: Music, color: "#06b6d4", count: 18 },
  { name: "Chatbots", slug: "chatbots", icon: Bot, color: "#10b981", count: 31 },
  { name: "Productivity", slug: "productivity", icon: Zap, color: "#3b82f6", count: 44 },
  { name: "SEO", slug: "seo", icon: Search, color: "#84cc16", count: 22 },
  { name: "Marketing", slug: "marketing", icon: Share2, color: "#f97316", count: 38 },
  { name: "Research", slug: "research", icon: Brain, color: "#a855f7", count: 26 },
  { name: "Education", slug: "education", icon: GraduationCap, color: "#0ea5e9", count: 33 },
  { name: "Presentation", slug: "presentation", icon: Presentation, color: "#14b8a6", count: 19 },
  { name: "Design", slug: "design", icon: Palette, color: "#e879f9", count: 27 },
  { name: "Transcription", slug: "transcription", icon: Headphones, color: "#78716c", count: 15 },
  { name: "Data Analysis", slug: "data-analysis", icon: BarChart3, color: "#64748b", count: 21 },
  { name: "Cybersecurity", slug: "cybersecurity", icon: Shield, color: "#dc2626", count: 12 },
  { name: "Translation", slug: "translation", icon: Globe, color: "#2563eb", count: 16 },
  { name: "PDF Tools", slug: "pdf", icon: FileText, color: "#ca8a04", count: 14 },
  { name: "Automation", slug: "automation", icon: Layers, color: "#7c3aed", count: 23 },
  { name: "AI Agents", slug: "ai-agents", icon: Cpu, color: "#059669", count: 17 },
  { name: "Healthcare", slug: "healthcare", icon: Heart, color: "#e11d48", count: 11 },
  { name: "Legal", slug: "legal", icon: Scale, color: "#1d4ed8", count: 9 },
  { name: "Finance", slug: "finance", icon: DollarSign, color: "#15803d", count: 14 },
  { name: "Blog & Content", slug: "blog", icon: BookOpen, color: "#9333ea", count: 36 },
  { name: "Social Media", slug: "social-media", icon: Share2, color: "#0284c7", count: 28 },
  { name: "Resume", slug: "resume", icon: Briefcase, color: "#b45309", count: 13 },
  { name: "E-Commerce", slug: "ecommerce", icon: ShoppingCart, color: "#0f766e", count: 10 },
  { name: "3D & Animation", slug: "3d", icon: Zap, color: "#7c2d12", count: 8 },
];

const featuredCategories = categories.filter(({ slug }) =>
  ["writing", "coding", "image-generation", "video", "productivity", "research", "education", "marketing"].includes(slug)
);

export function PopularCategories() {
  return (
    <section className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Explore by use case
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Start with what you want to do
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Find a focused set of tools for the task, then explore the full directory when you’re ready.
            </p>
          </div>
          <Link
            href="/categories"
            className="hidden min-h-11 items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary sm:inline-flex"
          >
            All categories <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group flex min-h-24 items-center gap-4 rounded-2xl border border-border/80 bg-card px-4 py-4 transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-slate-950/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <div
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:scale-105"
                style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
              >
                <cat.icon className="h-5 w-5" />
              </div>
              <span className="min-w-0 flex-1 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                {cat.name}
              </span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link
            href="/categories"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
          >
            All categories <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
