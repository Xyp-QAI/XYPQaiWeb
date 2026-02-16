import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const CTASection = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.h2
          className="text-section-sm lg:text-section text-primary-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Ready to Transform Your Institution?
        </motion.h2>
        <motion.p
          className="text-body-lg text-primary-foreground/80 max-w-xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Partner with XYP Quantum AI to deploy intelligent systems that drive real-world impact.
        </motion.p>
        <motion.div
          className="flex items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">Get Started</Link>
          </Button>
          <Button variant="hero-outline" size="lg" asChild>
            <Link to="/contact">Contact Sales</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
