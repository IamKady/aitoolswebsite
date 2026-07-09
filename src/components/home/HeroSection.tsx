"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, Mic, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const PLACEHOLDERS = [
  "Generate YouTube videos with AI...",
  "Remove image backgrounds automatically...",
  "Build websites without coding...",
  "Write SEO blog posts in minutes...",
  "Create stunning presentations...",
  "Generate professional logos...",
  "Build AI-powered chatbots...",
  "Edit photos with AI magic...",
  "Code faster with AI assistance...",
  "Summarize long PDF documents...",
  "Create realistic AI voices...",
  "Design graphics without skills...",
  "Automate repetitive tasks...",
  "Translate content to any language...",
  "Analyze data with natural language...",
];

const TRENDING = [
  "ChatGPT alternatives",
  "Free AI for students",
  "AI video generator",
  "AI code assistant",
  "AI image generator",
];

export function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [suggestions, setSuggestions] = useState<{ tools: { name: string; slug: string; logo: string | null }[]; categories: { name: string; slug: string }[] }>({ tools: [], categories: [] });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Animated placeholder effect
  useEffect(() => {
    const target = PLACEHOLDERS[placeholderIndex];
    let charIndex = 0;
    setCurrentPlaceholder("");
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (charIndex < target.length) {
        setCurrentPlaceholder(target.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
        }, 2500);
      }
    }, 45);

    return () => clearInterval(typeInterval);
  }, [placeholderIndex]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    
    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    if (value.trim().length >= 2) {
      debounceRef.current = setTimeout(async () => {
        try {
          const res = await fetch(`/api/search/suggestions?q=${encodeURIComponent(value)}`);
          if (res.ok) {
            const data = await res.json();
            setSuggestions(data);
            setShowSuggestions(true);
          }
        } catch {
          // silently fail
        }
      }, 200);
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
        
        {/* Floating badges */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 left-8 lg:left-24 hidden lg:flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-medium text-foreground border border-white/10"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          500+ AI Tools Listed
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-32 right-8 lg:right-24 hidden lg:flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-medium text-foreground border border-white/10"
        >
          <Sparkles className="w-3 h-3 text-yellow-400" />
          AI-Powered Search
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-24 left-16 lg:left-32 hidden lg:flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-medium text-foreground border border-white/10"
        >
          <span className="text-primary font-bold">4.8★</span> Avg. Rating
        </motion.div>
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
          The #1 AI Tool Discovery Platform
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          Find the Perfect{" "}
          <span className="gradient-text">AI Tool</span>
          <br />
          in Seconds
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Search, compare, review, and discover the world&apos;s best AI tools
          with intelligent recommendations tailored to your needs.
        </motion.p>

        {/* Search box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative max-w-2xl mx-auto"
        >
          <form onSubmit={handleSearch}>
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 gradient-bg rounded-2xl opacity-0 group-focus-within:opacity-30 blur transition-opacity duration-300" />
              
              <div className="relative flex items-center glass border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                <Search className="absolute left-4 w-5 h-5 text-muted-foreground flex-shrink-0 pointer-events-none" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  onFocus={() => query.length >= 2 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder={currentPlaceholder + (isTyping ? "|" : "")}
                  className="w-full bg-transparent pl-12 pr-28 py-4 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                  id="hero-search"
                  aria-label="Search AI tools"
                />
                <div className="absolute right-2 flex items-center gap-1">
                  <button
                    type="button"
                    className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground transition-colors"
                    aria-label="Voice search"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 gradient-bg text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Search
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Suggestions dropdown */}
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
                      <a
                        key={tool.slug}
                        href={`/tools/${tool.slug}`}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors"
                      >
                        {tool.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={tool.logo} alt={tool.name} className="w-6 h-6 rounded object-contain" />
                        ) : (
                          <div className="w-6 h-6 rounded gradient-bg flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <span className="text-sm text-foreground">{tool.name}</span>
                      </a>
                    ))}
                  </div>
                )}
                {suggestions.categories.length > 0 && (
                  <div>
                    <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-t border-border">
                      Categories
                    </p>
                    {suggestions.categories.map((cat) => (
                      <a
                        key={cat.slug}
                        href={`/categories/${cat.slug}`}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors"
                      >
                        <Search className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{cat.name} AI Tools</span>
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trending searches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 mt-6"
        >
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <TrendingIcon /> Trending:
          </span>
          {TRENDING.map((term) => (
            <a
              key={term}
              href={`/search?q=${encodeURIComponent(term)}`}
              className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {term}
            </a>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-14 pt-10 border-t border-border"
        >
          {[
            { value: "500+", label: "AI Tools" },
            { value: "30+", label: "Categories" },
            { value: "10K+", label: "Reviews" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TrendingIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
    </svg>
  );
}
