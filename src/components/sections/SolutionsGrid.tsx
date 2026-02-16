import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Eye,
  Building2,
  Cpu,
  Factory,
  Atom,
} from "lucide-react";

const solutions = [
  {
    icon: GraduationCap,
    title: "AI for Education",
    description: "School platforms, student portfolios, institutional tools",
  },
  {
    icon: Eye,
    title: "Computer Vision & Perception AI",
    description: "Real-time visual intelligence, sensor processing",
  },
  {
    icon: Building2,
    title: "Smart Cities & Infrastructure",
    description: "Urban automation, intelligent monitoring systems",
  },
  {
    icon: Cpu,
    title: "IoT & Smart Devices",
    description: "Connected devices, automated environments",
  },
  {
    icon: Factory,
    title: "Industrial Intelligence",
    description: "Manufacturing AI, process automation",
  },
  {
    icon: Atom,
    title: "Quantum Computing Research",
    description: "Next-generation computing research",
  },
];

const SolutionsGrid = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-section-sm lg:text-section mb-4">
            Intelligent Systems Across Multiple Domains
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            From education to quantum research, our AI solutions power real-world impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                to="/technology"
                className="card-hover block bg-card border border-border rounded-lg p-8 h-full group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <sol.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{sol.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{sol.description}</p>
                <span className="text-sm text-primary font-medium">
                  Learn more →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsGrid;
