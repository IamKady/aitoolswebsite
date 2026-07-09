"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Sparkles, CheckCircle2 } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl gradient-bg p-1">
          <div className="bg-card rounded-[calc(1.5rem-4px)] p-8 sm:p-12 text-center relative">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-bg mb-6 shadow-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-foreground mb-3">
                Stay Ahead of the{" "}
                <span className="gradient-text">AI Curve</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Get weekly updates on the best new AI tools, exclusive comparisons,
                and expert recommendations delivered straight to your inbox.
                Join 10,000+ AI enthusiasts.
              </p>

              {/* Features list */}
              <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
                {[
                  "Weekly AI tool roundups",
                  "Exclusive deals & discounts",
                  "Early access to new tools",
                  "No spam, ever",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-1.5 text-muted-foreground">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    {item}
                  </span>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-3 py-4"
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                    <p className="text-foreground font-medium">You&apos;re subscribed! 🎉</p>
                    <p className="text-sm text-muted-foreground">Check your inbox for a confirmation email.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                  >
                    <div className="flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        id="newsletter-email"
                        required
                      />
                      {error && (
                        <p className="text-xs text-red-500 mt-1 text-left">{error}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="flex items-center justify-center gap-2 px-6 py-3 gradient-bg text-white font-medium rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity shadow-lg shadow-primary/25 flex-shrink-0"
                    >
                      {status === "loading" ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Subscribe
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              <p className="text-xs text-muted-foreground mt-4">
                By subscribing, you agree to our{" "}
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
