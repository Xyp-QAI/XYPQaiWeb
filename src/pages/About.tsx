import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileCarousel } from "@/components/ui/profile-card-testimonial-carousel";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import heroBg from "@/assets/hero-bg.jpg";

const leaders = [
  { name: "Dr. Arjun Mehta", title: "Founder & CEO", description: "Leads XYP Quantum AI's vision for intelligent systems. PhD in Computer Science from MIT. Previously led AI research at a major tech firm.", imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80", linkedinUrl: "#" },
  { name: "Dr. Priya Sharma", title: "CTO", description: "Architect of ZYLOENS platform. 15+ years in distributed systems and edge computing. Former principal engineer at AWS.", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80", linkedinUrl: "#" },
  { name: "David Chen", title: "VP of Engineering", description: "Oversees product engineering and development. Background in building scalable SaaS platforms serving millions of users.", imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80", linkedinUrl: "#" },
  { name: "Dr. Sarah Williams", title: "Head of Quantum Research", description: "Pioneer in quantum error correction. Published 30+ papers. Former research lead at IBM Quantum.", imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80", linkedinUrl: "#" },
  { name: "Raj Patel", title: "VP of Business Development", description: "Drives strategic partnerships and market expansion. 12+ years in enterprise technology sales across education and government sectors.", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80", linkedinUrl: "#" },
  { name: "Emma Rodriguez", title: "VP of Product", description: "Shapes product strategy and user experience. Background in ed-tech product management with a focus on institutional solutions.", imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80", linkedinUrl: "#" },
];

const timeline = [
  { year: "2020", event: "Company founded with a mission to build AI for education" },
  { year: "2021", event: "ZYLOENS v1.0 launched in pilot schools" },
  { year: "2022", event: "Series A funding, expanded to 20+ institutions" },
  { year: "2023", event: "Computer vision & IoT division established" },
  { year: "2024", event: "Quantum computing research lab inaugurated" },
  { year: "2025", event: "International expansion to 5 countries" },
  { year: "2026", event: "Edge Intelligence & Smart Devices in development" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-16 min-h-[45vh] flex items-center">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative z-10 container mx-auto px-4 lg:px-8 py-20">
            <h1 className="text-hero-sm lg:text-hero text-primary-foreground mb-4">About XYP Quantum AI</h1>
            <p className="text-body-lg text-primary-foreground/80 max-w-xl">Building the future of intelligent systems</p>
          </div>
        </section>

        {/* Overview */}
        <section className="section-padding">
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
              Founded in 2020, XYP Quantum AI is dedicated to creating responsible, scalable AI solutions
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
        <section className="section-padding">
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
        <section className="section-padding">
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
