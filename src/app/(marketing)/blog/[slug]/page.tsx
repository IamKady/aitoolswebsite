import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { ArrowLeft, Clock, Calendar, Share2, MessageSquare } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | ToolWire AI Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

// Lightweight inline markdown-to-html renderer
function renderContent(content: string) {
  const paragraphs = content.split("\n\n");
  
  return paragraphs.map((p, idx) => {
    const trimmed = p.trim();
    if (trimmed.startsWith("###")) {
      return (
        <h3 key={idx} className="text-xl font-bold text-foreground mt-6 mb-3">
          {trimmed.replace(/^###\s*/, "")}
        </h3>
      );
    }
    if (trimmed.startsWith("##")) {
      return (
        <h2 key={idx} className="text-2xl font-bold text-foreground mt-8 mb-4 border-b border-border pb-2">
          {trimmed.replace(/^##\s*/, "")}
        </h2>
      );
    }
    if (trimmed.startsWith("#")) {
      return (
        <h1 key={idx} className="text-3xl font-extrabold text-foreground mt-10 mb-6">
          {trimmed.replace(/^#\s*/, "")}
        </h1>
      );
    }
    if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
      const items = trimmed.split("\n").map(item => item.replace(/^[-*]\s*/, ""));
      return (
        <ul key={idx} className="list-disc pl-6 space-y-2 my-4 text-muted-foreground">
          {items.map((item, itemIdx) => (
            <li key={itemIdx}>{item}</li>
          ))}
        </ul>
      );
    }
    // Handle inline bold formatting **text**
    const parts = trimmed.split(/(\*\*.*?\*\*)/);
    const elements = parts.map((part, partIdx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={partIdx} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    return (
      <p key={idx} className="text-base text-muted-foreground leading-relaxed mb-4">
        {elements}
      </p>
    );
  });
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) notFound();

  // Increment viewCount asynchronously
  prisma.blogPost.update({
    where: { id: post.id },
    data: { viewCount: { increment: 1 } },
  }).catch(() => {});

  const categoryLabels: Record<string, string> = {
    news: "AI News",
    tutorial: "Tutorial",
    review: "Tool Review",
    comparison: "AI Comparison",
    guide: "Guide",
    roundup: "Weekly Roundup",
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Cover Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Blog
        </Link>

        {/* Title Block */}
        <div className="space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-semibold uppercase tracking-wider">
            {categoryLabels[post.category] || post.category}
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl leading-tight">
            {post.title}
          </h1>
          
          {/* Metadata */}
          <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground border-y border-border py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">
                {post.author.charAt(0)}
              </div>
              <span className="font-bold text-foreground">{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime || 5} min read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Cover Image */}
      {post.coverImage && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-border bg-muted">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose prose-invert max-w-none">
          {renderContent(post.content)}
        </article>
      </div>
    </div>
  );
}
