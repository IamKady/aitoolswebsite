import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Guides, Tool Reviews & Tutorials",
  description:
    "Explore practical AI guides, tool reviews, tutorials, and comparisons to help you choose and use AI tools with confidence.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

type BlogPostListItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string | null;
  author: string;
  publishedAt: Date | null;
  readingTime: number | null;
};

export default async function BlogPage() {
  const posts: BlogPostListItem[] = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  const categoryLabels: Record<string, string> = {
    news: "AI News",
    tutorial: "Tutorial",
    review: "Tool Review",
    comparison: "AI Comparison",
    guide: "Guide",
    roundup: "Weekly Roundup",
  };

  const categoryColors: Record<string, string> = {
    news: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    tutorial: "bg-green-500/10 text-green-400 border-green-500/20",
    review: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    comparison: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    guide: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    roundup: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Insights & Guides
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl text-balance">
          AI guides, reviews &amp; tutorials
          </h1>
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto">
          Find practical explainers, hands-on comparisons, and ideas for using AI tools in work, study, and everyday life.
          </p>
        </div>
      </div>

      {/* Blog list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/20 hover:shadow-xl transition-all duration-300"
              >
                <div>
                  {/* Cover */}
                  {post.coverImage && (
                    <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-muted">
                      <Image
                        src={post.coverImage}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Body */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-semibold uppercase tracking-wider ${categoryColors[post.category] || "bg-muted text-muted-foreground border-border"}`}>
                        {categoryLabels[post.category] || post.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readingTime || 5} min read</span>
                      </div>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-auto flex items-center justify-between border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">{post.author}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {post.publishedAt
                          ? dateFormatter.format(new Date(post.publishedAt))
                          : ""}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    Read article
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground bg-card border border-border rounded-2xl max-w-lg mx-auto">
            <p className="text-sm">We are preparing our first set of guides. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
