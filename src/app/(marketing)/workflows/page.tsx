import Link from "next/link";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { ArrowRight, Cpu, ArrowDown } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Workflows & Guides | ToolWire AI",
  description: "Browse step-by-step AI workflow templates. Combine multiple AI tools to automate your content creation, coding, and business workflows.",
};

export default async function WorkflowsPage() {
  const workflows = await prisma.workflow.findMany({
    include: {
      steps: {
        orderBy: { order: "asc" },
        include: { tool: true }
      }
    }
  } as any);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium mb-4">
            <Cpu className="w-3.5 h-3.5" />
            AI Workflow Chains
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            AI <span className="gradient-text">Workflow Templates</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto">
            Learn how to chain multiple AI tools together to complete complex real-world projects from start to finish.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {workflows.map((wf: any) => (
            <div
              key={wf.slug}
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{wf.emoji || "🎬"}</span>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{wf.title}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {wf.steps?.length || 0} steps · AI-powered pipeline
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {wf.description}
                </p>

                {/* Steps inline preview */}
                <div className="space-y-2 mb-6">
                  {wf.steps?.slice(0, 4).map((step: any, idx: number) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                          {idx + 1}
                        </div>
                      </div>
                      <div className="flex-1 flex items-center justify-between py-1.5 px-3 rounded-xl bg-muted/30 text-xs">
                        <span className="font-medium text-foreground">{step.title}</span>
                        {step.tool && (
                          <span className="text-primary font-semibold">{step.tool.name}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  {wf.steps && wf.steps.length > 4 && (
                    <div className="text-center text-[10px] text-muted-foreground font-semibold pt-1">
                      + {wf.steps.length - 4} more steps
                    </div>
                  )}
                </div>
              </div>

              <Link
                href={`/workflows/${wf.slug}`}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-primary/30 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-200"
              >
                View Full Workflow Plan
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
