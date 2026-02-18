import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Search, Settings2, Code2, ShieldCheck, MessageSquare, Paintbrush } from "lucide-react";

const techStack = [
  {
    id: "ml",
    title: "Machine Learning & AI",
    filename: "ml_specs.md",
    items: [
      'title: "Machine Learning & AI"',
      'description: "Advanced deep learning',
      '  frameworks and neural architectures"',
      'icon: "brain"',
      "---",
      "",
      "## Core Capabilities",
      "",
      "Deep learning frameworks for",
      "real-time intelligent decision",
      "making across institutional and",
      "industrial environments.",
      "",
      "- Deep learning frameworks",
      "- Neural network architectures",
      "- Model training pipelines",
      "- MLOps infrastructure",
    ],
  },
  {
    id: "cv",
    title: "Computer Vision",
    filename: "cv_specs.md",
    items: [
      'title: "Computer Vision"',
      'description: "Real-time visual',
      '  intelligence systems"',
      'icon: "eye"',
      "---",
      "",
      "## Perception AI",
      "",
      "State-of-the-art visual",
      "recognition and analysis for",
      "institutional applications.",
      "",
      "- Object detection systems",
      "- Facial recognition",
      "- Gesture recognition",
      "- Video analytics",
    ],
  },
  {
    id: "edge",
    title: "Edge Computing",
    filename: "edge_specs.md",
    items: [
      'title: "Edge Computing"',
      'description: "On-device AI',
      '  inference and processing"',
      'icon: "cpu"',
      "---",
      "",
      "## On-Device Intelligence",
      "",
      "Deploy AI directly on edge",
      "devices for real-time processing",
      "without cloud dependency.",
      "",
      "- On-device inference",
      "- Sensor processing",
      "- Low-latency systems",
      "- Hardware optimization",
    ],
  },
  {
    id: "iot",
    title: "IoT & Connectivity",
    filename: "iot_specs.md",
    items: [
      'title: "IoT & Connectivity"',
      'description: "Scalable connected',
      '  device infrastructure"',
      'icon: "network"',
      "---",
      "",
      "## Connected Intelligence",
      "",
      "Scalable IoT infrastructure",
      "connecting thousands of devices",
      "with intelligent automation.",
      "",
      "- Device management",
      "- Protocol support",
      "- Scalable architecture",
      "- Real-time communication",
    ],
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    filename: "cloud_specs.md",
    items: [
      'title: "Cloud Infrastructure"',
      'description: "Enterprise-grade',
      '  cloud platform"',
      'icon: "cloud"',
      "---",
      "",
      "## Cloud Platform",
      "",
      "Scalable, secure cloud services",
      "powering AI workloads at",
      "institutional scale.",
      "",
      "- Scalable APIs",
      "- Microservices architecture",
      "- Data storage & processing",
      "- Security & compliance",
    ],
  },
  {
    id: "quantum",
    title: "Quantum Research",
    filename: "quantum_specs.md",
    items: [
      'title: "Quantum Research"',
      'description: "Next-generation',
      '  computing paradigms"',
      'icon: "rocket"',
      "---",
      "",
      "## Quantum Computing",
      "",
      "Pioneering quantum research to",
      "unlock next-gen computational",
      "capabilities.",
      "",
      "- Quantum algorithms",
      "- Future computing",
      "- Research partnerships",
      "- Hybrid quantum systems",
    ],
  },
];

const features = [
  { icon: Code2, title: "API Playground", desc: "Test and explore APIs directly in your stack" },
  { icon: ShieldCheck, title: "Visitor Authentication", desc: "Secure access with customizable controls" },
  { icon: MessageSquare, title: "User Feedback", desc: "Keep systems and code in perfect harmony" },
  { icon: Paintbrush, title: "Fully Customizable", desc: "Tailor with custom components and configs" },
];

