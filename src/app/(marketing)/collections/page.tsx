import Link from "next/link";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { ArrowRight, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Tool Collections | AIToolHunt",
  description: "Browse hand-curated collections of the best AI tools for developers, students, designers, marketing, productivity, and more.",
};

export default async function CollectionsPage() {
  const collections = await prisma.collection.findMany({
    orderBy: { createdAt: "desc" },
  });

  const colorStyles = [
    { bg: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/20 text-blue-400" },
    { bg: "from-purple-500/20 to-indigo-500/20", border: "border-purple-500/20 text-purple-400" },
    { bg: "from-pink-500/20 to-rose-500/20", border: "border-pink-500/20 text-pink-400" },
    { bg: "from-orange-500/20 to-amber-500/20", border: "border-orange-500/20 text-orange-400" },
    { bg: "from-green-500/20 to-emerald-500/20", border: "border-green-500/20 text-green-400" },
    { bg: "from-teal-500/20 to-cyan-500/20", border: "border-teal-500/20 text-teal-400" },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium mb-4">
            <Layers className="w-3.5 h-3.5" />
            Curated Collections
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            AI Tool <span className="gradient-text">Collections</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto">
            Discover lists of highly specialized AI tools curated for specific professionals, tasks, and budgets.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col: any, idx: number) => {
            const style = colorStyles[idx % colorStyles.length];
            return (
              <Link
                key={col.slug}
                href={`/collections/${col.slug}`}
                className={`group flex flex-col justify-between p-6 rounded-2xl border ${style.border.split(" ")[0]} bg-gradient-to-br ${style.bg} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div>
                  <div className="text-4xl mb-4">{col.emoji || "📦"}</div>
                  <h2 className="text-xl font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
                    {col.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {col.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    View Collection
                  </span>
                  <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
