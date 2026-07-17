import { NextRequest, NextResponse } from "next/server";
import { generateToolSummary, updateToolAISummary } from "@/lib/ai";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { toolId } = await req.json();

    if (!toolId) {
      return NextResponse.json({ error: "Tool ID is required" }, { status: 400 });
    }

    const tool = await prisma.aITool.findUnique({
      where: { id: toolId },
      include: {
        features: { orderBy: { order: "asc" } },
        pros: true,
        cons: true,
      },
    });

    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

        // Call OpenAI summary generator
    let summary = null;
    try {
      summary = await generateToolSummary({
        name: tool.name,
        description: tool.description,
        features: tool.features.map((f: any) => f.text),
        pros: tool.pros.map((p: any) => p.text),
        cons: tool.cons.map((c: any) => c.text),
        pricing: tool.pricing,
      });
    } catch (error) {
      console.error("[generateToolSummary error]", error);
    }

    // Fallback: If OpenAI key is missing, build template summary
    if (!summary) {
      summary = `${tool.name} is a professional-grade AI tool designed for ${tool.tagline}. Key features include: ${tool.features.slice(0, 3).map((f: any) => f.text).join(", ")}. It is offered under a ${tool.pricing.replace("_", " ").toLowerCase()} model, making it a highly optimized solution for teams and individuals seeking advanced workflows.`;
    }

    // Update in database if possible
    await updateToolAISummary(tool.id, summary).catch(() => {});

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("[API_SUMMARY_POST]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
