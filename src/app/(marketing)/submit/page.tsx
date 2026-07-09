"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, AlertCircle, ArrowLeft, Upload, Sparkles } from "lucide-react";
import Link from "next/link";

const submitSchema = z.object({
  name: z.string().min(2, "Tool name must be at least 2 characters"),
  website: z.string().url("Please enter a valid website URL"),
  description: z.string().min(20, "Please describe the tool in at least 20 characters"),
  category: z.string().min(1, "Please select a category"),
  pricing: z.string().min(1, "Please select a pricing model"),
  email: z.string().email("Please enter a valid contact email"),
  notes: z.string().optional(),
});

type SubmitFormValues = z.infer<typeof submitSchema>;

export default function SubmitToolPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubmitFormValues>({
    resolver: zodResolver(submitSchema),
    defaultValues: {
      name: "",
      website: "",
      description: "",
      category: "",
      pricing: "",
      email: "",
      notes: "",
    },
  });

  const onSubmit = async (data: SubmitFormValues) => {
    setStatus("loading");
    setErrorMessage("");
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        reset();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Submission failed. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Something went wrong. Please check your internet connection.");
      setStatus("error");
    }
  };

  const categoriesList = [
    "Writing", "Coding", "Image Generation", "Video", "Audio", "Music",
    "Productivity", "Marketing", "SEO", "Research", "Education", "Design",
    "Chatbots", "Automation", "Data Analysis", "AI Agents"
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to home
        </Link>

        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-1 shadow-2xl">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className="p-8 sm:p-10 relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Submit an AI Tool</h1>
                <p className="text-xs text-muted-foreground">List your product on AIToolHunt</p>
              </div>
            </div>

            {status === "success" ? (
              <div className="text-center py-10 space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-2">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Submission Received!</h2>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  Thank you for submitting your tool. Our editorial team will review the details and publish the listing within 24-48 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 rounded-xl border border-border hover:border-primary/50 text-sm font-semibold hover:text-primary transition-all duration-250 mt-4"
                >
                  Submit Another Tool
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
                {status === "error" && (
                  <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex gap-2 items-center text-sm text-destructive">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Tool Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground" htmlFor="tool-name">Tool Name *</label>
                    <input
                      type="text"
                      id="tool-name"
                      placeholder="e.g. ChatGPT"
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      {...register("name")}
                    />
                    {errors.name && <p className="text-[10px] text-destructive">{errors.name.message}</p>}
                  </div>

                  {/* Website */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground" htmlFor="tool-website">Website URL *</label>
                    <input
                      type="text"
                      id="tool-website"
                      placeholder="https://example.com"
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      {...register("website")}
                    />
                    {errors.website && <p className="text-[10px] text-destructive">{errors.website.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground" htmlFor="tool-category">Category *</label>
                    <select
                      id="tool-category"
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      {...register("category")}
                    >
                      <option value="">Select a category</option>
                      {categoriesList.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errors.category && <p className="text-[10px] text-destructive">{errors.category.message}</p>}
                  </div>

                  {/* Pricing */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground" htmlFor="tool-pricing">Pricing Model *</label>
                    <select
                      id="tool-pricing"
                      className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      {...register("pricing")}
                    >
                      <option value="">Select pricing model</option>
                      <option value="FREE">Free</option>
                      <option value="FREEMIUM">Freemium</option>
                      <option value="PAID">Paid</option>
                      <option value="OPEN_SOURCE">Open Source</option>
                    </select>
                    {errors.pricing && <p className="text-[10px] text-destructive">{errors.pricing.message}</p>}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground" htmlFor="tool-desc">Short Description *</label>
                  <textarea
                    id="tool-desc"
                    rows={4}
                    placeholder="Briefly describe what this AI tool does, key features, and target audience..."
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                    {...register("description")}
                  />
                  {errors.description && <p className="text-[10px] text-destructive">{errors.description.message}</p>}
                </div>

                {/* Contact Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground" htmlFor="contact-email">Contact Email *</label>
                  <input
                    type="email"
                    id="contact-email"
                    placeholder="you@company.com"
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    {...register("email")}
                  />
                  {errors.email && <p className="text-[10px] text-destructive">{errors.email.message}</p>}
                </div>

                {/* Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground" htmlFor="submitter-notes">Notes to Editor (Optional)</label>
                  <input
                    type="text"
                    id="submitter-notes"
                    placeholder="Any promo codes or specific instructions..."
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    {...register("notes")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center justify-center gap-2 w-full py-3 mt-4 gradient-bg text-white font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity shadow-lg shadow-primary/20"
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Submit Product
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
