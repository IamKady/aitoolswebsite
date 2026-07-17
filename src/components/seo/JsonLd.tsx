import React from "react";

interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
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
  const url = process.env.NEXT_PUBLIC_APP_URL || "https://toolwire.ai";
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
  updatedAt: Date | string | null;
  author: string;
  slug: string;
}) {
  const url = process.env.NEXT_PUBLIC_APP_URL || "https://toolwire.ai";
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage || undefined,
    "datePublished": post.publishedAt || undefined,
    "dateModified": post.updatedAt || undefined,
    "author": {
      "@type": "Person",
      "name": post.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "ToolWire AI",
      "logo": {
        "@type": "ImageObject",
        "url": `${url}/logo-dark.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${url}/blog/${post.slug}`
    }
  };
}
