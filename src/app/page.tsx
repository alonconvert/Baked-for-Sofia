import { ScrollProgressBar } from "@/components/scroll-progress-bar";
import { HomeHero } from "@/components/sections/home-hero";
import { FeatureHighlights } from "@/components/sections/feature-highlights";
import { ProductCategories } from "@/components/sections/product-categories";
import { AboutPreview } from "@/components/sections/about-preview";
import { DeliveryInfo } from "@/components/sections/delivery-info";
import { SupportingLocal } from "@/components/sections/supporting-local";
import { HomeCTA } from "@/components/sections/home-cta";

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <HomeHero />
      <FeatureHighlights />
      <ProductCategories />
      <AboutPreview />
      <DeliveryInfo />
      <SupportingLocal />
      <HomeCTA />
    </>
  );
}
