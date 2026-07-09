import { NextRequest, NextResponse } from "next/server";
import { compareToolsWithAI } from "@/lib/ai";
import { ToolCardData } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { toolA, toolB, useCase } = await req.json();

    if (!toolA || !toolB) {
      return NextResponse.json({ error: "Both tools are required for comparison" }, { status: 400 });
    }

    // Try calling OpenAI compare
    let comparison = await compareToolsWithAI(toolA as ToolCardData, toolB as ToolCardData, useCase);

    // Fallback: If OpenAI key is missing or calls fail, use heuristics
    if (!comparison) {
      const betterRating = toolA.rating >= toolB.rating ? toolA : toolB;
      const lowerPrice = (toolA.startingPrice || 0) <= (toolB.startingPrice || 0) ? toolA : toolB;
      
      comparison = {
        summary: `Comparing ${toolA.name} and ${toolB.name} in the ${toolA.category.name} category. ${toolA.name} has a user rating of ${toolA.rating} and starting price of $${toolA.startingPrice || 0}/mo, whereas ${toolB.name} is rated ${toolB.rating} starting at $${toolB.startingPrice || 0}/mo.`,
        winner: toolA.rating > toolB.rating ? toolA.slug : toolA.rating < toolB.rating ? toolB.slug : "tie",
        winnerReason: `${betterRating.name} scores slightly higher in community user ratings (${betterRating.rating.toFixed(1)}/5).`,
        toolA: {
          strengths: [`Rated ${toolA.rating.toFixed(1)}/5 by users`, `${toolA.pricing} tier availability`],
          weaknesses: [toolA.startingPrice ? `Starts at $${toolA.startingPrice}/mo` : "Paid features apply"]
        },
        toolB: {
          strengths: [`Rated ${toolB.rating.toFixed(1)}/5 by users`, `${toolB.pricing} tier availability`],
          weaknesses: [toolB.startingPrice ? `Starts at $${toolB.startingPrice}/mo` : "Paid features apply"]
        },
        recommendation: `Choose ${toolA.name} if you prioritize its specific ecosystem, or select ${toolB.name} if you want another solution starting at $${toolB.startingPrice || 0}/mo.`
      };
    }

    return NextResponse.json(comparison);
  } catch (error) {
    console.error("[API_COMPARE_POST]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
