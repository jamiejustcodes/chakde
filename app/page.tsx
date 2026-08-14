import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChakde from "@/components/home/WhyChakde";
import CharitySection from "@/components/home/CharitySection";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import features from "@/config/features";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <WhyChakde />
      {features.charitySection && <CharitySection />}
      {features.testimonials && <Testimonials />}
      {features.newsletter && <Newsletter />}
    </>
  );
}
