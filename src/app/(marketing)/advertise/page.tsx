import { Metadata } from "next";
import Link from "next/link";
import { Megaphone, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Advertise on ToolWire AI",
  description:
    "Ask about clearly labeled sponsorship opportunities for AI tools, including directory and newsletter placements.",
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
            Reach people exploring <span className="gradient-text">AI tools</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
            Ask about sponsorship options, current availability, audience data, and pricing before planning a campaign.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-xl font-bold text-foreground">Clear, responsible sponsorships</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Paid placements are labeled “Sponsored.” Sponsorship does not guarantee
            reviews, recommendations, search rankings, backlinks, traffic, or sales.
            Ask for current performance data and campaign terms before booking.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-6">Ask about a placement</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border border-border bg-card flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1 text-xs text-primary font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Clearly labeled
                </span>
                <h3 className="text-lg font-bold text-foreground mt-2 mb-3">Sponsored tool listing</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  Introduce your AI product to people comparing tools. Ask about suitable pages, placement availability, pricing, and reporting.
                </p>
              </div>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-1.5 py-3 w-full rounded-xl bg-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Ask about a listing
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-8 rounded-2xl border border-border bg-card flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1 text-xs text-primary font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Clearly labeled
                </span>
                <h3 className="text-lg font-bold text-foreground mt-2 mb-3">Newsletter Sponsorship</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  Discuss a relevant sponsored feature in a newsletter edition. Availability, audience size, and campaign terms are confirmed before booking.
                </p>
              </div>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-1.5 py-3 w-full rounded-xl bg-purple-600 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Ask about a newsletter feature
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
