import React from "react";
import ProductShowcase from "../ProductShowcase";

const FeaturedProducts = () => {
  return (
    <section id="products" className="max-w-7xl mx-auto px-2 md:px-6 lg:px-8 pt-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#2C5F2D] text-center mb-2">
          Explore Our Product Range
        </h2>
        <p className="text-center max-w-[23rem] mx-auto text-primary font-sans ">
          From premium grains to diverse produce, our carefully curated
          selection of agro exports caters to your needs
        </p>
      <ProductShowcase />
    </section>
  );
};

export default FeaturedProducts;
