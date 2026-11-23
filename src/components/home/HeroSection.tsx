"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  PenTool,
  Code2,
  Image as ImageIcon,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SUGGESTED_SEARCHES = [
  "AI tools for students",
  "AI writing tools",
  "AI coding assistants",
];

const TASK_SHORTCUTS = [
  {
    label: "Write & research",
    slug: "writing",
    icon: PenTool,
    tone: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  {
    label: "Build with AI",
    slug: "coding",
    icon: Code2,
    tone: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  },
  {
    label: "Create visuals",
    slug: "image-generation",
    icon: ImageIcon,
    tone: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  },
  {
    label: "Get more done",
    slug: "productivity",
    icon: Zap,
    tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
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
    <section className="relative isolate overflow-hidden border-b border-border/70 bg-background">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-primary/[0.10] blur-[110px]" />
        <div className="absolute -bottom-64 -left-40 h-[30rem] w-[30rem] rounded-full bg-cyan-500/[0.08] blur-[110px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:gap-16 lg:py-24">
        <div className="mx-auto w-full max-w-2xl lg:mx-0">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground shadow-sm"
        >
          <Sparkles aria-hidden="true" className="h-4 w-4 text-primary" />
          AI discovery for everyday work
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-foreground text-pretty sm:text-6xl lg:text-7xl"
        >
          Find the right AI tool
          {" "}
          <br />
          <span className="gradient-text">for what’s next.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg"
        >
          Explore tools for work, study, and creative projects. Compare useful
          features, pricing, and alternatives before you choose.
        </motion.p>

        {/* Search box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative mt-8 max-w-xl"
        >
          <form onSubmit={handleSearch} role="search" aria-label="Find AI tools">
            <div className="relative flex items-center rounded-2xl border border-border bg-card p-1.5 shadow-xl shadow-slate-950/[0.06] transition-[border-color,box-shadow] focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
                <Search aria-hidden="true" className="pointer-events-none absolute left-4 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <label htmlFor="hero-search" className="sr-only">
                  Search AI tools by task, category, or name
                </label>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  onFocus={() => query.length >= 2 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="What are you trying to do?"
                  autoComplete="off"
                  name="q"
                  className="min-h-14 w-full min-w-0 bg-transparent py-3 pl-12 pr-28 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none sm:text-base"
                  id="hero-search"
                  aria-describedby={suggestionError ? "hero-search-status" : undefined}
                />
                <div className="absolute right-1.5 flex items-center gap-1">
                  <button
                    type="submit"
                    className="flex min-h-11 items-center gap-2 rounded-xl bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Search
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </button>
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
                className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-card text-left shadow-xl"
              >
                {suggestions.tools.length > 0 && (
                  <div>
                    <p className="border-b border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Tools
                    </p>
                    {suggestions.tools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}`}
                        className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                      >
                        {tool.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={tool.logo} alt="" width="24" height="24" loading="lazy" className="w-6 h-6 rounded object-contain" />
                        ) : (
                          <div aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10">
                          <Sparkles aria-hidden="true" className="h-3 w-3 text-primary" />
                          </div>
                        )}
                        <span className="text-sm text-foreground">{tool.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
                {suggestions.categories.length > 0 && (
                  <div>
                    <p className="border-t border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Categories
                    </p>
                    {suggestions.categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/categories/${cat.slug}`}
                        className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                      >
                        <Search aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{cat.name} AI Tools</span>
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 flex flex-wrap items-center gap-2"
        >
          <span className="mr-1 text-xs font-semibold text-muted-foreground">
            Popular searches
          </span>
          {SUGGESTED_SEARCHES.map((term) => (
            <Link
              key={term}
              href={`/search?q=${encodeURIComponent(term)}`}
              className="rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {term}
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-7 flex flex-wrap items-center gap-5"
        >
          <Link
            href="/tools"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Browse all tools <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <BookOpen aria-hidden="true" className="h-4 w-4 text-primary" /> Read practical guides
          </Link>
        </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:ml-auto">
          <div
            aria-hidden="true"
            className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-violet-500/10 to-cyan-500/15 blur-2xl"
          />
          <div className="relative rounded-[2rem] border border-border/80 bg-card/95 p-5 shadow-2xl shadow-slate-950/10 backdrop-blur sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Start with a task
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  What are you working on?
                </h2>
              </div>
              <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {TASK_SHORTCUTS.map((task) => (
                <Link
                  key={task.slug}
                  href={`/categories/${task.slug}`}
                  className="group flex min-h-28 flex-col justify-between rounded-2xl border border-border/80 bg-background/70 p-4 transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${task.tone}`}>
                    <task.icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="mt-4 flex items-center justify-between gap-2 text-sm font-semibold text-foreground">
                    {task.label}
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-2xl bg-muted/70 p-4">
              <span aria-hidden="true" className="mt-0.5 text-primary">
                <ArrowRight className="h-4 w-4" />
              </span>
              <p className="text-sm leading-6 text-muted-foreground">
                Compare features, pricing, and alternatives before you decide.
              </p>
            </div>
          </div>
          <p className="relative mt-4 text-center text-xs text-muted-foreground">
            A clearer path from idea to the right tool.
          </p>
        </div>
      </div>
    </section>
  );
}
