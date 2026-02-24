import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Target, Eye, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileCarousel } from "@/components/ui/profile-card-testimonial-carousel";
import SEO from "@/components/SEO";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";

const leaders = [
  { name: "Dr. Arjun Mehta", title: "Founder & CEO", description: "Leads XYP Quantum AI's vision for intelligent systems. PhD in Computer Science from IIT Bombay. Previously led AI research at a major tech firm.", imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=75", linkedinUrl: "#" },
  { name: "Dr. Priya Sharma", title: "CTO", description: "Architect of ZYLOENS platform. 15+ years in distributed systems and edge computing. Former principal engineer at Infosys.", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=75", linkedinUrl: "#" },
  { name: "Vikram Desai", title: "VP of Engineering", description: "Oversees product engineering and development. Background in building scalable SaaS platforms serving millions of users across India.", imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=75", linkedinUrl: "#" },
  { name: "Dr. Ananya Iyer", title: "Head of Quantum Research", description: "Pioneer in quantum error correction. Published 30+ papers. Former research lead at IISc Bengaluru.", imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=75", linkedinUrl: "#" },
  { name: "Raj Patel", title: "VP of Business Development", description: "Drives strategic partnerships and market expansion. 12+ years in enterprise technology sales across education and government sectors in India.", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=75", linkedinUrl: "#" },
  { name: "Neha Kulkarni", title: "VP of Product", description: "Shapes product strategy and user experience. Background in ed-tech product management with a focus on institutional solutions across Indian states.", imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=75", linkedinUrl: "#" },
];

const timeline = [
  { year: "2020", event: "Company founded in Bengaluru with a mission to build AI for education" },
  { year: "2021", event: "ZYLOENS v1.0 launched in pilot schools across Karnataka" },
  { year: "2022", event: "Seed funding secured, expanded to 20+ institutions across South India" },
  { year: "2023", event: "Computer vision & IoT division established in Bengaluru" },
  { year: "2024", event: "Quantum computing research lab inaugurated at IISc campus" },
  { year: "2025", event: "Expanded operations to 8+ Indian states" },
  { year: "2026", event: "Edge Intelligence & Smart Devices in development" },
];

const About = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      // Offset for fixed navbar
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="About Us" description="Deep-tech company building intelligent systems across education, infrastructure, and quantum research. Founded in Bengaluru." path="/about" />
      <Navbar />
      <main>
        <PageHero
          title="About XYP Quantum AI"
          subtitle="Building the future of intelligent systems"
        />

        {/* Overview */}
        <section id="about" className="section-padding">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
            <motion.h2
              className="text-section-sm lg:text-section mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              We are a deep-tech company building intelligent systems across education, infrastructure, perception AI, and future quantum research.
            </motion.h2>
            <p className="text-body-lg text-muted-foreground mb-12">
              Founded in 2020 in Bengaluru, XYP Quantum AI is dedicated to creating responsible, scalable AI solutions
              that transform institutions and advance cutting-edge research. Our multidisciplinary team
              combines expertise in machine learning, computer vision, IoT, and quantum computing.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Founded", value: "2020" },
                { label: "Team Size", value: "50+" },
                { label: "Locations", value: "3" },
                { label: "Patents", value: "10+" },
              ].map((stat) => (
                <div key={stat.label} className="bg-secondary rounded-lg p-5">
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="section-alt section-padding">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  text: "Empower institutions and industries through responsible, scalable intelligent systems.",
                },
                {
                  icon: Eye,
                  title: "Our Vision",
                  text: "Enable education today and smart ecosystems tomorrow through deep-tech innovation.",
                },
                {
                  icon: Heart,
                  title: "Our Values",
                  text: "Innovation with responsibility. Privacy-first systems. Reliability over hype. Rural-first accessibility. Future-ready thinking.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="bg-card border border-border rounded-lg p-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section id="team" className="section-padding">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-section-sm lg:text-section mb-10 text-center">Leadership Team</h2>
            <ProfileCarousel profiles={leaders} />
          </div>
        </section>

        {/* Timeline */}
        <section className="section-alt section-padding">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <h2 className="text-section-sm lg:text-section mb-10 text-center">Our Journey</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    className="relative pl-12"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                    <p className="text-sm font-semibold text-primary">{item.year}</p>
                    <p className="text-muted-foreground">{item.event}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Careers */}
        <section id="careers" className="section-padding">
          <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
            <h2 className="text-section-sm lg:text-section mb-4">Join Our Team</h2>
            <p className="text-muted-foreground mb-8">
              We're building the future of AI systems and looking for talented individuals to join our mission.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {["Cutting-edge technology", "Research opportunities", "Competitive benefits"].map((b) => (
                <div key={b} className="bg-secondary rounded-lg p-4">
                  <p className="text-sm font-medium">{b}</p>
                </div>
              ))}
            </div>
            <Button size="lg" asChild>
              <Link to="/contact">View Open Positions <ArrowRight size={16} /></Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
