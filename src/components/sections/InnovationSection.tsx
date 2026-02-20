import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { innovationContent } from "@/config/content";

const InnovationSection = () => {
  const c = innovationContent;

  return (
    <section className="section-padding overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-video overflow-hidden rounded-lg shadow-xl">
              <img
                src={c.image}
                alt={c.imageAlt}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h2 className="text-section-sm lg:text-section mb-4">{c.title}</h2>
            <p className="text-body-lg text-muted-foreground mb-8">{c.description}</p>

            <ul className="space-y-3 mb-8">
              {c.bullets.map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <Button asChild>
              <Link to={c.cta.href}>{c.cta.label}</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
