import { NextRequest, NextResponse } from "next/server";
import { searchTools, logSearch } from "@/lib/search";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { userId } = await auth();

    const params = {
      q: searchParams.get("q") || "",
      category: searchParams.get("category") || undefined,
      pricing: searchParams.get("pricing") as "FREE" | "FREEMIUM" | "PAID" | "OPEN_SOURCE" | "all" | undefined,
      platform: searchParams.get("platform") as "WEB" | "IOS" | "ANDROID" | undefined,
      rating: searchParams.get("rating") || undefined,
      sort: (searchParams.get("sort") as "relevance" | "rating" | "newest" | "trending" | "popular") || "relevance",
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "24"),
      hasFreeTrial: searchParams.get("hasFreeTrial") === "true",
      hasApi: searchParams.get("hasApi") === "true",
      isOpenSource: searchParams.get("isOpenSource") === "true",
    };

    const results = await searchTools(params);

    // Log the search asynchronously
    if (params.q) {
      logSearch(params.q, results.total, userId || undefined).catch(() => {});
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("[SEARCH_GET]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
