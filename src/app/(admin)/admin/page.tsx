"use client";

import { useState } from "react";
import {
  Inbox, Database, Star, CheckCircle, XCircle, Plus,
  ShieldAlert, Settings, LayoutGrid, Eye, Search, AlertCircle
} from "lucide-react";
import { tools as initialTools, categories } from "@/lib/mockDb";

interface Submission {
  id: string;
  name: string;
  website: string;
  category: string;
  pricing: string;
  email: string;
  description: string;
}

const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: "sub-1",
    name: "VoiceCut AI",
    website: "https://voicecut.ai",
    category: "Audio",
    pricing: "FREEMIUM",
    email: "creator@voicecut.ai",
    description: "An AI-powered video sound and voice enhancement tool that cleans background noises automatically."
  },
  {
    id: "sub-2",
    name: "CopyFlow",
    website: "https://copyflow.io",
    category: "Writing",
    pricing: "FREE",
    email: "submissions@copyflow.io",
    description: "A simple chrome extension that generates blog outline headers using OpenAI models."
  }
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"submissions" | "tools" | "create">("submissions");
  const [submissions, setSubmissions] = useState<Submission[]>(MOCK_SUBMISSIONS);
  const [tools, setTools] = useState<any[]>(initialTools);
  
  // Create tool form states
  const [newTool, setNewTool] = useState({
    name: "",
    slug: "",
    tagline: "",
    website: "",
    pricing: "FREE",
    startingPrice: "",
    description: "",
    categoryName: "Writing",
  });
  const [successMsg, setSuccessMsg] = useState("");

  const handleApprove = (id: string) => {
    const sub = submissions.find(s => s.id === id);
    if (!sub) return;

    // Add to tools list in state
    const addedTool = {
      id: `tool-${Date.now()}`,
      name: sub.name,
      slug: sub.name.toLowerCase().replace(/\s+/g, "-"),
      tagline: sub.description.slice(0, 50) + "...",
      description: sub.description,
      logo: `https://logo.clearbit.com/${new URL(sub.website).hostname}`,
      website: sub.website,
      pricing: sub.pricing as any,
      startingPrice: null,
      hasFreeTrial: true,
      hasApi: false,
      rating: 4.0,
      reviewCount: 0,
      featured: false,
      sponsored: false,
      trending: false,
      verified: true,
      categoryId: "cat-writing",
      platforms: ["WEB"] as any,
    };

    setTools([addedTool, ...tools]);
    setSubmissions(submissions.filter(s => s.id !== id));
  };

  const handleReject = (id: string) => {
    setSubmissions(submissions.filter(s => s.id !== id));
  };

  const handleCreateTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTool.name || !newTool.website || !newTool.description) return;

    const created = {
      id: `tool-${Date.now()}`,
      name: newTool.name,
      slug: newTool.slug || newTool.name.toLowerCase().replace(/\s+/g, "-"),
      tagline: newTool.tagline || newTool.description.slice(0, 50) + "...",
      description: newTool.description,
      logo: `https://logo.clearbit.com/${new URL(newTool.website).hostname}`,
      website: newTool.website,
      pricing: newTool.pricing as any,
      startingPrice: newTool.startingPrice ? parseFloat(newTool.startingPrice) : null,
      hasFreeTrial: true,
      hasApi: false,
      rating: 5.0,
      reviewCount: 1,
      featured: true,
      sponsored: false,
      trending: true,
      verified: true,
      categoryId: "cat-writing",
      platforms: ["WEB"] as any,
    };

    setTools([created, ...tools]);
    setNewTool({
      name: "",
      slug: "",
      tagline: "",
      website: "",
      pricing: "FREE",
      startingPrice: "",
      description: "",
      categoryName: "Writing",
    });
    setSuccessMsg("Tool created and published successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage AI Tool directory submissions and index logs.</p>
      </div>

      {/* Grid of Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: "Active Submissions", value: submissions.length, icon: Inbox, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Indexed Tools", value: tools.length, icon: Database, color: "text-purple-500", bg: "bg-purple-500/10" },
          { label: "AI Categories", value: categories.length, icon: LayoutGrid, color: "text-green-500", bg: "bg-green-500/10" },
        ].map((stat) => (
          <div key={stat.label} className="p-6 rounded-2xl border border-border bg-card flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
            </div>
            <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border gap-6">
        {[
          { id: "submissions", label: "Submissions Queue", badge: submissions.length },
          { id: "tools", label: "Manage Tools", badge: tools.length },
          { id: "create", label: "Add New Tool" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-4 text-sm font-semibold relative transition-colors ${
              activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center gap-2">
              {tab.label}
              {tab.badge !== undefined && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent text-foreground">
                  {tab.badge}
                </span>
              )}
            </span>
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 gradient-bg" />
            )}
          </button>
        ))}
      </div>

      {/* Submissions queue tab */}
      {activeTab === "submissions" && (
        <div className="space-y-4">
          {submissions.length > 0 ? (
            submissions.map((sub) => (
              <div key={sub.id} className="p-6 rounded-2xl border border-border bg-card space-y-4">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      {sub.name}
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {sub.category}
                      </span>
                    </h3>
                    <a
                      href={sub.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline font-semibold mt-1 inline-block"
                    >
                      {sub.website}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(sub.id)}
                      className="flex items-center gap-1 px-4 py-2 rounded-xl bg-green-500 text-white text-xs font-semibold hover:bg-green-600 transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(sub.id)}
                      className="flex items-center gap-1 px-4 py-2 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold hover:bg-destructive hover:text-white transition-all"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Reject
                    </button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {sub.description}
                </p>

                <div className="text-xs text-muted-foreground pt-3 border-t border-white/5">
                  Submitted by: <span className="text-foreground font-semibold">{sub.email}</span> · Pricing Model: <span className="text-foreground font-semibold">{sub.pricing}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-muted-foreground bg-card border border-border rounded-2xl">
              <Inbox className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="text-sm">Queue is empty. No pending submissions.</p>
            </div>
          )}
        </div>
      )}

      {/* Manage tools tab */}
      {activeTab === "tools" && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="p-4 font-bold text-foreground">Name</th>
                  <th className="p-4 font-bold text-foreground">Pricing</th>
                  <th className="p-4 font-bold text-foreground">Rating</th>
                  <th className="p-4 font-bold text-foreground">Reviews</th>
                  <th className="p-4 font-bold text-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {tools.map((t) => (
                  <tr key={t.id} className="hover:bg-muted/10 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.tagline.slice(0, 50)}...</div>
                    </td>
                    <td className="p-4 text-xs font-semibold text-primary">{t.pricing}</td>
                    <td className="p-4 font-semibold text-yellow-500 flex items-center gap-1 mt-2">
                      <Star className="w-3.5 h-3.5 fill-yellow-500" />
                      {t.rating.toFixed(1)}
                    </td>
                    <td className="p-4 text-muted-foreground">{t.reviewCount} reviews</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setTools(tools.filter(item => item.id !== t.id))}
                        className="text-xs font-bold text-destructive hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add new tool tab */}
      {activeTab === "create" && (
        <div className="p-8 rounded-2xl border border-border bg-card">
          <h3 className="text-lg font-bold text-foreground mb-4">Add AI Tool</h3>

          {successMsg && (
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-sm flex gap-2 items-center mb-6">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleCreateTool} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Tool Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Chatify"
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={newTool.name}
                  onChange={e => setNewTool({ ...newTool, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Website URL *</label>
                <input
                  type="text"
                  placeholder="https://chatify.ai"
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={newTool.website}
                  onChange={e => setNewTool({ ...newTool, website: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Pricing Model *</label>
                <select
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={newTool.pricing}
                  onChange={e => setNewTool({ ...newTool, pricing: e.target.value })}
                >
                  <option value="FREE">Free</option>
                  <option value="FREEMIUM">Freemium</option>
                  <option value="PAID">Paid</option>
                  <option value="OPEN_SOURCE">Open Source</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Starting Price (Optional)</label>
                <input
                  type="number"
                  placeholder="e.g. 10"
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  value={newTool.startingPrice}
                  onChange={e => setNewTool({ ...newTool, startingPrice: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Short Description *</label>
              <textarea
                rows={4}
                placeholder="Describe tool features..."
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                value={newTool.description}
                onChange={e => setNewTool({ ...newTool, description: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl gradient-bg text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Publish Tool
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
