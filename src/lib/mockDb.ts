import { PricingType, Platform } from "@prisma/client";

export const categories = [
  { id: "cat-writing", name: "Writing", slug: "writing", icon: "PenTool", color: "#6366f1", description: "AI writing assistants, content generators, and copywriting tools", toolCount: 5, featured: true },
  { id: "cat-coding", name: "Coding", slug: "coding", icon: "Code2", color: "#8b5cf6", description: "AI code assistants, debuggers, and developer tools", toolCount: 3, featured: true },
  { id: "cat-image-gen", name: "Image Generation", slug: "image-generation", icon: "Image", color: "#ec4899", description: "AI image generators, photo editors, and visual creation tools", toolCount: 3, featured: true },
  { id: "cat-video", name: "Video", slug: "video", icon: "Video", color: "#ef4444", description: "AI video generators, editors, and production tools", toolCount: 3, featured: true },
  { id: "cat-audio", name: "Audio", slug: "audio", icon: "Mic2", color: "#f59e0b", description: "AI voice generators, text-to-speech, and audio tools", toolCount: 2, featured: true },
  { id: "cat-music", name: "Music", slug: "music", icon: "Music", color: "#06b6d4", description: "AI music generation and composition tools", toolCount: 1, featured: true },
  { id: "cat-productivity", name: "Productivity", slug: "productivity", icon: "Zap", color: "#3b82f6", description: "AI productivity tools for work and organization", toolCount: 2, featured: true },
  { id: "cat-marketing", name: "Marketing", slug: "marketing", icon: "Share2", color: "#f97316", description: "AI marketing, advertising, and growth tools", toolCount: 2, featured: true },
  { id: "cat-seo", name: "SEO", slug: "seo", icon: "Search", color: "#84cc16", description: "AI SEO optimization and content strategy tools", toolCount: 1, featured: true },
  { id: "cat-research", name: "Research", slug: "research", icon: "Brain", color: "#a855f7", description: "AI research assistants and information gathering tools", toolCount: 1, featured: true },
  { id: "cat-education", name: "Education", slug: "education", icon: "GraduationCap", color: "#0ea5e9", description: "AI tutoring, learning, and educational tools", toolCount: 1, featured: true },
  { id: "cat-design", name: "Design", slug: "design", icon: "Palette", color: "#e879f9", description: "AI design tools for graphics, UI/UX, and visual content", toolCount: 1, featured: true },
  { id: "cat-chatbots", name: "Chatbots", slug: "chatbots", icon: "Bot", color: "#10b981", description: "AI chatbot builders and conversational AI platforms", toolCount: 2, featured: true },
  { id: "cat-automation", name: "Automation", slug: "automation", icon: "Layers", color: "#7c3aed", description: "AI workflow automation and process tools", toolCount: 1, featured: true },
  { id: "cat-data-analysis", name: "Data Analysis", slug: "data-analysis", icon: "BarChart3", color: "#64748b", description: "AI data analysis, visualization, and business intelligence", toolCount: 1, featured: true },
  { id: "cat-translation", name: "Translation", slug: "translation", icon: "Globe", color: "#2563eb", description: "AI translation and language learning tools", toolCount: 1, featured: true },
  { id: "cat-pdf", name: "PDF Tools", slug: "pdf", icon: "FileText", color: "#ca8a04", description: "AI PDF readers, summarizers, and document tools", toolCount: 1, featured: true },
  { id: "cat-agents", name: "AI Agents", slug: "ai-agents", icon: "Cpu", color: "#059669", description: "Autonomous AI agents and task automation", toolCount: 1, featured: true },
  { id: "cat-presentation", name: "Presentation", slug: "presentation", icon: "Presentation", color: "#14b8a6", description: "AI presentation creators and slide design tools", toolCount: 1, featured: true },
  { id: "cat-resume", name: "Resume", slug: "resume", icon: "Briefcase", color: "#b45309", description: "AI resume writers and job application tools", toolCount: 1, featured: true },
  { id: "cat-social-media", name: "Social Media", slug: "social-media", icon: "Share2", color: "#0284c7", description: "AI social media content creation and management tools", toolCount: 1, featured: true },
];

export const tags = [
  { id: "tag-chat", name: "AI Chat", slug: "ai-chat" },
  { id: "tag-writing", name: "Writing", slug: "writing" },
  { id: "tag-image", name: "Image AI", slug: "image-ai" },
  { id: "tag-art", name: "Art", slug: "art" },
  { id: "tag-code", name: "Code", slug: "code" },
  { id: "tag-ide", name: "IDE", slug: "ide" },
  { id: "tag-editor", name: "Editor", slug: "editor" },
  { id: "tag-voice", name: "Voice AI", slug: "voice-ai" },
  { id: "tag-tts", name: "TTS", slug: "tts" },
  { id: "tag-video", name: "Video AI", slug: "video-ai" },
  { id: "tag-avatar", name: "Avatar", slug: "avatar" },
  { id: "tag-music", name: "Music AI", slug: "music-ai" },
  { id: "tag-search", name: "Search", slug: "search" },
  { id: "tag-research", name: "Research", slug: "research" },
  { id: "tag-prod", name: "Productivity", slug: "productivity" },
  { id: "tag-notes", name: "Notes", slug: "notes" },
  { id: "tag-web", name: "Web Dev", slug: "web-dev" },
  { id: "tag-videdit", name: "Video Edit", slug: "video-edit" },
  { id: "tag-gpt", name: "GPT", slug: "gpt" },
  { id: "tag-free", name: "Free", slug: "free" },
  { id: "tag-api", name: "API", slug: "api" },
  { id: "tag-oss", name: "Open Source", slug: "open-source" },
  { id: "tag-biz", name: "Business", slug: "business" },
  { id: "tag-students", name: "Students", slug: "students" },
  { id: "tag-devs", name: "Developers", slug: "developers" },
  { id: "tag-designers", name: "Designers", slug: "designers" },
];

