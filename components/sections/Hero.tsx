import React from "react";

const Hero = () => {
  return (
    <section className="bg-primary-foreground text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-3 lg:px-8 py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl text-primary sm:text-5xl font-bold mb-6 drop-shadow-md font-mono">
          Products Excellence Worldwide
        </h1>
        <p className="text-xl text-primary mb-8 max-w-2xl font-mono font-semibold">
          Helping product artisans and lovers across borders with premium
          products.
        </p>
        <a
          href="#"
          className="bg-primary text-accent hover:text-accent-foreground opacity-100 hover:opacity-90 px-6 py-3 rounded-full font-semibold  transition duration-300"
        >
          Get a Quote
        </a>
      </div>
    </section>
  );
};

export default Hero;
