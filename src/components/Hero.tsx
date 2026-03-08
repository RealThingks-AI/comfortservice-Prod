import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, Snowflake, Users, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const taglines = [
  "Expert AC Service",
  "Fast Repairs",
  "Trusted Technicians",
  "24/7 Support",
];

const trustBadges = [
  { icon: Users, label: "Experienced Technicians", desc: "Skilled professionals" },
  { icon: Shield, label: "Trusted by Companies", desc: "Multiple corporate clients" },
  { icon: Clock, label: "Same/Next-Day Service", desc: "Quick response time" },
  { icon: Snowflake, label: "Service Warranty", desc: "Transparent pricing" },
];

const Hero = () => {
  const [currentTagline, setCurrentTagline] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 5000); // Slowed down from 3000 to 5000
    return () => clearInterval(interval);
  }, []);

  const handleScrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Gradient Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute inset-0 gradient-overlay" 
      />

      {/* Subtle gradient accents */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-sky-400/30 to-transparent" />
        <div className="absolute bottom-1/4 right-0 w-1/4 h-1/4 bg-gradient-radial from-cyan/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container py-32 pb-48 md:pb-40">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm text-white/90 border border-white/20">
              <Snowflake className="w-4 h-4 text-sky-400" />
              All AC Solutions
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-emerald-500/20 backdrop-blur-sm text-emerald-300 border border-emerald-500/30">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              GSTIN: 27HEKPS5234F1Z4
            </span>
          </motion.div>

          {/* Animated Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h-[5.5rem] md:h-[7rem] lg:h-[8rem] mt-6 mb-8 md:mt-8 md:mb-10 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentTagline}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="heading-xl text-white drop-shadow-lg"
              >
                {taglines[currentTagline]}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan to-sky-200">
                  At Your Fingertips
                </span>
              </motion.h1>
            </AnimatePresence>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Professional AC servicing, repair & installation in Pune & PCMC.
            Trusted by 1000+ customers with 7+ years of experience.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Button
              variant="hero"
              size="xl"
              onClick={handleScrollToContact}
              className="group min-w-[140px] sm:min-w-[200px] text-sm sm:text-base px-5 sm:px-6"
            >
              Book Service Now
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <a href="tel:7745046520">
              <Button variant="heroOutline" size="xl" className="min-w-[140px] sm:min-w-[200px] text-sm sm:text-base px-5 sm:px-6">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                Call Now
              </Button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Trust Badges - Bottom Section */}
      <motion.div 
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 bg-white backdrop-blur-md py-4 md:py-6 border-t border-gray-200 shadow-lg"
      >
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.08 }}
                className="flex items-center gap-3 p-2 md:p-3"
              >
                <div className="p-2 md:p-3 rounded-xl bg-sky-100">
                  <badge.icon className="w-5 h-5 md:w-6 md:h-6 text-sky-600" />
                </div>
                <div>
                  <p className="text-xs md:text-sm font-semibold text-slate-800">{badge.label}</p>
                  <p className="text-[10px] md:text-xs text-slate-500">{badge.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
