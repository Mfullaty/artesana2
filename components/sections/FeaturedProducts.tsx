import React from "react";
import ProductShowcase from "../ProductShowcase";

const FeaturedProducts = () => {
  return (
    <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center font-mono">
        Featured Products
      </h2>
      <ProductShowcase />
    </section>
  );
};

export default FeaturedProducts;
