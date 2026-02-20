import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Building2,
  Factory,
  HeartPulse,
  Zap,
  Settings,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { industryContent } from "@/config/content";

const industries = [
  {
    id: "education",
    icon: GraduationCap,
    label: "Education",
    subtitle: "AI-Powered Learning",
    tag: "Guaranteed Innovation",
    title: "High-Speed, Reliable AI for Education",
    description:
      "Efficient, scalable, and built to deliver intelligent learning experiences across institutions.",
    features: [
      {
        icon: Settings,
        text: "Student portfolio platforms with AI-driven analytics and insights.",
      },
      {
        icon: TrendingUp,
        text: "Adaptive learning systems that personalize curriculum in real-time.",
      },
    ],
    image: industryContent.education.image,
  },
  {
    id: "cities",
    icon: Building2,
    label: "Smart Cities",
    subtitle: "Urban Intelligence",
    tag: "Scalable Infrastructure",
    title: "Intelligent Systems for Smart Cities",
    description:
      "AI-powered urban monitoring, traffic optimization, and environmental sensing at scale.",
    features: [
      {
        icon: Settings,
        text: "Real-time traffic flow optimization across citywide sensor networks.",
      },
      {
        icon: TrendingUp,
        text: "Environmental monitoring with predictive air quality analytics.",
      },
    ],
    image: industryContent.cities.image,
  },
  {
    id: "manufacturing",
    icon: Factory,
    label: "Manufacturing",
    subtitle: "Industrial AI",
    tag: "Precision Automation",
    title: "AI-Driven Industrial Intelligence",
    description:
      "Predictive maintenance, quality inspection, and process automation for modern factories.",
    features: [
      {
        icon: Settings,
        text: "Predictive maintenance reducing equipment downtime by up to 70%.",
      },
      {
        icon: TrendingUp,
        text: "Visual quality inspection achieving 99.5% defect detection accuracy.",
      },
    ],
    image: industryContent.manufacturing.image,
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    label: "Healthcare",
    subtitle: "Medical AI",
    tag: "Clinical Excellence",
    title: "Advanced AI for Healthcare Delivery",
    description:
      "AI-powered diagnostics, patient flow optimization, and clinical decision support.",
    features: [
      {
        icon: Settings,
        text: "Medical imaging AI delivering 35% faster diagnostic workflows.",
      },
      {
        icon: TrendingUp,
        text: "Clinical trial matching accelerating patient enrollment by 3x.",
      },
    ],
    image: industryContent.healthcare.image,
  },
];

const SolutionsByIndustry = () => {
  const [activeId, setActiveId] = useState("education");
  const active = industries.find((i) => i.id === activeId)!;

  return (
    <section className="section-padding bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Solutions
          </p>
          <h2 className="text-section-sm lg:text-section mb-4">
            Solutions by Industry
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Tailored AI platforms powering real-world impact across sectors.
          </p>
        </motion.div>

        {/* Icon navigation */}
        <div className="flex justify-center gap-4 lg:gap-10 mb-10 flex-wrap">
          {industries.map((ind) => {
            const isActive = ind.id === activeId;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveId(ind.id)}
                className="group flex flex-col items-center gap-2 cursor-pointer relative pb-3"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-card border border-border text-muted-foreground group-hover:text-primary group-hover:border-primary/30 group-hover:-translate-y-1"
                  }`}
                >
                  <ind.icon size={24} />
                </div>
                <span
                  className={`text-sm font-medium transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {ind.label}
                </span>
                <span
                  className={`text-xs transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground/60"
                  }`}
                >
                  {ind.subtitle}
                </span>
                {/* Active underline */}
                <div
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full bg-primary transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Main content card */}
        <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0"
            >
              {/* Left — text */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 w-fit mb-5">
                  <Zap size={12} />
                  {active.tag}
                </span>

                <h3 className="text-2xl lg:text-[32px] font-bold leading-tight mb-4">
                  {active.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {active.description}
                </p>

                <div className="space-y-4 mb-8">
                  {active.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <feat.icon size={18} />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feat.text}
                      </p>
                    </div>
                  ))}
                </div>

                <Link to="/contact">
                  <Button size="lg" className="rounded-full gap-2">
                    Get Started <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>

              {/* Right — dashboard visual */}
              <div className="relative bg-secondary/30 flex items-center justify-center p-6 lg:p-10">
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-border">
                  <img
                    src={active.image}
                    alt={`${active.label} dashboard`}
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                {/* Preload all industry images for instant tab switching */}
                <div className="hidden">
                  {industries.map((ind) => (
                    <img key={ind.id} src={ind.image} alt="" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SolutionsByIndustry;
