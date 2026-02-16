import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Institutions Served" },
  { value: 1000, suffix: "+", label: "AI Models Deployed" },
  { value: 10, suffix: "+", label: "Patents Pending" },
  { value: 5, suffix: "+", label: "Countries" },
];

const AnimatedNumber = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const start = Date.now();
          const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-5xl lg:text-6xl font-bold text-primary-foreground">
      {count}{suffix}
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="section-dark section-padding">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-primary-foreground/70 mt-2 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
