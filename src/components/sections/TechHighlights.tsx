import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
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

const TechHighlights = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-primary font-semibold text-lg md:text-xl mb-2">
            Explore XYP Quantum AI
          </p>
          <h2 className="text-section-sm lg:text-section text-foreground">
            Discover our diverse range of<br className="hidden md:block" /> offerings and resources.
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative group">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity -ml-3"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} className="text-foreground" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity -mr-3"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} className="text-foreground" />
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {offerings.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="flex-shrink-0 w-[280px] md:w-[320px] snap-start group/card"
              >
                <div className="overflow-hidden rounded-lg mb-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[360px] md:h-[420px] object-cover transition-transform duration-500 group-hover/card:scale-105"
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
          </div>

          {/* Scroll indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => {
                  const el = scrollRef.current;
                  if (!el) return;
                  el.scrollTo({ left: (el.scrollWidth / 3) * i, behavior: "smooth" });
                }}
                className={`h-1 rounded-full transition-all ${i === 0 ? "w-8 bg-foreground" : "w-4 bg-muted-foreground/30"}`}
                aria-label={`Scroll to section ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechHighlights;
