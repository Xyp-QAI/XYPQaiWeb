import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import productShowcase from "@/assets/product-showcase.jpg";

const features = [
  "Student digital portfolios",
  "Teacher-managed workflows",
  "Principal & admin dashboards",
  "Privacy-first architecture",
  "Real-time analytics",
];

const ProductShowcase = () => {
  return (
    <section className="section-dark section-padding overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={productShowcase}
              alt="ZYLOENS Platform Dashboard"
              className="rounded-lg shadow-2xl w-full"
              loading="lazy"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-tech-cyan mb-3">
              Flagship Product
            </p>
            <h2 className="text-section-sm lg:text-section text-primary-foreground mb-3">
              ZYLOENS Platform
            </h2>
            <p className="text-subtitle text-primary-foreground/80 mb-2">
              A Safer, Smarter School Ecosystem
            </p>
            <p className="text-body-lg text-primary-foreground/70 mb-8">
              ZYLOENS is a school-owned AI platform designed to nurture student
              creativity, track achievements, and modernize institutional operations
              without unsafe social media or data risks.
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-primary-foreground/90">
                  <Check size={18} className="text-tech-cyan shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">Book a School Demo</Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/products">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
