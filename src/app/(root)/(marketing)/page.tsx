import FeaturesSection from "@/components/marketing/features-section/features-section";
import HeroSection from "@/components/marketing/hero-section/hero-section";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
    </>
  );
}