const TechNotepad = () => {
  const [activeId, setActiveId] = useState("ml");
  const [visibleLines, setVisibleLines] = useState(0);
  const active = techStack.find((t) => t.id === activeId)!;

  useEffect(() => {
    setVisibleLines(0);
    const total = active.items.length;
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setVisibleLines(current);
      if (current >= total) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, [activeId, active.items.length]);

  const getLineColor = (line: string) => {
    if (line.startsWith('title:') || line.startsWith('description:') || line.startsWith('icon:'))
      return "text-sky-400";
    if (line.startsWith("##")) return "text-emerald-400";
    if (line.startsWith("- ")) return "text-orange-300";
    if (line === "---") return "text-white/20";
    if (line.startsWith('"') || line.includes('"'))
      return "text-amber-300";
    return "text-white/60";
  };

  return (
    <section className="py-20 lg:py-28" style={{ background: "#000" }}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0">
          {/* Left - heading + nav */}
          <div className="lg:w-[40%] lg:pr-12 flex flex-col justify-center">
            <motion.h2
              className="text-3xl lg:text-4xl font-bold text-white mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Built on Advanced Technology
            </motion.h2>
            <motion.p
              className="text-white/50 mb-10 text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Explore the core technologies powering our intelligent systems.
            </motion.p>

            <nav className="space-y-1">
              {techStack.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => setActiveId(tech.id)}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-all duration-200 border-l-2 ${
                    activeId === tech.id
                      ? "border-primary text-white"
                      : "border-transparent text-white/40 hover:text-white/70 hover:border-white/20"
                  }`}
                >
                  {tech.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Right - Notepad viewer */}
          <div className="lg:w-[60%]">
            <motion.div
              className="rounded-xl overflow-hidden"
              style={{ background: "#1a1a1a" }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {/* Sidebar icons + editor */}
              <div className="flex">
                {/* Mini sidebar */}
                <div
                  className="hidden sm:flex flex-col items-center gap-4 py-5 px-3"
                  style={{ background: "#141414" }}
                >
                  <Copy className="w-4 h-4 text-white/30" />
                  <Search className="w-4 h-4 text-white/30" />
                  <Settings2 className="w-4 h-4 text-white/30" />
                </div>

                {/* Editor area */}
                <div className="flex-1 min-w-0">
                  {/* Tab bar */}
                  <div
                    className="flex items-center gap-2 px-4 py-2.5 border-b"
                    style={{ borderColor: "#2a2a2a", background: "#1a1a1a" }}
                  >
                    <div className="flex items-center gap-1.5 mr-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={activeId}
                        className="text-xs text-white/60 font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        {active.filename}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-white/20 text-xs ml-1">×</span>
                  </div>

                  {/* Code content */}
                  <div className="p-5 min-h-[360px] font-mono text-sm leading-relaxed">
                    <div className="text-white/20 text-xs mb-3">---</div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeId}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        {active.items.map((line, i) => (
                          <div
                            key={`${activeId}-${i}`}
                            className="flex gap-4"
                            style={{
                              opacity: i < visibleLines ? 1 : 0,
                              transition: "opacity 0.15s ease",
                            }}
                          >
                            <span className="text-white/15 w-6 text-right text-xs leading-6 select-none shrink-0">
                              {i + 2}
                            </span>
                            <span className={`${getLineColor(line)} leading-6 text-xs sm:text-sm`}>
                              {line || "\u00A0"}
                            </span>
                          </div>
                        ))}
                        {/* Extra empty lines */}
                        {[...Array(3)].map((_, i) => (
                          <div key={`empty-${i}`} className="flex gap-4">
                            <span className="text-white/15 w-6 text-right text-xs leading-6 select-none shrink-0">
                              {active.items.length + i + 2}
                            </span>
                            <span className="leading-6">&nbsp;</span>
                          </div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Feature strip */}
        <div className="mt-16 pt-10 border-t" style={{ borderColor: "#1a1a1a" }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <f.icon className="w-4 h-4 text-white/50" />
                  <span className="text-white font-semibold text-sm">{f.title}</span>
                </div>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechNotepad;
