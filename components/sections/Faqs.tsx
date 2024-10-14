import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faqs = [
  {
    question: "What countries do you export to?",
    answer:
      "We export to over 100 countries worldwide, covering major markets in North America, Europe, Asia, and Australia. Contact us for specific country information.",
  },
  {
    question: "How do you ensure product quality?",
    answer:
      "We have strict quality control measures in place, including regular supplier audits, pre-shipment inspections, and adherence to international standards and certifications.",
  },
  {
    question: "What are your shipping terms?",
    answer:
      "We offer various shipping terms including FOB, CIF, and DDP. The specific terms depend on the destination and order volume. We'll work with you to determine the best option for your needs.",
  },
  {
    question: "How long does shipping usually take?",
    answer:
      "Shipping times vary depending on the destination and chosen method. Typically, it ranges from 7-30 days. We provide detailed timelines and tracking information for each shipment.",
  },
];

const Faqs = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold text-primary hover:text-accent transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#333333] mt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faqs;
