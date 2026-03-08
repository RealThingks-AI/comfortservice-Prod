import { Phone, MapPin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const quickLinks = [
  { label: "About Us", href: "#about" },
  { label: "Our Services", href: "#services" },
  { label: "Service Areas", href: "#service-areas" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer className="relative bg-navy pt-16 pb-8" ref={ref}>
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-cyan to-accent" />

      <div className="section-container">
        {/* Main Footer Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12"
        >
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <img 
              src={logo} 
              alt="Comfort Technical Services" 
              className="h-12 md:h-14 w-auto mb-4"
            />
            <p className="text-white/70 text-sm mb-5 leading-relaxed max-w-xs">
              Professional AC servicing, repair, and maintenance since 2018. Serving Pune and PCMC with excellence for over 7 years.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-accent text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-accent transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-white font-display font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm leading-relaxed flex-1 min-w-0">
                  NIKHIL NIWAS, SURVEY NO.179, SHOP NO-02, Pune, PCMC – 411035
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="tel:7745046520"
                  className="text-white/70 hover:text-accent text-sm transition-colors flex-1 min-w-0"
                >
                  +91 77450 46520
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href="mailto:comforttechnicalservice8@gmail.com"
                  className="text-white/70 hover:text-accent text-sm transition-colors flex-1 min-w-0 break-all"
                >
                  comforttechnicalservice8@gmail.com
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter/CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <h4 className="text-white font-display font-semibold mb-4">Get a Quote</h4>
            <p className="text-white/70 text-sm mb-4 max-w-xs">
              Need AC service? Contact us for a free consultation and quote.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl font-medium text-sm hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Started
            </a>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center md:text-left"
          >
            <p className="text-white/60 text-sm">
              © {currentYear} Comfort Technical Services. All rights reserved.
            </p>
          </motion.div>

          {/* Legal Links */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-6 text-sm"
          >
            <Link
              to="/privacy-policy"
              className="text-white/60 hover:text-accent transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="text-white/60 hover:text-accent transition-colors"
            >
              Terms & Conditions
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.7 }}
        whileHover={{ y: -3, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToTop}
        className="absolute right-6 -top-6 p-3 bg-accent text-accent-foreground rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;
