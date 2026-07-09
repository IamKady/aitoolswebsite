import OpenAI from "openai";
import prisma from "@/lib/prisma";
import { ToolCardData } from "@/types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Get AI-powered tool recommendations based on user query
 */
export async function getAIRecommendations(query: string, topTools: ToolCardData[]) {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  const toolSummaries = topTools.slice(0, 10).map((t) => ({
    name: t.name,
    slug: t.slug,
    description: t.tagline,
    pricing: t.pricing,
    rating: t.rating,
    category: t.category.name,
  }));

  const prompt = `You are an AI tool expert. A user is looking for: "${query}"

Here are the top matching AI tools from our database:
${JSON.stringify(toolSummaries, null, 2)}

Analyze these tools and return a JSON response with the following structure:
{
  "message": "A helpful 2-3 sentence summary addressing the user's need",
  "recommendations": [
    {
      "slug": "tool-slug",
      "reason": "Why this tool is perfect for this use case (1-2 sentences)",
      "score": 95,
      "pros": ["Pro 1", "Pro 2", "Pro 3"],
      "cons": ["Con 1", "Con 2"]
    }
  ]
}

Only include tools from the provided list. Rank by best fit for the query. Include top 3-5 tools. Be specific about why each tool fits.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 1000,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) return null;

  return JSON.parse(content);
}

/**
 * Generate an AI summary for a specific tool
 */
export async function generateToolSummary(tool: {
  name: string;
  description: string;
  features: string[];
  pros: string[];
  cons: string[];
  pricing: string;
}): Promise<string | null> {
  if (!process.env.OPENAI_API_KEY) return null;

  const prompt = `Write a concise, helpful 2-3 paragraph AI-generated summary for this tool:

Tool: ${tool.name}
Description: ${tool.description}
Key Features: ${tool.features.join(", ")}
Pros: ${tool.pros.join(", ")}
Cons: ${tool.cons.join(", ")}
Pricing: ${tool.pricing}

Write an objective, informative summary that helps users understand when they should use this tool. Be concise and specific. Do not start with "This tool" or similar phrases.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 400,
  });

  return completion.choices[0]?.message?.content || null;
}

/**
 * AI-powered tool comparison
 */
export async function compareToolsWithAI(toolA: ToolCardData, toolB: ToolCardData, useCase?: string) {
  if (!process.env.OPENAI_API_KEY) return null;

  const prompt = `Compare these two AI tools${useCase ? ` for: "${useCase}"` : ""}:

Tool A: ${toolA.name}
- Description: ${toolA.tagline}
- Pricing: ${toolA.pricing} (${toolA.startingPrice ? `from $${toolA.startingPrice}/mo` : "free"})
- Rating: ${toolA.rating}/5
- Category: ${toolA.category.name}

Tool B: ${toolB.name}
- Description: ${toolB.tagline}
- Pricing: ${toolB.pricing} (${toolB.startingPrice ? `from $${toolB.startingPrice}/mo` : "free"})
- Rating: ${toolB.rating}/5
- Category: ${toolB.category.name}

Return JSON:
{
  "summary": "2-3 sentence overview of the comparison",
  "winner": "${toolA.slug} or ${toolB.slug} or tie",
  "winnerReason": "Why the winner is better overall (1 sentence)",
  "toolA": { "strengths": ["strength1", "strength2"], "weaknesses": ["weakness1"] },
  "toolB": { "strengths": ["strength1", "strength2"], "weaknesses": ["weakness1"] },
  "recommendation": "Who should use Tool A vs Tool B"
}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 600,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) return null;
  return JSON.parse(content);
}

// Update tool AI summary in DB
export async function updateToolAISummary(toolId: string, summary: string) {
  await prisma.aITool.update({
    where: { id: toolId },
    data: { aiSummary: summary },
  });
}
