/**
 * CENTRAL CONTENT CONFIGURATION
 * ==============================
 * All image paths and associated text content are defined here.
 * To update any image on the site, simply replace the file in src/assets/
 * keeping the same filename — no code changes needed.
 *
 * If you add a NEW image, import it here and reference it in the relevant section.
 * All blending effects, gradients, animations, and layouts are handled by components
 * and will automatically apply to any replacement image.
 */

// ── Hero Section ──
import logo1 from "@/assets/logo1.png";
import heroBg from "@/assets/hero-bg.jpg";

export const heroContent = {
  logo: logo1,
  background: heroBg,
  headline: "Building the Future of Intelligent Systems.",
  subheadline:
    "We design real-world AI systems that operate across institutions, infrastructure, and next-generation research.",
  cta: { label: "Learn more", href: "/products" },
};

// ── Domain Slider ──
import domainAiMl from "@/assets/domain-ai-ml.jpg";
import domainCv from "@/assets/domain-cv.jpg";
import domainIot from "@/assets/domain-iot.jpg";
import domainSmartcity from "@/assets/domain-smartcity.jpg";
import domainIndustrial from "@/assets/domain-industrial.jpg";
import domainQuantum from "@/assets/domain-quantum.jpg";

export const domainContent = [
  {
    label: "AI & Machine Learning",
    headline: "Artificial Intelligence & Machine Learning",
    description:
      "Deep learning systems for real-world decision making. Our platforms power autonomous decision-making across education, infrastructure, and industry — trained on real-world data and deployed at scale.",
    image: domainAiMl,
  },
  {
    label: "Computer Vision",
    headline: "Computer Vision & Perception AI",
    description:
      "Visual intelligence for autonomous understanding. Advanced perception AI processing visual data in real-time — object detection, facial recognition, and sensor fusion for institutional and industrial applications.",
    image: domainCv,
  },
  {
    label: "IoT & Devices",
    headline: "IoT & Smart Devices",
    description:
      "Connected intelligence across physical environments. End-to-end IoT ecosystems connecting sensors, devices, and edge processors for real-time monitoring, automation, and intelligent control.",
    image: domainIot,
  },
  {
    label: "Smart Cities",
    headline: "Smart Cities & Automation",
    description:
      "Urban intelligence and infrastructure systems. Scalable AI-driven platforms transforming urban environments through intelligent traffic management, energy optimization, and public safety.",
    image: domainSmartcity,
  },
  {
    label: "Industrial AI",
    headline: "Industrial Intelligence",
    description:
      "Manufacturing optimization through AI. Intelligent systems that reduce downtime, optimize throughput, and enable predictive maintenance across complex industrial operations.",
    image: domainIndustrial,
  },
  {
    label: "Quantum Research",
    headline: "Quantum Computing Research",
    description:
      "Next-generation computational paradigms. Pioneering research pushing the boundaries of computational possibility — from algorithm design to hybrid quantum-classical systems.",
    image: domainQuantum,
  },
];

// ── Offerings Carousel (TechHighlights) ──
import offeringAI from "@/assets/offering-ai.jpg";
import offeringSoftware from "@/assets/offering-software.jpg";
import offeringHardware from "@/assets/offering-hardware.jpg";
import offeringIoT from "@/assets/offering-iot.jpg";
import offeringSmartCity from "@/assets/offering-smartcity.jpg";
import offeringEducation from "@/assets/offering-education.jpg";

export const offeringContent = [
  { title: "Artificial Intelligence", image: offeringAI, href: "/technology" },
  { title: "Software Platforms", image: offeringSoftware, href: "/products" },
  { title: "Hardware Solutions", image: offeringHardware, href: "/technology" },
  { title: "IoT & Edge Devices", image: offeringIoT, href: "/technology" },
  { title: "Smart Infrastructure", image: offeringSmartCity, href: "/technology" },
  { title: "Education Technology", image: offeringEducation, href: "/products" },
];

// ── Product Showcase (ZYLOENS) ──
import productShowcase from "@/assets/product-showcase.jpg";

export const productShowcaseContent = {
  image: productShowcase,
  tag: "Flagship Product",
  title: "ZYLOENS Platform",
  subtitle: "A Safer, Smarter School Ecosystem",
  description:
    "ZYLOENS is a school-owned AI platform designed to nurture student creativity, track achievements, and modernize institutional operations without unsafe social media or data risks.",
  features: [
    "Student digital portfolios",
    "Teacher-managed workflows",
    "Principal & admin dashboards",
    "Privacy-first architecture",
    "Real-time analytics",
  ],
  cta: { label: "Book a School Demo", href: "/contact" },
  secondary: { label: "Learn More", href: "/products" },
};

// ── Innovation / Research Section ──
import researchLab from "@/assets/research-lab.jpg";

export const innovationContent = {
  image: researchLab,
  imageAlt: "Quantum computing research laboratory",
  title: "Innovation Driving the Future",
  description:
    "At XYP Quantum AI, we're not just building products—we're advancing the fundamental research that will power tomorrow's intelligent systems.",
  bullets: [
    "Quantum computing research",
    "Advanced AI algorithms",
    "Edge intelligence systems",
    "Privacy-preserving technologies",
  ],
  cta: { label: "Read Our Research →", href: "/technology" },
};

// ── Solutions by Industry ──
import dashboardEducation from "@/assets/dashboard-education.jpg";
import dashboardCities from "@/assets/dashboard-cities.jpg";
import dashboardManufacturing from "@/assets/dashboard-manufacturing.jpg";
import dashboardHealthcare from "@/assets/dashboard-healthcare.jpg";

export const industryContent = {
  education: { image: dashboardEducation },
  cities: { image: dashboardCities },
  manufacturing: { image: dashboardManufacturing },
  healthcare: { image: dashboardHealthcare },
};

// ── Products Page Features ──
import featureStudentPortfolios from "@/assets/feature-student-portfolios.jpg";
import featureTeacherTools from "@/assets/feature-teacher-tools.jpg";
import featureAdminControl from "@/assets/feature-admin-control.jpg";
import featureGrowthAnalytics from "@/assets/feature-growth-analytics.jpg";
import featureVerifiedOnboarding from "@/assets/feature-verified-onboarding.jpg";

export const productFeatureImages = {
  studentPortfolios: featureStudentPortfolios,
  teacherTools: featureTeacherTools,
  adminControl: featureAdminControl,
  growthAnalytics: featureGrowthAnalytics,
  verifiedOnboarding: featureVerifiedOnboarding,
};

// ── CTA Section ──
export const ctaContent = {
  background: heroBg,
  title: "Ready to Transform Your Institution?",
  description:
    "Partner with XYP Quantum AI to deploy intelligent systems that drive real-world impact.",
  primaryCta: { label: "Get Started", href: "/contact" },
  secondaryCta: { label: "Contact Sales", href: "/contact" },
};
