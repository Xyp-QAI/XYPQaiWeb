import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import heroBg from "@/assets/hero-bg.jpg";

const industryTabs = [
  {
    id: "education",
    label: "Education",
    title: "AI Solutions for Education",
    description: "Transform educational institutions with intelligent systems that enhance learning and operations.",
    solutions: ["Student portfolio platforms", "Learning analytics", "Institutional automation", "Campus security systems", "Resource optimization"],
    caseStudies: [
      { title: "District-Wide ZYLOENS Deployment", result: "40% improvement in engagement" },
      { title: "AI-Powered Assessment System", result: "Reduced grading time by 60%" },
      { title: "Smart Campus Initiative", result: "30% energy savings" },
    ],
  },
  {
    id: "cities",
    label: "Smart Cities",
    title: "Smart City Infrastructure",
    description: "Build intelligent urban environments with AI-powered monitoring, automation, and citizen services.",
    solutions: ["Traffic optimization", "Environmental monitoring", "Public safety systems", "Waste management", "Energy grid optimization"],
    caseStudies: [
      { title: "Urban Traffic AI System", result: "25% congestion reduction" },
      { title: "Air Quality Monitoring", result: "City-wide coverage" },
      { title: "Smart Street Lighting", result: "45% energy reduction" },
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    title: "Industrial Intelligence",
    description: "Optimize manufacturing with AI-driven quality control, predictive maintenance, and process automation.",
    solutions: ["Predictive maintenance", "Quality inspection", "Supply chain optimization", "Robotic process automation", "Digital twins"],
    caseStudies: [
      { title: "Predictive Maintenance System", result: "70% fewer breakdowns" },
      { title: "Visual Quality Inspection", result: "99.5% accuracy" },
      { title: "Supply Chain Optimization", result: "20% cost reduction" },
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    title: "Healthcare AI Solutions",
    description: "Advance healthcare delivery with AI-powered diagnostics, patient management, and research tools.",
    solutions: ["Medical imaging AI", "Patient flow optimization", "Drug discovery assistance", "Clinical decision support", "Health record analytics"],
    caseStudies: [
      { title: "Radiology AI Assistant", result: "35% faster diagnosis" },
      { title: "Patient Wait Time Reduction", result: "50% improvement" },
      { title: "Clinical Trial Matching", result: "3x faster enrollment" },
    ],
  },
];

const techStack = [
  {
    title: "Machine Learning & AI",
    items: ["Deep learning frameworks", "Neural network architectures", "Model training pipelines", "MLOps infrastructure"],
  },
  {
    title: "Computer Vision",
    items: ["Object detection systems", "Facial recognition", "Gesture recognition", "Video analytics"],
  },
  {
    title: "Edge Computing",
    items: ["On-device inference", "Sensor processing", "Low-latency systems", "Hardware optimization"],
  },
  {
    title: "IoT & Connectivity",
    items: ["Device management", "Protocol support", "Scalable architecture", "Real-time communication"],
  },
  {
    title: "Cloud Infrastructure",
    items: ["Scalable APIs", "Microservices architecture", "Data storage & processing", "Security & compliance"],
  },
  {
    title: "Quantum Research",
    items: ["Quantum algorithms", "Future computing", "Research partnerships", "Hybrid quantum systems"],
  },
];

const partnerships = [
  { title: "Schools & Educational Institutions", description: "K-12 schools, universities, research institutions" },
  { title: "Government & Innovation Programs", description: "Smart city initiatives, public sector partnerships" },
  { title: "Industry & IoT Partners", description: "Manufacturing, industrial automation companies" },
  { title: "Embedded & Hardware Teams", description: "Chip manufacturers, device makers, ODMs" },
  { title: "Research & Academic Communities", description: "University labs, research consortiums" },
  { title: "Startups & Product Teams", description: "Technology startups, innovation labs" },
];

const Technology = () => {
  const [activeIndustry, setActiveIndustry] = useState("education");
  const industry = industryTabs.find((t) => t.id === activeIndustry)!;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-16 min-h-[45vh] flex items-center">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative z-10 container mx-auto px-4 lg:px-8 py-20">
            <h1 className="text-hero-sm lg:text-hero text-primary-foreground mb-4">Technology & Solutions</h1>
            <p className="text-body-lg text-primary-foreground/80 max-w-xl">
              Advanced AI systems for real-world deployment
            </p>
          </div>
        </section>

        {/* Solutions by Industry */}
        <section className="section-padding">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-section-sm lg:text-section mb-10 text-center">Solutions by Industry</h2>

            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {industryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveIndustry(tab.id)}
                  className={cn(
                    "px-5 py-2.5 text-sm font-medium rounded-md transition-all",
                    activeIndustry === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground border border-border hover:border-primary/30"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <motion.div
              key={activeIndustry}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">{industry.title}</h3>
                <p className="text-muted-foreground mb-6">{industry.description}</p>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Solutions</h4>
                <ul className="space-y-2 mb-6">
                  {industry.solutions.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <ArrowRight size={14} className="text-primary" /> {s}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="sm"><Download size={14} /> Download Solution Brief</Button>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Case Studies</h4>
                <div className="space-y-4">
                  {industry.caseStudies.map((cs) => (
                    <div key={cs.title} className="bg-card border border-border rounded-lg p-5">
                      <h5 className="font-semibold mb-1">{cs.title}</h5>
                      <p className="text-sm text-primary font-medium">{cs.result}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="section-alt section-padding">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-section-sm lg:text-section mb-10 text-center">Built on Advanced Technology</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.title}
                  className="bg-card border border-border rounded-lg p-6 card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <h3 className="text-lg font-semibold mb-4">{tech.title}</h3>
                  <ul className="space-y-2">
                    {tech.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnerships */}
        <section className="section-padding">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-section-sm lg:text-section mb-4 text-center">Collaboration Across the Technology Ecosystem</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              We partner across industries and institutions to deliver impactful solutions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnerships.map((p, i) => (
                <motion.div
                  key={p.title}
                  className="bg-card border border-border rounded-lg p-6 card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <h3 className="font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
                  <Link to="/contact" className="text-sm text-primary font-medium">Partner with us →</Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Technology;
