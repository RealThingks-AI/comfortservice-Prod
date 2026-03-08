import { useState, useEffect, useCallback } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "How It Works" },
  { href: "#service-areas", label: "Areas" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const updateActiveSection = useCallback(() => {
    const scrollY = window.scrollY;
    
    // Default to "home" when near top
    if (scrollY < 100) {
      setActiveSection("home");
      return;
    }

    // Detect bottom of page for "contact"
    const isAtBottom = (window.innerHeight + scrollY) >= (document.documentElement.scrollHeight - 100);
    if (isAtBottom) {
      setActiveSection("contact");
      return;
    }

    // Viewport-center-based detection
    const viewportCenter = scrollY + window.innerHeight / 3;
    const sections = navLinks.map((link) => link.href.substring(1));
    
    let currentSection = "home";
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (viewportCenter >= offsetTop && viewportCenter < offsetTop + offsetHeight) {
          currentSection = sectionId;
          break;
        }
      }
    }
    
    setActiveSection(currentSection);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      updateActiveSection();
    };

    // Set initial state
    window.scrollTo(0, 0);
    
    // Delay observer to prevent flash
    const timeout = setTimeout(() => {
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 100);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [updateActiveSection]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-xl shadow-lg border-b border-border/50"
            : "bg-gradient-to-b from-black/20 to-transparent backdrop-blur-[2px]"
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a 
              href="#home" 
              className="flex items-center relative z-10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img 
                src={logo} 
                alt="Comfort Technical Services" 
                className="h-10 md:h-12 w-auto drop-shadow-md"
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                    activeSection === link.href.substring(1)
                      ? isScrolled 
                        ? "text-accent" 
                        : "text-white"
                      : isScrolled
                        ? "text-foreground/80 hover:text-accent hover:bg-accent/5"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                  <span 
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-accent rounded-full transition-all duration-300 ${
                      activeSection === link.href.substring(1) ? "w-6" : "w-0 group-hover:w-4"
                    }`}
                  />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <a href="tel:7745046520" className="flex items-center gap-2">
                <Button
                  variant={isScrolled ? "accent" : "glass"}
                  size="lg"
                  className="gap-2 font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2.5 rounded-xl transition-colors ${
                isScrolled 
                  ? "hover:bg-accent/10" 
                  : "hover:bg-white/10"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X
                      className={`w-6 h-6 ${
                        isScrolled ? "text-foreground" : "text-white"
                      }`}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu
                      className={`w-6 h-6 ${
                        isScrolled ? "text-foreground" : "text-white"
                      }`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-xs bg-background shadow-2xl z-50 lg:hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-end p-4 border-b border-border">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-xl hover:bg-accent/10 transition-colors"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 py-4 overflow-y-auto">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 + 0.1, duration: 0.2 }}
                    className={`flex items-center gap-3 px-5 py-3.5 text-base font-medium transition-all min-h-[48px] ${
                      activeSection === link.href.substring(1)
                        ? "text-accent bg-accent/10 border-r-4 border-accent"
                        : "text-foreground hover:text-accent hover:bg-accent/5"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full transition-colors ${
                      activeSection === link.href.substring(1) 
                        ? "bg-accent" 
                        : "bg-border"
                    }`} />
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Footer CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 border-t border-border bg-muted/50"
              >
                <a href="tel:7745046520" className="block">
                  <Button variant="accent" size="lg" className="w-full gap-2 font-semibold min-h-[48px]">
                    <Phone className="w-5 h-5" />
                    Call Now
                  </Button>
                </a>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  Mon-Sat: 9AM-7PM | Sun: 10AM-5PM
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
