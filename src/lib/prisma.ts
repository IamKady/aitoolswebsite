import { PrismaClient } from "@prisma/client";
import * as mockDb from "./mockDb";

const isPlaceholder = (url: string | undefined) => {
  if (!url) return true;
  return url.includes("user:password") || url.includes("endpoint-pooler.region.aws.neon.tech");
};

const createMockModel = (modelName: string) => {
  const modelLower = modelName.toLowerCase();
  
  return {
    findMany: async (args: any = {}) => {
      // Basic mock implementation of findMany with where filters
      let list: any[] = [];
      if (modelLower === "aitool" || modelLower === "aitool") {
        list = mockDb.tools;
      } else if (modelLower === "category") {
        list = mockDb.categories;
      } else if (modelLower === "collection") {
        list = mockDb.collections;
      } else if (modelLower === "blogpost") {
        list = mockDb.blogPosts;
      } else if (modelLower === "tag") {
        list = mockDb.tags;
      } else if (modelLower === "review") {
        list = mockDb.reviews;
      } else if (modelLower === "workflow") {
        list = mockDb.workflows;
      }

      // Deep copy to prevent editing original mock database reference
      let result = JSON.parse(JSON.stringify(list));

      // Quick filter mock
      if (args.where) {
        result = result.filter((item: any) => {
          for (const key in args.where) {
            const filterVal = args.where[key];
            if (filterVal === undefined) continue;

            // Handle related filters or direct matches
            if (key === "category" && filterVal.slug) {
              const matchedCat = mockDb.categories.find(c => c.slug === filterVal.slug);
              if (item.categoryId !== matchedCat?.id) return false;
            } else if (key === "categoryId" && filterVal) {
              if (item.categoryId !== filterVal) return false;
            } else if (key === "slug" && filterVal) {
              if (item.slug !== filterVal) return false;
            } else if (key === "pricing" && filterVal && filterVal !== "all") {
              if (item.pricing !== filterVal) return false;
            } else if (key === "featured" && filterVal !== undefined) {
              if (item.featured !== filterVal) return false;
            } else if (key === "trending" && filterVal !== undefined) {
              if (item.trending !== filterVal) return false;
            } else if (key === "published" && filterVal !== undefined) {
              if (item.published !== filterVal) return false;
            }
          }
          return true;
        });
      }

      // Add includes
      result = result.map((item: any) => {
        if (modelLower === "aitool") {
          const matchedCat = mockDb.categories.find(c => c.id === item.categoryId) || null;
          item.category = matchedCat;
          item.tags = mockDb.tags.slice(0, 2).map(tag => ({ tag }));
          item.screenshots = [];
          item.features = item.features || [];
          item.pros = item.pros || [];
          item.cons = item.cons || [];
          item.pricingPlans = item.pricingPlans || [];
          item.faqs = item.faqs || [];
          item.reviews = mockDb.reviews.filter(r => r.toolId === item.id);
          item.alternativesOf = [];
          item._count = { favorites: item.favoriteCount || 0, reviews: item.reviewCount || 0 };
        } else if (modelLower === "collection") {
          item.tools = item.tools.map((t: any) => {
            const toolObj = mockDb.tools.find(tool => tool.id === t.toolId);
            return {
              ...t,
              tool: {
                ...toolObj,
                category: mockDb.categories.find(c => c.id === toolObj?.categoryId) || null,
                tags: mockDb.tags.slice(0, 2).map(tag => ({ tag })),
              }
            };
          });
        } else if (modelLower === "workflow") {
          item.steps = item.steps.map((s: any) => {
            const toolObj = mockDb.tools.find(tool => tool.id === s.toolId);
            return {
              ...s,
              tool: {
                ...toolObj,
                category: mockDb.categories.find(c => c.id === toolObj?.categoryId) || null,
                tags: mockDb.tags.slice(0, 2).map(tag => ({ tag })),
              }
            };
          });
        }
        return item;
      });

      // Pagination
      if (args.skip !== undefined && args.take !== undefined) {
        result = result.slice(args.skip, args.skip + args.take);
      } else if (args.take !== undefined) {
        result = result.slice(0, args.take);
      }

      return result;
    },

    findUnique: async (args: any) => {
      let list: any[] = [];
      if (modelLower === "aitool") list = mockDb.tools;
      else if (modelLower === "category") list = mockDb.categories;
      else if (modelLower === "collection") list = mockDb.collections;
      else if (modelLower === "blogpost") list = mockDb.blogPosts;
      else if (modelLower === "workflow") list = mockDb.workflows;

      let item = list.find((i: any) => {
        if (args.where.slug) return i.slug === args.where.slug;
        if (args.where.id) return i.id === args.where.id;
        return false;
      });

      if (!item) return null;

      item = JSON.parse(JSON.stringify(item));

      if (modelLower === "aitool") {
        item.category = mockDb.categories.find(c => c.id === item.categoryId) || null;
        item.tags = mockDb.tags.slice(0, 3).map(tag => ({ tag }));
        item.screenshots = [
          { id: "ss-1", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800", alt: "Dashboard", order: 1 }
        ];
        item.features = item.features || [];
        item.pros = item.pros || [];
        item.cons = item.cons || [];
        item.pricingPlans = item.pricingPlans || [];
        item.faqs = item.faqs || [];
        item.reviews = mockDb.reviews.filter(r => r.toolId === item.id).map(r => ({
          ...r,
          user: { id: r.userId, name: r.user.name, avatar: null }
        }));
        // Alternatives
        item.alternativesOf = mockDb.tools
          .filter(t => t.id !== item.id && t.categoryId === item.categoryId)
          .slice(0, 3)
          .map(alt => ({ alternative: { ...alt, category: mockDb.categories.find(c => c.id === alt.categoryId) || null, tags: [] } }));
        item._count = { favorites: item.favoriteCount || 0, reviews: item.reviewCount || 0 };
      } else if (modelLower === "collection") {
        item.tools = item.tools.map((t: any) => {
          const toolObj = mockDb.tools.find(tool => tool.id === t.toolId);
          return {
            ...t,
            tool: {
              ...toolObj,
              category: mockDb.categories.find(c => c.id === toolObj?.categoryId) || null,
              tags: mockDb.tags.slice(0, 2).map(tag => ({ tag })),
            }
          };
        });
      } else if (modelLower === "workflow") {
        item.steps = item.steps.map((s: any) => {
          const toolObj = mockDb.tools.find(tool => tool.id === s.toolId);
          return {
            ...s,
            tool: {
              ...toolObj,
              category: mockDb.categories.find(c => c.id === toolObj?.categoryId) || null,
              tags: mockDb.tags.slice(0, 2).map(tag => ({ tag })),
            }
          };
        });
      }

      return item;
    },

    count: async (args: any = {}) => {
      let list: any[] = [];
      if (modelLower === "aitool") list = mockDb.tools;
      else if (modelLower === "category") list = mockDb.categories;
      else if (modelLower === "collection") list = mockDb.collections;
      
      if (args.where) {
        list = list.filter((item: any) => {
          if (args.where.categoryId && item.categoryId !== args.where.categoryId) return false;
          if (args.where.pricing && item.pricing !== args.where.pricing) return false;
          return true;
        });
      }
      return list.length;
    },

    update: async (args: any) => {
      return args.data;
    },

    create: async (args: any) => {
      return args.data;
    },

    aggregate: async (args: any) => {
      return {
        _avg: { rating: 4.5 },
        _count: { id: 5 }
      };
    },

    groupBy: async (args: any) => {
      return [];
    }
  };
};

const mockPrisma = new Proxy({}, {
  get(target, prop) {
    const modelName = String(prop);
    if (modelName === "$disconnect" || modelName === "$connect") {
      return async () => {};
    }
    return createMockModel(modelName);
  }
}) as unknown as PrismaClient;

const prismaClientSingleton = () => {
  const url = process.env.DATABASE_URL;
  if (isPlaceholder(url)) {
    console.warn("⚠️ [Prisma] Database URL is missing or placeholder. Running in Fallback Mock Mode.");
    return mockPrisma;
  }
  
  try {
    return new PrismaClient({
      log:
        process.env.NODE_ENV === "development"
          ? ["query", "error", "warn"]
          : ["error"],
    });
  } catch (error) {
    console.error("⚠️ [Prisma] Failed to initialize PrismaClient. Falling back to Mock Mode.", error);
    return mockPrisma;
  }
};

declare const globalThis: {
  prismaGlobal: any;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
