import { Metadata } from "next";
import { Info, Compass, ShieldCheck, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "About ToolWire AI | Our Vision",
  description: "Learn more about the vision behind ToolWire AI. Discover how we build a comprehensive, genuine directory featuring price histories, updates, and workflows.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto shadow-lg shadow-primary/20">
          <Info className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          About <span className="gradient-text">ToolWire AI</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Defining the next generation of AI product discovery.
        </p>
      </div>

      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <h2 className="text-lg font-bold text-foreground">Our Mission</h2>
        <p>
          In a rapidly consolidating market flooded with generic lists, we built <strong>ToolWire AI</strong> to act as the <strong>"IMDb of AI tools"</strong>. Instead of just listing directories scraped from APIs, our vision is to house original data, detailed price history charts, actual developer release notes, and structured workflows.
        </p>

        <h2 className="text-lg font-bold text-foreground">Why ToolWire AI?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="flex gap-2">
            <Compass className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-foreground">Original Datasets</h4>
              <p className="text-[10px] text-muted-foreground mt-0.5">Explore 2,500+ curated AI products classified into 110 categories.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <ShieldCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-foreground">Genuine Reviews</h4>
              <p className="text-[10px] text-muted-foreground mt-0.5">Objective pros, cons, ratings, and feedback from verified developers.</p>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-bold text-foreground">Contact & Support</h2>
        <p>
          Have feedback or want to reach out to our core team? Visit our contact page or email us directly at support@toolwire.ai.
        </p>
      </div>
    </div>
  );
}
