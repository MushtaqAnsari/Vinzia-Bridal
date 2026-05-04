import { HeroSection } from "@/components/site/HeroSection"
import { FeaturedCategories } from "@/components/site/FeaturedCategories"
import { BrandStory } from "@/components/site/BrandStory"
import { LookbookPreview } from "@/components/site/LookbookPreview"
import { TestimonialsSection } from "@/components/site/TestimonialsSection"
import { InstagramFeed } from "@/components/site/InstagramFeed"
import { CTABanner } from "@/components/site/CTABanner"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <BrandStory />
      <LookbookPreview />
      <TestimonialsSection />
      <InstagramFeed />
      <CTABanner />
    </>
  )
}
