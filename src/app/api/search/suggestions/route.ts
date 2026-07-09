import { NextRequest, NextResponse } from "next/server";
import { getSearchSuggestions } from "@/lib/search";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";

    if (q.length < 2) {
      return NextResponse.json({ tools: [], categories: [] });
    }

    const suggestions = await getSearchSuggestions(q, 8);
    return NextResponse.json(suggestions);
  } catch (error) {
    console.error("[SUGGESTIONS_GET]", error);
    return NextResponse.json({ tools: [], categories: [] });
  }
}
