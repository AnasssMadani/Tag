import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollRevealDemo from "@/components/ScrollRevealDemo";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import FeaturesDeepDive from "@/components/FeaturesDeepDive";
import SocialProof from "@/components/SocialProof";
import ProductGrid from "@/components/ProductGrid";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ScrollRevealDemo />
      <HowItWorks />
      <UseCases />
      <FeaturesDeepDive />
      <SocialProof />
      <ProductGrid />
      <FAQ />
      <Footer />
    </main>
  );
}
