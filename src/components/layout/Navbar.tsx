"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import {
  Search,
  Menu,
  X,
  Sun,
  Moon,
  Zap,
  ChevronDown,
  Layers,
  BookOpen,
  GitCompare,
  Sparkles,
  TrendingUp,
  Bot,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  {
    label: "Discover",
    icon: Sparkles,
    children: [
      { label: "All AI Tools", href: "/tools", icon: Layers, desc: "Browse 500+ AI tools" },
      { label: "Categories", href: "/categories", icon: BookOpen, desc: "Explore by category" },
      { label: "Collections", href: "/collections", icon: TrendingUp, desc: "Curated tool lists" },
      { label: "Trending", href: "/tools?sort=trending", icon: TrendingUp, desc: "What's hot now" },
    ],
  },
  {
    label: "Compare",
    href: "/compare",
    icon: GitCompare,
  },
  {
    label: "AI Assistant",
    href: "/ai-assistant",
    icon: Bot,
  },
  {
    label: "Blog",
    href: "/blog",
    icon: BookOpen,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { isSignedIn, isLoaded } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass border-b border-white/10 shadow-lg shadow-black/5"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                <span className="gradient-text">ToolWire</span>
                <span className="text-foreground"> AI</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === link.label ? null : link.label
                        )
                      }
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        "text-muted-foreground hover:text-foreground hover:bg-accent"
                      )}
                    >
                      <link.icon className="w-3.5 h-3.5" />
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform",
                          openDropdown === link.label && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {openDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 w-64 glass border border-white/10 rounded-xl shadow-xl overflow-hidden"
                          onMouseLeave={() => setOpenDropdown(null)}
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                            >
                              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <child.icon className="w-3.5 h-3.5 text-primary" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-foreground">
                                  {child.label}
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5">
                                  {child.desc}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href!}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    <link.icon className="w-3.5 h-3.5" />
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Search button */}
              <Link
                href="/search"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-muted-foreground text-sm hover:border-primary/50 hover:text-foreground transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden lg:block text-xs">Search tools...</span>
                <kbd className="hidden lg:flex items-center gap-0.5 text-xs border border-border rounded px-1 py-0.5 bg-muted">
                  ⌘K
                </kbd>
              </Link>

              {/* Theme toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                <Sun className="w-4 h-4 hidden dark:block" />
                <Moon className="w-4 h-4 dark:hidden" />
              </button>

              {/* Auth */}
              {!isLoaded ? (
                <div className="w-8 h-8 rounded-full bg-muted/30 animate-pulse" />
              ) : !isSignedIn ? (
                <SignInButton mode="modal">
                  <button className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg">
                    Sign In
                  </button>
                </SignInButton>
              ) : (
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                    },
                  }}
                />
              )}

              {/* Submit Tool CTA */}
              <Link
                href="/submit"
                className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-primary/30 text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
              >
                + Submit Tool
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-white/10"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) =>
                  link.children ? (
                    <div key={link.label}>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1 mt-2">
                        {link.label}
                      </p>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                        >
                          <child.icon className="w-4 h-4" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href!}
                      className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  )
                )}
                <div className="pt-2 border-t border-border flex gap-2">
                  <Link
                    href="/submit"
                    className="flex-1 text-center py-2 rounded-lg gradient-bg text-white text-sm font-medium"
                  >
                    Submit Tool
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
