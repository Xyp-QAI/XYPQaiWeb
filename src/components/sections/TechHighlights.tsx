import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import offeringAI from "@/assets/offering-ai.jpg";
import offeringSoftware from "@/assets/offering-software.jpg";
import offeringHardware from "@/assets/offering-hardware.jpg";
import offeringIoT from "@/assets/offering-iot.jpg";
import offeringSmartCity from "@/assets/offering-smartcity.jpg";
import offeringEducation from "@/assets/offering-education.jpg";

const offerings = [
  { title: "Artificial Intelligence", image: offeringAI, href: "/technology" },
  { title: "Software Platforms", image: offeringSoftware, href: "/products" },
  { title: "Hardware Solutions", image: offeringHardware, href: "/technology" },
  { title: "IoT & Edge Devices", image: offeringIoT, href: "/technology" },
  { title: "Smart Infrastructure", image: offeringSmartCity, href: "/technology" },
  { title: "Education Technology", image: offeringEducation, href: "/products" },
];

// Group into pages of 3
const pages = [offerings.slice(0, 3), offerings.slice(3, 6)];

const TechHighlights = () => {
  const [activePage, setActivePage] = useState(0);

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary leading-tight mb-0.5">
            Welcome to XYP Quantum AI
          </h2>
          <p className="text-xl md:text-2xl font-light text-muted-foreground leading-snug">
            Discover our diverse range of<br className="hidden md:block" /> offerings and resources.
          </p>
        </div>

        {/* Cards */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {pages[activePage].map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="group/card"
                >
                  <div className="overflow-hidden rounded-lg mb-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[300px] md:h-[380px] object-cover transition-transform duration-500 group-hover/card:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-semibold text-foreground">{item.title}</span>
                    <ChevronRight size={18} className="text-foreground transition-transform group-hover/card:translate-x-1" />
                  </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pill indicators */}
        <div className="flex justify-center gap-2.5 mt-8">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActivePage(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activePage === i
                  ? "w-10 bg-foreground"
                  : "w-6 bg-muted-foreground/25 hover:bg-muted-foreground/40"
              }`}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechHighlights;
