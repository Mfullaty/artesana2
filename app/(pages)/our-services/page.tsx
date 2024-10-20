'use client'
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Globe, Shield, Package, ChevronDown, ChevronUp } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { AppTimeline } from "@/components/ui/app-timeline"
import Services from "@/components/sections/Services"


export default function OurServices() {
  const services = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Our global reach allows us to cater to diverse markets and meet the demands of our customers, no matter where they are. You can trust us to handle your delivery needs with professionalism and care. We have established a robust network of partners and logistics solutions that span across continents, ensuring seamless transportation and delivery of your products. Our team of experts is well-versed in international trade regulations, customs procedures, and documentation requirements, making the export process smooth and efficient for our clients. We pride ourselves on our ability to navigate complex global supply chains and overcome challenges that may arise in different regions, always ensuring that your products reach their destination on time and in perfect condition.",
      image: "/images/samplenews1.jpg",
      timeline: [
        { title: "Market Analysis", description: "Identify target markets and customer needs" },
        { title: "Logistics Planning", description: "Develop efficient transportation routes" },
        { title: "Customs Clearance", description: "Handle documentation and regulatory compliance" },
        { title: "Delivery", description: "Ensure timely and safe product delivery" },
      ],
    },
    {
      icon: Shield,
      title: "Quality Control & Inspection",
      description: "We ensure that all products meet your specifications through rigorous quality control checks and inspections, providing you with detailed reports before products are shipped. Our quality assurance process begins at the source, where we carefully select and work with trusted suppliers who share our commitment to excellence. We employ a team of skilled inspectors who conduct thorough examinations at various stages of the production and packaging process. Using state-of-the-art equipment and industry-standard testing methods, we verify the quality, safety, and compliance of every product. Our comprehensive reports include detailed information on product specifications, test results, and photographic evidence, giving you complete transparency and peace of mind. We also offer customized quality control plans tailored to your specific requirements, ensuring that every shipment meets or exceeds your expectations.",
      image: "/images/samplenews2.png",
      timeline: [
        { title: "Supplier Selection", description: "Choose reliable and quality-focused suppliers" },
        { title: "Production Monitoring", description: "Oversee manufacturing process for quality assurance" },
        { title: "Product Testing", description: "Conduct rigorous tests on samples" },
        { title: "Final Inspection", description: "Perform thorough checks before shipment" },
      ],
    },
    {
      icon: Package,
      title: "Custom Orders",
      description: "Our products are expertly tailored to meet your specific needs, ensuring you receive exactly what you require for your business by understanding the unique demands of each customer. We believe that every client is unique, and we take pride in our ability to provide bespoke solutions that align perfectly with your business goals. Our team of experienced product specialists works closely with you to understand your requirements, market trends, and target audience. We can assist in product development, sourcing specific varieties or grades of agricultural products, and even creating custom packaging solutions that reflect your brand identity. Our flexible approach allows us to handle orders of all sizes, from small specialty batches to large-scale commercial shipments. With our custom order service, you can differentiate your offerings in the market and provide your customers with products that are truly tailored to their needs.",
      image: "/images/samplenews3.jpg",
      timeline: [
        { title: "Requirement Gathering", description: "Understand client's specific needs" },
        { title: "Product Development", description: "Create or source products to meet requirements" },
        { title: "Customization", description: "Tailor packaging and branding" },
        { title: "Order Fulfillment", description: "Process and ship custom orders" },
      ],
    },
  ]

  const [expandedServices, setExpandedServices] = useState<number[]>([])

  const toggleService = (index: number) => {
    setExpandedServices(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const truncateText = (text: string, limit: number) => {
    if (text.length <= limit) return text
    return text.slice(0, limit) + '...'
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Artesana Hero"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 z-0"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
          <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
              Our Services
            </h1>
              <TextGenerateEffect words="Delivering Excellence in Agro Exports" className="text-xl sm:text-2xl md:text-3xl mb-8" />
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="#services">Explore Our Services</Link>
            </Button>
          </div>
        </section>

        {/* Services Section */}
        <Services />

        {/* Detailed Service Sections */}
        {services.map((service, index) => (
          <section key={index} className={`py-16 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-start gap-12">
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:order-2' : ''}`}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg mb-6"
                  />
                  <AppTimeline items={service.timeline} className="mt-8" />
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                  <motion.div
                    initial={{ height: 200 }}
                    animate={{ height: expandedServices.includes(index) ? "auto" : 200 }}
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden"
                  >
                    <p className="text-lg text-muted-foreground mb-6">
                      {service.description}
                    </p>
                  </motion.div>
                  <Button
                    onClick={() => toggleService(index)}
                    variant="outline"
                    className="flex items-center gap-2 mt-4"
                  >
                    {expandedServices.includes(index) ? (
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
        ))}

        {/* Call to Action Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Our Services?</h2>
            <p className="text-xl mb-8">Let's discuss how Artesana can help your business grow.</p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Contact Us Today</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}