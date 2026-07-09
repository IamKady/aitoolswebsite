import Link from "next/link";
import { ToolCard } from "@/components/tools/ToolCard";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All AI Tools — 500+ Curated AI Tools",
  description: "Browse 500+ curated AI tools across 30+ categories. Find AI tools for writing, coding, image generation, video, audio, productivity, and more.",
};

interface Props {
  searchParams: Promise<{ category?: string; pricing?: string; sort?: string; page?: string }>;
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

  const [tools, total, categories] = await Promise.all([
    prisma.aITool.findMany({
      where,
      take: limit,
      skip: (page - 1) * limit,
      orderBy,
      include: {
        category: { select: { id: true, name: true, slug: true, icon: true, color: true } },
        tags: { include: { tag: true } },
        _count: { select: { favorites: true, reviews: true } },
      },
    }),
    prisma.aITool.count({ where }),
    prisma.category.findMany({
      select: { name: true, slug: true, icon: true, toolCount: true },
      orderBy: { toolCount: "desc" },
      take: 20,
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card/50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            All <span className="gradient-text">AI Tools</span>
          </h1>
          <p className="text-muted-foreground text-sm">{total} tools found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category quick filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/tools"
            className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
              !params.category ? "gradient-bg text-white border-transparent" : "border-border text-muted-foreground hover:border-primary/50"
            }`}
          >
            All
          </Link>
          {categories.map((cat: any) => (
            <Link
              key={cat.slug}
              href={`/tools?category=${cat.slug}`}
              className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                params.category === cat.slug
                  ? "gradient-bg text-white border-transparent"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {cat.name} ({cat.toolCount})
            </Link>
          ))}
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {tools.map((tool: any) => (
            <ToolCard key={tool.id} tool={tool as Parameters<typeof ToolCard>[0]['tool']} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/tools?page=${p}${params.category ? `&category=${params.category}` : ""}`}
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
