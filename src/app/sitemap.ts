import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { SITE_URL } from "@/lib/site";

type SlugRow = { slug: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tools, categories, collections, posts]: [
    SlugRow[],
    SlugRow[],
    SlugRow[],
    SlugRow[],
  ] = await Promise.all([
    prisma.aITool.findMany({ select: { slug: true } }),
    prisma.category.findMany({ select: { slug: true } }),
    prisma.collection.findMany({ select: { slug: true } }),
    prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    }),
  ]);

  const staticPages = [
    SITE_URL,
    `${SITE_URL}/tools`,
    `${SITE_URL}/categories`,
    `${SITE_URL}/collections`,
    `${SITE_URL}/compare`,
    `${SITE_URL}/blog`,
    `${SITE_URL}/ai-assistant`,
    `${SITE_URL}/workflows`,
    `${SITE_URL}/advertise`,
    `${SITE_URL}/submit`,
    `${SITE_URL}/about`,
    `${SITE_URL}/contact`,
  ];

  return [
    ...staticPages.map((url) => ({ url })),
    ...tools.map((tool) => ({ url: `${SITE_URL}/tools/${tool.slug}` })),
    ...categories.map((category) => ({
      url: `${SITE_URL}/categories/${category.slug}`,
    })),
    ...collections.map((collection) => ({
      url: `${SITE_URL}/collections/${collection.slug}`,
    })),
    ...posts.map((post) => ({ url: `${SITE_URL}/blog/${post.slug}` })),
  ];
}
