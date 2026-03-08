import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Check,
  X,
  Loader2,
  MessageCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const services = [
  "AC Servicing",
  "Deep Cleaning",
  "Gas Refill",
  "AC Repair",
  "AC Installation",
  "AMC Plans",
  "Other",
];

interface FormErrors {
  name?: string;
  email?: string;
  mobile?: string;
  service?: string;
}

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Listen for prefill service event from Services modal
  useEffect(() => {
    const handlePrefill = (e: CustomEvent<string>) => {
      setFormData((prev) => ({ ...prev, service: e.detail }));
      setTouched((prev) => ({ ...prev, service: true }));
    };
    window.addEventListener("prefillService", handlePrefill as EventListener);
    return () => window.removeEventListener("prefillService", handlePrefill as EventListener);
  }, []);

  // Validation functions
  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return "Name is required";
    if (!/^[\p{L}\s.\-']+$/u.test(name.trim())) {
      return "Name can only contain letters, spaces, dots, and hyphens";
    }
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (name.trim().length > 100) return "Name must be less than 100 characters";
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address";
    }
    if (email.trim().length > 255) return "Email must be less than 255 characters";
    return undefined;
  };

  const validateMobile = (mobile: string): string | undefined => {
    if (!mobile.trim()) return "Mobile number is required";
    const cleanMobile = mobile.replace(/\s/g, "");
    if (!/^[0-9]+$/.test(cleanMobile)) {
      return "Mobile number can only contain digits";
    }
    if (cleanMobile.length !== 10) {
      return "Please enter a valid 10-digit mobile number";
    }
    return undefined;
  };

  const validateService = (service: string): string | undefined => {
    if (!service) return "Please select a service";
    return undefined;
  };

  // Handle field changes with real-time validation
  const handleNameChange = (value: string) => {
    const filtered = value.replace(/[^\p{L}\s.\-']/gu, "");
    setFormData({ ...formData, name: filtered });
    if (touched.name) {
      setErrors({ ...errors, name: validateName(filtered) });
    }
  };

  const handleEmailChange = (value: string) => {
    setFormData({ ...formData, email: value });
    if (touched.email) {
      setErrors({ ...errors, email: validateEmail(value) });
    }
  };

  const handleMobileChange = (value: string) => {
    const filtered = value.replace(/[^0-9]/g, "").slice(0, 10);
    setFormData({ ...formData, mobile: filtered });
    if (touched.mobile) {
      setErrors({ ...errors, mobile: validateMobile(filtered) });
    }
  };

  const handleServiceChange = (value: string) => {
    setFormData({ ...formData, service: value });
    if (touched.service) {
      setErrors({ ...errors, service: validateService(value) });
    }
  };

  const handleBlur = (field: keyof FormErrors) => {
    setTouched({ ...touched, [field]: true });
    setFocusedField(null);
    let error: string | undefined;
    switch (field) {
      case "name":
        error = validateName(formData.name);
        break;
      case "email":
        error = validateEmail(formData.email);
        break;
      case "mobile":
        error = validateMobile(formData.mobile);
        break;
      case "service":
        error = validateService(formData.service);
        break;
    }
    setErrors({ ...errors, [field]: error });
  };

  const isFormValid = () => {
    return (
      !validateName(formData.name) &&
      !validateEmail(formData.email) &&
      !validateMobile(formData.mobile) &&
      !validateService(formData.service)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      mobile: validateMobile(formData.mobile),
      service: validateService(formData.service),
    };

    setErrors(newErrors);
    setTouched({ name: true, email: true, mobile: true, service: true });

    if (Object.values(newErrors).some((error) => error)) {
      toast({
        title: "Please fix the errors",
        description: "Some fields have invalid values.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const subject = encodeURIComponent(`Enquiry for ${formData.service}`);
    const body = encodeURIComponent(
      `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\nMobile: ${formData.mobile}\nService Required: ${formData.service}\n\nMessage:\n${formData.message.trim()}`
    );
    window.location.href = `mailto:comforttechnicalservice8@gmail.com?subject=${subject}&body=${body}`;

    setIsSubmitting(false);

    toast({
      title: "Enquiry Prepared Successfully!",
      description: "Your email client has been opened. Please send the email to complete your enquiry.",
    });

    setFormData({
      name: "",
      email: "",
      mobile: "",
      service: "",
      message: "",
    });
    setTouched({});
    setErrors({});
  };

  const getInputStyles = (field: keyof FormErrors) => {
    const baseStyles = "h-12 bg-background border-2 rounded-xl transition-all duration-300";
    const focusStyles = focusedField === field ? "border-accent ring-2 ring-accent/20" : "";
    if (!touched[field]) return `${baseStyles} ${focusStyles}`;
    if (errors[field]) return `${baseStyles} border-destructive focus-visible:ring-destructive/20 ${focusStyles}`;
    return `${baseStyles} border-success focus-visible:ring-success/20 ${focusStyles}`;
  };

  const renderFieldStatus = (field: keyof FormErrors) => {
    if (!touched[field]) return null;
    if (errors[field]) {
      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="p-1 rounded-full bg-destructive/10"
        >
          <X className="w-4 h-4 text-destructive" />
        </motion.div>
      );
    }
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="p-1 rounded-full bg-success/10"
      >
        <Check className="w-4 h-4 text-success" />
      </motion.div>
    );
  };

  const completedFields = Object.keys(touched).filter(
    (field) => touched[field] && !errors[field as keyof FormErrors] && formData[field as keyof typeof formData]
  ).length;
  const totalRequiredFields = 4;
  const progress = (completedFields / totalRequiredFields) * 100;

  return (
    <section id="contact" className="py-20 md:py-28 bg-background" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-semibold rounded-full bg-accent/10 text-accent border border-accent/20"
          >
            <MessageCircle className="w-4 h-4" />
            Get In Touch
          </motion.span>
          <h2 className="heading-lg text-foreground mb-5">
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
              Get Started?
            </span>
          </h2>
          <p className="text-body">
            Contact us today for a free consultation and discover how Comfort
            Technical Services can solve all your AC needs.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="heading-md text-foreground mb-8">Contact Information</h3>

            <div className="space-y-6">
              {/* Address */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ x: 4 }}
                className="flex gap-4 p-4 rounded-2xl hover:bg-accent/5 transition-colors cursor-default"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-accent/10 to-cyan/10 h-fit">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-1">
                    Office Address
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    NIKHIL NIWAS, SURVEY NO.179,
                    <br />
                    SHOP NO-02, Pune, PCMC,
                    <br />
                    Maharashtra 411035
                  </p>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ x: 4 }}
                className="flex gap-4 p-4 rounded-2xl hover:bg-accent/5 transition-colors cursor-default"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-accent/10 to-cyan/10 h-fit">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-1">
                    Phone
                  </h4>
                  <div className="space-y-1">
                    <a
                      href="tel:7745046520"
                      className="block text-muted-foreground text-sm hover:text-accent transition-colors"
                    >
                      +91 77450 46520
                    </a>
                    <a
                      href="tel:8208346628"
                      className="block text-muted-foreground text-sm hover:text-accent transition-colors"
                    >
                      +91 82083 46628
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ x: 4 }}
                className="flex gap-4 p-4 rounded-2xl hover:bg-accent/5 transition-colors cursor-default"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-accent/10 to-cyan/10 h-fit">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-1">
                    Email
                  </h4>
                  <a
                    href="mailto:comforttechnicalservice8@gmail.com"
                    className="text-muted-foreground text-sm hover:text-accent transition-colors"
                  >
                    comforttechnicalservice8@gmail.com
                  </a>
                </div>
              </motion.div>

              {/* Business Hours */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.55 }}
                whileHover={{ x: 4 }}
                className="flex gap-4 p-4 rounded-2xl hover:bg-accent/5 transition-colors cursor-default"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-accent/10 to-cyan/10 h-fit">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-1">
                    Business Hours
                  </h4>
                  <div className="text-muted-foreground text-sm space-y-1">
                    <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                    <p>Sunday: 10:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6"
            >
              <h4 className="font-display font-semibold text-foreground mb-4">
                Find Us Here
              </h4>
              <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.5!2d73.7997!3d18.6298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCrjM3JzQ3LjMiTiA3M8KuNDcnNTguOSJF!5e0!3m2!1sen!2sin!4v1703000000000!5m2!1sen!2sin"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Comfort Technical Services Office Location"
                  className="w-full"
                />
              </div>
              <a
                href="https://www.google.com/maps?q=NIKHIL+NIWAS+SURVEY+NO.179+SHOP+NO-02+Pune+PCMC+MH+411035"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-sm text-accent hover:text-accent/80 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Open in Google Maps
              </a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-xl relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-cyan/10 rounded-full blur-3xl -z-0" />
              
              {/* Progress indicator */}
              <div className="mb-6 relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Form Progress</span>
                  <span className="text-sm font-semibold text-accent">{completedFields}/{totalRequiredFields}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-accent to-cyan rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => handleBlur("name")}
                      className={getInputStyles("name")}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {renderFieldStatus("name")}
                    </div>
                  </div>
                  {touched.name && errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="name-error"
                      className="text-xs text-destructive mt-1.5 flex items-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => handleBlur("email")}
                      className={getInputStyles("email")}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {renderFieldStatus("email")}
                    </div>
                  </div>
                  {touched.email && errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="email-error"
                      className="text-xs text-destructive mt-1.5 flex items-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Mobile Field */}
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-foreground mb-2">
                    Mobile Number <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={formData.mobile}
                      onChange={(e) => handleMobileChange(e.target.value)}
                      onFocus={() => setFocusedField("mobile")}
                      onBlur={() => handleBlur("mobile")}
                      className={getInputStyles("mobile")}
                      aria-invalid={!!errors.mobile}
                      aria-describedby={errors.mobile ? "mobile-error" : undefined}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {renderFieldStatus("mobile")}
                    </div>
                  </div>
                  {touched.mobile && errors.mobile && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="mobile-error"
                      className="text-xs text-destructive mt-1.5 flex items-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      {errors.mobile}
                    </motion.p>
                  )}
                </div>

                {/* Service Field */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                    Service Required <span className="text-destructive">*</span>
                  </label>
                  <Select
                    value={formData.service}
                    onValueChange={handleServiceChange}
                    onOpenChange={(open) => {
                      if (!open) handleBlur("service");
                    }}
                  >
                    <SelectTrigger
                      id="service"
                      className={`${getInputStyles("service")} w-full`}
                      aria-invalid={!!errors.service}
                    >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {touched.service && errors.service && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-destructive mt-1.5 flex items-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      {errors.service}
                    </motion.p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message <span className="text-muted-foreground text-xs">(Optional)</span>
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Describe your AC issue or requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-[100px] bg-background border-2 rounded-xl resize-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || !isFormValid()}
                  className="w-full h-14 text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Enquiry
                    </>
                  )}
                </Button>

                {/* Helper Text */}
                <p className="text-center text-xs text-muted-foreground">
                  By submitting, you agree to our{" "}
                  <a href="/privacy-policy" className="text-accent hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
