import prisma from "@/lib/prisma";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tool Categories — Browse by Category",
  description: "Browse 500+ AI tools organized into 30+ categories. Find the best AI tools for writing, coding, image generation, video, audio, and more.",
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { toolCount: "desc" },
  });

  const ICON_MAP: Record<string, string> = {
    PenTool: "✍️", Code2: "💻", Image: "🖼️", Video: "🎬", Mic2: "🎙️",
    Music: "🎵", Zap: "⚡", Share2: "📣", Search: "🔍", Brain: "🧠",
    GraduationCap: "🎓", Palette: "🎨", Bot: "🤖", Layers: "⚙️",
    BarChart3: "📊", Globe: "🌍", FileText: "📄", Cpu: "🤖",
    Presentation: "📋", Briefcase: "💼", Heart: "❤️", Scale: "⚖️",
    DollarSign: "💰", Shield: "🛡️",
  };

  return (
    <div className="min-h-screen">
      <div className="border-b border-border bg-card/50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            AI Tool <span className="gradient-text">Categories</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Browse {categories.length} categories with 500+ AI tools
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((cat: any) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group flex items-start gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${cat.color}20` }}
              >
                {ICON_MAP[cat.icon || ""] || "🤖"}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {cat.name}
                </h2>
                {cat.description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                )}
                <p className="text-xs text-primary font-medium mt-2">{cat.toolCount} tools</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
