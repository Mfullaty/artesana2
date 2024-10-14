import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-secondary-foreground">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid gap-3 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col pt-16 md:pt-20 justify-start items-center text-center md:items-start md:text-start space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
              EXPLORING THE BOUNTIFUL
            </h1>
            <p className="max-w-[600px] text-gray-600 md:text-xl">
              Discover the rich diversity of our farm-fresh produce, expertly cultivated to bring you the finest agro products for your daily needs.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                Get a Quote
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[500px]">
            <img
              src="/images/heroImage.webp"
              alt="Green tractor with vegetables"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/4 rounded-full bg-secondary md:h-[700px] md:w-[700px]" />
    </section>
  );
};

export default Hero;
