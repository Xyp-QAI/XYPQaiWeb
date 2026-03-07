import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ctaContent } from "@/config/content";

const CTASection = () => {
  const c = ctaContent;

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${c.background})` }}
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.h2
          className="text-section-sm lg:text-section text-primary-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {c.title}
        </motion.h2>
        <motion.p
          className="text-body-lg text-primary-foreground/80 max-w-xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          {c.description}
        </motion.p>
        <motion.div
          className="flex items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button variant="hero" size="lg" asChild>
            <Link to={c.primaryCta.href}>{c.primaryCta.label}</Link>
          </Button>
          <Button variant="hero-outline" size="lg" asChild>
            <Link to={c.secondaryCta.href}>{c.secondaryCta.label}</Link>
          </Button>
          <nav className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-primary-foreground/70" aria-label="Main pages">
            <Link to="/products" className="hover:text-primary-foreground transition-colors">Products</Link>
            <Link to="/technology" className="hover:text-primary-foreground transition-colors">Technology</Link>
            <Link to="/about" className="hover:text-primary-foreground transition-colors">Company</Link>
            <Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link>
          </nav>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
