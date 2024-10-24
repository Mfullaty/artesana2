import React from "react";
import ProductSinglePage from "@/components/ProductSinglePage";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import AgriculturalNews from "@/components/sections/AgriCulturalNews";
const page = () => {
  return (
    <div className="">
      <ProductSinglePage />
      {/* Products */}
      <FeaturedProducts />
      {/* News */}
      <AgriculturalNews />
    </div>
  );
};

export default page;
