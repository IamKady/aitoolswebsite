import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ToolCard } from "@/components/tools/ToolCard";
import { ArrowLeft, Sparkles } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = await prisma.aITool.findUnique({ where: { slug } });
  if (!tool) return { title: "Alternatives Not Found" };
  return {
    title: `Best ${tool.name} Alternatives & Similar AI Tools | AIToolHunt`,
    description: `Compare and find the best alternatives to ${tool.name}. Browse reviews, pricing plans, pros/cons, and core features of similar AI tools.`,
  };
}

export default async function AlternativesPage({ params }: Props) {
  const { slug } = await params;
  const tool = await prisma.aITool.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!tool) notFound();

  // Query linked alternatives
  const linkedAlternatives = await prisma.alternative.findMany({
    where: { toolId: tool.id },
    include: {
      alternative: {
        include: {
          category: true,
          tags: { include: { tag: true } },
          _count: { select: { favorites: true, reviews: true } }
        }
      }
    }
  });

  let alternatives = linkedAlternatives.map((la: any) => la.alternative).filter(Boolean);

  // If no explicit alternatives are mapped, load other tools in the same category
  if (alternatives.length === 0) {
    alternatives = await prisma.aITool.findMany({
      where: {
        categoryId: tool.categoryId,
        id: { not: tool.id }
      },
      orderBy: { rating: "desc" },
      take: 8,
      include: {
        category: true,
        tags: { include: { tag: true } },
        _count: { select: { favorites: true, reviews: true } }
      }
    });
  }

  return (
    <div className="min-h-screen">
      {/* Header Banner */}
      <div className="border-b border-border bg-card/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/tools/${tool.slug}`}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to {tool.name} Review
          </Link>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium mb-3">
            <Sparkles className="w-3 h-3" />
            Similar Tools
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Best <span className="gradient-text">{tool.name} Alternatives</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl">
            Compare similar AI tools in the <span className="text-foreground font-semibold">{tool.category.name}</span> category. Find the best pricing, features, and user ratings to choose the right fit for your task.
          </p>
        </div>
      </div>

      {/* Alternatives Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {alternatives.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {alternatives.map((altTool: any) => (
              <ToolCard key={altTool.id} tool={altTool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground bg-card border border-border rounded-2xl max-w-lg mx-auto">
            <p className="text-sm">We couldn&apos;t find any alternatives for this tool yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
