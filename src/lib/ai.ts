import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "@/lib/prisma";
import { ToolCardData } from "@/types";

// Helper to determine if an API key is a placeholder
function isKeyValid(key: string | undefined): boolean {
  if (!key) return false;
  const placeholderValues = [
    "your_openai_key",
    "your_gemini_api_key",
    "sk-your_openai_key",
    "dummy-key-for-build"
  ];
  return !placeholderValues.some(val => key.toLowerCase().includes(val.toLowerCase()));
}

const openAiKey = process.env.OPENAI_API_KEY;
const isOpenAIValid = isKeyValid(openAiKey);
const openai = isOpenAIValid ? new OpenAI({ apiKey: openAiKey }) : null;

const geminiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
const isGeminiValid = isKeyValid(geminiKey);
const googleGenAI = isGeminiValid ? new GoogleGenerativeAI(geminiKey!) : null;

/**
 * Get AI-powered tool recommendations based on user query
 */
export async function getAIRecommendations(query: string, topTools: ToolCardData[]) {
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

  // Try OpenAI first if valid
  if (isOpenAIValid && openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 1000,
      });

      const content = completion.choices[0]?.message?.content;
      if (content) {
        return JSON.parse(content);
      }
    } catch (error) {
      console.error("[OpenAI getAIRecommendations error]", error);
    }
  }

  // Try Gemini as a fallback if valid
  if (isGeminiValid && googleGenAI) {
    try {
      const model = googleGenAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
        },
      });
      const result = await model.generateContent(prompt);
      const content = result.response.text();
      if (content) {
        return JSON.parse(content);
      }
    } catch (error) {
      console.error("[Gemini getAIRecommendations error]", error);
    }
  }

  return null;
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
  const prompt = `Write a concise, helpful 2-3 paragraph AI-generated summary for this tool:

Tool: ${tool.name}
Description: ${tool.description}
Key Features: ${tool.features.join(", ")}
Pros: ${tool.pros.join(", ")}
Cons: ${tool.cons.join(", ")}
Pricing: ${tool.pricing}

Write an objective, informative summary that helps users understand when they should use this tool. Be concise and specific. Do not start with "This tool" or similar phrases.`;

  // Try OpenAI first if valid
  if (isOpenAIValid && openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 400,
      });

      const content = completion.choices[0]?.message?.content;
      if (content) {
        return content;
      }
    } catch (error) {
      console.error("[OpenAI generateToolSummary error]", error);
    }
  }

  // Try Gemini as a fallback if valid
  if (isGeminiValid && googleGenAI) {
    try {
      const model = googleGenAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      const result = await model.generateContent(prompt);
      const content = result.response.text();
      if (content) {
        return content;
      }
    } catch (error) {
      console.error("[Gemini generateToolSummary error]", error);
    }
  }

  return null;
}

/**
 * AI-powered tool comparison
 */
export async function compareToolsWithAI(toolA: ToolCardData, toolB: ToolCardData, useCase?: string) {
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

  // Try OpenAI first if valid
  if (isOpenAIValid && openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 600,
      });

      const content = completion.choices[0]?.message?.content;
      if (content) {
        return JSON.parse(content);
      }
    } catch (error) {
      console.error("[OpenAI compareToolsWithAI error]", error);
    }
  }

  // Try Gemini as a fallback if valid
  if (isGeminiValid && googleGenAI) {
    try {
      const model = googleGenAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
        },
      });
      const result = await model.generateContent(prompt);
      const content = result.response.text();
      if (content) {
        return JSON.parse(content);
      }
    } catch (error) {
      console.error("[Gemini compareToolsWithAI error]", error);
    }
  }

  return null;
}

// Update tool AI summary in DB
export async function updateToolAISummary(toolId: string, summary: string) {
  try {
    await prisma.aITool.update({
      where: { id: toolId },
      data: { aiSummary: summary },
    });
  } catch (error) {
    console.error("[updateToolAISummary error]", error);
  }
}

