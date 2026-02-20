import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { productShowcaseContent } from "@/config/content";

const ProductShowcase = () => {
  const c = productShowcaseContent;

  return (
    <section className="section-dark section-padding overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-video overflow-hidden rounded-lg shadow-2xl">
              <img
                src={c.image}
                alt="ZYLOENS Platform Dashboard"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-tech-cyan mb-3">
              {c.tag}
            </p>
            <h2 className="text-section-sm lg:text-section text-primary-foreground mb-3">
              {c.title}
            </h2>
            <p className="text-subtitle text-primary-foreground/80 mb-2">
              {c.subtitle}
            </p>
            <p className="text-body-lg text-primary-foreground/70 mb-8">
              {c.description}
            </p>

            <ul className="space-y-3 mb-8">
              {c.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-primary-foreground/90">
                  <Check size={18} className="text-tech-cyan shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to={c.cta.href}>{c.cta.label}</Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to={c.secondary.href}>{c.secondary.label}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
