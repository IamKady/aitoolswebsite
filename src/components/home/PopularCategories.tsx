import Link from "next/link";
import {
  PenTool, Code2, Image, Video, Music, Bot, Zap, Search,
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

export function PopularCategories() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Browse by Category</p>
            <h2 className="text-3xl font-bold text-foreground">
              Explore <span className="gradient-text">30+ Categories</span>
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-sm text-primary hover:underline hidden sm:block"
          >
            View all →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 text-center"
              style={
                {
                  "--cat-color": cat.color,
                  animationDelay: `${i * 30}ms`,
                } as React.CSSProperties
              }
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
              >
                <cat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                  {cat.name}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{cat.count} tools</p>
              </div>
            </Link>
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/categories"
            className="text-sm text-primary hover:underline"
          >
            View all categories →
          </Link>
        </div>
      </div>
    </section>
  );
}
