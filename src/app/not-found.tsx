import Link from "next/link";
import { Zap, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen hero-mesh flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6 shadow-2xl">
        <Zap className="w-8 h-8 text-white" />
      </div>
      
      <h1 className="text-8xl font-black gradient-text mb-4">404</h1>
      <h2 className="text-2xl font-bold text-foreground mb-3">Page Not Found</h2>
      <p className="text-muted-foreground max-w-sm mb-8 text-sm leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or the URL might be incorrect.
      </p>
      
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 gradient-bg text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <Link
          href="/tools"
          className="flex items-center gap-2 px-6 py-3 border border-border rounded-xl font-medium text-foreground hover:border-primary/50 hover:text-primary transition-colors"
        >
          Browse AI Tools
        </Link>
      </div>
    </div>
  );
}
