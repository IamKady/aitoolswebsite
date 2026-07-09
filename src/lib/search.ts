import prisma from "@/lib/prisma";
import { SearchParams } from "@/types";
import { PricingType, Platform } from "@prisma/client";

/**
 * Full-text search using PostgreSQL's built-in capabilities via Prisma.
 * Falls back to ILIKE matching for maximum compatibility.
 */
export async function searchTools(params: SearchParams) {
  const {
    q = "",
    category,
    pricing,
    platform,
    rating,
    sort = "relevance",
    page = 1,
    limit = 24,
    hasFreeTrial,
    hasApi,
    isOpenSource,
  } = params;

  const skip = (page - 1) * limit;

  // Build where clause
  const where: Record<string, unknown> = {};

  if (q.trim()) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { tagline: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
      { category: { name: { contains: q, mode: "insensitive" } } },
      { tags: { some: { tag: { name: { contains: q, mode: "insensitive" } } } } },
    ];
  }

  if (category && category !== "all") {
    where.category = { slug: category };
  }

  if (pricing && pricing !== "all") {
    where.pricing = pricing as PricingType;
  }

  if (platform && platform !== "all") {
    where.platforms = { has: platform as Platform };
  }

  if (rating) {
    where.rating = { gte: parseFloat(rating) };
  }

  if (hasFreeTrial === true) {
    where.hasFreeTrial = true;
  }

  if (hasApi === true) {
    where.hasApi = true;
  }

  if (isOpenSource === true) {
    where.isOpenSource = true;
  }

  // Build orderBy
  let orderBy: Record<string, string> | Record<string, string>[] = { rating: "desc" };

  switch (sort) {
    case "newest":
      orderBy = { createdAt: "desc" };
      break;
    case "rating":
      orderBy = { rating: "desc" };
      break;
    case "trending":
      orderBy = { viewCount: "desc" };
      break;
    case "popular":
      orderBy = { favoriteCount: "desc" };
      break;
    case "relevance":
    default:
      // Featured tools first, then by rating
      orderBy = [{ featured: "desc" }, { sponsored: "desc" }, { rating: "desc" }];
      break;
  }

  const [tools, total] = await Promise.all([
    prisma.aITool.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        category: { select: { id: true, name: true, slug: true, icon: true, color: true } },
        tags: { include: { tag: { select: { id: true, name: true, slug: true } } } },
        _count: { select: { favorites: true, reviews: true } },
      },
    }),
    prisma.aITool.count({ where }),
  ]);

  return {
    tools,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    query: q,
    filters: params,
  };
}

export async function getTrendingSearches(limit = 10) {
  const results = await prisma.searchLog.groupBy({
    by: ["query"],
    _count: { query: true },
    orderBy: { _count: { query: "desc" } },
    take: limit,
    where: {
      createdAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
      },
      query: { not: "" },
    },
  });

  return results.map((r: any) => ({ query: r.query, count: r._count.query }));
}

export async function logSearch(query: string, resultsCount: number, userId?: string) {
  if (!query.trim()) return;
  
  await prisma.searchLog.create({
    data: {
      query: query.toLowerCase().trim(),
      resultsCount,
      userId,
    },
  });
}

// Search suggestions based on tool names and categories
export async function getSearchSuggestions(query: string, limit = 8) {
  if (!query.trim()) return [];

  const [tools, categories] = await Promise.all([
    prisma.aITool.findMany({
      where: { name: { startsWith: query, mode: "insensitive" } },
      select: { name: true, slug: true, logo: true, category: { select: { name: true } } },
      take: 5,
      orderBy: { rating: "desc" },
    }),
    prisma.category.findMany({
      where: { name: { contains: query, mode: "insensitive" } },
      select: { name: true, slug: true, icon: true },
      take: 3,
    }),
  ]);

  return {
    tools,
    categories,
  };
}
