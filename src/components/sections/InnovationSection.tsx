import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import researchLab from "@/assets/research-lab.jpg";

const InnovationSection = () => {
  return (
    <section className="section-padding overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={researchLab}
              alt="Quantum computing research laboratory"
              className="rounded-lg shadow-xl w-full"
              loading="eager"
              decoding="async"
            />
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-section-sm lg:text-section mb-4">
              Innovation Driving the Future
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              At XYP Quantum AI, we're not just building products—we're advancing
              the fundamental research that will power tomorrow's intelligent systems.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Quantum computing research",
                "Advanced AI algorithms",
                "Edge intelligence systems",
                "Privacy-preserving technologies",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <Button asChild>
              <Link to="/technology">Read Our Research →</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
