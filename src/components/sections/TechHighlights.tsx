import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const tabs = [
  {
    id: "ai",
    label: "AI & ML",
    title: "Machine Learning & Deep AI",
    description:
      "Our AI systems leverage advanced deep learning frameworks and neural network architectures to deliver real-time intelligent decision making across institutional and industrial environments.",
    capabilities: [
      "Deep learning frameworks",
      "Neural network architectures",
      "Model training pipelines",
      "MLOps infrastructure",
      "Transfer learning",
      "Natural language processing",
    ],
  },
  {
    id: "cv",
    label: "Computer Vision",
    title: "Real-Time Perception AI",
    description:
      "Our computer vision systems enable real-time visual intelligence for institutional and industrial applications with state-of-the-art accuracy.",
    capabilities: [
      "Object detection & recognition",
      "Facial recognition systems",
      "Gesture recognition",
      "Video analytics",
      "Sensor fusion",
      "3D spatial mapping",
    ],
  },
  {
    id: "iot",
    label: "IoT Systems",
    title: "Connected Intelligence",
    description:
      "Scalable IoT infrastructure connecting thousands of devices with real-time data processing and intelligent automation capabilities.",
    capabilities: [
      "Device management",
      "Protocol support",
      "Scalable architecture",
      "Real-time communication",
      "Edge processing",
      "Fleet management",
    ],
  },
  {
    id: "edge",
    label: "Edge Computing",
    title: "On-Device Intelligence",
    description:
      "Deploy AI directly on edge devices for real-time processing without cloud dependency, optimized for low-latency institutional environments.",
    capabilities: [
      "On-device inference",
      "Sensor processing",
      "Low-latency systems",
      "Hardware optimization",
      "Embedded deployments",
      "Power-efficient ML",
    ],
  },
  {
    id: "quantum",
    label: "Quantum Research",
    title: "Next-Generation Computing",
    description:
      "Pioneering quantum computing research to unlock computational capabilities that will redefine AI, cryptography, and scientific simulation.",
    capabilities: [
      "Quantum algorithms",
      "Hybrid quantum-classical systems",
      "Error correction research",
      "Quantum simulation",
      "Cryptographic applications",
      "Research partnerships",
    ],
  },
];

const TechHighlights = () => {
  const [activeTab, setActiveTab] = useState("ai");
  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="section-alt section-padding">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-section-sm lg:text-section mb-4">
            Powered by Advanced Technology
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the core technologies driving our intelligent systems.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-5 py-2.5 text-sm font-medium rounded-md transition-all duration-300",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-background text-foreground border border-border hover:border-primary/30"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
        >
          <div>
            <h3 className="text-2xl font-bold mb-4">{active.title}</h3>
            <p className="text-body-lg text-muted-foreground mb-6">
              {active.description}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Key Capabilities
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {active.capabilities.map((cap) => (
                <div
                  key={cap}
                  className="flex items-center gap-3 bg-background border border-border rounded-md px-4 py-3"
                >
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span className="text-sm">{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechHighlights;