export const tools = [
  {
    id: "tool-chatgpt",
    name: "ChatGPT",
    slug: "chatgpt",
    tagline: "The world's most popular AI chatbot for writing, coding, research, and more",
    description: "ChatGPT is an AI language model by OpenAI that can assist with a wide variety of tasks including writing, analysis, coding, math, and creative projects. It understands and generates human-like text, making it useful for students, professionals, and businesses alike.\n\nWith GPT-4o, ChatGPT can process images, voice, and code, making it the most versatile AI assistant available.",
    logo: "https://logo.clearbit.com/openai.com",
    website: "https://chat.openai.com",
    pricing: "FREEMIUM" as PricingType,
    pricingDetails: "Free access to basic models, $20/mo for premium features",
    startingPrice: 20,
    hasFreeTrial: true,
    hasApi: true,
    isOpenSource: false,
    githubUrl: null,
    rating: 4.8,
    reviewCount: 2847,
    featured: true,
    sponsored: false,
    trending: true,
    verified: true,
    metaTitle: "ChatGPT Review & Alternatives | ToolWire AI",
    metaDescription: "Read reviews of ChatGPT by OpenAI, compare it with Claude, Gemini and other chatbot alternatives.",
    aiSummary: "ChatGPT by OpenAI is a leading generative AI tool that is highly capable in writing, research, and coding. It is best suited for general assistance and has a robust user ecosystem.",
    viewCount: 15482,
    favoriteCount: 2412,
    categoryId: "cat-writing",
    platforms: ["WEB", "IOS", "ANDROID"] as Platform[],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    features: [
      { id: "feat-cg1", text: "Advanced GPT-4o model", order: 1 },
      { id: "feat-cg2", text: "Image understanding and generation", order: 2 },
      { id: "feat-cg3", text: "Voice conversations", order: 3 },
      { id: "feat-cg4", text: "Code generation and debugging", order: 4 },
      { id: "feat-cg5", text: "DALL-E 3 image generation", order: 5 },
    ],
    pros: [
      { id: "pro-cg1", text: "Most capable AI model available" },
      { id: "pro-cg2", text: "Huge ecosystem of custom GPTs" },
      { id: "pro-cg3", text: "Multimodal (text, image, voice)" },
    ],
    cons: [
      { id: "con-cg1", text: "Free tier has limitations" },
      { id: "con-cg2", text: "Can hallucinate facts occasionally" },
    ],
    pricingPlans: [
      { id: "plan-cg1", name: "Free", price: 0, period: "month", description: "Standard access to GPT-3.5", features: ["Standard response speed", "Limited GPT-4o"], highlighted: false },
      { id: "plan-cg2", name: "Plus", price: 20, period: "month", description: "Get the best of GPT-4o", features: ["Priority access to GPT-4o", "Advanced Data Analysis", "DALL-E 3 image generation", "Custom GPTs"], highlighted: true },
    ],
    faqs: [
      { id: "faq-cg1", question: "Is ChatGPT free?", answer: "Yes, ChatGPT has a free tier that gives access to the standard models. To access advanced features and models, users can subscribe to ChatGPT Plus.", order: 1 }
    ],
    integrations: [
      { id: "int-cg1", name: "Microsoft Word", logo: null, url: null }
    ]
  },
  {
    id: "tool-claude",
    name: "Claude",
    slug: "claude",
    tagline: "Anthropic's AI assistant that's helpful, harmless, and honest",
    description: "Claude is an AI assistant built by Anthropic, focused on being safe, beneficial, and understandable. Claude 3.5 Sonnet is particularly strong at analysis, coding, and creative writing with a 200K context window.",
    logo: "https://logo.clearbit.com/anthropic.com",
    website: "https://claude.ai",
    pricing: "FREEMIUM" as PricingType,
    pricingDetails: "Free basic usage, $20/mo for pro usage limit",
    startingPrice: 20,
    hasFreeTrial: true,
    hasApi: true,
    isOpenSource: false,
    githubUrl: null,
    rating: 4.7,
    reviewCount: 1234,
    featured: true,
    sponsored: false,
    trending: true,
    verified: true,
    metaTitle: "Claude AI Review & Alternatives | ToolWire AI",
    metaDescription: "Read reviews of Claude by Anthropic, see if it outperforms ChatGPT for programming and analysis.",
    aiSummary: "Claude 3.5 Sonnet is highly praised for its natural writing tone, extremely powerful coding skills, and visual logic analysis via Artifacts.",
    viewCount: 12450,
    favoriteCount: 1980,
    categoryId: "cat-writing",
    platforms: ["WEB", "API"] as Platform[],
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2024-04-01"),
    features: [
      { id: "feat-cl1", text: "200K token context window", order: 1 },
      { id: "feat-cl2", text: "Strong coding and logic capabilities", order: 2 },
      { id: "feat-cl3", text: "Artifacts live preview tool", order: 3 },
    ],
    pros: [
      { id: "pro-cl1", text: "Exceptional code writing and logic reasoning" },
      { id: "pro-cl2", text: "Artifacts layout provides great coding experience" },
    ],
    cons: [
      { id: "con-cl1", text: "Does not support native image generation yet" },
    ],
    pricingPlans: [
      { id: "plan-cl1", name: "Free", price: 0, period: "month", description: "Standard usage limits", features: ["Claude 3.5 Sonnet access", "Standard speed"], highlighted: false },
      { id: "plan-cl2", name: "Pro", price: 20, period: "month", description: "5x more usage than free tier", features: ["Priority access", "Artifacts sharing", "Larger limit"], highlighted: true }
    ],
    faqs: [],
    integrations: []
  },
  {
    id: "tool-midjourney",
    name: "Midjourney",
    slug: "midjourney",
    tagline: "Create stunning AI-generated images from text descriptions",
    description: "Midjourney is an independent research lab that produces an AI program that creates images from natural language descriptions. Known for its artistic quality and aesthetic style, Midjourney is a favorite among designers, artists, and creative professionals.",
    logo: "https://logo.clearbit.com/midjourney.com",
    website: "https://midjourney.com",
    pricing: "PAID" as PricingType,
    pricingDetails: "Plans from $10/mo to $60/mo",
    startingPrice: 10,
    hasFreeTrial: false,
    hasApi: false,
    isOpenSource: false,
    githubUrl: null,
    rating: 4.7,
    reviewCount: 1923,
    featured: true,
    sponsored: false,
    trending: true,
    verified: true,
    metaTitle: "Midjourney AI Review | ToolWire AI",
    metaDescription: "Generate premium artwork and images using Midjourney. Compare subscription plans and pros/cons.",
    aiSummary: "Midjourney is the premier tool for creating artistic and high-aesthetic AI images, operating primarily through Discord and a web interface.",
    viewCount: 18520,
    favoriteCount: 3105,
    categoryId: "cat-image-gen",
    platforms: ["WEB"] as Platform[],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    features: [
      { id: "feat-mj1", text: "Beautiful photorealistic and artistic styles", order: 1 },
      { id: "feat-mj2", text: "V6.1 model for high detail rendering", order: 2 },
    ],
    pros: [
      { id: "pro-mj1", text: "Best-in-class image aesthetics and styles" },
    ],
    cons: [
      { id: "con-mj1", text: "No free tier is available" }
    ],
    pricingPlans: [
      { id: "plan-mj1", name: "Basic", price: 10, period: "month", description: "200 generations per month", features: ["Fast GPU hours", "Discord access"], highlighted: false },
      { id: "plan-mj2", name: "Standard", price: 30, period: "month", description: "Unlimited relaxed generations", features: ["15 hours of fast GPU time", "Unlimited relaxed GPU time"], highlighted: true }
    ],
    faqs: [],
    integrations: []
  },
  {
    id: "tool-copilot",
    name: "GitHub Copilot",
    slug: "github-copilot",
    tagline: "AI pair programmer that helps you write better code faster",
    description: "GitHub Copilot uses the OpenAI Codex to suggest code and entire functions in real-time from your editor. It understands the context of your code and comments to provide relevant suggestions in dozens of programming languages.",
    logo: "https://logo.clearbit.com/github.com",
    website: "https://github.com/features/copilot",
    pricing: "FREEMIUM" as PricingType,
    pricingDetails: "Free for students/OSS maintainers, $10/mo for individuals",
    startingPrice: 10,
    hasFreeTrial: true,
    hasApi: true,
    isOpenSource: false,
    githubUrl: null,
    rating: 4.6,
    reviewCount: 1456,
    featured: true,
    sponsored: false,
    trending: true,
    verified: true,
    metaTitle: "GitHub Copilot Review | ToolWire AI",
    metaDescription: "AI coding companion integrated directly into your IDE. Read reviews and pricing details.",
    aiSummary: "GitHub Copilot is a market-leading AI coding tool that operates inside major IDEs like VS Code and JetBrains, boosting coding speed by suggesting inline completions.",
    viewCount: 11024,
    favoriteCount: 1220,
    categoryId: "cat-coding",
    platforms: ["WINDOWS", "MAC", "LINUX", "CHROME_EXTENSION", "API"] as Platform[],
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
    features: [
      { id: "feat-gh1", text: "Inline code autocomplete suggestions", order: 1 },
      { id: "feat-gh2", text: "IDE integrated chat window", order: 2 },
    ],
    pros: [
      { id: "pro-gh1", text: "Speeds up boilerplate coding dramatically" }
    ],
    cons: [
      { id: "con-gh1", text: "May output buggy or unsecure code patterns" }
    ],
    pricingPlans: [
      { id: "plan-gh1", name: "Individual", price: 10, period: "month", description: "For developers", features: ["Unlimited completions", "IDE Chat"], highlighted: true }
    ],
    faqs: [],
    integrations: []
  },
  {
    id: "tool-cursor",
    name: "Cursor",
    slug: "cursor",
    tagline: "The AI-first code editor built for pair programming with AI",
    description: "Cursor is an AI-first code editor that helps developers be more productive. Built on VS Code, it integrates AI directly into your coding workflow with features like codebase chat, AI-generated edits, and natural language commands.",
    logo: "https://logo.clearbit.com/cursor.sh",
    website: "https://cursor.sh",
    pricing: "FREEMIUM" as PricingType,
    pricingDetails: "Free basic usage, $20/mo for Pro plan",
    startingPrice: 20,
    hasFreeTrial: true,
    hasApi: false,
    isOpenSource: false,
    githubUrl: null,
    rating: 4.9,
    reviewCount: 1124,
    featured: true,
    sponsored: false,
    trending: true,
    verified: true,
    metaTitle: "Cursor Code Editor Review | ToolWire AI",
    metaDescription: "Cursor is the hottest new AI-powered code editor. Learn how it integrates LLMs directly in your editor.",
    aiSummary: "Cursor is an outstanding alternative to standard VS Code. It provides unmatched codebase indexing, multi-file code editing via Composer, and instant chats.",
    viewCount: 14500,
    favoriteCount: 2900,
    categoryId: "cat-coding",
    platforms: ["WINDOWS", "MAC", "LINUX"] as Platform[],
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
    features: [
      { id: "feat-cu1", text: "Codebase-wide semantic indexing and search", order: 1 },
      { id: "feat-cu2", text: "Composer mode for generating edits across files", order: 2 },
    ],
    pros: [
      { id: "pro-cu1", text: "Amazing codebase understanding" }
    ],
    cons: [
      { id: "con-cu1", text: "Pro usage limitations during high traffic" }
    ],
    pricingPlans: [
      { id: "plan-cu1", name: "Hobby", price: 0, period: "month", description: "Basic usage limits", features: ["2000 completions", "50 premium requests"], highlighted: false },
      { id: "plan-cu2", name: "Pro", price: 20, period: "month", description: "For heavy coding projects", features: ["Unlimited completions", "500 fast requests", "No slow queues"], highlighted: true }
    ],
    faqs: [],
    integrations: []
  },
  {
    id: "tool-elevenlabs",
    name: "ElevenLabs",
    slug: "elevenlabs",
    tagline: "Generative AI text to speech & voice cloning in 29 languages",
    description: "ElevenLabs creates the most realistic, versatile and contextually-aware AI speech software. Their voice cloning and text-to-speech technology is used by content creators worldwide.",
    logo: "https://logo.clearbit.com/elevenlabs.io",
    website: "https://elevenlabs.io",
    pricing: "FREEMIUM" as PricingType,
    pricingDetails: "Free 10k chars/mo, paid plans from $5/mo",
    startingPrice: 5,
    hasFreeTrial: true,
    hasApi: true,
    isOpenSource: false,
    githubUrl: null,
    rating: 4.8,
    reviewCount: 892,
    featured: true,
    sponsored: false,
    trending: true,
    verified: true,
    metaTitle: "ElevenLabs AI Voice Review | ToolWire AI",
    metaDescription: "ElevenLabs is the king of realistic text to speech and voice cloning. Read reviews and pricing.",
    aiSummary: "ElevenLabs is the industry leader for generating realistic AI speech, cloning voices with high fidelity, and dubbing video audio across languages.",
    viewCount: 9800,
    favoriteCount: 1420,
    categoryId: "cat-audio",
    platforms: ["WEB", "API"] as Platform[],
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
    features: [
      { id: "feat-el1", text: "Voice cloning using short audio samples", order: 1 },
      { id: "feat-el2", text: "Multi-language realistic voice generation", order: 2 },
    ],
    pros: [
      { id: "pro-el1", text: "Most realistic AI speech matching human emotion" }
    ],
    cons: [
      { id: "con-el1", text: "Pricing rises fast for heavy voice generation projects" }
    ],
    pricingPlans: [
      { id: "plan-el1", name: "Free", price: 0, period: "month", description: "Standard access", features: ["10K characters per month", "Standard voices"], highlighted: false },
      { id: "plan-el2", name: "Starter", price: 5, period: "month", description: "Clone your voice", features: ["30K characters", "Voice Cloning", "Commercial usage"], highlighted: true }
    ],
    faqs: [],
    integrations: []
  },
  {
    id: "tool-runway",
    name: "Runway",
    slug: "runway",
    tagline: "Next-generation AI creative tools for video generation and editing",
    description: "Runway is an applied AI research company shaping the next era of art, entertainment, and human creativity. Their Gen-3 Alpha model generates high-quality videos from text, images, and existing footage.",
    logo: "https://logo.clearbit.com/runwayml.com",
    website: "https://runwayml.com",
    pricing: "FREEMIUM" as PricingType,
    pricingDetails: "Free credits on sign up, plans from $15/mo",
    startingPrice: 15,
    hasFreeTrial: true,
    hasApi: false,
    isOpenSource: false,
    githubUrl: null,
    rating: 4.5,
    reviewCount: 634,
    featured: true,
    sponsored: false,
    trending: true,
    verified: true,
    metaTitle: "Runway Gen-3 AI Video Review | ToolWire AI",
    metaDescription: "Generate professional videos using Runway Magic Tools. Read pricing plans and alternatives.",
    aiSummary: "Runway is an outstanding platform for generating cinematic-grade video assets, utilizing text, images, or reference videos as inputs.",
    viewCount: 8900,
    favoriteCount: 1102,
    categoryId: "cat-video",
    platforms: ["WEB"] as Platform[],
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
    features: [
      { id: "feat-rw1", text: "Gen-3 Alpha text-to-video capabilities", order: 1 },
      { id: "feat-rw2", text: "Video composition brush editor", order: 2 },
    ],
    pros: [
      { id: "pro-rw1", text: "Outstanding creative control tools like Motion Brush" }
    ],
    cons: [
      { id: "con-rw1", text: "High resource consumption, fast credit usage" }
    ],
    pricingPlans: [
      { id: "plan-rw1", name: "Standard", price: 15, period: "month", description: "For small creators", features: ["625 credits/mo", "Watermark removal", "1080p export"], highlighted: true }
    ],
    faqs: [],
    integrations: []
  },
  {
    id: "tool-perplexity",
    name: "Perplexity AI",
    slug: "perplexity-ai",
    tagline: "AI-powered search engine that answers any question with cited sources",
    description: "Perplexity AI is a conversational search engine that provides real-time, cited answers to any question. Unlike traditional search engines, it synthesizes information from multiple sources.",
    logo: "https://logo.clearbit.com/perplexity.ai",
    website: "https://perplexity.ai",
    pricing: "FREEMIUM" as PricingType,
    pricingDetails: "Free basic model search, Pro plan for $20/mo",
    startingPrice: 20,
    hasFreeTrial: true,
    hasApi: true,
    isOpenSource: false,
    githubUrl: null,
    rating: 4.6,
    reviewCount: 876,
    featured: false,
    sponsored: false,
    trending: true,
    verified: true,
    metaTitle: "Perplexity AI Review | ToolWire AI",
    metaDescription: "Search the web with cited sources. Check Perplexity AI pricing and reviews.",
    aiSummary: "Perplexity AI replaces traditional search queries with direct, referenced answers by scanning the internet using specialized search scrapers.",
    viewCount: 13024,
    favoriteCount: 1982,
    categoryId: "cat-research",
    platforms: ["WEB", "IOS", "ANDROID", "API"] as Platform[],
    createdAt: new Date("2024-04-05"),
    updatedAt: new Date("2024-04-05"),
    features: [
      { id: "feat-pp1", text: "Inline URL citations for all answers", order: 1 },
      { id: "feat-pp2", text: "Pro focus modes for academic searches", order: 2 },
    ],
    pros: [
      { id: "pro-pp1", text: "Always provides direct reference links, reducing hallucinations" }
    ],
    cons: [
      { id: "con-pp1", text: "Requires Pro plan to get top LLM models like Claude 3.5" }
    ],
    pricingPlans: [
      { id: "plan-pp1", name: "Free", price: 0, period: "month", description: "Standard web search", features: ["Unlimited basic searches", "Copilot 5/day"], highlighted: false },
      { id: "plan-pp2", name: "Pro", price: 20, period: "month", description: "Unlock best LLMs", features: ["Unlimited Copilot searches", "File uploads", "API credits"], highlighted: true }
    ],
    faqs: [],
    integrations: []
  },
  {
    id: "tool-heygen",
    name: "HeyGen",
    slug: "heygen",
    tagline: "Create AI avatar videos from text in minutes — no camera needed",
    description: "HeyGen is an AI video generation platform that helps businesses create professional videos with AI avatars. Used by companies for training, marketing, and sales videos.",
    logo: "https://logo.clearbit.com/heygen.com",
    website: "https://heygen.com",
    pricing: "FREEMIUM" as PricingType,
    pricingDetails: "Free 1 credit, paid plans from $29/mo",
    startingPrice: 29,
    hasFreeTrial: true,
    hasApi: true,
    isOpenSource: false,
    githubUrl: null,
    rating: 4.4,
    reviewCount: 421,
    featured: false,
    sponsored: false,
    trending: true,
    verified: true,
    metaTitle: "HeyGen Review | ToolWire AI",
    metaDescription: "Create professional AI avatar videos using HeyGen. Compare pricing plans and avatars.",
    aiSummary: "HeyGen is the premier avatar creation platform, offering extremely lifelike animations, realistic voice dubs, and easy slide integration.",
    viewCount: 7100,
    favoriteCount: 840,
    categoryId: "cat-video",
    platforms: ["WEB"] as Platform[],
    createdAt: new Date("2024-04-12"),
    updatedAt: new Date("2024-04-12"),
    features: [
      { id: "feat-hg1", text: "100+ photorealistic digital avatars", order: 1 },
      { id: "feat-hg2", text: "Video voice translation with lip-sync", order: 2 },
    ],
    pros: [
      { id: "pro-hg1", text: "Exceptional face-mapping lip sync capabilities" }
    ],
    cons: [
      { id: "con-hg1", text: "Highly restrictive free plan" }
    ],
    pricingPlans: [
      { id: "plan-hg1", name: "Creator", price: 29, period: "month", description: "For small video projects", features: ["15 credits/mo", "Premium avatars", "No watermarks"], highlighted: true }
    ],
    faqs: [],
    integrations: []
  },
  {
    id: "tool-notionai",
    name: "Notion AI",
    slug: "notion-ai",
    tagline: "AI that works inside your Notion workspace for writing and analysis",
    description: "Notion AI is built directly into Notion and helps you write, edit, summarize, and brainstorm—all within your workflow.",
    logo: "https://logo.clearbit.com/notion.so",
    website: "https://notion.so",
    pricing: "FREEMIUM" as PricingType,
    pricingDetails: "Add-on for $10/mo per member",
    startingPrice: 10,
    hasFreeTrial: true,
    hasApi: false,
    isOpenSource: false,
    githubUrl: null,
    rating: 4.4,
    reviewCount: 892,
    featured: false,
    sponsored: false,
    trending: true,
    verified: true,
    metaTitle: "Notion AI Assistant Review | ToolWire AI",
    metaDescription: "Analyze databases and write summaries directly in Notion with Notion AI. Read reviews.",
    aiSummary: "Notion AI integrates directly inside your existing databases and documentation, allowing for rapid summarization and Q&A workspace searches.",
    viewCount: 11048,
    favoriteCount: 1540,
    categoryId: "cat-productivity",
    platforms: ["WEB", "WINDOWS", "MAC", "IOS", "ANDROID"] as Platform[],
    createdAt: new Date("2024-04-18"),
    updatedAt: new Date("2024-04-18"),
    features: [
      { id: "feat-no1", text: "Workspace Q&A semantic search", order: 1 },
      { id: "feat-no2", text: "Database auto-filling property generators", order: 2 },
    ],
    pros: [
      { id: "pro-no1", text: "Incredibly useful since it resides directly where your notes are" }
    ],
    cons: [
      { id: "con-no1", text: "Only works inside Notion databases" }
    ],
    pricingPlans: [
      { id: "plan-no1", name: "AI Add-on", price: 10, period: "month", description: "Per member add-on", features: ["Unlimited Q&A queries", "Autofill features", "Text editing"], highlighted: true }
    ],
    faqs: [],
    integrations: []
  },
  {
    id: "tool-suno",
    name: "Suno AI",
    slug: "suno-ai",
    tagline: "Create full songs with AI — just describe the music you want",
    description: "Suno AI generates full songs complete with vocals, instruments, and lyrics from simple text prompts. Create professional-quality music in any genre in seconds.",
    logo: "https://logo.clearbit.com/suno.com",
    website: "https://suno.com",
    pricing: "FREEMIUM" as PricingType,
    pricingDetails: "Free 50 credits/day, Pro plan for $8/mo",
    startingPrice: 8,
    hasFreeTrial: true,
    hasApi: false,
    isOpenSource: false,
    githubUrl: null,
    rating: 4.5,
    reviewCount: 543,
    featured: false,
    sponsored: false,
    trending: true,
    verified: true,
    metaTitle: "Suno AI Music Generator | ToolWire AI",
    metaDescription: "Generate original music, vocals, and lyrics with Suno AI. Check commercial pricing plans.",
    aiSummary: "Suno AI is the absolute leader in generating full-fidelity songs, vocals, and instruments from simple textual descriptions.",
    viewCount: 9230,
    favoriteCount: 1020,
    categoryId: "cat-music",
    platforms: ["WEB"] as Platform[],
    createdAt: new Date("2024-04-10"),
    updatedAt: new Date("2024-04-10"),
    features: [
      { id: "feat-su1", text: "Create music with complete lyrical audio tracks", order: 1 },
    ],
    pros: [
      { id: "pro-su1", text: "Breathtaking voice synthesis in generated music" }
    ],
    cons: [
      { id: "con-su1", text: "Some genres sound slightly robotic or low-fidelity" }
    ],
    pricingPlans: [
      { id: "plan-su1", name: "Pro", price: 8, period: "month", description: "For hobbyists", features: ["2500 credits/mo", "Commercial license", "Fast generation queues"], highlighted: true }
    ],
    faqs: [],
    integrations: []
  },
  {
    id: "tool-bolt",
    name: "Bolt.new",
    slug: "bolt-new",
    tagline: "Prompt, run, edit and deploy full-stack web apps with AI",
    description: "Bolt is an AI-powered web development platform that lets you create, edit, and deploy full-stack applications directly in the browser. Powered by Stackblitz WebContainers.",
    logo: "https://logo.clearbit.com/bolt.new",
    website: "https://bolt.new",
    pricing: "FREEMIUM" as PricingType,
    pricingDetails: "Free token limits daily, Pro plan for $10/mo",
    startingPrice: 10,
    hasFreeTrial: true,
    hasApi: false,
    isOpenSource: false,
    githubUrl: null,
    rating: 4.7,
    reviewCount: 567,
    featured: true,
    sponsored: false,
    trending: true,
    verified: true,
    metaTitle: "Bolt.new Code Generator | ToolWire AI",
    metaDescription: "Run and edit full stack Node.js web applications in browser. Learn more about Bolt.new.",
    aiSummary: "Bolt.new is a revolutionary AI tool that runs a full browser-side terminal, allowing users to build React/Next.js/Node apps simply by prompts.",
    viewCount: 14202,
    favoriteCount: 3102,
    categoryId: "cat-coding",
    platforms: ["WEB"] as Platform[],
    createdAt: new Date("2024-05-15"),
    updatedAt: new Date("2024-05-15"),
    features: [
      { id: "feat-bo1", text: "In-browser WebContainer server execution", order: 1 },
      { id: "feat-bo2", text: "Automatic one-click deployment options", order: 2 },
    ],
    pros: [
      { id: "pro-bo1", text: "Builds functional full stack apps completely from text chat" }
    ],
    cons: [
      { id: "con-bo1", text: "Free daily tokens run out quickly" }
    ],
    pricingPlans: [
      { id: "plan-bo1", name: "Pro", price: 10, period: "month", description: "Get maximum coding capability", features: ["10x more prompt tokens", "Faster previews"], highlighted: true }
    ],
    faqs: [],
    integrations: []
  },
  {
    id: "tool-canva",
    name: "Canva AI",
    slug: "canva",
    tagline: "Design anything with AI — the world's most popular design tool",
    description: "Canva is an online design platform that has integrated powerful AI features. Magic Studio includes text-to-image, background remover, Magic Resize, and the AI presentation creator.",
    logo: "https://logo.clearbit.com/canva.com",
    website: "https://canva.com",
    pricing: "FREEMIUM" as PricingType,
    pricingDetails: "Free basic design, Pro features from $15/mo",
    startingPrice: 15,
    hasFreeTrial: true,
    hasApi: false,
    isOpenSource: false,
    githubUrl: null,
    rating: 4.6,
    reviewCount: 2134,
    featured: false,
    sponsored: false,
    trending: false,
    verified: true,
    metaTitle: "Canva Magic Studio Review | ToolWire AI",
    metaDescription: "Design premium visual layouts using Canva AI. Read reviews and pricing lists.",
    aiSummary: "Canva's Magic Studio represents a powerful entry-level AI package for creating slides, layouts, backgrounds, and visual mockups.",
    viewCount: 16400,
    favoriteCount: 2100,
    categoryId: "cat-design",
    platforms: ["WEB", "IOS", "ANDROID"] as Platform[],
    createdAt: new Date("2024-05-20"),
    updatedAt: new Date("2024-05-20"),
    features: [
      { id: "feat-ca1", text: "Magic Expand and Magic Eraser layout tools", order: 1 },
    ],
    pros: [
      { id: "pro-ca1", text: "Huge selection of presets, templates, and graphic resources" }
    ],
    cons: [
      { id: "con-ca1", text: "Fewer details compared to professional tools like Figma AI" }
    ],
    pricingPlans: [
      { id: "plan-ca1", name: "Pro", price: 15, period: "month", description: "For premium designers", features: ["Magic Studio AI access", "Premium assets", "Brand Kit"], highlighted: true }
    ],
    faqs: [],
    integrations: []
  }
];

