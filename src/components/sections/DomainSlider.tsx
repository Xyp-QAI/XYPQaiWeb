import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import domainAiMl from "@/assets/domain-ai-ml.jpg";
import domainCv from "@/assets/domain-cv.jpg";
import domainIot from "@/assets/domain-iot.jpg";
import domainSmartcity from "@/assets/domain-smartcity.jpg";
import domainIndustrial from "@/assets/domain-industrial.jpg";
import domainQuantum from "@/assets/domain-quantum.jpg";

const domains = [
  {
    label: "AI & ML",
    headline: "Deep learning systems for real-world decision making.",
    description:
      "Our AI and machine learning platforms power autonomous decision-making across education, infrastructure, and industry — trained on real-world data and deployed at scale.",
    image: domainAiMl,
  },
  {
    label: "Computer Vision",
    headline: "Visual intelligence for autonomous understanding.",
    description:
      "Advanced perception AI that processes visual data in real-time, enabling object detection, facial recognition, and sensor fusion for institutional and industrial applications.",
    image: domainCv,
  },
  {
    label: "IoT & Devices",
    headline: "Connected intelligence across physical environments.",
    description:
      "End-to-end IoT ecosystems connecting sensors, devices, and edge processors to deliver real-time monitoring, automation, and intelligent control.",
    image: domainIot,
  },
  {
    label: "Smart Cities",
    headline: "Urban intelligence and infrastructure systems.",
    description:
      "Scalable AI-driven platforms that transform urban environments through intelligent traffic management, energy optimization, and public safety systems.",
    image: domainSmartcity,
  },
  {
    label: "Industrial AI",
    headline: "Manufacturing optimization through AI.",
    description:
      "Intelligent manufacturing systems that reduce downtime, optimize throughput, and enable predictive maintenance across complex industrial operations.",
    image: domainIndustrial,
  },
  {
    label: "Quantum Research",
    headline: "Next-generation computational paradigms.",
    description:
      "Pioneering quantum computing research that pushes the boundaries of computational possibility — from algorithm design to hybrid quantum-classical systems.",
    image: domainQuantum,
  },
];

const DomainSlider = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-[hsl(var(--tech-dark))] overflow-hidden">
      {/* Subtle circuit pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary))_1px,transparent_1px),radial-gradient(circle_at_75%_75%,hsl(var(--primary))_1px,transparent_1px)] bg-[length:40px_40px]" />

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]"
          >
            {/* Image side */}
            <div className="relative overflow-hidden h-64 lg:h-auto">
              <img
                src={domains[active].image}
                alt={domains[active].label}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[hsl(var(--tech-dark))] opacity-60 hidden lg:block" />
            </div>

            {/* Text side */}
            <div className="flex flex-col justify-center px-8 py-12 lg:px-16 lg:py-20">
              <span className="text-sm font-semibold uppercase tracking-widest text-tech-cyan mb-4">
                {domains[active].label}
              </span>
              <h2 className="text-3xl lg:text-[2.75rem] font-bold leading-tight text-primary-foreground mb-6">
                {domains[active].headline}
              </h2>
              <p className="text-base lg:text-lg leading-relaxed text-primary-foreground/70 mb-8 max-w-lg">
                {domains[active].description}
              </p>
              <Link
                to="/technology"
                className="inline-flex items-center gap-2 text-tech-cyan font-semibold hover:gap-3 transition-all duration-300"
              >
                Learn More <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dash indicators */}
        <div className="flex items-center justify-center gap-3 pb-10 pt-4">
          {domains.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View ${domains[i].label}`}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                i === active
                  ? "w-14 bg-primary"
                  : "w-7 bg-primary-foreground/25 hover:bg-primary-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DomainSlider;
