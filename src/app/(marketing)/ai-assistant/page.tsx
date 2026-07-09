"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles, User, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ToolCard } from "@/components/tools/ToolCard";
import { AIRecommendation } from "@/types";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  recommendations?: AIRecommendation[];
}

const SUGGESTIONS = [
  "I need an AI tool to create YouTube videos",
  "What are the best free AI tools for students?",
  "I want AI to help me write code faster",
  "Find me AI tools to remove image backgrounds",
  "Best AI for creating social media content",
  "I need AI to summarize long documents",
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Hi! I'm your AI Tool Discovery Assistant. Tell me what you want to accomplish, and I'll recommend the best AI tools for your needs.\n\nFor example, you can ask: *\"I need AI to create YouTube videos\"* or *\"What's the best free AI for writing?\"*",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (query: string = input) => {
    if (!query.trim() || loading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (res.ok) {
        const data = await res.json();
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.message || "Here are my recommendations:",
          recommendations: data.recommendations,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error("API error");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, I couldn't process your request right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card/50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AI Tool Assistant</h1>
              <p className="text-xs text-muted-foreground">Powered by GPT-4o mini</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`max-w-2xl ${msg.role === "user" ? "order-first" : ""}`}>
                  <div
                    className={`rounded-2xl p-4 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "gradient-bg text-white ml-auto"
                        : "bg-card border border-border text-foreground"
                    }`}
                  >
                    {msg.content.split("\n").map((line, i) => (
                      <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
                    ))}
                  </div>
                  
                  {/* Tool recommendations */}
                  {msg.recommendations && msg.recommendations.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Recommended Tools
                      </p>
                      {msg.recommendations.map((rec, i) => (
                        <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                          <ToolCard tool={rec.tool} variant="compact" />
                          {rec.reason && (
                            <div className="px-3 pb-3">
                              <p className="text-xs text-muted-foreground leading-relaxed flex items-start gap-1.5">
                                <ArrowRight className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                                {rec.reason}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-2">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full gradient-bg animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">Finding best AI tools...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggestions (shown when no messages beyond welcome) */}
      {messages.length <= 1 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <p className="text-xs text-muted-foreground mb-3">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border bg-card/50 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about any AI tool or task..."
              className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              disabled={loading}
              id="ai-assistant-input"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-3 gradient-bg text-white rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity shadow-lg"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
