import { Globe, Package, Truck } from "lucide-react";
import React from "react";

const services = [
  {
    icon: Globe,
    title: "Global Reach",
    description: "Our network is global. We deliver worldwide",
  },
  {
    icon: Truck,
    title: "Careful Shipping",
    description: "Safe and secure delivery of delicate  items.",
  },
  {
    icon: Package,
    title: "Custom Orders",
    description: "Tailored  products for your specific needs.",
  },
];
const Services = () => {
  return (
    <section id="services" className="bg-primary text-white font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary-foreground">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-primary-foreground rounded-lg shadow-md p-6 flex flex-col items-center text-center"
            >
              <service.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-primary">{service.title}</h3>
              <p className="text-primary">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
