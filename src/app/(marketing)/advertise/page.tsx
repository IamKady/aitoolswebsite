import { Metadata } from "next";
import Link from "next/link";
import { Megaphone, Star, BarChart, ArrowRight, Zap, Target, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Advertise on ToolWire AI | Sponsor Placements",
  description: "Promote your AI product to over 50,000+ monthly AI enthusiasts, developers, and creators. Sponsor placements, newsletters, and featured tool directories.",
};

export default function AdvertisePage() {
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="border-b border-border bg-card/50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium mb-4">
            <Megaphone className="w-3.5 h-3.5" />
            Sponsorship Opportunities
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Promote Your Product on <span className="gradient-text">ToolWire AI</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
            Get your AI tool in front of over 50,000+ monthly developers, creators, and business builders.
          </p>
        </div>
      </div>

      {/* Stats and Sponsorship packages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-border bg-card flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center text-white flex-shrink-0">
              <BarChart className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">50,000+</div>
              <div className="text-xs text-muted-foreground">Monthly Unique Views</div>
            </div>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-card flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center text-white flex-shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">62% Devs/Mktrs</div>
              <div className="text-xs text-muted-foreground">Highly Targeted Audience</div>
            </div>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-card flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center text-white flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">12,000+</div>
              <div className="text-xs text-muted-foreground">Newsletter Subscribers</div>
            </div>
          </div>
        </div>

        {/* Sponsor Options */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-6">Sponsorship Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border border-border bg-card flex flex-col justify-between">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold border border-primary/20">POPULAR</span>
                <h3 className="text-lg font-bold text-foreground mt-2 mb-3">Featured Directory Placement</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  Secure a highlighted spot in the main tool grid and category pages. Featured tools receive 4-5x more clicks, priority SEO backlinks, and are highlighted with visual badges.
                </p>
              </div>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-1.5 py-3 w-full rounded-xl bg-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Inquire Placement
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-8 rounded-2xl border border-border bg-card flex flex-col justify-between">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 border border-purple-500/20 font-semibold">DIGEST</span>
                <h3 className="text-lg font-bold text-foreground mt-2 mb-3">Newsletter Sponsorship</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  Include a dedicated shoutout, descriptive pitch, and direct backlinks in our weekly ToolWire AI newsletter sent directly to 12,000+ inbox subscribers.
                </p>
              </div>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-1.5 py-3 w-full rounded-xl bg-purple-600 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Inquire Newsletter Spot
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
