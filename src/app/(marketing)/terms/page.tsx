import { Metadata } from "next";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | ToolWire AI",
  description: "Read the ToolWire AI terms of service outlining listings publishing rules, submissions indexing parameters, and review codes.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto shadow-lg shadow-primary/20">
          <ShieldAlert className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground">
          Last updated: July 17, 2026
        </p>
      </div>

      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <h2 className="text-lg font-bold text-foreground">1. User Conduct</h2>
        <p>
          By publishing directories or writing reviews, you agree that your comments are genuine, objective, and contain accurate features and starting prices metrics.
        </p>

        <h2 className="text-lg font-bold text-foreground">2. Account Management</h2>
        <p>
          Your account is powered by Clerk Auth. You remain fully responsible for securing your login sessions.
        </p>

        <h2 className="text-lg font-bold text-foreground">3. Modifications</h2>
        <p>
          We reserve the right to prune or delete mock/fake tool profiles that do not represent valid services.
        </p>
      </div>
    </div>
  );
}
