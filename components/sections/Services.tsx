import React from "react";
import { Globe, Package, Shield } from "lucide-react";
import { MyCard } from "../MyCard";

const services = [
  {
    icon: Globe,
    title: "Global Reach",
    description: "Our global reach allows us to cater to diverse markets and meet the demands of our customers, no matter where they are. You can trust us to handle your delivery needs with professionalism and care.",
    image: "/images/global-reach.png",
  },
  {
    icon: Shield,
    title: "Quality Control & Inspection",
    description: "We ensure that all products meet your specifications through rigorous quality control checks and inspections, providing you with detailed reports before products are shipped.",
    image: "/images/custom-orders.png",
  },
  {
    icon: Package,
    title: "Custom Orders",
    description: "Our products are expertly tailored to meet your specific needs, ensuring you receive exactly what you require for your business by understanding the unique demands of each customer.",
    image: "/images/quality.png",
  },
];

const Services = () => {
  return (
    <section id="services" className="bg-white text-gray-800 font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <MyCard
              key={service.title}
              image={service.image}
              imageAlt={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;