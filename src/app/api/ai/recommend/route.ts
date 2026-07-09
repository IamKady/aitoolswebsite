import { NextRequest, NextResponse } from "next/server";
import { searchTools } from "@/lib/search";
import { getAIRecommendations } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query?.trim()) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // First, get the top matching tools from search
    const searchResults = await searchTools({ q: query, limit: 10, sort: "relevance" });

    // Then, get AI recommendations based on those tools
    let aiData = null;
    if (searchResults.tools.length > 0) {
      aiData = await getAIRecommendations(query, searchResults.tools as Parameters<typeof getAIRecommendations>[1]);
    }

    // Merge AI recommendations with tool data
    let recommendations = [];
    if (aiData?.recommendations) {
      recommendations = aiData.recommendations.map((rec: { slug: string; reason: string; score: number; pros: string[]; cons: string[] }) => {
        const tool = searchResults.tools.find((t: any) => t.slug === rec.slug);
        return tool ? { tool, reason: rec.reason, score: rec.score, pros: rec.pros, cons: rec.cons } : null;
      }).filter(Boolean);
    }

    // Fallback: return search results without AI analysis
    if (recommendations.length === 0) {
      recommendations = searchResults.tools.slice(0, 5).map((tool: any) => ({
        tool,
        reason: `${tool.name} matches your requirements for "${query}"`,
        score: Math.round(tool.rating * 20),
        pros: [],
        cons: [],
      }));
    }

    return NextResponse.json({
      message: aiData?.message || `Found ${searchResults.total} AI tools matching your request.`,
      recommendations,
      query,
    });
  } catch (error) {
    console.error("[AI_RECOMMEND_POST]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
