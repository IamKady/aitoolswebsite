import { Metadata } from "next";
import { Mail, ShieldCheck, Zap, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "ToolWire AI Newsletter | Stay Ahead in AI",
  description: "Subscribe to the ToolWire AI newsletter. Get the latest AI news, tutorials, workflow chains, and tool drops directly in your inbox.",
};

export default function NewsletterPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-card/20 to-background flex items-center justify-center">
      <div className="max-w-xl w-full p-8 rounded-2xl border border-border bg-card/60 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-12 -right-12 w-32 h-32 gradient-bg rounded-full blur-3xl opacity-20" />

        <div className="text-center space-y-6">
          <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto shadow-lg shadow-primary/20">
            <Mail className="w-6 h-6 text-white" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              The <span className="gradient-text">ToolWire AI</span> Digest
            </h1>
            <p className="text-sm text-muted-foreground">
              Join 12,000+ developers, creators, and professionals receiving curated tool updates weekly.
            </p>
          </div>

          <form action="/api/newsletter" method="POST" className="space-y-3 pt-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl gradient-bg text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              Subscribe Free
            </button>
          </form>

          {/* Value Props */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-6 border-t border-border mt-6">
            <div className="flex gap-2.5 items-start">
              <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-foreground">Weekly Tool Drops</h4>
                <p className="text-[10px] text-muted-foreground">Only curated, high-quality releases. Zero spam.</p>
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-foreground">AI Workflows</h4>
                <p className="text-[10px] text-muted-foreground">Step-by-step guides linking AI tools together.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground pt-4">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            No spam. Unsubscribe anytime.
          </div>
        </div>
      </div>
    </div>
  );
}
