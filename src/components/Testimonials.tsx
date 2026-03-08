import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "Excellent service! Very professional and punctual. The technician explained everything clearly and fixed my AC in no time. Highly recommended!",
    name: "Rajesh Kumar",
    location: "Aundh, Pune",
    rating: 5,
  },
  {
    quote: "Best AC service in PCMC. They came within 2 hours of my call and the pricing was very transparent. No hidden charges at all. Will definitely use again!",
    name: "Priya Sharma",
    location: "Pimpri",
    rating: 5,
  },
  {
    quote: "Affordable and reliable. Been using their services for 2 years now for my home and office ACs. Never had any complaints. Their AMC plan is worth it.",
    name: "Amit Desai",
    location: "Wakad",
    rating: 5,
  },
  {
    quote: "Called them for emergency AC repair on a Sunday and they still showed up within 3 hours. Great service even on weekends. Very impressed!",
    name: "Sneha Patil",
    location: "Hinjewadi",
    rating: 5,
  },
  {
    quote: "The deep cleaning service transformed my 5-year-old AC. It's cooling like new again! The technician was thorough and cleaned everything properly.",
    name: "Vikram Joshi",
    location: "Baner",
    rating: 5,
  },
  {
    quote: "Very satisfied with the installation work. They did proper copper piping and the AC is working perfectly. Good workmanship at a reasonable price.",
    name: "Meera Kulkarni",
    location: "Kharadi",
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Resume auto-play after user interaction
  useEffect(() => {
    if (isAutoPlaying) return;
    const timeout = setTimeout(() => setIsAutoPlaying(true), 10000);
    return () => clearTimeout(timeout);
  }, [isAutoPlaying]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
      setIsAutoPlaying(false);
    } else if (e.key === "ArrowRight") {
      nextSlide();
      setIsAutoPlaying(false);
    }
  };

  return (
    <section 
      id="testimonials" 
      className="section-padding bg-accent/5"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Customer testimonials"
    >
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-accent/10 text-accent">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by 1000+ satisfied customers across Pune & PCMC
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              prevSlide();
              setIsAutoPlaying(false);
            }}
            className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-accent focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              nextSlide();
              setIsAutoPlaying(false);
            }}
            className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-accent focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Testimonial Card */}
          <div className="overflow-hidden px-8 md:px-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-background rounded-xl md:rounded-2xl p-5 md:p-12 shadow-lg border border-border relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 md:top-8 md:right-8">
                  <Quote className="w-8 h-8 md:w-12 md:h-12 text-accent/20" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4 md:mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-sm md:text-xl text-foreground leading-relaxed mb-5 md:mb-8">
                  "{testimonials[currentIndex].quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-base md:text-lg font-bold text-accent">
                      {testimonials[currentIndex].name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm md:text-base">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {testimonials[currentIndex].location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8" role="tablist">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                role="tab"
                aria-selected={currentIndex === index}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                  currentIndex === index
                    ? "bg-accent w-8"
                    : "bg-accent/30 hover:bg-accent/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 text-accent rounded-xl font-medium text-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-foreground">5.0/5 Google Rating</span>
            <span className="text-muted-foreground">• 10,000+ AC Units Serviced</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
