import logo1 from "@/assets/logo1.png";

interface PageHeroProps {
  title: string;
  subtitle: string;
}

const PageHero = ({ title, subtitle }: PageHeroProps) => {
  return (
    <section
      className="relative pt-16 min-h-[280px] md:min-h-[320px] flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #00071A 0%, #001C44 50%, #00071A 100%)",
      }}
    >
      {/* Halo / frequency wave SVG motif */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[15%] w-[400px] h-[400px] md:w-[500px] md:h-[500px] opacity-60 pointer-events-none">
        <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Radiating lines */}
          {Array.from({ length: 72 }).map((_, i) => {
            const angle = (i * 5 * Math.PI) / 180;
            const innerR = 90;
            const outerR = 200 + (i % 3 === 0 ? 40 : 0);
            return (
              <line
                key={i}
                x1={250 + Math.cos(angle) * innerR}
                y1={250 + Math.sin(angle) * innerR}
                x2={250 + Math.cos(angle) * outerR}
                y2={250 + Math.sin(angle) * outerR}
                stroke="hsl(230 70% 55%)"
                strokeWidth={1.5}
                opacity={0.5 + (i % 4) * 0.1}
              />
            );
          })}
          {/* Inner circles */}
          <circle cx="250" cy="250" r="85" stroke="hsl(230 60% 45%)" strokeWidth="2" fill="none" opacity="0.6" />
          <circle cx="250" cy="250" r="70" stroke="hsl(230 60% 40%)" strokeWidth="1.5" fill="none" opacity="0.4" />
          {/* Center dark disc with logo */}
          <circle cx="250" cy="250" r="65" fill="#00071A" />
        </svg>
        {/* Logo in center of halo */}
        <img
          src={logo1}
          alt="XYP Quantum AI"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-contain rounded-2xl"
          loading="eager"
          decoding="sync"
          fetchpriority="high"
          style={{
            filter: "drop-shadow(0 0 20px rgba(0, 70, 190, 0.4))",
          }}
        />
      </div>

      {/* Subtle gradient overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, rgba(0,7,26,0.9) 0%, rgba(0,7,26,0.6) 50%, transparent 100%)",
        }}
      />

      {/* Text content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-16 md:py-20">
        <h1 className="text-hero-sm lg:text-hero text-white mb-3 max-w-2xl">{title}</h1>
        <p className="text-body-lg text-white/70 max-w-xl">{subtitle}</p>
      </div>
    </section>
  );
};

export default PageHero;
