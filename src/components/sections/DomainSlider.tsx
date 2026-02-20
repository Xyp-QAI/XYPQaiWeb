import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { domainContent } from "@/config/content";

const DomainSlider = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
        <h2 className="text-section-sm lg:text-section text-foreground text-center mb-10">
          Intelligent Systems Across Multiple Domains
        </h2>

        <div
          className="relative rounded-xl overflow-hidden h-[420px] sm:h-[480px] lg:h-[600px]"
          style={{
            background: "linear-gradient(135deg, hsl(216 100% 25%) 0%, hsl(0 0% 10%) 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle,hsl(0_0%_100%)_0.5px,transparent_0.5px)] bg-[length:24px_24px] pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {/* Image — right side */}
              <div className="absolute right-0 top-0 bottom-0 w-[55%] lg:w-[50%] hidden md:block">
                <img
                  src={domainContent[active].image}
                  alt={domainContent[active].label}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to right, hsl(216 100% 25%) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, transparent 30%, hsl(216 100% 25% / 0.7) 70%, hsl(0 0% 10%) 100%)",
                  }}
                />
              </div>

              {/* Text — left side */}
              <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-14 xl:px-16 z-10">
                <div className="max-w-md lg:max-w-lg">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-tech-cyan mb-4 block">
                    {domainContent[active].label}
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] text-primary-foreground mb-5">
                    {domainContent[active].headline}
                  </h3>
                  <p className="text-sm lg:text-base leading-relaxed text-primary-foreground/55 mb-8">
                    {domainContent[active].description}
                  </p>
                  <Link
                    to="/technology"
                    className="inline-flex items-center gap-2 text-primary-foreground font-semibold text-sm hover:gap-3 transition-all duration-300"
                  >
                    Learn more <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Preload all domain images for instant switching */}
          <div className="hidden" aria-hidden="true">
            {domainContent.map((d, i) => (
              <img key={i} src={d.image} alt="" />
            ))}
          </div>

          {/* Dash indicators */}
          <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center gap-2.5 pb-7">
            {domainContent.map((d, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`View ${d.label}`}
                className={`h-[5px] rounded-full transition-all duration-500 ease-out ${
                  i === active
                    ? "w-12 bg-primary-foreground"
                    : "w-6 bg-primary-foreground/20 hover:bg-primary-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DomainSlider;
