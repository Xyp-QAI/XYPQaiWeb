import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { heroContent } from "@/config/content";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-border/60">
      <div className="container mx-auto px-4 lg:px-8 max-w-[900px]">
        <div className="min-h-[80vh] flex flex-col items-center justify-center py-20 lg:py-28 text-center">
          {/* Logo — brand anchor */}
          <motion.div
            className="mb-8 lg:mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={heroContent.logo}
              alt="XYP Quantum AI"
              className="w-[140px] h-[140px] md:w-[160px] md:h-[160px] object-contain drop-shadow-md rounded-2xl"
              width={160}
              height={160}
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-foreground leading-tight mb-5 max-w-2xl"
            style={{ letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {heroContent.headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {heroContent.subheadline}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              to={heroContent.cta.href}
              className="inline-flex items-center gap-2 text-primary font-semibold text-base hover:gap-3 transition-all duration-300 group rounded-full border-2 border-primary px-6 py-3"
            >
              {heroContent.cta.label}
              <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
