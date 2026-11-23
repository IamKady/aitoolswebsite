import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import prisma from "@/lib/prisma";
import { mergeEditorialArticles } from "@/lib/editorial-articles";

type LatestArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string | null;
  author: string;
  publishedAt: Date | null;
  readingTime: number | null;
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export async function LatestArticles() {
  const databasePosts: LatestArticle[] = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
    select: {
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      coverImage: true,
      author: true,
      publishedAt: true,
      readingTime: true,
    },
  });
  const posts = mergeEditorialArticles(databasePosts).slice(0, 3);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <BookOpen aria-hidden="true" className="h-4 w-4" />
              The learning corner
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Practical AI guides for <span className="gradient-text">real work</span>
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Explore explainers, comparisons, and ideas for using AI tools with confidence.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Browse all articles <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/30"
              >
                {post.coverImage && (
                  <Link
                    href={`/blog/${post.slug}`}
                    aria-label={`Read ${post.title}`}
                    className="relative block aspect-[16/9] overflow-hidden bg-muted"
                  >
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                )}
                <div className="p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">
                      {post.category.replace(/-/g, " ")}
                    </span>
                    {post.readingTime && (
                      <span className="inline-flex items-center gap-1">
                        <Clock aria-hidden="true" className="h-3.5 w-3.5" />
                        {post.readingTime} min read
                      </span>
                    )}
                    {post.publishedAt && (
                      <time dateTime={new Date(post.publishedAt).toISOString()}>
                        {dateFormatter.format(new Date(post.publishedAt))}
                      </time>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold leading-snug text-foreground text-pretty">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-primary focus-visible:text-primary"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground">
                    By {post.author}
                  </p>
                  <p className="mt-2 line-clamp-3 break-words text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
            New guides are on the way. Explore the{" "}
            <Link href="/tools" className="font-medium text-primary hover:underline">
              AI tool directory
            </Link>{" "}
            in the meantime.
          </div>
        )}
      </div>
    </section>
  );
}
