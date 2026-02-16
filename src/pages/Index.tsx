import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ValueProposition from "@/components/sections/ValueProposition";
import SolutionsGrid from "@/components/sections/SolutionsGrid";
import ProductShowcase from "@/components/sections/ProductShowcase";
import TechHighlights from "@/components/sections/TechHighlights";
import InnovationSection from "@/components/sections/InnovationSection";
import StatsSection from "@/components/sections/StatsSection";
import NewsSection from "@/components/sections/NewsSection";
import CTASection from "@/components/sections/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ValueProposition />
        <SolutionsGrid />
        <ProductShowcase />
        <TechHighlights />
        <InnovationSection />
        <StatsSection />
        <NewsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
