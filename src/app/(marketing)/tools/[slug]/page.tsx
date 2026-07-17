import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Star, ExternalLink, Bookmark, GitCompare, Share2,
  CheckCircle2, XCircle, Zap, Globe, Code, Shield,
  ChevronRight, MessageSquare, ThumbsUp,
} from "lucide-react";
import { ToolCard } from "@/components/tools/ToolCard";
import prisma from "@/lib/prisma";
import { PricingBadge } from "@/components/tools/ToolCard";
import { BookmarkButton } from "@/components/tools/BookmarkButton";
import { timeAgo } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getToolBySlug(slug: string) {
  return prisma.aITool.findUnique({
    where: { slug },
    include: {
      category: true,
      tags: { include: { tag: true } },
      screenshots: { orderBy: { order: "asc" } },
      features: { orderBy: { order: "asc" } },
      pros: true,
      cons: true,
      pricingPlans: true,
      integrations: true,
      faqs: { orderBy: { order: "asc" } },
      priceHistory: { orderBy: { recordedAt: "asc" } },
      releaseNotes: { orderBy: { releasedAt: "desc" } },
      reviews: {
        where: { status: "APPROVED" },
        include: { user: { select: { id: true, name: true, avatar: true } } },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      alternativesOf: {
        include: {
          alternative: {
            include: {
              category: true,
              tags: { include: { tag: true } },
              _count: { select: { favorites: true, reviews: true } },
            },
          },
        },
        take: 6,
      },
      _count: { select: { favorites: true, reviews: true } },
    },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) return { title: "Tool Not Found" };

  return {
    title: tool.metaTitle || `${tool.name} Review & Alternatives | ToolWire AI`,
    description: tool.metaDescription || tool.tagline,
    openGraph: {
      title: tool.name,
      description: tool.tagline,
      images: tool.logo ? [tool.logo] : [],
    },
  };
}

const PLATFORM_LABELS: Record<string, string> = {
  WEB: "Web App",
  WINDOWS: "Windows",
  MAC: "macOS",
  LINUX: "Linux",
  ANDROID: "Android",
  IOS: "iOS",
  CHROME_EXTENSION: "Chrome Extension",
  API: "API",
};

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) notFound();

  // Increment view count asynchronously
  prisma.aITool.update({
    where: { id: tool.id },
    data: { viewCount: { increment: 1 } },
  }).catch(() => {});

  const alternatives = tool.alternativesOf.map((a: any) => ({
    ...a.alternative,
    category: a.alternative.category,
    tags: a.alternative.tags,
  }));

  // JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: tool.category.name,
    description: tool.description,
    url: tool.website,
    aggregateRating: tool.reviewCount > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: tool.rating.toFixed(1),
          reviewCount: tool.reviewCount,
          bestRating: "5",
          worstRating: "1",
        }
      : undefined,
    offers: tool.pricing === "FREE"
      ? { "@type": "Offer", price: "0", priceCurrency: "USD" }
      : tool.startingPrice
      ? { "@type": "Offer", price: tool.startingPrice, priceCurrency: "USD" }
      : undefined,
    image: tool.logo,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center gap-2 text-xs text-muted-foreground">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <ChevronRight className="w-3 h-3" />
          <li><Link href="/tools" className="hover:text-primary">AI Tools</Link></li>
          <ChevronRight className="w-3 h-3" />
          <li><Link href={`/categories/${tool.category.slug}`} className="hover:text-primary">{tool.category.name}</Link></li>
          <ChevronRight className="w-3 h-3" />
          <li className="text-foreground font-medium">{tool.name}</li>
        </ol>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero */}
            <div className="flex items-start gap-4">
              {tool.logo ? (
                <div className="w-16 h-16 rounded-2xl border border-border overflow-hidden bg-white flex-shrink-0">
                  <Image src={tool.logo} alt={tool.name} width={64} height={64} className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold text-foreground">{tool.name}</h1>
                  {tool.verified && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
                  {tool.featured && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">Featured</span>
                  )}
                </div>
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{tool.tagline}</p>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <PricingBadge pricing={tool.pricing} price={tool.startingPrice} />
                  {tool.hasFreeTrial && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">Free Trial</span>
                  )}
                  <Link href={`/categories/${tool.category.slug}`} className="text-xs text-primary hover:underline">
                    {tool.category.name}
                  </Link>
                </div>
              </div>
            </div>

            {/* Rating summary */}
            <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground">{tool.rating.toFixed(1)}</div>
                <div className="flex gap-0.5 justify-center mt-1">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className={`w-4 h-4 ${s <= Math.round(tool.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                  ))}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{tool.reviewCount} reviews</div>
              </div>
              <div className="flex-1 space-y-1">
                {[5,4,3,2,1].map((star) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-2">{star}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full gradient-bg rounded-full" style={{ width: `${star === Math.round(tool.rating) ? 60 : star > Math.round(tool.rating) ? 20 : 15}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Screenshots */}
            {tool.screenshots.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Screenshots</h2>
                <div className="grid grid-cols-2 gap-3">
                  {tool.screenshots.map((ss: any) => (
                    <div key={ss.id} className="rounded-xl overflow-hidden border border-border aspect-video relative">
                      <Image src={ss.url} alt={ss.alt || tool.name} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h2 className="text-lg font-bold text-foreground mb-3">About {tool.name}</h2>
              {tool.aiSummary && (
                <div className="mb-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-xs font-semibold text-primary mb-2 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    AI-Generated Summary
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tool.aiSummary}</p>
                </div>
              )}
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{tool.description}</p>
            </div>

            {/* Key Features */}
            {tool.features.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Key Features</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tool.features.map((f: any) => (
                    <li key={f.id} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {f.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pros & Cons */}
            {(tool.pros.length > 0 || tool.cons.length > 0) && (
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Pros & Cons</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tool.pros.length > 0 && (
                    <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                      <h3 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-3">Pros</h3>
                      <ul className="space-y-2">
                        {tool.pros.map((p: any) => (
                          <li key={p.id} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            {p.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tool.cons.length > 0 && (
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                      <h3 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-3">Cons</h3>
                      <ul className="space-y-2">
                        {tool.cons.map((c: any) => (
                          <li key={c.id} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                            {c.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Pricing Plans */}
            {tool.pricingPlans.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Pricing Plans</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tool.pricingPlans.map((plan: any) => (
                    <div
                      key={plan.id}
                      className={`p-5 rounded-xl border ${plan.highlighted ? "border-primary gradient-bg text-white" : "border-border bg-card"}`}
                    >
                      <div className="font-bold mb-1">{plan.name}</div>
                      <div className="text-2xl font-bold mb-3">
                        {plan.price === null ? "Custom" : plan.price === 0 ? "Free" : `$${plan.price}/${plan.period}`}
                      </div>
                      {plan.description && (
                        <p className={`text-xs mb-3 ${plan.highlighted ? "text-white/80" : "text-muted-foreground"}`}>
                          {plan.description}
                        </p>
                      )}
                      <ul className="space-y-1.5">
                        {plan.features.map((f: any, i: number) => (
                          <li key={i} className={`text-xs flex items-start gap-1.5 ${plan.highlighted ? "text-white/90" : "text-muted-foreground"}`}>
                            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price History */}
            {tool.priceHistory && tool.priceHistory.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Price History Tracker</h2>
                <div className="p-5 rounded-xl border border-border bg-card">
                  <p className="text-xs text-muted-foreground mb-4">
                    Track the historical pricing of {tool.name}. See when tiers were modified or starting prices changed.
                  </p>
                  <div className="space-y-4">
                    {/* Visual Pricing timeline graph */}
                    <div className="h-24 flex items-end gap-3 px-2 pt-6 border-b border-border mb-4">
                      {tool.priceHistory.map((ph: any) => {
                        const maxPrice = Math.max(...tool.priceHistory.map((p: any) => p.price), 10);
                        const percent = ph.price === 0 ? 10 : (ph.price / maxPrice) * 100;
                        return (
                          <div key={ph.id} className="flex-1 flex flex-col items-center gap-2 group">
                            <div 
                              className="w-full rounded-t-md gradient-bg relative transition-all duration-300 group-hover:opacity-80" 
                              style={{ height: `${percent}%` }}
                            >
                              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] font-semibold px-1.5 py-0.5 rounded shadow border border-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {ph.price === 0 ? "Free" : `$${ph.price}`}
                              </div>
                            </div>
                            <span className="text-[10px] text-muted-foreground text-center truncate w-full">
                              {new Date(ph.recordedAt).toLocaleDateString(undefined, { month: 'short', year: '2-digit' })}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Pricing Log */}
                    <div className="divide-y divide-border">
                      {tool.priceHistory.map((ph: any) => (
                        <div key={ph.id} className="flex justify-between py-2 text-xs">
                          <span className="text-muted-foreground">
                            {new Date(ph.recordedAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                          </span>
                          <span className="font-semibold text-foreground">
                            {ph.price === 0 ? "Free Access Tier" : `$${ph.price}/mo Starting Price`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Release Notes */}
            {tool.releaseNotes && tool.releaseNotes.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Product Release Notes</h2>
                <div className="space-y-4 relative pl-4 border-l-2 border-border/60">
                  {tool.releaseNotes.map((rn: any) => (
                    <div key={rn.id} className="relative group">
                      {/* Timeline dot */}
                      <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-border group-hover:bg-primary border-2 border-background transition-colors" />
                      
                      <div className="p-4 rounded-xl border border-border bg-card">
                        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold border border-primary/20">
                              {rn.version}
                            </span>
                            <h3 className="text-sm font-semibold text-foreground">{rn.title}</h3>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(rn.releasedAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {rn.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {tool.faqs.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {tool.faqs.map((faq: any) => (
                    <div key={faq.id} className="p-4 rounded-xl border border-border bg-card">
                      <h3 className="text-sm font-semibold text-foreground mb-2">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  User Reviews ({tool.reviewCount})
                </h2>
                <Link href={`/tools/${tool.slug}/write-review`} className="text-sm text-primary hover:underline">
                  Write a review →
                </Link>
              </div>
              {tool.reviews.length > 0 ? (
                <div className="space-y-4">
                  {tool.reviews.map((review: any) => (
                    <div key={review.id} className="p-5 rounded-xl border border-border bg-card">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">
                            {review.user.name?.charAt(0) || "U"}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{review.user.name || "Anonymous"}</p>
                            <p className="text-xs text-muted-foreground">{timeAgo(new Date(review.createdAt))}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map((s) => (
                            <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                          ))}
                        </div>
                      </div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">{review.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{review.body}</p>
                      <button className="mt-3 flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        Helpful ({review.helpfulCount})
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground text-sm border border-dashed border-border rounded-xl">
                  No reviews yet. Be the first to review {tool.name}!
                </div>
              )}
            </div>

            {/* Alternatives */}
            {alternatives.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">
                  {tool.name} Alternatives
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {alternatives.map((alt: any) => (
                    <ToolCard key={alt.id} tool={alt as Parameters<typeof ToolCard>[0]['tool']} variant="compact" />
                  ))}
                </div>
                <Link
                  href={`/alternatives/${tool.slug}`}
                  className="mt-4 flex items-center justify-center gap-1 text-sm text-primary hover:underline"
                >
                  View all {tool.name} alternatives →
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* CTA card */}
            <div className="sticky top-24 space-y-4">
              <div className="p-5 rounded-2xl border border-border bg-card">
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 gradient-bg text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                >
                  <Globe className="w-4 h-4" />
                  Visit {tool.name}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <div className="flex gap-2 mt-3">
                  <BookmarkButton tool={tool as any} />
                  <Link
                    href={`/compare?a=${tool.slug}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-border text-muted-foreground text-sm hover:text-primary hover:border-primary/50 transition-colors"
                  >
                    <GitCompare className="w-4 h-4" />
                    Compare
                  </Link>
                  <button className="flex items-center justify-center gap-1.5 p-2 rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick info */}
              <div className="p-5 rounded-2xl border border-border bg-card space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Quick Info</h3>
                <InfoRow icon={Shield} label="Pricing" value={tool.pricing.replace("_", " ")} />
                {tool.startingPrice && <InfoRow icon={Shield} label="Starting at" value={`$${tool.startingPrice}/mo`} />}
                <InfoRow icon={Globe} label="Website" value={new URL(tool.website).hostname} />
                {tool.hasApi && <InfoRow icon={Code} label="API" value="Available" />}
                {tool.isOpenSource && <InfoRow icon={Code} label="Open Source" value="Yes" />}
                
                {/* Platforms */}
                {tool.platforms.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Platforms</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tool.platforms.map((p: any) => (
                        <span key={p} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {PLATFORM_LABELS[p] || p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              {tool.tags.length > 0 && (
                <div className="p-5 rounded-2xl border border-border bg-card">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map(({ tag }: any) => (
                      <Link
                        key={tag.id}
                        href={`/search?q=${encodeURIComponent(tag.name)}`}
                        className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </div>
      <span className="text-xs font-medium text-foreground">{value}</span>
    </div>
  );
}
