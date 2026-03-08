import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Snowflake,
  Zap,
  Shield,
  Heart,
  Target,
  Eye,
  Rocket,
  Award,
} from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const values = [
  { 
    icon: Snowflake, 
    label: "Quality Service", 
    description: "Excellence in every repair",
    details: "At Comfort Technical Services, quality is non-negotiable. Every technician follows strict protocols to ensure your AC receives the best possible care. We use genuine parts and the latest tools to deliver lasting results."
  },
  { 
    icon: Zap, 
    label: "Quick Response", 
    description: "Same-day service available",
    details: "We understand that a broken AC can be an emergency, especially in Pune's heat. That's why we offer same-day and next-day service for most requests. Our team is always ready to respond quickly to your needs."
  },
  { 
    icon: Shield, 
    label: "Transparency", 
    description: "No hidden charges",
    details: "We believe in honest pricing. Before any work begins, you'll receive a clear quote with no surprises. Our technicians explain every repair needed and its cost, so you can make informed decisions."
  },
  { 
    icon: Heart, 
    label: "Customer Care", 
    description: "Your satisfaction matters",
    details: "We treat every customer like family. From the first call to post-service follow-up, we ensure you're completely satisfied. Our 5.0 Google rating reflects our commitment to exceptional customer service."
  },
  { 
    icon: Target, 
    label: "Reliability", 
    description: "Dependable service always",
    details: "When we make a promise, we keep it. Whether it's arriving on time, completing the job as quoted, or standing behind our warranty, you can count on us every time."
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedValue, setSelectedValue] = useState<typeof values[0] | null>(null);
  const [selectedCard, setSelectedCard] = useState<{ type: 'vision' | 'mission' | 'stat'; data?: any } | null>(null);

  const stats = [
    { value: 7, suffix: "+", label: "Years Experience", details: "Since 2018, Comfort Technical Services has been serving Pune & PCMC with professional AC services. Our experience has made us experts in handling all types of AC units from all major brands." },
    { value: 10000, suffix: "+", label: "AC Units Serviced", details: "We've successfully serviced over 10,000 AC units across Pune and PCMC. From simple servicing to complex repairs, our track record speaks for itself." },
    { value: 57, suffix: "+", label: "Google Reviews", details: "Our customers love us! With 57+ Google reviews and a perfect 5.0 rating, we're proud of the trust our customers place in us." },
    { value: 5, suffix: "/5", label: "Google Rating", details: "A perfect 5.0 Google rating reflects our unwavering commitment to quality service, transparent pricing, and customer satisfaction." },
  ];

  const visionDetails = "Our vision is to become Pune's most trusted AC service provider. We aim to set new standards in the industry through consistent quality, transparent pricing, and exceptional customer care. We want every home and business in Pune & PCMC to have access to reliable, affordable AC services.";
  
  const missionDetails = "Our mission is simple: keep Pune cool. We provide fast, reliable, and affordable AC services to homes and businesses across Pune & PCMC. We prioritize customer satisfaction, transparent communication, and quality workmanship in everything we do.";

  return (
    <section id="about" className="py-20 md:py-28 bg-gradient-subtle" ref={ref}>
      <div className="section-container">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center mb-12 md:mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/10 rounded-2xl -z-10" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-cyan/10 rounded-2xl -z-10" />
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <motion.img
                src={aboutTeam}
                alt="Comfort Technical Services Team"
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                whileHover={{ scale: 1.02 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-6 left-6 right-6"
              >
                <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                  <div className="p-3 rounded-xl bg-accent/10">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">5.0 Google Rating</div>
                    <div className="text-xs text-muted-foreground">57+ Verified Reviews</div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Stats Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 200 }}
              className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-gradient-to-br from-accent to-sky-500 text-white px-4 py-3 md:px-8 md:py-6 rounded-xl md:rounded-2xl shadow-glow-lg"
            >
              <div className="text-2xl md:text-4xl font-bold font-display">2018</div>
              <div className="text-xs md:text-sm opacity-90">Since</div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-5 text-sm font-semibold rounded-full bg-accent/10 text-accent border border-accent/20"
            >
              <Snowflake className="w-4 h-4" />
              About Us
            </motion.span>
            
            <h2 className="heading-lg text-foreground mb-6">
              Your Trusted Partner for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
                Professional AC Services
              </span>
            </h2>
            
            <p className="text-body mb-5">
              <strong>Proprietor: Sagar Shinde</strong> — Comfort Technical Services has been providing 
              professional AC services in Pune & PCMC since 2018. With 7+ years of experience, 
              we deliver reliable installation, maintenance, and repair services with outstanding customer care.
            </p>
            
            <p className="text-body mb-8">
              We place a high priority on providing outstanding customer service through prompt and 
              dependable repairs, open communication, and affordable prices. We are more than just 
              a repair service—we want to create long-lasting connections by maintaining the greatest 
              standards of professionalism, ethics, and customer care.
            </p>

            {/* Vision & Mission Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => setSelectedCard({ type: 'vision' })}
                className="group p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-accent/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-accent/10 to-cyan/10 group-hover:from-accent/20 group-hover:to-cyan/20 transition-colors">
                    <Eye className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-foreground">
                    Our Vision
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To be Pune's most trusted AC service provider, setting new 
                  standards in quality and customer satisfaction.
                </p>
                <p className="text-xs text-accent mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to learn more →</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => setSelectedCard({ type: 'mission' })}
                className="group p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-accent/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-accent/10 to-cyan/10 group-hover:from-accent/20 group-hover:to-cyan/20 transition-colors">
                    <Rocket className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-foreground">
                    Our Mission
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Keep Pune cool with fast, reliable, and affordable AC services 
                  for homes and businesses.
                </p>
                <p className="text-xs text-accent mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to learn more →</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Vision/Mission Dialog */}
        <Dialog open={selectedCard !== null && selectedCard.type !== 'stat'} onOpenChange={() => setSelectedCard(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-xl bg-accent/10">
                  {selectedCard?.type === 'vision' ? <Eye className="w-6 h-6 text-accent" /> : <Rocket className="w-6 h-6 text-accent" />}
                </div>
                <DialogTitle className="text-xl font-display">
                  {selectedCard?.type === 'vision' ? 'Our Vision' : 'Our Mission'}
                </DialogTitle>
              </div>
              <DialogDescription className="text-base leading-relaxed pt-2">
                {selectedCard?.type === 'vision' ? visionDetails : missionDetails}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-12 md:mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="relative group"
              onClick={() => setSelectedCard({ type: 'stat', data: stat })}
            >
              <div className="text-center p-4 md:p-6 rounded-xl md:rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="text-3xl md:text-5xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-br from-accent to-cyan mb-1 md:mb-2">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</div>
                <p className="text-[10px] text-accent mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Click for details</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Dialog */}
        <Dialog open={selectedCard?.type === 'stat'} onOpenChange={() => setSelectedCard(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="text-4xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-br from-accent to-cyan">
                  {selectedCard?.data?.value?.toLocaleString()}{selectedCard?.data?.suffix}
                </div>
              </div>
              <DialogTitle className="text-xl font-display">
                {selectedCard?.data?.label}
              </DialogTitle>
              <DialogDescription className="text-base leading-relaxed pt-2">
                {selectedCard?.data?.details}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>


        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <h3 className="heading-md text-foreground mb-10">
            Our <span className="text-accent">Core Values</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {values.map((value, index) => (
              <motion.div
                key={value.label}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setSelectedValue(value)}
                className="group p-4 md:p-6 bg-card rounded-xl md:rounded-2xl border border-border shadow-sm hover:shadow-xl hover:border-accent/30 transition-all duration-300 cursor-pointer"
              >
                <div className="relative mx-auto mb-3 md:mb-4">
                  <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-accent/10 to-cyan/10 w-fit mx-auto group-hover:from-accent/20 group-hover:to-cyan/20 transition-all duration-300">
                    <value.icon className="w-5 h-5 md:w-7 md:h-7 text-accent group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <h4 className="font-display font-semibold text-foreground text-xs md:text-sm mb-1 md:mb-2">
                  {value.label}
                </h4>
                <p className="text-muted-foreground text-[10px] md:text-xs hidden md:block">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Value Dialog */}
        <Dialog open={selectedValue !== null} onOpenChange={() => setSelectedValue(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-xl bg-accent/10">
                  {selectedValue && <selectedValue.icon className="w-6 h-6 text-accent" />}
                </div>
                <DialogTitle className="text-xl font-display">
                  {selectedValue?.label}
                </DialogTitle>
              </div>
              <DialogDescription className="text-base leading-relaxed pt-2">
                {selectedValue?.details}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default About;
