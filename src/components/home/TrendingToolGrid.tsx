"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, TrendingUp } from "lucide-react";
import { ToolCard } from "@/components/tools/ToolCard";
import type { ToolCardData } from "@/types";

export function TrendingToolGrid({ tools }: { tools: ToolCardData[] }) {
  const categories = useMemo(
    () => ["All", ...new Set(tools.map((tool) => tool.category.name))],
    [tools]
  );
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTools =
    activeCategory === "All"
      ? tools
      : tools.filter((tool) => tool.category.name === activeCategory);

  return (
    <section className="bg-muted/30 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
              <TrendingUp aria-hidden="true" className="h-4 w-4 text-orange-500" />
              Discover
            </p>
            <h2 className="text-3xl font-bold text-foreground">
              Popular AI tools
            </h2>
          </div>
          <Link
            href="/tools?sort=trending"
            className="hidden items-center gap-1 text-sm text-primary hover:underline sm:flex"
          >
            View all <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </div>

        {tools.length > 0 ? (
          <>
            <div className="mb-8 flex flex-wrap gap-2" aria-label="Filter by category">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                  className={`min-h-10 rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    activeCategory === category
                      ? "gradient-bg text-white shadow-lg"
                      : "border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </>
        ) : (
          <p className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Popular tools will appear here as the directory grows.{" "}
            <Link href="/tools" className="font-medium text-primary hover:underline">
              Explore all tools
            </Link>
            .
          </p>
        )}
      </div>
    </section>
  );
}
