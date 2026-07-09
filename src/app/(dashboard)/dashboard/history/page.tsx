"use client";

import { useEffect, useState } from "react";
import { Search, Trash2, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

interface HistoryItem {
  query: string;
  timestamp: string;
}

export default function DashboardHistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load search history from local storage if available
    const saved = localStorage.getItem("search-history-storage");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch {
        setHistory([]);
      }
    } else {
      // Seed some template items for offline preview so it doesn't look empty
      const templates = [
        { query: "AI video generation with voiceover", timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() },
        { query: "open source LLM copywriter", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
        { query: "code pilot alternatives", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      ];
      setHistory(templates);
      localStorage.setItem("search-history-storage", JSON.stringify(templates));
    }
  }, []);

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("search-history-storage");
  };

  const handleRemoveItem = (index: number) => {
    const updated = history.filter((_, i) => i !== index);
    setHistory(updated);
    localStorage.setItem("search-history-storage", JSON.stringify(updated));
  };

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Search History</h1>
          <p className="text-muted-foreground text-sm">Review and manage your past AI assistant and search prompts.</p>
        </div>
        <div className="space-y-3">
          {[1, 2].map((n) => (
            <div key={n} className="h-16 rounded-xl bg-muted/20 animate-pulse border border-border" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Search History</h1>
          <p className="text-muted-foreground text-sm">Review and manage your past AI assistant and search prompts.</p>
        </div>
        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 text-xs font-semibold transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All
          </button>
        )}
      </div>

      {history.length > 0 ? (
        <div className="border border-border rounded-2xl bg-card overflow-hidden divide-y divide-border shadow-sm">
          {history.map((item, idx) => {
            const timeStr = new Date(item.timestamp).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <div key={idx} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors group">
                <Link
                  href={`/search?q=${encodeURIComponent(item.query)}`}
                  className="flex-1 flex items-center gap-3 min-w-0"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Search className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors pr-4">
                      {item.query}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {timeStr}
                    </p>
                  </div>
                </Link>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/search?q=${encodeURIComponent(item.query)}`}
                    className="p-1.5 rounded-lg border border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100 hidden sm:block"
                    title="Search again"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => handleRemoveItem(idx)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 transition-colors"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 rounded-3xl border border-dashed border-border bg-card/50 text-center max-w-xl mx-auto mt-8 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-foreground text-lg mb-2">No history recorded</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
            Your searches and AI prompt requests will be listed here to help you quickly retrace your steps.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 gradient-bg text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Start Searching
          </Link>
        </div>
      )}
    </div>
  );
}
