import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { ToolCard } from "@/components/tools/ToolCard";
import prisma from "@/lib/prisma";
import type { ToolCardData } from "@/types";

export async function FeaturedTools() {
  const tools: ToolCardData[] = await prisma.aITool.findMany({
    where: { featured: true },
    orderBy: { updatedAt: "desc" },
    take: 6,
    include: {
      category: {
        select: { id: true, name: true, slug: true, icon: true, color: true },
      },
      tags: { include: { tag: true } },
      _count: { select: { favorites: true, reviews: true } },
    },
  });

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
              <Flame aria-hidden="true" className="h-4 w-4 text-orange-500" />
              Featured
            </p>
            <h2 className="text-3xl font-bold text-foreground">
              AI tools worth exploring
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Compare the details and choose what fits your needs.
            </p>
          </div>
          <Link
            href="/tools?featured=true"
            className="hidden items-center gap-1 text-sm text-primary hover:underline sm:flex"
          >
            View all <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </div>

        {tools.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Featured tools will appear here.{" "}
            <Link href="/tools" className="font-medium text-primary hover:underline">
              Browse the directory
            </Link>
            .
          </p>
        )}
      </div>
    </section>
  );
}
