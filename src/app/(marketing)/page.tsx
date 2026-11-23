import { HeroSection } from "@/components/home/HeroSection";
import { PopularCategories } from "@/components/home/PopularCategories";
import { FeaturedTools } from "@/components/home/FeaturedTools";
import { TrendingTools } from "@/components/home/TrendingTools";
import { LatestTools } from "@/components/home/LatestTools";
import { Collections } from "@/components/home/Collections";
import { Newsletter } from "@/components/home/Newsletter";
import { AIWorkflows } from "@/components/home/AIWorkflows";
import { StackBuilder } from "@/components/home/StackBuilder";
import { LatestArticles } from "@/components/home/LatestArticles";
import { JsonLd, generateWebSiteJsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Find AI Tools for Work, Study & Creativity",
  description:
    "Explore AI tools, compare features and pricing, read practical guides, and find alternatives for work, study, creativity, and everyday tasks.",
  alternates: {
    canonical: SITE_URL,
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={generateWebSiteJsonLd()} />
      <HeroSection />
      <FeaturedTools />
      <PopularCategories />
      <StackBuilder />
      <TrendingTools />
      <AIWorkflows />
      <LatestArticles />
      <LatestTools />
      <Collections />
      <Newsletter />
    </>
  );
}
