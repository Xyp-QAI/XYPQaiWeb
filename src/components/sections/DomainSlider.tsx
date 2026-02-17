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
    label: "AI & Machine Learning",
    headline: "Deep learning systems for real-world decision making.",
    description:
      "Our AI and machine learning platforms power autonomous decision-making across education, infrastructure, and industry — trained on real-world data and deployed at scale.",
    image: domainAiMl,
  },
  {
    label: "Computer Vision & Perception AI",
    headline: "Visual intelligence for autonomous understanding.",
    description:
      "Advanced perception AI that processes visual data in real-time, enabling object detection, facial recognition, and sensor fusion for institutional and industrial applications.",
    image: domainCv,
  },
  {
    label: "IoT & Smart Devices",
    headline: "Connected intelligence across physical environments.",
    description:
      "End-to-end IoT ecosystems connecting sensors, devices, and edge processors to deliver real-time monitoring, automation, and intelligent control.",
    image: domainIot,
  },
  {
    label: "Smart Cities & Automation",
    headline: "Urban intelligence and infrastructure systems.",
    description:
      "Scalable AI-driven platforms that transform urban environments through intelligent traffic management, energy optimization, and public safety systems.",
    image: domainSmartcity,
  },
  {
    label: "Industrial Intelligence",
    headline: "Manufacturing optimization through AI.",
    description:
      "Intelligent manufacturing systems that reduce downtime, optimize throughput, and enable predictive maintenance across complex industrial operations.",
    image: domainIndustrial,
  },
  {
    label: "Quantum Computing Research",
    headline: "Next-generation computational paradigms.",
    description:
      "Pioneering quantum computing research that pushes the boundaries of computational possibility — from algorithm design to hybrid quantum-classical systems.",
    image: domainQuantum,
  },
];

const DomainSlider = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
        {/* Section heading */}
        <h2 className="text-section-sm lg:text-section text-foreground text-center mb-10">
          Intelligent Systems Across Multiple Domains
        </h2>

        {/* Card container — fixed height, no layout shift */}
        <div className="rounded-xl overflow-hidden bg-[hsl(var(--tech-dark))] relative h-[500px] lg:h-[600px]">
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary))_1px,transparent_1px),radial-gradient(circle_at_75%_75%,hsl(var(--primary))_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none" />

          {/* Content area (absolute-fills the card so every domain is identical size) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2"
            >
              {/* Text — left */}
              <div className="flex flex-col justify-center p-8 lg:p-10 xl:p-14 relative z-10">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-tech-cyan mb-5">
                  {domains[active].label}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-[2.75rem] xl:text-[3.25rem] font-bold leading-[1.1] text-primary-foreground mb-6">
                  {domains[active].headline}
                </h3>
                <p className="text-sm lg:text-base leading-relaxed text-primary-foreground/60 mb-8 max-w-md">
                  {domains[active].description}
                </p>
                <Link
                  to="/technology"
                  className="inline-flex items-center gap-2 text-primary-foreground font-semibold text-sm hover:gap-3 transition-all duration-300"
                >
                  Learn more <ChevronRight size={16} />
                </Link>
              </div>

              {/* Image — right */}
              <div className="relative hidden lg:block">
                <img
                  src={domains[active].image}
                  alt={domains[active].label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[hsl(var(--tech-dark))] opacity-80" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dash indicators — pinned to bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center gap-2.5 pb-8">
            {domains.map((d, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`View ${d.label}`}
                className={`h-[5px] rounded-full transition-all duration-500 ease-out ${
                  i === active
                    ? "w-12 bg-primary-foreground"
                    : "w-6 bg-primary-foreground/20 hover:bg-primary-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DomainSlider;
