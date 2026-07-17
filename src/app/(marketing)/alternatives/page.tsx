import Link from "next/link";
import { Metadata } from "next";
import { GitCompare, ChevronRight, ArrowRight } from "lucide-react";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "AI Tool Alternatives Directory | ToolWire AI",
  description: "Find the best alternatives to popular AI tools like ChatGPT, Claude, Midjourney, and Cursor. Compare features, pricing, and pros/cons side-by-side.",
};

export default async function AlternativesRootPage() {
  const popularTools = await prisma.aITool.findMany({
    where: {
      slug: {
        in: [
          "chatgpt",
          "claude",
          "midjourney",
          "cursor",
          "perplexity-ai",
          "elevenlabs"
        ]
      }
    },
    include: {
      category: true
    }
  });

  return (
    <div className="min-h-screen">
      {/* Header section */}
      <div className="border-b border-border bg-card/50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium mb-4">
            <GitCompare className="w-3.5 h-3.5" />
            Alternative Engine
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Find the Best <span className="gradient-text">AI Alternatives</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
            Stop overpaying or using subpar software. Search popular AI products to find better, cheaper, or open-source alternatives instantly.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Popular Tools Search */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-6">Popular AI Alternatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((tool: any) => (
              <div 
                key={tool.id} 
                className="p-6 rounded-2xl border border-border bg-card hover:border-primary/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    {tool.logo ? (
                      <div className="w-10 h-10 rounded-xl overflow-hidden border border-border bg-white flex items-center justify-center">
                        <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-extrabold select-none shadow-sm border border-white/10"
                        style={{
                          background: `linear-gradient(135deg, ${tool.category.color || "#6366f1"} 0%, ${tool.category.color || "#6366f1"}bb 100%)`
                        }}
                      >
                        {tool.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-foreground">{tool.name}</h3>
                      <p className="text-xs text-muted-foreground">{tool.category.name}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                    Looking for products similar to {tool.name}? Browse pricing and feature comparisons.
                  </p>
                </div>
                <Link 
                  href={`/alternatives/${tool.slug}`}
                  className="flex items-center justify-center gap-1.5 py-2 w-full rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
                >
                  View {tool.name} Alternatives
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Informational banner */}
        <div className="p-8 rounded-2xl border border-border bg-card/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-foreground">Can't find a tool?</h3>
            <p className="text-sm text-muted-foreground">Use our global search filter to discover all alternative listings across 110 categories.</p>
          </div>
          <Link 
            href="/tools" 
            className="flex items-center gap-1 px-6 py-3 rounded-xl gradient-bg text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg"
          >
            Browse All Tools
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
