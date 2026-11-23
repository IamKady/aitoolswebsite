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
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  {
    label: "Discover",
    icon: Sparkles,
    children: [
      { label: "All AI Tools", href: "/tools", icon: Layers, desc: "Browse and compare tools" },
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
  const { resolvedTheme, setTheme } = useTheme();
  const { isSignedIn, isLoaded } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen && !openDropdown) return;

    const closeMenus = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setOpenDropdown(null);
        if (mobileOpen) mobileMenuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", closeMenus);
    return () => document.removeEventListener("keydown", closeMenus);
  }, [mobileOpen, openDropdown]);

  const closeNavMenus = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

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
            <Link href="/" onClick={closeNavMenus} className="flex items-center gap-2 group">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                <span className="gradient-text">ToolWire</span>
                <span className="text-foreground"> AI</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === link.label ? null : link.label
                        )
                      }
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        "text-muted-foreground hover:text-foreground hover:bg-accent"
                      )}
                      aria-haspopup="true"
                      aria-expanded={openDropdown === link.label}
                      aria-controls={`nav-${link.label.toLowerCase()}`}
                    >
                      <link.icon aria-hidden="true" className="w-3.5 h-3.5" />
                      {link.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "w-3 h-3 transition-transform",
                          openDropdown === link.label && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {openDropdown === link.label && (
                        <motion.div
                          id={`nav-${link.label.toLowerCase()}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 w-64 glass border border-white/10 rounded-xl shadow-xl overflow-hidden"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={closeNavMenus}
                              className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                            >
                              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <child.icon aria-hidden="true" className="w-3.5 h-3.5 text-primary" />
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
                    onClick={closeNavMenus}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    <link.icon aria-hidden="true" className="w-3.5 h-3.5" />
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
                onClick={closeNavMenus}
                aria-label="Search AI tools"
                className="flex items-center gap-2 px-2.5 sm:px-3 py-2 sm:py-1.5 rounded-lg border border-border text-muted-foreground text-sm hover:border-primary/50 hover:text-foreground transition-colors"
              >
                <Search aria-hidden="true" className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                <span className="hidden lg:block text-xs">Search tools…</span>
              </Link>

              {/* Theme toggle */}
              <button
                type="button"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                <Sun aria-hidden="true" className="w-4 h-4 hidden dark:block" />
                <Moon aria-hidden="true" className="w-4 h-4 dark:hidden" />
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
                onClick={closeNavMenus}
                className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-primary/30 text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
              >
                + Submit Tool
              </Link>

              {/* Mobile menu toggle */}
              <button
                ref={mobileMenuButtonRef}
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
              >
                {mobileOpen ? (
                  <X aria-hidden="true" className="w-5 h-5" />
                ) : (
                  <Menu aria-hidden="true" className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-white/10"
            >
              <div className="px-4 py-4 space-y-1">
                <Link
                  href="/search"
                  onClick={closeNavMenus}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <Search aria-hidden="true" className="w-4 h-4" />
                  Search AI tools
                </Link>
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
                          onClick={closeNavMenus}
                          className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                        >
                          <child.icon aria-hidden="true" className="w-4 h-4" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href!}
                      onClick={closeNavMenus}
                      className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      <link.icon aria-hidden="true" className="w-4 h-4" />
                      {link.label}
                    </Link>
                  )
                )}
                <div className="pt-2 border-t border-border flex gap-2">
                  <Link
                    href="/submit"
                    onClick={closeNavMenus}
                    className="flex-1 text-center py-2 rounded-lg gradient-bg text-white text-sm font-medium"
                  >
                    Submit Tool
                  </Link>
                  {!isSignedIn && (
                    <SignInButton mode="modal">
                      <button
                        type="button"
                        className="flex-1 rounded-lg border border-border py-2 text-sm font-medium text-foreground hover:bg-accent"
                      >
                        Sign In
                      </button>
                    </SignInButton>
                  )}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
