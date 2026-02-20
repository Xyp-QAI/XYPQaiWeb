import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Bell, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import productShowcase from "@/assets/product-showcase.jpg";
import featureStudentPortfolios from "@/assets/feature-student-portfolios.jpg";
import featureTeacherTools from "@/assets/feature-teacher-tools.jpg";
import featureAdminControl from "@/assets/feature-admin-control.jpg";
import featurePrivacySecurity from "@/assets/feature-privacy-security.jpg";
import featureGrowthAnalytics from "@/assets/feature-growth-analytics.jpg";
import featureVerifiedOnboarding from "@/assets/feature-verified-onboarding.jpg";

const features = [
  {
    title: "Student Portfolios",
    subtitle: "Digital Portfolios & Lifelong Achievement Tracking",
    description: "Students build comprehensive portfolios showcasing their work, achievements, and growth over time.",
    bullets: ["Project showcases", "Achievement badges", "Skill tracking", "Multimedia support", "Export capabilities"],
    image: featureStudentPortfolios,
  },
  {
    title: "Teacher Tools",
    subtitle: "Teacher-Managed Learning Workflows",
    description: "Empower educators with intuitive tools for class management, assignments, and student engagement.",
    bullets: ["Class management", "Assignment creation", "Grade tracking", "Parent communication", "Analytics dashboard"],
    image: featureTeacherTools,
  },
  {
    title: "Admin Control",
    subtitle: "Principal & Administrative Oversight",
    description: "Comprehensive dashboards for institutional leadership with real-time insights and control.",
    bullets: ["Institution-wide analytics", "User management", "Compliance tools", "Reporting systems", "Security controls"],
    image: featureAdminControl,
  },
  {
    title: "Privacy & Security",
    subtitle: "Privacy-First Architecture",
    description: "Complete institutional ownership with no social media risks or data exploitation.",
    bullets: ["School-owned data", "FERPA compliant", "Encrypted storage", "Role-based access", "Audit trails"],
    image: featurePrivacySecurity,
  },
  {
    title: "Growth Analytics",
    subtitle: "Engagement and Performance Insights",
    description: "Track student engagement, measure learning outcomes, and gain actionable insights to drive continuous improvement across your institution.",
    bullets: ["Student engagement metrics", "Performance dashboards", "Progress tracking", "Trend analysis", "Custom reports"],
    image: featureGrowthAnalytics,
  },
  {
    title: "Verified Onboarding",
    subtitle: "Institution Verification and Secure Setup",
    description: "Streamlined onboarding with built-in institution verification, ensuring only authorized schools and educators access the platform securely.",
    bullets: ["Institution verification", "Secure registration", "Role assignment", "Guided setup wizard", "Compliance checks"],
    image: featureVerifiedOnboarding,
  },
];

const plans = [
  {
    name: "Starter",
    description: "Small schools",
    price: "₹24,999",
    period: "/month",
    features: ["Up to 500 students", "5 admin accounts", "Basic analytics", "Email support", "Core features"],
  },
  {
    name: "Professional",
    description: "Medium institutions",
    price: "₹64,999",
    period: "/month",
    features: ["Up to 2,000 students", "25 admin accounts", "Advanced analytics", "Priority support", "All features", "API access"],
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Large districts",
    price: "Custom",
    period: "",
    features: ["Unlimited students", "Unlimited admins", "Custom analytics", "Dedicated support", "All features", "Full API", "Custom integrations"],
  },
];

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHero
          title="Products & Platforms"
          subtitle="Intelligent systems for education, infrastructure, and industry"
        />

        {/* ZYLOENS Overview */}
        <section className="section-padding">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <motion.img
                src={productShowcase}
                alt="ZYLOENS Platform"
                className="rounded-lg shadow-xl w-full"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                loading="lazy"
              />
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">Flagship Product</p>
                <h2 className="text-section-sm lg:text-section mb-4">ZYLOENS Platform</h2>
                <p className="text-body-lg text-muted-foreground mb-6">
                  A comprehensive school-owned AI platform designed to nurture student creativity,
                  track achievements, and modernize institutional operations.
                </p>
                <div className="flex gap-4">
                  <Button size="lg" asChild><Link to="/contact">Request Demo</Link></Button>
                  <Button variant="outline" size="lg">Download Brochure</Button>
                </div>
              </motion.div>
            </div>

            {/* Features - Alternating */}
            <div className="space-y-24">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "lg:direction-rtl" : ""}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                    <img
                      src={feature.image}
                      alt={`${feature.title} feature`}
                      className="aspect-video w-full object-cover rounded-lg shadow-lg"
                      loading={i < 2 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </div>
                  <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                    <h3 className="text-2xl font-bold mb-2">{feature.subtitle}</h3>
                    <p className="text-muted-foreground mb-6">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm">
                          <Check size={16} className="text-primary shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
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
                  capabilities: ["Real-time inference", "Sensor data pipelines", "Embedded deployments", "Hardware optimization"],
                },
                {
                  name: "XYP Smart Devices",
                  tagline: "Intelligent Physical Automation",
                  date: "Coming Q4 2026",
                  capabilities: ["Gesture recognition", "Voice control", "Sensor automation", "IoT integration"],
                },
              ].map((product) => (
                <motion.div
                  key={product.name}
                  className="card-hover border border-border rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary/20">{product.name}</span>
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
                    <div className="flex gap-3">
                      <Button size="sm" variant="outline"><Bell size={14} /> Notify Me</Button>
                      <Button size="sm" variant="ghost" asChild><Link to="/technology">Learn More</Link></Button>
                    </div>
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
