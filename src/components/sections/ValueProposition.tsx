import { motion } from "framer-motion";
import { Brain, ShieldCheck, Atom } from "lucide-react";

const values = [
  {
    icon: Brain,
    title: "Real-World AI Systems",
    description: "Built for institutions, infrastructure & IoT",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-First Architecture",
    description: "School-owned platforms with complete control",
  },
  {
    icon: Atom,
    title: "Future-Ready Innovation",
    description: "Quantum computing research today",
  },
];

const ValueProposition = () => {
  return (
    <section className="section-alt section-padding">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          {values.map((item, i) => (
            <motion.div
              key={item.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary mb-5">
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
