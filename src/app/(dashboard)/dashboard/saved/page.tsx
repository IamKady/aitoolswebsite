"use client";

import { useEffect, useState } from "react";
import { useBookmarkStore } from "@/store/bookmarkStore";
import { ToolCard } from "@/components/tools/ToolCard";
import { Bookmark, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DashboardSavedPage() {
  const { bookmarkedTools, removeBookmark } = useBookmarkStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Saved Tools</h1>
          <p className="text-muted-foreground text-sm">Your personally curated list of AI tools.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-44 rounded-2xl bg-muted/20 animate-pulse border border-border" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Saved Tools</h1>
        <p className="text-muted-foreground text-sm">Your personally curated list of AI tools.</p>
      </div>

      {bookmarkedTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bookmarkedTools.map((tool) => (
            <div key={tool.id} className="relative group">
              <ToolCard tool={tool} />
              <button
                onClick={() => removeBookmark(tool.id)}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md backdrop-blur-sm z-10"
                title="Remove Bookmark"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-3xl border border-dashed border-border bg-card/50 text-center max-w-xl mx-auto mt-8 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-foreground text-lg mb-2">No saved tools yet</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
            Browse our directory and click the bookmark icon on any tool to save it here for quick access.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 gradient-bg text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Sparkles className="w-4 h-4" />
            Discover AI Tools
          </Link>
        </div>
      )}
    </div>
  );
}
