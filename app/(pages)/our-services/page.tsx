"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, Shield, Package, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { AppTimeline } from "@/components/ui/app-timeline";
import Services from "@/components/sections/Services";
import { ServicesHero } from "./_components/ServicesHero";

const services = [
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Our global reach allows us to cater to diverse markets and meet the demands of our customers, no matter where they are. You can trust us to handle your delivery needs with professionalism and care.",
    longDescription:
      "We have established a robust network of partners and logistics solutions that span across continents, ensuring seamless transportation and delivery of your products. Our team of experts is well-versed in international trade regulations, customs procedures, and documentation requirements, making the export process smooth and efficient for our clients. We pride ourselves on our ability to navigate complex global supply chains and overcome challenges that may arise in different regions, always ensuring that your products reach their destination on time and in perfect condition.",
    image: "/images/global-reach-pic.png",
    timeline: [
      {
        title: "Market Analysis",
        description: "Identify target markets and customer needs",
      },
      {
        title: "Logistics Planning",
        description: "Develop efficient transportation routes",
      },
      {
        title: "Customs Clearance",
        description: "Handle documentation and regulatory compliance",
      },
      {
        title: "Delivery",
        description: "Ensure timely and safe product delivery",
      },
    ],
  },
  {
    icon: Shield,
    title: "Quality Control & Inspection",
    description:
      "We ensure that all products meet your specifications through rigorous quality control checks and inspections, providing you with detailed reports before products are shipped.",
    longDescription:
      "Our quality assurance process begins at the source, where we carefully select and work with trusted suppliers who share our commitment to excellence. We employ a team of skilled inspectors who conduct thorough examinations at various stages of the production and packaging process. Using state-of-the-art equipment and industry-standard testing methods, we verify the quality, safety, and compliance of every product. Our comprehensive reports include detailed information on product specifications, test results, and photographic evidence, giving you complete transparency and peace of mind. We also offer customized quality control plans tailored to your specific requirements, ensuring that every shipment meets or exceeds your expectations.",
    image: "/images/quality-pic.png",
    timeline: [
      {
        title: "Supplier Selection",
        description: "Choose reliable and quality-focused suppliers",
      },
      {
        title: "Production Monitoring",
        description: "Oversee manufacturing process for quality assurance",
      },
      {
        title: "Product Testing",
        description: "Conduct rigorous tests on samples",
      },
      {
        title: "Final Inspection",
        description: "Perform thorough checks before shipment",
      },
    ],
  },
  {
    icon: Package,
    title: "Custom Orders",
    description:
      "Our products are expertly tailored to meet your specific needs, ensuring you receive exactly what you require for your business by understanding the unique demands of each customer.",
    longDescription:
      "We believe that every client is unique, and we take pride in our ability to provide bespoke solutions that align perfectly with your business goals. Our team of experienced product specialists works closely with you to understand your requirements, market trends, and target audience. We can assist in product development, sourcing specific varieties or grades of agricultural products, and even creating custom packaging solutions that reflect your brand identity. Our flexible approach allows us to handle orders of all sizes, from small specialty batches to large-scale commercial shipments. With our custom order service, you can differentiate your offerings in the market and provide your customers with products that are truly tailored to their needs.",
    image: "/images/custom-pic.png",
    timeline: [
      {
        title: "Requirement Gathering",
        description: "Understand client's specific needs",
      },
      {
        title: "Product Development",
        description: "Create or source products to meet requirements",
      },
      { title: "Customization", description: "Tailor packaging and branding" },
      {
        title: "Order Fulfillment",
        description: "Process and ship custom orders",
      },
    ],
  },
];

const DetailedService = ({
  service,
  index,
  isExpanded,
  onToggle,
}: {
  service: (typeof services)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  return (
    <section className={`py-16 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start gap-12">
          <div className={`md:w-1/2 ${index % 2 === 0 ? "md:order-2" : ""}`}>
            <Image
              src={service.image}
              alt={service.title}
              width={600}
              height={400}
              className="rounded-lg shadow-lg mb-6"
              loading="lazy"
            />
            <AppTimeline items={service.timeline} className="mt-8" />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
            <AnimatePresence initial={false}>
              <motion.div
                key={isExpanded ? "expanded" : "collapsed"}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                variants={{
                  expanded: { height: "auto", opacity: 1 },
                  collapsed: { height: 0, opacity: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-lg text-muted-foreground mb-6">
                  {isExpanded ? service.longDescription : service.description}
                </p>
              </motion.div>
            </AnimatePresence>
            <Button
              onClick={onToggle}
              variant="outline"
              className="flex items-center gap-2 mt-4"
            >
              {isExpanded ? (
                <>
                  See less
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  See more
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function OurServices() {
  const [expandedServices, setExpandedServices] = useState<number[]>([]);

  const toggleService = useCallback((index: number) => {
    setExpandedServices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <ServicesHero />

        {/* Services Overview Section */}
        <section id="services" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              What We Offer
            </h2>
            <Services />
          </div>
        </section>

        {/* Detailed Service Sections */}
        {services.map((service, index) => (
          <DetailedService
            key={index}
            service={service}
            index={index}
            isExpanded={expandedServices.includes(index)}
            onToggle={() => toggleService(index)}
          />
        ))}

        {/* Call to Action Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Experience Our Services?
            </h2>
            <p className="text-xl mb-8">
              Let's discuss how Artesana can help your business grow.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-black hover:text-white"
            >
              <Link href="/contact">Contact Us Today</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
