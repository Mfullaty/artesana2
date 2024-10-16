import { Globe, Package, Shield, Truck } from "lucide-react";
import React from "react";

const services = [
  {
    icon: Globe,
    title: "Global Reach",
    description: "Our global reach allows us to cater to diverse markets and meet the demands of our customers, no matter where they are. You can trust us to handle your delivery needs with professionalism and care.",
  },
  {
    icon: Shield,
    title: "Quality Control & Inspection",
    description: "We ensure that all products meet your specifications through rigorous quality control checks and inspections, providing you with detailed reports before products are shipped.",
  },
  {
    icon: Package,
    title: "Custom Orders",
    description: "Our products are expertly tailored to meet your specific needs, ensuring you receive exactly what you require for your business by understanding the unique demands of each customer.",
  },
];
const Services = () => {
  return (
    <section id="services" className=" text-white font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-primary rounded-lg shadow-md p-6 flex flex-col items-center text-center"
            >
              <service.icon className="h-12 w-12 text-primary-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-primary-foreground">{service.title}</h3>
              <p className="text-primary-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
