import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category");
    const pricing = searchParams.get("pricing");
    const limit = parseInt(searchParams.get("limit") || "10");

    const where: Record<string, any> = {};
    if (categorySlug) {
      where.category = { slug: categorySlug };
    }
    if (pricing && pricing !== "all") {
      where.pricing = pricing;
    }

    const tools = await prisma.aITool.findMany({
      where,
      take: limit,
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
      orderBy: { rating: "desc" },
    });

    return NextResponse.json(tools);
  } catch (error) {
    console.error("[API_TOOLS_GET]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
