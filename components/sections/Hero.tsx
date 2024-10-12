import React from "react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-[#1a2b4c] to-[#2c3e50] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Products Excellence Worldwide
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          Helping product artisans and lovers across borders with premium
          products.
        </p>
        <a
          href="#"
          className="bg-[#c9a55c] text-[#1a2b4c] px-6 py-3 rounded-full font-semibold hover:bg-[#d4b572] transition duration-300"
        >
          Get a Quote
        </a>
      </div>
    </section>
  );
};

export default Hero;
