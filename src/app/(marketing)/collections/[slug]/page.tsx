import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ToolCard } from "@/components/tools/ToolCard";
import { ArrowLeft, Layers } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const col = await prisma.collection.findUnique({ where: { slug } });
  if (!col) return { title: "Collection Not Found" };
  return {
    title: `${col.title} | AI Tool Collections`,
    description: col.description || `Browse the best tools in the ${col.title} collection on AIToolHunt.`,
  };
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const col = await prisma.collection.findUnique({
    where: { slug },
  });

  if (!col) notFound();

  // Load tools linked in this collection
  // Wait, in mockDb and seed, collections have 'tools' nested or mapped.
  // In the DB, CollectionTool maps collectionId and toolId.
  // Our proxy findUnique mock handles loading. Let's query it.
  const colWithTools = await prisma.collection.findUnique({
    where: { slug },
    include: {
      tools: {
        orderBy: { order: "asc" },
        include: {
          tool: {
            include: {
              category: true,
              tags: { include: { tag: true } },
              _count: { select: { favorites: true, reviews: true } }
            }
          }
        }
      }
    }
  } as any);

  const tools = (colWithTools?.tools || []).map((t: any) => t.tool).filter(Boolean);

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="border-b border-border bg-card/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Collections
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-5xl">{col.emoji || "📦"}</div>
            <div>
              <div className="inline-flex items-center gap-1 text-xs text-primary font-medium bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full mb-1">
                <Layers className="w-3 h-3" />
                Curated Collection
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {col.title}
              </h1>
            </div>
          </div>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl">
            {col.description}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {tools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool: any) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground bg-card border border-border rounded-2xl">
            <p className="text-sm">No tools are added to this collection yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
