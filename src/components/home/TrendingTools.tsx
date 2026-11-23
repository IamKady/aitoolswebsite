import prisma from "@/lib/prisma";
import type { ToolCardData } from "@/types";
import { TrendingToolGrid } from "@/components/home/TrendingToolGrid";

export async function TrendingTools() {
  const tools: ToolCardData[] = await prisma.aITool.findMany({
    where: { trending: true },
    orderBy: [{ viewCount: "desc" }, { updatedAt: "desc" }],
    take: 12,
    include: {
      category: {
        select: { id: true, name: true, slug: true, icon: true, color: true },
      },
      tags: { include: { tag: true } },
      _count: { select: { favorites: true, reviews: true } },
    },
  });

  return <TrendingToolGrid tools={tools} />;
}
