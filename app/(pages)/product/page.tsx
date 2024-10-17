import React from "react";
import ProductSinglePage from "@/components/ProductSinglePage";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import AgriculturalNews from "@/components/sections/AgriCulturalNews";
import CommodityDetails from "@/components/CommodityDetails";
const page = () => {
  return (
    <div className="">
      <ProductSinglePage />
      {/* Products */}
      <FeaturedProducts />

      {/* <CommodityDetails /> */}
      <div className="w-full max-w-7xl mx-auto">
        <CommodityDetails resource="all" resourceName="All Commodities" />
      </div>

      {/* News */}
      <AgriculturalNews />
    </div>
  );
};

export default page;
