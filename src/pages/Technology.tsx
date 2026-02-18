import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, Landmark, Factory, Cpu, FlaskConical, Rocket } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SolutionsByIndustry from "@/components/sections/SolutionsByIndustry";
import TechNotepad from "@/components/sections/TechNotepad";
import heroBg from "@/assets/hero-bg.jpg";

const partnerships = [
  { title: "Schools & Education", description: "For K-12 schools, universities, and research institutions", icon: <GraduationCap className="w-5 h-5 text-gray-700" /> },
  { title: "Government Programs", description: "For smart city initiatives and public sector partnerships", icon: <Landmark className="w-5 h-5 text-gray-700" /> },
  { title: "Industry & Hardware", description: "For manufacturing, industrial automation, chip makers, device teams, and ODMs", icon: <Factory className="w-5 h-5 text-gray-700" /> },
  { title: "Research & Product Innovation", description: "For university research teams, consortiums, technology startups, and innovation labs", icon: <FlaskConical className="w-5 h-5 text-gray-700" /> },
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

        {/* Technology Notepad */}
        <TechNotepad />

        {/* Partnerships */}
        <section className="section-padding" style={{ background: 'hsl(216 100% 37%)' }}>
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex justify-center mb-4">
              <span className="text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full bg-white/15 text-white/90">
                Partners
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-12">
              Collaboration Across the Technology Ecosystem
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {partnerships.map((p, i) => (
                <motion.div
                  key={p.title}
                  className="bg-white rounded-2xl p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                    {p.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1.5 text-sm">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/90 transition-colors"
              >
                Partner with us →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Technology;
