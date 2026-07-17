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
  Sparkles,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { cn, formatPrice, truncate } from "@/lib/utils";
import { ToolCardData } from "@/types";
import { PricingType } from "@prisma/client";
import { useState } from "react";

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

export function ToolCard({ tool, className, variant = "default" }: ToolCardProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const pricing = pricingConfig[tool.pricing];

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked(!bookmarked);
    // TODO: API call to bookmark
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.share?.({
      title: tool.name,
      text: tool.tagline,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/tools/${tool.slug}`,
    });
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
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-muted-foreground">{tool.rating.toFixed(1)}</span>
            </div>
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(tool.website, "_blank");
              }}
              className="p-1 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              title="Visit Website"
            >
              <ExternalLink className="w-3 h-3" />
            </span>
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
          {/* Sponsored / Featured badges */}
          {(tool.sponsored || tool.featured) && (
            <div className="absolute top-3 left-3 z-10 flex gap-1.5">
              {tool.sponsored && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30 font-medium">
                  Sponsored
                </span>
              )}
              {tool.featured && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 font-medium flex items-center gap-0.5">
                  <Zap className="w-2.5 h-2.5" /> Featured
                </span>
              )}
            </div>
          )}

          {/* Action buttons (appear on hover) */}
          <div className="absolute top-3 right-3 z-10 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleBookmark}
              className="p-1.5 rounded-lg glass border border-white/20 hover:border-primary/50 transition-colors"
              aria-label="Bookmark tool"
            >
              <Bookmark
                className={cn("w-3.5 h-3.5", bookmarked ? "fill-primary text-primary" : "text-muted-foreground")}
              />
            </button>
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg glass border border-white/20 hover:border-primary/50 hover:bg-white/10 transition-colors"
              aria-label="Visit Website"
              title="Visit Website"
            >
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
            </a>
            <Link
              href={`/compare?a=${tool.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg glass border border-white/20 hover:border-primary/50 transition-colors"
              aria-label="Compare tool"
            >
              <GitCompare className="w-3.5 h-3.5 text-muted-foreground" />
            </Link>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg glass border border-white/20 hover:border-primary/50 transition-colors"
              aria-label="Share tool"
            >
              <Share2 className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>

          {/* Card body */}
          <div className="p-5 flex flex-col flex-1">
            {/* Logo & name row */}
            <div className="flex items-start gap-3 mb-3">
              <ToolLogo tool={tool} size="lg" />
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors truncate">
                    <Link href={`/tools/${tool.slug}`} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {tool.name}
                    </Link>
                  </h3>
                  {tool.verified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                  {tool.category.name}
                </p>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
              {truncate(tool.tagline, 90)}
            </p>

            {/* Tags */}
            {tool.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {tool.tags.slice(0, 3).map(({ tag }) => (
                  <span
                    key={tag.id}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-muted-foreground"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Footer row */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                {/* Pricing badge */}
                <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", pricing.className)}>
                  {pricing.label}
                </span>
                {tool.hasFreeTrial && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Free Trial
                  </span>
                )}
              </div>
              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-foreground">
                  {tool.rating.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({tool.reviewCount})
                </span>
              </div>
            </div>
          </div>

          {/* Visit button */}
          <div className="px-5 pb-4 relative z-10">
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-primary/30 text-primary text-sm font-medium hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Visit Website
            </a>
          </div>
        </div>
    </motion.div>
  );
}

// Tool logo with fallback
function ToolLogo({ tool, size }: { tool: ToolCardData; size: "sm" | "lg" }) {
  const sizeClass = size === "lg" ? "w-10 h-10" : "w-8 h-8";
  const iconSize = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  const categoryColor = tool.category.color || "#6366f1";

  if (tool.logo) {
    return (
      <div className={cn("rounded-xl overflow-hidden flex-shrink-0 border border-border bg-white", sizeClass)}>
        <Image
          src={tool.logo}
          alt={`${tool.name} logo`}
          width={size === "lg" ? 40 : 32}
          height={size === "lg" ? 40 : 32}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold",
        sizeClass
      )}
      style={{ backgroundColor: categoryColor }}
    >
      <Sparkles className={iconSize} />
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
