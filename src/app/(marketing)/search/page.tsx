"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Filter, X, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { ToolCard } from "@/components/tools/ToolCard";
import { ToolCardData } from "@/types";
import { motion } from "framer-motion";

const PRICING_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Free", value: "FREE" },
  { label: "Freemium", value: "FREEMIUM" },
  { label: "Paid", value: "PAID" },
  { label: "Open Source", value: "OPEN_SOURCE" },
];

const SORT_OPTIONS = [
  { label: "Most Relevant", value: "relevance" },
  { label: "Highest Rated", value: "rating" },
  { label: "Newest", value: "newest" },
  { label: "Trending", value: "trending" },
  { label: "Most Popular", value: "popular" },
];

// categories will be loaded dynamically from the backend API

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState<ToolCardData[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");

  // Filters
  const [pricing, setPricing] = useState(searchParams.get("pricing") || "all");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [sort, setSort] = useState(searchParams.get("sort") || "relevance");
  const [hasFreeTrial, setHasFreeTrial] = useState(false);
  const [hasApi, setHasApi] = useState(false);
  const [categoriesList, setCategoriesList] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const names = ["All", ...data.map((c: any) => c.name)];
          setCategoriesList(names);
        }
      })
      .catch((err) => {
        console.error("Error loading categories:", err);
        setCategoriesList([
          "All", "Writing", "Coding", "Image Generation", "Video", "Audio",
          "Design", "Productivity", "Marketing", "SEO", "Research",
          "Education", "Chatbots", "Automation"
        ]);
      });
  }, []);

  const doSearch = useCallback(async (resetPage = false) => {
    const currentPage = resetPage ? 1 : page;
    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: query,
        page: currentPage.toString(),
        sort,
        ...(pricing !== "all" && { pricing }),
        ...(category !== "All" && { category: category.toLowerCase().replace(/\s+/g, "-") }),
        ...(hasFreeTrial && { hasFreeTrial: "true" }),
        ...(hasApi && { hasApi: "true" }),
      });

      const res = await fetch(`/api/search?${params}`);
      if (res.ok) {
        const data = await res.json();
        setResults(resetPage ? data.tools : [...results, ...data.tools]);
        setTotal(data.total);
        setTotalPages(data.totalPages);
        if (resetPage) setPage(1);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  }, [query, page, sort, pricing, category, hasFreeTrial, hasApi, results]);

  // Trigger search on filter change
  useEffect(() => {
    doSearch(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, sort, pricing, category, hasFreeTrial, hasApi]);

  // Update URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (sort !== "relevance") params.set("sort", sort);
    if (pricing !== "all") params.set("pricing", pricing);
    if (category !== "All") params.set("category", category);
    router.replace(`/search?${params.toString()}`, { scroll: false });
  }, [query, sort, pricing, category, router]);

  const clearFilters = () => {
    setPricing("all");
    setCategory("All");
    setSort("relevance");
    setHasFreeTrial(false);
    setHasApi(false);
  };

  const activeFilterCount = [
    pricing !== "all",
    category !== "All",
    hasFreeTrial,
    hasApi,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen">
      {/* Search header */}
      <div className="border-b border-border bg-card/50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search AI tools..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                id="search-page-input"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                showFilters || activeFilterCount > 0
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm">Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full gradient-bg text-white text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {query && (
            <p className="text-sm text-muted-foreground mt-3">
              {loading ? "Searching..." : `${total} results for "${query}"`}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside className={`w-64 flex-shrink-0 hidden lg:block`}>
            <div className="sticky top-24 space-y-6">
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear all filters
                </button>
              )}

              {/* Pricing */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Pricing</h3>
                <div className="space-y-2">
                  {PRICING_OPTIONS.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="pricing"
                        value={opt.value}
                        checked={pricing === opt.value}
                        onChange={() => setPricing(opt.value)}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-sm text-muted-foreground hover:text-foreground">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Category</h3>
                <div className="space-y-1 max-h-60 overflow-y-auto">
                  {categoriesList.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors ${
                        category === cat
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Features</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasFreeTrial}
                      onChange={(e) => setHasFreeTrial(e.target.checked)}
                      className="w-4 h-4 rounded accent-primary"
                    />
                    <span className="text-sm text-muted-foreground">Free Trial</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasApi}
                      onChange={(e) => setHasApi(e.target.checked)}
                      className="w-4 h-4 rounded accent-primary"
                    />
                    <span className="text-sm text-muted-foreground">API Available</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1 min-w-0">
            {/* Sort & view controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="text-sm border border-border rounded-lg px-3 py-1.5 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 rounded-lg transition-colors ${view === "grid" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 rounded-lg transition-colors ${view === "list" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Loading skeleton */}
            {loading && results.length === 0 && (
              <div className={`grid gap-5 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-52 rounded-2xl shimmer" />
                ))}
              </div>
            )}

            {/* Results grid */}
            {results.length > 0 && (
              <motion.div
                layout
                className={`grid gap-5 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}
              >
                {results.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </motion.div>
            )}

            {/* Empty state */}
            {!loading && results.length === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No tools found</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-6">
                  {query
                    ? `No AI tools matched "${query}". Try different keywords or browse categories.`
                    : "Start searching for AI tools above."}
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Load more */}
            {results.length > 0 && page < totalPages && (
              <div className="text-center mt-10">
                <button
                  onClick={() => {
                    setPage((p) => p + 1);
                    doSearch();
                  }}
                  disabled={loading}
                  className="px-8 py-3 gradient-bg text-white rounded-xl font-medium hover:opacity-90 disabled:opacity-50 transition-opacity shadow-lg"
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
