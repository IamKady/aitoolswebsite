import { HeroSection } from "@/components/home/HeroSection";
import { PopularCategories } from "@/components/home/PopularCategories";
import { FeaturedTools } from "@/components/home/FeaturedTools";
import { TrendingTools } from "@/components/home/TrendingTools";
import { LatestTools } from "@/components/home/LatestTools";
import { Collections } from "@/components/home/Collections";
import { Statistics } from "@/components/home/Statistics";
import { Newsletter } from "@/components/home/Newsletter";
import { Testimonials } from "@/components/home/Testimonials";
import { AIWorkflows } from "@/components/home/AIWorkflows";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ToolWire AI — Find the Perfect AI Tool in Seconds",
  description:
    "Search, compare, review, and discover the world's best AI tools with intelligent recommendations. 500+ AI tools across 30+ categories.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Statistics />
      <FeaturedTools />
      <PopularCategories />
      <TrendingTools />
      <AIWorkflows />
      <LatestTools />
      <Collections />
      <Testimonials />
      <Newsletter />
    </>
  );
}
