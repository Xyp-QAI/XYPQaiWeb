import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import { productShowcaseContent } from "@/config/content";
import productDisplayImg from "@/assets/productdisplay.jpg";
import xypEdgeImg from "@/assets/XYP-edge.jpg";
import xypSmartCitiesImg from "@/assets/XYP-smartcities.jpg";

const Products = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Products & Platforms" description="ZYLOENS AI platform for education — student portfolios, teacher tools, admin dashboards. Built in Bengaluru." path="/products" />
      <Navbar />
      <main>
        <PageHero
          title="Products & Platforms"
          subtitle="Intelligent systems for education, infrastructure, and industry"
        />

        {/* ZYLOENS Overview */}
        <section id="zyloens" className="section-padding">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            {/* Hero image */}
            <motion.div
              className="overflow-hidden rounded-xl shadow-2xl mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={productDisplayImg}
                alt="ZYLOENS Platform"
                className="w-full h-auto object-cover"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                width={1200}
                height={675}
              />
            </motion.div>

            {/* Brief */}
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Flagship Product</p>
              <h2 className="text-section-sm lg:text-section mb-4">ZYLOENS Platform</h2>
              <p className="text-body-lg text-muted-foreground mb-6">
                A school-owned AI platform that empowers institutions with student portfolios,
                teacher-managed workflows, administrative dashboards, and real-time analytics —
                all built with a privacy-first architecture.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {[
                  "Student Portfolios",
                  "Teacher Tools",
                  "Admin Dashboards",
                  "Real-Time Analytics",
                ].map((item) => (
                  <div key={item} className="bg-secondary rounded-lg py-3 px-4">
                    <p className="text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/contact">Request Demo</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Upcoming Products */}
        <section className="section-padding">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-section-sm lg:text-section mb-10 text-center">Coming Soon</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  name: "XYP Edge Intelligence",
                  tagline: "Real-Time AI Inference on Edge Devices",
                  date: "Coming Q3 2026",
                  image: xypEdgeImg,
                  imageAlt: "XYP Edge Intelligence",
                  capabilities: ["Real-time inference", "Sensor data pipelines", "Embedded deployments", "Hardware optimization"],
                },
                {
                  name: "XYP Smart Devices",
                  tagline: "Intelligent Physical Automation",
                  date: "Coming Q4 2026",
                  image: xypSmartCitiesImg,
                  imageAlt: "XYP Smart Cities & Devices",
                  capabilities: ["Gesture recognition", "Voice control", "Sensor automation", "IoT integration"],
                },
              ].map((product) => (
                <motion.div
                  key={product.name}
                  id={product.name === "XYP Edge Intelligence" ? "edge-intelligence" : "smart-devices"}
                  className="card-hover border border-border rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "100px" }}
                >
                  <div className="h-48 overflow-hidden bg-muted [contain:layout]">
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      width={480}
                      height={192}
                      fetchPriority="low"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                      {product.date}
                    </span>
                    <h3 className="text-xl font-bold mt-3 mb-1">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{product.tagline}</p>
                    <ul className="space-y-1.5 mb-6">
                      {product.capabilities.map((c) => (
                        <li key={c} className="text-sm flex items-center gap-2">
                          <ArrowRight size={12} className="text-primary" /> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
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

export default Products;
