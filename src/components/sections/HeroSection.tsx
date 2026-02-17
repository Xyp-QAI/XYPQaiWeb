import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import logo1 from "@/assets/logo1.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #00071A 0%, #001C44 60%, #00071A 100%)" }}>
      {/* Tech frequency wave pattern - right side */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Concentric circles halo */}
        <svg
          className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-20"
          width="900"
          height="900"
          viewBox="0 0 900 900"
          fill="none"
        >
          {[...Array(12)].map((_, i) => (
            <circle
              key={i}
              cx="450"
              cy="450"
              r={80 + i * 35}
              stroke="#0046BE"
              strokeWidth={i % 3 === 0 ? 1.5 : 0.5}
              opacity={1 - i * 0.07}
            />
          ))}
          {/* Radiating lines */}
          {[...Array(36)].map((_, i) => {
            const angle = (i * 10 * Math.PI) / 180;
            const x1 = 450 + Math.cos(angle) * 80;
            const y1 = 450 + Math.sin(angle) * 80;
            const x2 = 450 + Math.cos(angle) * (300 + (i % 3) * 80);
            const y2 = 450 + Math.sin(angle) * (300 + (i % 3) * 80);
            return (
              <line
                key={`line-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#0046BE"
                strokeWidth="0.4"
                opacity={0.3 - (i % 5) * 0.04}
              />
            );
          })}
        </svg>

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-[1440px]">
        <div className="min-h-[85vh] flex items-center py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left - Typography */}
            <motion.div
              className="max-w-xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-[56px] leading-[1.08] font-bold text-white mb-6"
                style={{ letterSpacing: "-0.5px" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                Building the Future of Intelligent Systems.
              </motion.h1>

              <motion.p
                className="text-lg text-white/65 mb-8 max-w-md leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                We design real-world AI systems that operate across institutions,
                infrastructure, and next-generation research.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-white font-medium text-lg hover:gap-3 transition-all duration-300 group"
                >
                  Learn more
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right - Logo with halo glow */}
            <motion.div
              className="relative flex items-center justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {/* Glow rings behind logo */}
              <div className="absolute w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full opacity-20"
                style={{
                  background: "radial-gradient(circle, #0046BE 0%, transparent 70%)",
                }}
              />
              <div className="absolute w-[480px] h-[480px] md:w-[560px] md:h-[560px] rounded-full opacity-10"
                style={{
                  background: "radial-gradient(circle, #0046BE 0%, transparent 60%)",
                }}
              />

              {/* Logo */}
              <img
                src={logo1}
                alt="XYP Quantum AI Logo"
                className="relative z-10 w-[220px] h-[220px] md:w-[300px] md:h-[300px] object-contain drop-shadow-2xl"
                style={{
                  filter: "drop-shadow(0 0 40px rgba(0, 70, 190, 0.4)) drop-shadow(0 0 80px rgba(0, 70, 190, 0.2))",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
