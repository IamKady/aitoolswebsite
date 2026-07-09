import Link from "next/link";
import { Layers, ArrowRight } from "lucide-react";

const COLLECTIONS = [
  {
    emoji: "🎓",
    title: "Best AI Tools for Students",
    slug: "ai-tools-for-students",
    description: "Research, writing, studying, and productivity tools for students",
    toolCount: 18,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/20",
  },
  {
    emoji: "💻",
    title: "Best AI Coding Tools",
    slug: "ai-coding-tools",
    description: "Code faster, debug smarter, and ship better software with AI",
    toolCount: 24,
    color: "from-purple-500/20 to-indigo-500/20",
    borderColor: "border-purple-500/20",
  },
  {
    emoji: "🎨",
    title: "Best AI for Designers",
    slug: "ai-tools-for-designers",
    description: "Creative tools for graphic design, UI/UX, and visual content",
    toolCount: 16,
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/20",
  },
  {
    emoji: "📈",
    title: "Best AI for Marketing",
    slug: "ai-tools-for-marketing",
    description: "Grow your business with AI-powered marketing and content tools",
    toolCount: 22,
    color: "from-orange-500/20 to-amber-500/20",
    borderColor: "border-orange-500/20",
  },
  {
    emoji: "🆓",
    title: "Best Free AI Tools",
    slug: "best-free-ai-tools",
    description: "Powerful AI tools that are completely free to use",
    toolCount: 35,
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/20",
  },
  {
    emoji: "🚀",
    title: "Best AI for Startups",
    slug: "ai-tools-for-startups",
    description: "Essential AI tools for early-stage startups and founders",
    toolCount: 19,
    color: "from-teal-500/20 to-cyan-500/20",
    borderColor: "border-teal-500/20",
  },
  {
    emoji: "🎬",
    title: "Best AI for YouTubers",
    slug: "ai-tools-for-youtubers",
    description: "Script, edit, thumbnail, and publish YouTube videos faster with AI",
    toolCount: 14,
    color: "from-red-500/20 to-orange-500/20",
    borderColor: "border-red-500/20",
  },
  {
    emoji: "💼",
    title: "Best AI Productivity Tools",
    slug: "ai-productivity-tools",
    description: "Work smarter, not harder with top AI productivity tools",
    toolCount: 28,
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/20",
  },
];

export function Collections() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              Curated Lists
            </p>
            <h2 className="text-3xl font-bold text-foreground">
              AI Tool <span className="gradient-text">Collections</span>
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">Hand-curated collections for every use case</p>
          </div>
          <Link href="/collections" className="text-sm text-primary hover:underline hidden sm:block">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COLLECTIONS.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className={`group p-5 rounded-2xl border ${collection.borderColor} bg-gradient-to-br ${collection.color} hover:shadow-lg transition-all duration-200`}
            >
              <div className="text-3xl mb-3">{collection.emoji}</div>
              <h3 className="font-semibold text-foreground text-sm leading-snug mb-2 group-hover:text-primary transition-colors">
                {collection.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                {collection.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {collection.toolCount} tools
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
