import { Metadata } from "next";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | ToolWire AI",
  description: "Read the ToolWire AI privacy policy detailing user credentials, collection logging, and dashboard data metrics security standards.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto shadow-lg shadow-primary/20">
          <ShieldAlert className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground">
          Last updated: July 17, 2026
        </p>
      </div>

      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <h2 className="text-lg font-bold text-foreground">1. Information We Collect</h2>
        <p>
          We collect account registration data via Clerk Auth, search logs dynamically processed to populate trending terms on the dashboard, and subscription emails submitted voluntarily to the newsletter list.
        </p>

        <h2 className="text-lg font-bold text-foreground">2. How We Use Data</h2>
        <p>
          Data is strictly utilized to compute dynamic recommendations on tool pages, verify valid review listings, send digest summaries, and monitor database performance index stats.
        </p>

        <h2 className="text-lg font-bold text-foreground">3. Security</h2>
        <p>
          We secure customer listings with standard data encryption models, preventing unauthorized data modification.
        </p>
      </div>
    </div>
  );
}
