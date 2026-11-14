"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clipboard,
  Code2,
  GraduationCap,
  Rocket,
  Sparkles,
  Video,
  type LucideIcon,
} from "lucide-react";

type Mission = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  steps: {
    stage: string;
    tool: string;
    slug: string;
    detail: string;
  }[];
};

const MISSIONS: Mission[] = [
  {
    id: "video",
    title: "Make a video",
    description: "Go from first idea to finished video.",
    icon: Video,
    steps: [
      { stage: "01 / Find the idea", tool: "ChatGPT", slug: "chatgpt", detail: "Shape your concept and outline." },
      { stage: "02 / Write the script", tool: "Claude", slug: "claude", detail: "Turn the outline into a story." },
      { stage: "03 / Create the voice", tool: "ElevenLabs", slug: "elevenlabs", detail: "Give your script a voice." },
      { stage: "04 / Build the video", tool: "HeyGen", slug: "heygen", detail: "Bring your story on screen." },
    ],
  },
  {
    id: "launch",
    title: "Launch a brand",
    description: "Build the pieces for your next big idea.",
    icon: Rocket,
    steps: [
      { stage: "01 / Research", tool: "Perplexity AI", slug: "perplexity-ai", detail: "Get a feel for your market." },
      { stage: "02 / Find your look", tool: "Canva AI", slug: "canva", detail: "Explore a visual direction." },
      { stage: "03 / Build the site", tool: "Bolt.new", slug: "bolt-new", detail: "Turn your idea into a website." },
      { stage: "04 / Write your copy", tool: "Jasper", slug: "jasper", detail: "Give your launch a clear voice." },
    ],
  },
  {
    id: "software",
    title: "Ship software",
    description: "Turn a rough concept into a working product.",
    icon: Code2,
    steps: [
      { stage: "01 / Explore the idea", tool: "Perplexity AI", slug: "perplexity-ai", detail: "Research the problem space." },
      { stage: "02 / Sketch a prototype", tool: "Bolt.new", slug: "bolt-new", detail: "Get a first version on screen." },
      { stage: "03 / Pair on code", tool: "GitHub Copilot", slug: "github-copilot", detail: "Build with an AI coding partner." },
      { stage: "04 / Refine the build", tool: "Cursor", slug: "cursor", detail: "Iterate in an AI-first editor." },
    ],
  },
  {
    id: "study",
    title: "Study smarter",
    description: "Make a more focused path through a new topic.",
    icon: GraduationCap,
    steps: [
      { stage: "01 / Start with a question", tool: "Perplexity AI", slug: "perplexity-ai", detail: "Get oriented with a topic." },
      { stage: "02 / Make it make sense", tool: "ChatGPT", slug: "chatgpt", detail: "Break down complex ideas." },
      { stage: "03 / Go deeper", tool: "Claude", slug: "claude", detail: "Explore the details at your pace." },
      { stage: "04 / Save your notes", tool: "Notion AI", slug: "notion-ai", detail: "Keep your study notes together." },
    ],
  },
];

export function StackBuilder() {
  const [activeMission, setActiveMission] = useState(MISSIONS[0]);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  async function copyStack() {
    try {
      await navigator.clipboard.writeText(
        `${activeMission.title}\n${activeMission.steps
          .map((step) => `${step.stage.split(" / ")[1]}: ${step.tool}`)
          .join("\n")}`
      );
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-4 w-4" />
              The stack studio
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Big idea? <span className="gradient-text">Here&apos;s your stack.</span>
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Pick what you&apos;re working on. We&apos;ll map out a useful lineup of AI tools, one step at a time.
            </p>
          </div>
          <Link
            href="/workflows"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Explore all workflows <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-primary/[0.04] lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="border-b border-border bg-muted/30 p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              What are you making?
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {MISSIONS.map((mission) => {
                const Icon = mission.icon;
                const isActive = activeMission.id === mission.id;
                return (
                  <button
                    key={mission.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setActiveMission(mission);
                      setCopyState("idle");
                    }}
                    className={`group flex items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                      isActive
                        ? "border-primary/30 bg-primary/10 shadow-sm"
                        : "border-transparent hover:border-border hover:bg-background/70"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        isActive ? "gradient-bg text-white" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-sm font-semibold ${isActive ? "text-primary" : "text-foreground"}`}>
                        {mission.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{mission.description}</span>
                    </span>
                    <ArrowRight className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground/50"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative overflow-hidden p-5 sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/[0.07] blur-3xl" />
            <div className="relative">
              <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Your AI stack</p>
                  <h3 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">{activeMission.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={copyStack}
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-border bg-background/70 px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                >
                  {copyState === "copied" ? <Check className="h-3.5 w-3.5" /> : <Clipboard className="h-3.5 w-3.5" />}
                  {copyState === "copied" ? "Copied" : "Copy stack"}
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {activeMission.steps.map((step, index) => (
                  <div
                    key={`${activeMission.id}-${step.slug}`}
                    className="group relative flex min-h-40 flex-col rounded-2xl border border-border bg-background/75 p-4 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.06]"
                  >
                    <span className="mb-5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{step.stage.split(" / ")[1]}</p>
                    <Link
                      href={`/tools/${step.slug}`}
                      className="mt-1 inline-flex items-center gap-1 text-base font-bold text-foreground transition-colors hover:text-primary"
                    >
                      {step.tool}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex min-h-5 items-center justify-between gap-4">
                <p aria-live="polite" className="text-xs text-muted-foreground">
                  {copyState === "error" ? "Couldn’t copy. Check clipboard permissions and try again." : "A thoughtfully connected starting point. Make it your own."}
                </p>
                <Link
                  href="/workflows"
                  className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  See how it flows <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
