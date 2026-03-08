import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Clock, MapPin, Star, Shield, Wrench } from "lucide-react";

const stats = [
  {
    icon: Wrench,
    value: "10,000+",
    label: "AC Units Serviced",
    description: "Residential & commercial",
  },
  {
    icon: Users,
    value: "1,000+",
    label: "Happy Customers",
    description: "Across Pune & PCMC",
  },
  {
    icon: Clock,
    value: "7+",
    label: "Years Experience",
    description: "Since 2018",
  },
  {
    icon: MapPin,
    value: "20+",
    label: "Service Areas",
    description: "Fast response time",
  },
  {
    icon: Star,
    value: "5.0★",
    label: "Google Rating",
    description: "57+ verified reviews",
  },
  {
    icon: Shield,
    value: "90 Days",
    label: "Service Warranty",
    description: "On all repairs",
  },
];

const Clients = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="clients" className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-accent/10 text-accent">
            Why Trust Us
          </span>
          <h2 className="heading-lg text-foreground mb-4">
            Trusted by <span className="text-accent">Thousands</span> of Customers
          </h2>
          <p className="text-body text-muted-foreground">
            Our numbers speak for themselves. We've built our reputation on quality service and customer satisfaction.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl border border-border p-5 text-center hover:shadow-lg hover:border-accent/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <stat.icon className="w-6 h-6 text-accent" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-sm font-medium text-foreground mb-1">
                {stat.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-accent/5 rounded-full border border-accent/10">
            <Shield className="w-5 h-5 text-accent" />
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">100% Satisfaction Guaranteed</span> – We stand behind our work
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
