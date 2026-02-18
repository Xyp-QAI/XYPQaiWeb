import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Linkedin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Profile {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  linkedinUrl?: string;
}

export interface ProfileCarouselProps {
  profiles: Profile[];
  className?: string;
}

export function ProfileCarousel({ profiles, className }: ProfileCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex((index) => (index + 1) % profiles.length);
  const handlePrevious = () =>
    setCurrentIndex(
      (index) => (index - 1 + profiles.length) % profiles.length
    );

  const current = profiles[currentIndex];

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Desktop layout */}
      <div className="hidden md:flex items-center gap-8">
        {/* Avatar */}
        <div className="relative shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-56 h-56 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg"
            >
              <img
                src={current.imageUrl}
                alt={current.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-lg p-8"
            >
              <h3 className="text-2xl font-bold">{current.name}</h3>
              <p className="text-primary font-medium mt-1">{current.title}</p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                {current.description}
              </p>
              {current.linkedinUrl && (
                <div className="mt-5">
                  <a
                    href={current.linkedinUrl}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg mb-6">
              <img
                src={current.imageUrl}
                alt={current.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center w-full">
              <h3 className="text-xl font-bold">{current.name}</h3>
              <p className="text-primary font-medium text-sm mt-1">{current.title}</p>
              <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                {current.description}
              </p>
              {current.linkedinUrl && (
                <div className="mt-4 flex justify-center">
                  <a
                    href={current.linkedinUrl}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2">
          {profiles.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "w-3 h-3 rounded-full transition-colors",
                i === currentIndex
                  ? "bg-primary"
                  : "bg-border hover:bg-muted-foreground"
              )}
              aria-label={`Go to profile ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
