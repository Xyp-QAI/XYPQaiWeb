import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { offeringContent } from "@/config/content";

// Group into pages of 3
const pages = [offeringContent.slice(0, 3), offeringContent.slice(3, 6)];

const TechHighlights = () => {
  const [activePage, setActivePage] = useState(0);

  // Preload all offering images on mount
  useEffect(() => {
    offeringContent.forEach((o) => {
      const img = new Image();
      img.src = o.image;
    });
  }, []);

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

        {/* Cards — always-mounted crossfade */}
        <div className="relative overflow-hidden">
          {pages.map((page, pageIdx) => (
            <div
              key={pageIdx}
              className="transition-opacity duration-500 ease-in-out"
              style={{
                opacity: pageIdx === activePage ? 1 : 0,
                pointerEvents: pageIdx === activePage ? "auto" : "none",
                position: pageIdx === activePage ? "relative" : "absolute",
                top: 0,
                left: 0,
                right: 0,
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {page.map((item) => (
                  <Link key={item.title} to={item.href} className="group/card">
                    <div className="overflow-hidden rounded-lg mb-3 aspect-[3/4]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-semibold text-foreground">{item.title}</span>
                      <ChevronRight size={18} className="text-foreground transition-transform group-hover/card:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
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
