import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SolutionsByIndustry from "@/components/sections/SolutionsByIndustry";
import heroBg from "@/assets/hero-bg.jpg";

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
        <SolutionsByIndustry />

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