export const collections = [
  {
    id: "col-free",
    title: "Best Free AI Tools",
    slug: "best-free-ai-tools",
    description: "The best AI tools that are completely free or have a generous free tier.",
    emoji: "🆓",
    cover: null,
    featured: true,
    tools: [
      { toolId: "tool-chatgpt", order: 1 },
      { toolId: "tool-claude", order: 2 },
      { toolId: "tool-perplexity", order: 3 },
      { toolId: "tool-notionai", order: 4 },
      { toolId: "tool-suno", order: 5 },
      { toolId: "tool-bolt", order: 6 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "col-students",
    title: "Best AI Tools for Students",
    slug: "ai-tools-for-students",
    description: "Research, writing, studying, and productivity tools for students.",
    emoji: "🎓",
    cover: null,
    featured: true,
    tools: [
      { toolId: "tool-chatgpt", order: 1 },
      { toolId: "tool-perplexity", order: 2 },
      { toolId: "tool-notionai", order: 3 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "col-coding",
    title: "Best AI Coding Tools",
    slug: "ai-coding-tools",
    description: "Code faster, debug smarter, and ship better software with AI.",
    emoji: "💻",
    cover: null,
    featured: true,
    tools: [
      { toolId: "tool-copilot", order: 1 },
      { toolId: "tool-cursor", order: 2 },
      { toolId: "tool-bolt", order: 3 },
      { toolId: "tool-chatgpt", order: 4 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "col-designers",
    title: "Best AI for Designers",
    slug: "ai-tools-for-designers",
    description: "Creative tools for graphic design, UI/UX, and visual content.",
    emoji: "🎨",
    cover: null,
    featured: true,
    tools: [
      { toolId: "tool-midjourney", order: 1 },
      { toolId: "tool-canva", order: 2 },
      { toolId: "tool-runway", order: 3 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const workflows = [
  {
    id: "wf-youtube",
    title: "Create YouTube Videos with AI",
    slug: "create-youtube-videos",
    description: "A complete AI-powered workflow for creating YouTube videos from idea to upload",
    emoji: "🎬",
    featured: true,
    steps: [
      { id: "step-1", title: "Idea Generation", description: "Use ChatGPT to generate video topics, titles, and hooks based on audience search patterns.", order: 1, toolId: "tool-chatgpt" },
      { id: "step-2", title: "Script Writing", description: "Use Claude to write a highly conversational, engaging video script based on the chosen topic.", order: 2, toolId: "tool-claude" },
      { id: "step-3", title: "Voice Over", description: "Use ElevenLabs to generate a realistic AI voiceover from the Claude-generated script.", order: 3, toolId: "tool-elevenlabs" },
      { id: "step-4", title: "Video Creation", description: "Use Runway or HeyGen to generate visuals, matching video clips, or digital presenter avatars.", order: 4, toolId: "tool-runway" },
      { id: "step-5", title: "Thumbnail Design", description: "Use Midjourney to create high-click-through rate artistic background assets for thumbnails.", order: 5, toolId: "tool-midjourney" },
    ],
    createdAt: new Date(),
  },
  {
    id: "wf-website",
    title: "Build a Website Without Coding",
    slug: "build-website-no-code",
    description: "A complete AI workflow to design, generate content, and publish a web app with zero code experience",
    emoji: "🌐",
    featured: true,
    steps: [
      { id: "step-w1", title: "Plan & Research", description: "Search for competitors and structure using Perplexity AI.", order: 1, toolId: "tool-perplexity" },
      { id: "step-w2", title: "Design & Prototype", description: "Lay out visual structure and generate placeholders in Canva.", order: 2, toolId: "tool-canva" },
      { id: "step-w3", title: "Build & Deploy", description: "Prompt full application code and deploy immediately in Bolt.new.", order: 3, toolId: "tool-bolt" },
    ],
    createdAt: new Date(),
  },
  {
    id: "wf-outreach",
    title: "AI-Powered B2B Lead Gen & Outreach",
    slug: "b2b-lead-gen-outreach",
    description: "Discover, target, draft, and send personalized cold email outreach at scale utilizing AI agents and reliable APIs.",
    emoji: "✉️",
    featured: true,
    steps: [
      { id: "step-o1", title: "Target Research", description: "Query and find ideal target prospects, their technology stacks, and competitor details using Perplexity AI.", order: 1, toolId: "tool-perplexity" },
      { id: "step-o2", title: "Email Copywriting", description: "Use ChatGPT to generate highly personalized and compelling email templates tailored to target pain points.", order: 2, toolId: "tool-chatgpt" },
      { id: "step-o3", title: "Automated Send", description: "Integrate email scripts into Resend to execute bulk delivery programmatically with pristine deliverability.", order: 3, toolId: "tool-resend" },
    ],
    createdAt: new Date(),
  },
  {
    id: "wf-localize",
    title: "Localized Marketing Asset Production",
    slug: "localize-marketing-assets",
    description: "Launch global marketing campaigns by localizing scripts, voice-overs, and digital presenter videos automatically.",
    emoji: "🌍",
    featured: true,
    steps: [
      { id: "step-l1", title: "Multilingual Voice", description: "Translate and generate realistic voiceovers in 29+ languages using ElevenLabs.", order: 1, toolId: "tool-elevenlabs" },
      { id: "step-l2", title: "Visual Generation", description: "Generate beautiful, localized background graphics and scene elements using Midjourney.", order: 2, toolId: "tool-midjourney" },
      { id: "step-l3", title: "Presenter Integration", description: "Bring the voiceover and design assets together into a natural-speaking video presenter using HeyGen.", order: 3, toolId: "tool-heygen" },
    ],
    createdAt: new Date(),
  },
  {
    id: "wf-seo-audit",
    title: "Automated SEO Blog Production & Audit",
    slug: "seo-blog-production-audit",
    description: "Research high-intent search phrases, write rank-ready articles, and execute structured schema audits dynamically.",
    emoji: "📈",
    featured: true,
    steps: [
      { id: "step-s1", title: "Keyword Extraction", description: "Run competitor keyword audits and find low-difficulty content opportunities with Perplexity AI.", order: 1, toolId: "tool-perplexity" },
      { id: "step-s2", title: "Content Creation", description: "Draft comprehensive, cited, and natural-sounding blog posts matching target search intent using Claude.", order: 2, toolId: "tool-claude" },
      { id: "step-s3", title: "Metadata & Audit", description: "Generate schema markups, SEO titles, descriptions, and audit internal links using ChatGPT.", order: 3, toolId: "tool-chatgpt" },
    ],
    createdAt: new Date(),
  }
];

export const blogPosts = [
  {
    id: "post-1",
    title: "Claude 3.5 Sonnet vs ChatGPT-4o: Which AI Coding Tool is Better?",
    slug: "claude-3-5-sonnet-vs-chatgpt-4o-coding",
    excerpt: "An in-depth coding comparison between Anthropic's Claude 3.5 Sonnet and OpenAI's GPT-4o, reviewing multiline suggestions, codebase indexing, and visual bugs.",
    content: `Coding with AI has become the standard for developers worldwide. With two heavyweights — OpenAI's ChatGPT-4o and Anthropic's Claude 3.5 Sonnet — leading the charts, the question remains: which coding assistant is actually better for developers?

### 1. Context Window and File Understanding
Claude 3.5 Sonnet comes equipped with a massive 200K token context window. In developer terms, this means you can feed entire code directories, library documents, or logs into Claude and get highly cohesive answers.
ChatGPT-4o, on the other hand, excels in active script debugging. However, for full codebase analysis, Claude's longer retention prevents it from repeating basic code fragments.

### 2. Multi-File Codebase Edits (Artifacts vs GPTs)
Anthropic's "Artifacts" layout is a game-changer. It provides a visual side-by-side split screen where your generated web UI, React components, or scripts render interactively. ChatGPT's custom GPTs are highly capable, but lack the elegant workspace split that speeds up frontend iterations.

### Verdict
For raw logic reasoning, code writing, and structural refactoring, **Claude 3.5 Sonnet** takes the crown. For quick code completions, script translation, and API integration, **ChatGPT-4o** remains a powerful companion.`,
    coverImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
    category: "comparison",
    tags: ["Claude", "ChatGPT", "Coding"],
    author: "Alex Mercer",
    authorAvatar: null,
    readingTime: 5,
    viewCount: 1540,
    featured: true,
    published: true,
    publishedAt: new Date("2024-06-01"),
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-06-01"),
  },
  {
    id: "post-2",
    title: "10 Free AI Tools Every Student Needs in 2026",
    slug: "free-ai-tools-for-students-2026",
    excerpt: "Save time, research smarter, and write better essays with these essential free AI assistants tailored specifically for college and high school students.",
    content: `Being a student in 2026 means mastering the usage of AI to supercharge your study efficiency. Instead of writing assignments manually or reading 80-page PDFs page-by-page, these free AI tools do the heavy lifting.

### 1. ChatGPT
Ideal for general brainstorming, vocabulary checks, and structural outlining. The free tier gives you access to basic models which are more than enough for outline drafts.

### 2. Perplexity AI
Perplexity is the ultimate search companion. Unlike search engines that give you links, Perplexity writes cited answers to your questions, perfect for academic referencing.

### 3. Grammarly
Checking grammar is critical. Grammarly's AI assistant checks spelling, clarity, and tone in real-time, helping you submit pristine documents.

Read on to find our other top student picks!`,
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    category: "roundup",
    tags: ["Students", "Free", "Productivity"],
    author: "Emma Watson",
    authorAvatar: null,
    readingTime: 4,
    viewCount: 2410,
    featured: true,
    published: true,
    publishedAt: new Date("2024-06-05"),
    createdAt: new Date("2024-06-05"),
    updatedAt: new Date("2024-06-05"),
  },
  {
    id: "post-3",
    title: "Gemini 2.0 Flash: A New Era of Speed and Context in Frontend Dev",
    slug: "gemini-2-0-flash-developer-review",
    excerpt: "With ultra-fast responses and a massive context window, Google's Gemini 2.0 Flash is redefining how frontend developers debug and optimize complex Next.js applications.",
    content: `Google recently introduced Gemini 2.0 Flash, raising the bar for modern developer tools. For developers working with framework-heavy ecosystems like Next.js, Vite, and Astro, this update is a game-changer.

### 1. The Need for Speed
In frontend engineering, feedback loops are everything. Gemini 2.0 Flash delivers token throughput speeds that feel nearly instantaneous. When resolving Tailwind styling conflicts or React hydration errors, developers can paste stack traces and receive structured bug fixes in under 400 milliseconds.

### 2. Multi-Page Debugging
Gemini 2.0 Flash's extended context window allows you to upload entire folders of page routes. For example, you can drop your 'src/app/api' directory and ask it to verify if all routes adhere to REST standards or have robust error boundaries.

### Verdict
For developers looking to integrate LLMs directly into IDE commands, **Gemini 2.0 Flash** represents the sweet spot of speed, cost efficiency, and accuracy.`,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    category: "news",
    tags: ["Gemini", "Google", "Frontend"],
    author: "Liam Carter",
    authorAvatar: null,
    readingTime: 4,
    viewCount: 1890,
    featured: false,
    published: true,
    publishedAt: new Date("2024-06-10"),
    createdAt: new Date("2024-06-10"),
    updatedAt: new Date("2024-06-10"),
  },
  {
    id: "post-4",
    title: "The Rise of Browser AI Agents: Bolt.new & Cursor Reshaping the IDE Market",
    slug: "rise-of-browser-ai-agents-bolt-cursor",
    excerpt: "IDE models are shifting from simple auto-completion to autonomous agents. We review how Bolt.new and Cursor are disrupting standard coding platforms.",
    content: `Coding assistants are transitioning from simple line autocomplete tools to fully autonomous agents. The prime examples of this shift are **Cursor**, an AI-first desktop IDE, and **Bolt.new**, an in-browser full-stack development workspace.

### The Agentic Philosophy
Rather than developers copying and pasting code snippets, modern tools interpret instructions like "Build a dark-mode toggle and persist settings to localstorage" and execute the changes across multiple files automatically.

### Bolt.new vs. Cursor
- **Bolt.new**: Excellent for zero-config prototyping. It spawns a WebContainer, compiles the Next.js bundle, and runs it right inside the browser, allowing non-technical users to build and deploy web apps in minutes.
- **Cursor**: The professional developer's workspace. It indexes your local directory, integrates terminal actions, and enables custom codebase chat profiles.

### What's Next?
As these agents get more intelligent, the barrier to software creation will continue to drop, shifting the developer's role from writing syntax to managing architectures.`,
    coverImage: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=800",
    category: "comparison",
    tags: ["Cursor", "Bolt.new", "Coding"],
    author: "Alex Mercer",
    authorAvatar: null,
    readingTime: 5,
    viewCount: 3120,
    featured: true,
    published: true,
    publishedAt: new Date("2024-06-12"),
    createdAt: new Date("2024-06-12"),
    updatedAt: new Date("2024-06-12"),
  },
  {
    id: "post-5",
    title: "Notion Acquires Skiff: What It Means for AI-powered Workspace Privacy",
    slug: "notion-acquires-skiff-workspace-privacy",
    excerpt: "Notion's acquisition of end-to-end encrypted workspace platform Skiff hints at a major push towards secure, privacy-first corporate AI applications.",
    content: `In a surprise industry consolidation, Notion announced the acquisition of **Skiff**, the privacy-first workspace suite known for its end-to-end encrypted mail, docs, and calendar services.

### Notion's Enterprise Push
Enterprise clients have always been hesitant to roll out AI tools due to data privacy concerns. By incorporating Skiff's encryption framework, Notion is preparing to offer local, zero-knowledge storage options for corporate users utilizing Notion AI.

### The Future of Secure AI
This acquisition signifies that the next battleground for productivity suites will be security. The winner will be the platform that can provide deep context-aware AI recommendations without exposing sensitive company databases to third-party model trainers.`,
    coverImage: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&q=80&w=800",
    category: "news",
    tags: ["Notion", "Skiff", "Privacy"],
    author: "Sophia Patel",
    authorAvatar: null,
    readingTime: 3,
    viewCount: 1450,
    featured: false,
    published: true,
    publishedAt: new Date("2024-06-15"),
    createdAt: new Date("2024-06-15"),
    updatedAt: new Date("2024-06-15"),
  }
];

export const reviews = [
  {
    id: "rev-1",
    title: "Incredible productivity booster!",
    body: "I've been using ChatGPT Plus daily for coding and copy writing. It saves me at least 10 hours a week. Highly recommend!",
    rating: 5,
    easeOfUse: 5,
    valueForMoney: 5,
    status: "APPROVED",
    helpfulCount: 42,
    userId: "user-1",
    user: { id: "user-1", name: "David K.", avatar: null },
    toolId: "tool-chatgpt",
    createdAt: new Date("2024-05-01"),
  },
  {
    id: "rev-2",
    title: "Unmatched coding assistant",
    body: "Claude 3.5 Sonnet has completely replaced GPT-4 for my programming tasks. The reasoning is far more accurate and visual artifacts are super helpful.",
    rating: 5,
    easeOfUse: 5,
    valueForMoney: 5,
    status: "APPROVED",
    helpfulCount: 31,
    userId: "user-2",
    user: { id: "user-2", name: "Sarah L.", avatar: null },
    toolId: "tool-claude",
    createdAt: new Date("2024-05-15"),
  },
  {
    id: "rev-3",
    title: "Essential for codebase indexing",
    body: "Cursor's @codebase chat has changed how I interact with unfamiliar repositories. It indexes everything locally and answers architectural questions in seconds. 10/10.",
    rating: 5,
    easeOfUse: 5,
    valueForMoney: 4,
    status: "APPROVED",
    helpfulCount: 22,
    userId: "user-3",
    user: { id: "user-3", name: "Ethan M.", avatar: null },
    toolId: "tool-cursor",
    createdAt: new Date("2024-05-20"),
  },
  {
    id: "rev-4",
    title: "Remarkable search results, minor pricing complaints",
    body: "Perplexity AI is my primary search engine now. It saves so much time compared to scanning pages of Google links. I only wish the Pro subscription limits were higher.",
    rating: 4,
    easeOfUse: 5,
    valueForMoney: 4,
    status: "APPROVED",
    helpfulCount: 19,
    userId: "user-4",
    user: { id: "user-4", name: "Chloe T.", avatar: null },
    toolId: "tool-perplexity",
    createdAt: new Date("2024-05-25"),
  },
  {
    id: "rev-5",
    title: "Pristine voice quality, but watch pricing plans",
    body: "ElevenLabs generates voice overs that are indistinguishable from real humans. I use it for all my voice narrations. However, if you are doing long-form content, the pricing characters get used up very quickly.",
    rating: 4,
    easeOfUse: 4,
    valueForMoney: 3,
    status: "APPROVED",
    helpfulCount: 15,
    userId: "user-5",
    user: { id: "user-5", name: "Jason K.", avatar: null },
    toolId: "tool-elevenlabs",
    createdAt: new Date("2024-06-01"),
  },
  {
    id: "rev-6",
    title: "Outstanding zero-code compiler!",
    body: "Bolt.new is a magical tool. I built a fully functional budget tracker and deployed it without running a single npm command myself. It is perfect for rapid prototyping.",
    rating: 5,
    easeOfUse: 5,
    valueForMoney: 5,
    status: "APPROVED",
    helpfulCount: 27,
    userId: "user-6",
    user: { id: "user-6", name: "Amanda W.", avatar: null },
    toolId: "tool-bolt",
    createdAt: new Date("2024-06-03"),
  },
  {
    id: "rev-7",
    title: "Excellent code generation, sometimes repeats context",
    body: "I use ChatGPT-4o to outline my API routes. It writes complete code fragments that compile immediately. However, if you ask it to modify large files, it tends to truncate the output which can be frustrating.",
    rating: 4,
    easeOfUse: 4,
    valueForMoney: 5,
    status: "APPROVED",
    helpfulCount: 33,
    userId: "user-1",
    user: { id: "user-1", name: "David K.", avatar: null },
    toolId: "tool-chatgpt",
    createdAt: new Date("2024-06-05"),
  },
  {
    id: "rev-8",
    title: "Extremely natural reasoning patterns",
    body: "Claude's writing quality is the best on the market. It doesn't use the standard preachy 'AI transition words' like 'delve' or 'testament' which makes its copy sound extremely human-written.",
    rating: 5,
    easeOfUse: 5,
    valueForMoney: 5,
    status: "APPROVED",
    helpfulCount: 38,
    userId: "user-2",
    user: { id: "user-2", name: "Sarah L.", avatar: null },
    toolId: "tool-claude",
    createdAt: new Date("2024-06-07"),
  }
];
