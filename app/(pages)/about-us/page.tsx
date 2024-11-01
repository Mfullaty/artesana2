"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Check,
  Zap,
  Shield,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FooterCallToAction from "@/components/FooterCallToAction";
import AboutUs from "@/components/sections/AboutUs";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function AboutUsPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/80">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <Image
            src="/images/about-us-banner.webp"
            alt="Artesana About Us Hero Image"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 z-0"
            priority
          />
          <div className="absolute inset-0 bg-yellow-800 bg-opacity-80 backdrop-blur-sm z-10"></div>
          <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              About Artesana
            </motion.h1>
            <motion.p
              className="text-xl sm:text-2xl md:text-3xl"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              Artfully Expanding Boundaries, Innovating Global Trade
            </motion.p>
          </div>
        </section>

        {/* About Us Section */}
        <section className="mt-[-120px] z-10 bg-secondary-foreground">

        <div
          id="aboutUs"
          className="relative top-[70px] left-0 w-24 h-24 md:w-32 md:h-32 z-10"
        >
          <Image
            src="/images/decorativeLeaf.png"
            alt="Decorative leaf"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <AboutUs
          title="Our Story"
          description="At Artesana, we are passionate about delivering premium quality
                African agricultural products to the world. As a certified and
                fully registered business, we strictly comply with local and
                international regulations, ensuring a seamless and trustworthy
                experience for our global partners. We specialize in the export
                of grains, seeds, herbs, and other agro-products, focusing on
                sustainable sourcing and ethical practices."
          imgSource="/images/wooden-fruits.webp"
        />
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              Why Choose Us?
            </motion.h2>
            <motion.div
              className="grid gap-8 md:grid-cols-3"
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
            >
              {[
                {
                  icon: Check,
                  title: "Quality Assurance",
                  description: "Rigorous quality control from farm to shipment",
                },
                {
                  icon: Zap,
                  title: "Efficiency",
                  description:
                    "Streamlined processes for quick and reliable delivery",
                },
                {
                  icon: Shield,
                  title: "Compliance",
                  description:
                    "Full adherence to local and international regulations",
                },
              ].map((item, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card>
                    <CardContent className="flex flex-col items-center p-6 text-center">
                      <item.icon className="w-12 h-12 mb-4 text-primary" />
                      <h3 className="text-xl font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Expandable Sections */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              Learn More About Us
            </motion.h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  title: "How Do We Ensure Product Safety?",
                  content:
                    "Product safety is at the heart of everything we do. We have implemented rigorous quality control systems throughout our supply chain, from farm to shipment. Each product undergoes thorough testing and inspection, ensuring compliance with international food safety standards. Our team of experts closely monitors every process to guarantee that only the best products leave our facilities.",
                },
                {
                  title: "Why We Choose to Be Formal",
                  content:
                    "At Artesana, we understand that formalization is key to sustainable and transparent business. By being certified and fully registered, we align with both local and international laws. This not only ensures compliance but also instills confidence in our partners, knowing that they are working with a reputable and legally recognized entity. Our commitment to formality reflects our dedication to professionalism and long-term relationships.",
                },
                {
                  title: "How We Solve Problems",
                  content:
                    "Our proactive approach to problem-solving sets us apart. Whether addressing supply chain challenges, meeting specific product requirements, or managing logistics, we take pride in delivering tailored solutions. We maintain open communication with our clients, anticipating needs and resolving any issues that arise promptly and efficiently. Our goal is to provide a seamless experience, ensuring your satisfaction every step of the way.",
                },
              ].map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Call to Action Section */}
        <FooterCallToAction />
      </main>
    </div>
  );
}
