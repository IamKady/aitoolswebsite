"use client";

import { useState, useEffect, Suspense } from "react";
import { GitCompare, Plus, X, Star, CheckCircle2, XCircle, Search, ArrowRight } from "lucide-react";
import { ToolCard } from "@/components/tools/ToolCard";
import { ToolCardData } from "@/types";
import { useCompareStore } from "@/store/compareStore";
import { useSearchParams } from "next/navigation";

const FEATURES = [
  "Free Plan Available",
  "API Access",
  "Mobile App",
  "Chrome Extension",
  "Custom Training",
  "Team Collaboration",
  "Export Options",
  "Integrations",
];

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}

function CompareContent() {
  const searchParams = useSearchParams();
  const { comparedTools, addTool, removeTool } = useCompareStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ToolCardData[]>([]);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [searching, setSearching] = useState(false);

  // If tool 'a' slug is passed in URL query param, load it automatically
  useEffect(() => {
    const defaultSlug = searchParams.get("a");
    if (defaultSlug) {
      fetch(`/api/tools?limit=5`)
        .then((res) => res.json())
        .then((data: ToolCardData[]) => {
          const matched = data.find((t) => t.slug === defaultSlug);
          if (matched) addTool(matched);
        })
        .catch(() => {});
    }
  }, [searchParams, addTool]);

  // Search autocomplete query handler
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    const delayDebounceFn = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&limit=6`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.tools) {
            setSearchResults(data.tools);
          }
        })
        .catch(() => {})
        .finally(() => setSearching(false));
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const getAIInsight = async () => {
    if (comparedTools.length < 2) return;
    setLoadingInsight(true);
    try {
      const res = await fetch("/api/ai/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolA: comparedTools[0], toolB: comparedTools[1] }),
      });
      if (res.ok) {
        const data = await res.json();
        setAiInsight(data.summary);
      }
    } catch {
      // silently fail
    } finally {
      setLoadingInsight(false);
    }
  };

  const pricingColors: Record<string, string> = {
    FREE: "text-green-500",
    FREEMIUM: "text-blue-500",
    PAID: "text-yellow-500",
    OPEN_SOURCE: "text-purple-500",
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <GitCompare className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Compare AI Tools</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Select up to 3 AI tools to compare side-by-side across features, pricing, and ratings.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tool selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[0, 1, 2].map((i) => {
            const tool = comparedTools[i];
            return (
              <div key={i}>
                {tool ? (
                  <div className="relative">
                    <ToolCard tool={tool} />
                    <button
                      onClick={() => removeTool(tool.id)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center hover:bg-destructive/80 transition-colors z-10"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="h-full min-h-52 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors cursor-pointer p-6">
                    <Plus className="w-8 h-8" />
                    <span className="text-sm font-medium">Add tool to compare</span>
                    <div className="relative w-full">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search tools..."
                        className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    {searchQuery && (
                      <div className="w-full space-y-1 max-h-32 overflow-y-auto">
                        {searching ? (
                          <p className="text-[10px] text-muted-foreground p-2">Searching tools...</p>
                        ) : searchResults.filter((t) => !comparedTools.find((s) => s.id === t.id)).length > 0 ? (
                          searchResults
                            .filter((t) => !comparedTools.find((s) => s.id === t.id))
                            .map((t) => (
                              <button
                                key={t.id}
                                onClick={() => { addTool(t); setSearchQuery(""); }}
                                className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
                              >
                                <ArrowRight className="w-3 h-3 text-primary" />
                                {t.name}
                              </button>
                            ))
                        ) : (
                          <p className="text-[10px] text-muted-foreground p-2">No matching tools found</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* AI Insight */}
        {comparedTools.length >= 2 && (
          <div className="mb-8">
            <button
              onClick={getAIInsight}
              disabled={loadingInsight}
              className="flex items-center gap-2 px-6 py-2.5 gradient-bg text-white rounded-xl font-medium hover:opacity-90 disabled:opacity-50 transition-opacity shadow-lg text-sm"
            >
              {loadingInsight ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Star className="w-4 h-4" />
              )}
              Get AI Comparison Insight
            </button>
            {aiInsight && (
              <div className="mt-4 p-5 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-sm font-semibold text-primary mb-2 flex items-center gap-1.5">
                  🤖 AI Insight
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{aiInsight}</p>
              </div>
            )}
          </div>
        )}

        {/* Comparison table */}
        {comparedTools.length >= 2 && (
          <div className="rounded-2xl border border-border overflow-hidden bg-card shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4 text-sm font-semibold text-foreground w-1/4">Feature</th>
                    {comparedTools.map((tool) => (
                      <th key={tool.id} className="p-4 text-center text-sm font-semibold text-foreground">
                        {tool.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {/* Rating */}
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-sm text-muted-foreground">Overall Rating</td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-bold text-foreground">{tool.rating.toFixed(1)}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  {/* Pricing */}
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-sm text-muted-foreground">Pricing</td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="p-4 text-center">
                        <span className={`text-sm font-semibold ${pricingColors[tool.pricing]}`}>
                          {tool.pricing.replace("_", " ")}
                        </span>
                      </td>
                    ))}
                  </tr>
                  {/* Starting price */}
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-sm text-muted-foreground">Starting Price</td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="p-4 text-center text-sm text-foreground">
                        {tool.startingPrice ? `$${tool.startingPrice}/mo` : "Free"}
                      </td>
                    ))}
                  </tr>
                  {/* Free trial */}
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-sm text-muted-foreground">Free Trial</td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="p-4 text-center">
                        {tool.hasFreeTrial
                          ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                          : <XCircle className="w-5 h-5 text-muted-foreground mx-auto" />}
                      </td>
                    ))}
                  </tr>
                  {/* API */}
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-sm text-muted-foreground">API Available</td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="p-4 text-center">
                        {tool.hasApi
                          ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                          : <XCircle className="w-5 h-5 text-muted-foreground mx-auto" />}
                      </td>
                    ))}
                  </tr>
                  {/* Platforms */}
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-sm text-muted-foreground">Platforms</td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="p-4 text-center text-sm text-foreground">
                        {tool.platforms.slice(0, 3).join(", ")}
                        {tool.platforms.length > 3 && ` +${tool.platforms.length - 3}`}
                      </td>
                    ))}
                  </tr>
                  {/* Category */}
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-sm text-muted-foreground">Category</td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="p-4 text-center text-sm text-foreground">
                        {tool.category.name}
                      </td>
                    ))}
                  </tr>
                  {/* Visit */}
                  <tr className="bg-muted/10">
                    <td className="p-4" />
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="p-4 text-center">
                        <a
                          href={tool.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 gradient-bg text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                          Visit {tool.name}
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
