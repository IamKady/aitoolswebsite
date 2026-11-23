import Link from "next/link";
import { ToolCard } from "@/components/tools/ToolCard";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { TOOL_PRICING_OPTIONS } from "@/lib/tool-filters";
import type { ToolCardData } from "@/types";

export const metadata: Metadata = {
  title: "Explore AI Tools",
  description:
    "Explore AI tools by category, pricing, and use case. Compare features and find software for writing, coding, research, design, and more.",
  alternates: { canonical: `${SITE_URL}/tools` },
};

interface Props {
  searchParams: Promise<{ category?: string; pricing?: string; sort?: string; page?: string }>;
}

type CategoryFilter = {
  name: string;
  slug: string;
  icon: string | null;
  toolCount: number;
};

function getToolsHref({
  category,
  pricing,
  sort,
  page,
}: {
  category?: string;
  pricing?: string;
  sort?: string;
  page?: number;
}) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (pricing && pricing !== "all") params.set("pricing", pricing);
  if (sort) params.set("sort", sort);
  if (page && page > 1) params.set("page", String(page));

  const query = params.toString();
  return query ? `/tools?${query}` : "/tools";
}

export default async function ToolsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = 24;

  const where: Record<string, unknown> = {};
  if (params.category) where.category = { slug: params.category };
  if (params.pricing && params.pricing !== "all") where.pricing = params.pricing;

  const orderBy: Record<string, string>[] = [{ featured: "desc" }, { rating: "desc" }];
  if (params.sort === "newest") orderBy.splice(0, orderBy.length, { createdAt: "desc" });
  if (params.sort === "trending") orderBy.splice(0, orderBy.length, { viewCount: "desc" });

  const toolsPromise: Promise<ToolCardData[]> = prisma.aITool.findMany({
    where,
    take: limit,
    skip: (page - 1) * limit,
    orderBy,
    include: {
      category: { select: { id: true, name: true, slug: true, icon: true, color: true } },
      tags: { include: { tag: true } },
      _count: { select: { favorites: true, reviews: true } },
    },
  });
  const totalPromise: Promise<number> = prisma.aITool.count({ where });
  const categoriesPromise: Promise<CategoryFilter[]> = prisma.category.findMany({
    select: { name: true, slug: true, icon: true, toolCount: true },
    orderBy: { toolCount: "desc" },
    take: 20,
  });
  const [tools, total, categories] = await Promise.all([
    toolsPromise,
    totalPromise,
    categoriesPromise,
  ]);

  const totalPages = Math.ceil(total / limit);
  const activeCategory = categories.find((category) => category.slug === params.category);
  const activePricing = TOOL_PRICING_OPTIONS.find(
    (filter) => filter.value === (params.pricing || "all")
  );
  const heading = [
    activePricing && activePricing.value !== "all" ? activePricing.label : null,
    activeCategory?.name,
    "AI Tools",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card/50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            <span className="gradient-text">{heading}</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            {total} {total === 1 ? "tool" : "tools"} found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category quick filter */}
        <div className="mb-7">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Browse by category
          </h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href={getToolsHref({ pricing: params.pricing, sort: params.sort })}
              aria-current={!params.category ? "page" : undefined}
              className={`min-h-10 rounded-full border px-3.5 py-2 text-sm transition-colors ${
                !params.category
                  ? "gradient-bg text-white border-transparent"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={getToolsHref({ category: cat.slug, pricing: params.pricing, sort: params.sort })}
                aria-current={params.category === cat.slug ? "page" : undefined}
                className={`min-h-10 rounded-full border px-3.5 py-2 text-sm transition-colors ${
                  params.category === cat.slug
                    ? "gradient-bg text-white border-transparent"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {cat.name} ({cat.toolCount})
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Filter by pricing
          </h2>
          <nav aria-label="Filter tools by pricing" className="flex flex-wrap gap-2">
            {TOOL_PRICING_OPTIONS.map((filter) => (
              <Link
                key={filter.value}
                href={getToolsHref({
                  category: params.category,
                  pricing: filter.value,
                  sort: params.sort,
                })}
                aria-current={(params.pricing || "all") === filter.value ? "page" : undefined}
                className={`min-h-10 rounded-full border px-3.5 py-2 text-sm transition-colors ${
                  (params.pricing || "all") === filter.value
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {filter.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={getToolsHref({
                  category: params.category,
                  pricing: params.pricing,
                  sort: params.sort,
                  page: p,
                })}
                className={`w-10 h-10 flex items-center justify-center rounded-xl border text-sm transition-all ${
                  p === page
                    ? "gradient-bg text-white border-transparent shadow-lg"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
