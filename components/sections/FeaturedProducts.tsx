import React from "react";
import ProductShowcase from "../ProductShowcase";

interface FeaturedProductsProps {
  title?: string;
  description?: string;
}
const FeaturedProducts = ({
  title = "Explore Our Product Range",
  description = "From premium grains to diverse produce, our carefully curated selection of agro exports caters to your needs.",
}: FeaturedProductsProps) => {
  return (
    <section
      id="products"
      className="max-w-7xl mx-auto px-2 md:px-6 lg:px-8 pt-16"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-[#2C5F2D] text-center mb-2">
        {title}
      </h2>
      <p className="text-center max-w-[23rem] mx-auto text-primary font-sans ">
        {description}
      </p>
      <ProductShowcase />
    </section>
  );
};

export default FeaturedProducts;
