import { CtaSection } from "@/components/landing/cta-section";
import FeaturesSection from "@/components/landing/features-section";
import HeroSection from "@/components/landing/hero-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import LandingHeader from "@/components/landing/landing-header";
import LogoCloud from "@/components/landing/logo-cloud";
import { PricingSection } from "@/components/landing/pricing-section";
import { ShowcaseSection } from "@/components/landing/showcase-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background space-y-4">
      <LandingHeader />
      <main>
        <HeroSection />
        <LogoCloud />
        <FeaturesSection />
        <ShowcaseSection />
        <PricingSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
