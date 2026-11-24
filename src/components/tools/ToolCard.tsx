"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  ExternalLink,
  Bookmark,
  GitCompare,
  Share2,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { cn, formatPrice, truncate } from "@/lib/utils";
import { ToolCardData } from "@/types";
import { PricingType } from "@prisma/client";
import { useState, useSyncExternalStore } from "react";
import { useBookmarkStore } from "@/store/bookmarkStore";

interface ToolCardProps {
  tool: ToolCardData;
  className?: string;
  variant?: "default" | "compact" | "featured";
}

const pricingConfig: Record<PricingType, { label: string; className: string }> = {
  FREE: { label: "Free", className: "badge-free" },
  FREEMIUM: { label: "Freemium", className: "badge-freemium" },
  PAID: { label: "Paid", className: "badge-paid" },
  OPEN_SOURCE: { label: "Open Source", className: "badge-opensource" },
};

const subscribeToBookmarkHydration = (listener: () => void) =>
  useBookmarkStore.persist.onFinishHydration(listener);
const getBookmarkHydrationSnapshot = () => useBookmarkStore.persist.hasHydrated();
const getServerBookmarkHydrationSnapshot = () => false;

export function ToolCard({ tool, className, variant = "default" }: ToolCardProps) {
  const hasHydrated = useSyncExternalStore(
    subscribeToBookmarkHydration,
    getBookmarkHydrationSnapshot,
    getServerBookmarkHydrationSnapshot
  );
  const bookmarked = useBookmarkStore((state) =>
    state.bookmarkedTools.some((savedTool) => savedTool.id === tool.id)
  );
  const addBookmark = useBookmarkStore((state) => state.addBookmark);
  const removeBookmark = useBookmarkStore((state) => state.removeBookmark);
  const [shareStatus, setShareStatus] = useState("");
  const pricing = pricingConfig[tool.pricing];
  const isBookmarked = hasHydrated && bookmarked;
  const websiteRel = tool.sponsored
    ? "sponsored nofollow noopener noreferrer"
    : "noopener noreferrer";

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (bookmarked) {
      removeBookmark(tool.id);
    } else {
      addBookmark(tool);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const shareData = {
      title: tool.name,
      text: tool.tagline,
      url: new URL(`/tools/${tool.slug}`, window.location.origin).toString(),
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setShareStatus("Link copied.");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      console.error("Could not share tool link", error);
      setShareStatus("Could not share the link. Please try again.");
    }
  };

  if (variant === "compact") {
    return (
      <Link href={`/tools/${tool.slug}`}>
        <div className={cn(
          "flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-card/80 transition-all group",
          className
        )}>
          <ToolLogo tool={tool} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
              {tool.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">{tool.tagline}</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 z-10">
            {tool.reviewCount > 0 && tool.rating > 0 && (
              <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-muted-foreground">{tool.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={cn(
          "group relative flex flex-col h-full rounded-2xl border border-border bg-card overflow-hidden",
          "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300",
          tool.sponsored && "ring-1 ring-yellow-500/30",
          className
        )}
      >
          {/* Action buttons (appear on hover) */}
          <div className="absolute top-3 right-3 z-10 flex gap-1.5 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
            <button
              type="button"
              onClick={handleBookmark}
              className="flex min-h-8 min-w-8 items-center justify-center rounded-lg border border-border bg-background/90 transition-colors hover:border-primary/50 hover:bg-muted"
              aria-label={isBookmarked ? `Remove ${tool.name} from saved tools` : `Save ${tool.name}`}
              aria-pressed={isBookmarked}
            >
              <Bookmark
                aria-hidden="true"
                className={cn("h-4 w-4", isBookmarked ? "fill-primary text-primary" : "text-muted-foreground")}
              />
            </button>
            <a
              href={tool.website}
              target="_blank"
              rel={websiteRel}
              onClick={(e) => e.stopPropagation()}
              className="flex min-h-8 min-w-8 items-center justify-center rounded-lg border border-border bg-background/90 transition-colors hover:border-primary/50 hover:bg-muted"
              aria-label={`Visit ${tool.name} website`}
              title={`Visit ${tool.name} website`}
            >
              <ExternalLink aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
            </a>
            <Link
              href={`/compare?a=${tool.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="flex min-h-8 min-w-8 items-center justify-center rounded-lg border border-border bg-background/90 transition-colors hover:border-primary/50 hover:bg-muted"
              aria-label={`Compare ${tool.name}`}
            >
              <GitCompare aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
            </Link>
            <button
              type="button"
              onClick={handleShare}
              className="flex min-h-8 min-w-8 items-center justify-center rounded-lg border border-border bg-background/90 transition-colors hover:border-primary/50 hover:bg-muted"
              aria-label={`Share ${tool.name}`}
            >
              <Share2 aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <span className="sr-only" role="status" aria-live="polite">{shareStatus}</span>

          {/* Card body */}
          <div className="p-5 flex flex-col flex-1">
            {(tool.sponsored || tool.featured) && (
              <div className="mb-4 flex min-h-7 flex-wrap items-center gap-1.5 pr-36">
                {tool.sponsored && (
                  <span className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-1 text-[10px] font-semibold text-yellow-700 dark:text-yellow-300">
                    Sponsored
                  </span>
                )}
                {tool.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
                    <Zap aria-hidden="true" className="h-3 w-3" />
                    Featured
                  </span>
                )}
              </div>
            )}

            {/* Logo & name row */}
            <div className="mb-4 flex items-center gap-3">
              <ToolLogo tool={tool} size="lg" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="truncate text-base font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
                    <Link href={`/tools/${tool.slug}`} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {tool.name}
                    </Link>
                  </h3>
                  {tool.verified && (
                    <CheckCircle2 aria-label="Verified listing" className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  )}
                </div>
                <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                  {tool.category.name}
                </p>
              </div>
            </div>

            {/* Tagline */}
            <p className="mb-5 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {truncate(tool.tagline, 90)}
            </p>

            {/* Tags */}
            {tool.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-1.5">
                {tool.tags.slice(0, 3).map(({ tag }) => (
                  <span
                    key={tag.id}
                    className="rounded-full bg-accent px-2.5 py-1 text-xs text-accent-foreground"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Footer row */}
            <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
              <div className="flex flex-wrap items-center gap-2">
                {/* Pricing badge */}
                <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", pricing.className)}>
                  {pricing.label}
                </span>
                {tool.hasFreeTrial && (
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                    Free Trial
                  </span>
                )}
              </div>
              {/* Rating */}
              {tool.reviewCount > 0 && tool.rating > 0 && (
                <div
                  className="flex shrink-0 items-center gap-1.5"
                  role="img"
                  aria-label={`${tool.rating.toFixed(1)} out of 5 from ${tool.reviewCount} reviews`}
                >
                  <Star aria-hidden="true" className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-foreground">
                    {tool.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({tool.reviewCount})
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Visit button */}
          <div className="px-5 pb-4 relative z-10">
            <a
              href={tool.website}
              target="_blank"
              rel={websiteRel}
              onClick={(e) => e.stopPropagation()}
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-primary/30 py-2 text-sm font-semibold text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
            >
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
              Visit Website
            </a>
          </div>
        </div>
    </motion.div>
  );
}

// Tool logo with fallback
function ToolLogo({ tool, size }: { tool: ToolCardData; size: "sm" | "lg" }) {
  const sizeClass = size === "lg" ? "h-12 w-12" : "h-8 w-8";
  const textClass = size === "lg" ? "text-sm font-bold tracking-wide" : "text-xs font-bold";
  const categoryColor = tool.category.color || "#6366f1";
  const [imgError, setImgError] = useState(false);
  const monogram = tool.name.trim().slice(0, 2).toUpperCase() || "?";

  if (tool.logo && !imgError) {
    return (
      <div className={cn("flex flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white", sizeClass)}>
        <Image
          src={tool.logo}
          alt={`${tool.name} logo`}
          width={size === "lg" ? 48 : 32}
          height={size === "lg" ? 48 : 32}
          className="w-full h-full object-contain"
          onError={() => {
            setImgError(true);
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-shrink-0 select-none items-center justify-center rounded-xl border border-white/10 text-white shadow-sm",
        sizeClass,
        textClass
      )}
      style={{
        background: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}bb 100%)`,
      }}
    >
      {monogram}
    </div>
  );
}

// Pricing display helper
export function PricingBadge({ pricing, price }: { pricing: PricingType; price?: number | null }) {
  const config = pricingConfig[pricing];
  return (
    <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium", config.className)}>
      {pricing === "PAID" && price ? formatPrice(price) : config.label}
    </span>
  );
}
