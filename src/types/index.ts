import { PricingType, Platform } from "@prisma/client";

// ─────────────────────────────────────────────────────────────────────────────
// Tool Types
// ─────────────────────────────────────────────────────────────────────────────

export interface ToolCardData {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  logo: string | null;
  website: string;
  pricing: PricingType;
  startingPrice: number | null;
  hasFreeTrial: boolean;
  hasApi: boolean;
  rating: number;
  reviewCount: number;
  featured: boolean;
  sponsored: boolean;
  trending: boolean;
  verified: boolean;
  platforms: Platform[];
  category: {
    id: string;
    name: string;
    slug: string;
    icon: string | null;
    color: string | null;
  };
  tags: Array<{ tag: { id: string; name: string; slug: string } }>;
  _count?: {
    favorites: number;
    reviews: number;
  };
  createdAt: Date;
}

export interface ToolDetailData extends ToolCardData {
  aiSummary: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  isOpenSource: boolean;
  githubUrl: string | null;
  pricingDetails: string | null;
  viewCount: number;
  favoriteCount: number;
  screenshots: Array<{ id: string; url: string; alt: string | null; order: number }>;
  features: Array<{ id: string; text: string; order: number }>;
  pros: Array<{ id: string; text: string }>;
  cons: Array<{ id: string; text: string }>;
  pricingPlans: Array<{
    id: string;
    name: string;
    price: number | null;
    period: string | null;
    description: string | null;
    features: string[];
    highlighted: boolean;
  }>;
  integrations: Array<{ id: string; name: string; logo: string | null; url: string | null }>;
  faqs: Array<{ id: string; question: string; answer: string; order: number }>;
  reviews: Array<ReviewData>;
  alternatives: Array<{ alternative: ToolCardData }>;
}

export interface ReviewData {
  id: string;
  title: string;
  body: string;
  rating: number;
  easeOfUse: number | null;
  valueForMoney: number | null;
  features: number | null;
  support: number | null;
  pros: string[];
  cons: string[];
  helpfulCount: number;
  user: {
    id: string;
    name: string | null;
    avatar: string | null;
  };
  createdAt: Date;
}

// ─────────────────────────────────────────────────────────────────────────────
// Category Types
// ─────────────────────────────────────────────────────────────────────────────

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  toolCount: number;
  featured: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Collection Types
// ─────────────────────────────────────────────────────────────────────────────

export interface CollectionData {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  emoji: string | null;
  cover: string | null;
  featured: boolean;
  tools: Array<{ tool: ToolCardData; order: number }>;
  createdAt: Date;
}

// ─────────────────────────────────────────────────────────────────────────────
// Search Types
// ─────────────────────────────────────────────────────────────────────────────

export interface SearchParams {
  q?: string;
  category?: string;
  pricing?: PricingType | "all";
  platform?: Platform | "all";
  rating?: string;
  sort?: "relevance" | "rating" | "newest" | "trending" | "popular";
  page?: number;
  limit?: number;
  hasFreeTrial?: boolean;
  hasApi?: boolean;
  isOpenSource?: boolean;
}

export interface SearchResult {
  tools: ToolCardData[];
  total: number;
  page: number;
  totalPages: number;
  query: string;
  filters: SearchParams;
}

// ─────────────────────────────────────────────────────────────────────────────
// Blog Types
// ─────────────────────────────────────────────────────────────────────────────

export interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: string;
  tags: string[];
  author: string;
  authorAvatar: string | null;
  readingTime: number | null;
  viewCount: number;
  featured: boolean;
  publishedAt: Date | null;
  createdAt: Date;
}

// ─────────────────────────────────────────────────────────────────────────────
// AI Types
// ─────────────────────────────────────────────────────────────────────────────

export interface AIRecommendation {
  tool: ToolCardData;
  reason: string;
  score: number;
  pros: string[];
  cons: string[];
}

export interface AIResponse {
  message: string;
  recommendations: AIRecommendation[];
  query: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Misc
// ─────────────────────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type SortOption = "relevance" | "rating" | "newest" | "trending" | "popular";

export interface TrendingSearch {
  query: string;
  count: number;
}
