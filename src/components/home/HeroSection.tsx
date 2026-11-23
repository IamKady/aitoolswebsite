"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Sparkles, ArrowRight, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SUGGESTED_SEARCHES = [
  "AI tools for writing",
  "Free AI for students",
  "AI image generators",
  "Coding assistants",
  "AI tools for small businesses",
];

export function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ tools: { name: string; slug: string; logo: string | null }[]; categories: { name: string; slug: string }[] }>({ tools: [], categories: [] });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionError, setSuggestionError] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setSuggestionError(false);
    
    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    if (value.trim().length >= 2) {
      debounceRef.current = setTimeout(async () => {
        try {
          const res = await fetch(`/api/search/suggestions?q=${encodeURIComponent(value)}`);
          if (!res.ok) throw new Error("Suggestions request failed");
          const data = await res.json();
          setSuggestions(data);
          setShowSuggestions(true);
        } catch {
          setSuggestions({ tools: [], categories: [] });
          setShowSuggestions(false);
          setSuggestionError(true);
        }
      }, 250);
    } else {
      setShowSuggestions(false);
    }
  };

  return (
    <section className="relative overflow-hidden hero-mesh py-20 sm:py-28 lg:py-36">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/3 blur-3xl" />
        
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 text-sm text-primary font-medium mb-8"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Find your next useful AI tool
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-balance mb-6"
        >
          Find the right AI tool.
          <br />
          <span className="gradient-text">Make something great.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Explore tools for work, study, creativity, and everyday life. Compare
          features, pricing, and alternatives so you can choose with confidence.
        </motion.p>

        {/* Search box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative max-w-2xl mx-auto"
        >
          <form onSubmit={handleSearch} role="search" aria-label="Find AI tools">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 gradient-bg rounded-2xl opacity-0 group-focus-within:opacity-30 blur transition-opacity duration-300" />
              
              <div className="relative flex items-center glass border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                <Search aria-hidden="true" className="absolute left-4 w-5 h-5 text-muted-foreground flex-shrink-0 pointer-events-none" />
                <label htmlFor="hero-search" className="sr-only">
                  Search AI tools by task, category, or name
                </label>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  onFocus={() => query.length >= 2 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Try “AI tools for students”…"
                  autoComplete="off"
                  name="q"
                  className="w-full min-w-0 bg-transparent pl-12 pr-28 py-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                  id="hero-search"
                  aria-describedby={suggestionError ? "hero-search-status" : undefined}
                />
                <div className="absolute right-2 flex items-center gap-1">
                  <button
                    type="submit"
                    className="flex min-h-11 items-center gap-1.5 px-4 py-2 gradient-bg text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Search
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </form>

          {suggestionError && (
            <p id="hero-search-status" role="status" className="mt-2 text-sm text-muted-foreground">
              Suggestions are unavailable right now. You can still search.
            </p>
          )}

          <AnimatePresence>
            {showSuggestions && (suggestions.tools.length > 0 || suggestions.categories.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute top-full left-0 right-0 mt-2 glass border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 text-left"
              >
                {suggestions.tools.length > 0 && (
                  <div>
                    <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
                      Tools
                    </p>
                    {suggestions.tools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}`}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                      >
                        {tool.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={tool.logo} alt="" width="24" height="24" loading="lazy" className="w-6 h-6 rounded object-contain" />
                        ) : (
                          <div aria-hidden="true" className="w-6 h-6 rounded gradient-bg flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <span className="text-sm text-foreground">{tool.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
                {suggestions.categories.length > 0 && (
                  <div>
                    <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-t border-border">
                      Categories
                    </p>
                    {suggestions.categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/categories/${cat.slug}`}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                      >
                        <Search className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{cat.name} AI Tools</span>
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Search ideas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 mt-6"
        >
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            Search ideas:
            <TrendingIcon />
          </span>
          {SUGGESTED_SEARCHES.map((term) => (
            <Link
              key={term}
              href={`/search?q=${encodeURIComponent(term)}`}
              className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {term}
            </Link>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/tools"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl gradient-bg px-5 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Browse AI tools <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-background/70 px-5 text-sm font-semibold text-foreground hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <BookOpen className="w-4 h-4 text-primary" /> Read AI guides
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function TrendingIcon() {
  return (
    <svg aria-hidden="true" className="w-3.5 h-3.5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
    </svg>
  );
}
