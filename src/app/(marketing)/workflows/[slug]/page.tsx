import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ToolCard } from "@/components/tools/ToolCard";
import { ArrowLeft, Cpu, ArrowDown, Star, CheckCircle, ExternalLink } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const wf = await prisma.workflow.findUnique({ where: { slug } });
  if (!wf) return { title: "Workflow Not Found" };
  return {
    title: `${wf.title} | AI Workflows`,
    description: wf.description || `Chain AI tools step-by-step for ${wf.title}.`,
  };
}

export default async function WorkflowDetailPage({ params }: Props) {
  const { slug } = await params;
  const wf = await prisma.workflow.findUnique({
    where: { slug },
  });

  if (!wf) notFound();

  // Load steps with tool included
  const wfWithSteps = await prisma.workflow.findUnique({
    where: { slug },
    include: {
      steps: {
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

  const steps = wfWithSteps?.steps || [];

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="border-b border-border bg-card/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/workflows"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Workflows
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-5xl">{wf.emoji || "🎬"}</div>
            <div>
              <div className="inline-flex items-center gap-1 text-xs text-primary font-medium bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full mb-1">
                <Cpu className="w-3.5 h-3.5" />
                AI Workflow Chain
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {wf.title}
              </h1>
            </div>
          </div>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl">
            {wf.description}
          </p>
        </div>
      </div>

      {/* Steps List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {steps.map((step: any, idx: number) => (
            <div key={step.id} className="relative flex flex-col md:flex-row gap-6 items-start">
              {/* Step indicator */}
              <div className="flex items-center md:flex-col items-center gap-3 md:gap-4 flex-shrink-0">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/25">
                  {idx + 1}
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block w-0.5 h-32 bg-border relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary to-transparent opacity-20" />
                  </div>
                )}
              </div>

              {/* Step content */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    {step.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                    {step.description}
                  </p>
                </div>

                {/* Recommended Tool section */}
                {step.tool && (
                  <div className="p-5 rounded-2xl border border-border bg-card hover:border-primary/20 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                          Recommended AI Tool
                        </div>
                        <h3 className="text-lg font-bold text-foreground">
                          {step.tool.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {step.tool.tagline}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 bg-accent px-2.5 py-1 rounded-full text-xs font-semibold">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        {step.tool.rating.toFixed(1)}
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                      {step.tool.description}
                    </p>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/tools/${step.tool.slug}`}
                        className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary font-semibold hover:bg-primary/20 transition-all duration-200"
                      >
                        Read Full Review
                      </Link>
                      <a
                        href={step.tool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground font-semibold transition-all duration-200"
                      >
                        Visit Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
