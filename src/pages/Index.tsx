import { Helmet } from "react-helmet-async";
import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import StructuredData from "@/components/StructuredData";
import ErrorBoundary from "@/components/ErrorBoundary";
import { SectionSkeleton } from "@/components/ui/section-skeleton";

// Lazy load below-fold components
const About = lazy(() => import("@/components/About"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const Services = lazy(() => import("@/components/Services"));
const Process = lazy(() => import("@/components/Process"));
const ServiceAreas = lazy(() => import("@/components/ServiceAreas"));
const Clients = lazy(() => import("@/components/Clients"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const FAQ = lazy(() => import("@/components/FAQ"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));
const FloatingButtons = lazy(() => import("@/components/FloatingButtons"));

const Index = () => {
  return (
    <>
      <StructuredData />
      <Helmet>
        <title>Comfort Technical Services – AC Service & Repair in Pune & PCMC</title>
        <meta
          name="description"
          content="Professional AC servicing, repair & installation in Pune & PCMC. 7+ years experience, 1000+ units serviced. Same-day service available. Call now!"
        />
        <meta
          name="keywords"
          content="AC service Pune, AC repair PCMC, AC installation, AC gas refill, AC deep cleaning, split AC service, window AC repair"
        />
        <link rel="canonical" href="https://comfortservice.in" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://comfortservice.in" />
        <meta property="og:title" content="Comfort Technical Services – AC Service & Repair in Pune & PCMC" />
        <meta property="og:description" content="Professional AC servicing, repair & installation in Pune & PCMC. 7+ years experience. Same-day service available." />
        <meta property="og:site_name" content="Comfort Technical Services" />
        <meta property="og:locale" content="en_IN" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Comfort Technical Services – AC Service & Repair in Pune & PCMC" />
        <meta name="twitter:description" content="Professional AC servicing, repair & installation in Pune & PCMC. Same-day service available." />
        
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Comfort Technical Services" />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Pune" />
      </Helmet>

      <a href="#home" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-lg focus:font-medium">
        Skip to content
      </a>
      <main className="relative" id="main-content">
        <Navigation />
        <Hero />
        
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton type="content" />}>
            <About />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton type="grid" />}>
            <WhyChooseUs />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton type="grid" />}>
            <Services />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton type="content" />}>
            <Process />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton type="grid" />}>
            <ServiceAreas />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton type="carousel" />}>
            <Clients />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton type="carousel" />}>
            <Testimonials />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton type="grid" />}>
            <FAQ />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton type="form" />}>
            <Contact />
          </Suspense>
        </ErrorBoundary>
        
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        
        <Suspense fallback={null}>
          <FloatingButtons />
        </Suspense>
      </main>
    </>
  );
};

export default Index;
