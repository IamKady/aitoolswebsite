import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ToolCard } from "@/components/tools/ToolCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { title: "Category Not Found" };
  return {
    title: `Best ${category.name} AI Tools | ToolWire AI`,
    description: `Discover the best ${category.name} AI tools. Compare features, pricing, and reviews to find the perfect tool for your needs.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) notFound();

  const tools = await prisma.aITool.findMany({
    where: { categoryId: category.id },
    orderBy: [{ featured: "desc" }, { rating: "desc" }],
    include: {
      category: { select: { id: true, name: true, slug: true, icon: true, color: true } },
      tags: { include: { tag: true } },
      _count: { select: { favorites: true, reviews: true } },
    },
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border py-10 px-4 sm:px-6 lg:px-8" style={{ background: `linear-gradient(135deg, ${category.color}10, transparent)` }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ backgroundColor: `${category.color}20` }}>
              🤖
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Best <span className="gradient-text">{category.name}</span> AI Tools
              </h1>
              <p className="text-muted-foreground text-sm mt-1">{tools.length} tools found</p>
            </div>
          </div>
          {category.description && (
            <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">{category.description}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {tools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {tools.map((tool: any) => (
              <ToolCard key={tool.id} tool={tool as Parameters<typeof ToolCard>[0]['tool']} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p>No tools in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
