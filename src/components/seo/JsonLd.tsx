import React from "react";
import { SITE_URL } from "@/lib/site";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; item: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item,
    })),
  };
}

export function generateWebSiteJsonLd() {
  const url = SITE_URL;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ToolWire AI",
    "url": url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateBlogPostingJsonLd(post: {
  title: string;
  excerpt: string;
  coverImage: string | null;
  publishedAt: Date | string | null;
  updatedAt?: Date | string | null;
  author: string;
  slug: string;
}) {
  const url = SITE_URL;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage ? new URL(post.coverImage, url).toString() : undefined,
    "datePublished": post.publishedAt || undefined,
    "dateModified": post.updatedAt || undefined,
    "author": {
      "@type": "Person",
      "name": post.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "ToolWire AI",
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${url}/blog/${post.slug}`
    }
  };
}
