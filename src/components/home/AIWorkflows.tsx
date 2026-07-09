import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";

const WORKFLOWS = [
  {
    title: "Create YouTube Videos with AI",
    slug: "create-youtube-videos",
    emoji: "🎬",
    steps: [
      { label: "Idea Generation", tool: "ChatGPT", toolSlug: "chatgpt" },
      { label: "Script Writing", tool: "Claude", toolSlug: "claude" },
      { label: "Voice Over", tool: "ElevenLabs", toolSlug: "elevenlabs" },
      { label: "Video Creation", tool: "HeyGen", toolSlug: "heygen" },
      { label: "Thumbnail Design", tool: "Midjourney", toolSlug: "midjourney" },
      { label: "SEO Optimization", tool: "Surfer SEO", toolSlug: "surfer-seo" },
    ],
  },
  {
    title: "Build a Website Without Coding",
    slug: "build-website-no-code",
    emoji: "🌐",
    steps: [
      { label: "Plan & Research", tool: "Perplexity AI", toolSlug: "perplexity-ai" },
      { label: "Design & Prototype", tool: "Canva AI", toolSlug: "canva" },
      { label: "Build & Deploy", tool: "Bolt.new", toolSlug: "bolt-new" },
      { label: "Write Content", tool: "Jasper", toolSlug: "jasper" },
      { label: "Generate Images", tool: "Leonardo AI", toolSlug: "leonardo-ai" },
      { label: "Launch & SEO", tool: "Semrush AI", toolSlug: "semrush" },
    ],
  },
];

export function AIWorkflows() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Step-by-Step Guides
          </p>
          <h2 className="text-3xl font-bold text-foreground">
            AI <span className="gradient-text">Workflow</span> Templates
          </h2>
          <p className="text-muted-foreground mt-2 text-sm max-w-xl mx-auto">
            Discover the best AI tools for every step of your workflow.
            From idea to launch, we&apos;ve got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {WORKFLOWS.map((workflow) => (
            <div
              key={workflow.slug}
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-3 mb-6">
                <span className="text-3xl">{workflow.emoji}</span>
                <div>
                  <h3 className="font-bold text-foreground">{workflow.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {workflow.steps.length} steps · AI-powered workflow
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {workflow.steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      {i < workflow.steps.length - 1 && (
                        <div className="w-px h-4 bg-border mt-1" />
                      )}
                    </div>
                    <div className="flex-1 flex items-center justify-between py-1 px-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <span className="text-sm text-muted-foreground">{step.label}</span>
                      <Link
                        href={`/tools/${step.toolSlug}`}
                        className="text-xs font-medium text-primary hover:underline flex items-center gap-0.5"
                      >
                        {step.tool}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                    {i < workflow.steps.length - 1 && (
                      <ArrowDown className="w-3.5 h-3.5 text-muted-foreground opacity-0" />
                    )}
                  </div>
                ))}
              </div>

              <Link
                href={`/workflows/${workflow.slug}`}
                className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-primary/30 text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
              >
                View Full Workflow
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/workflows"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            Explore all AI workflows →
          </Link>
        </div>
      </div>
    </section>
  );
}
