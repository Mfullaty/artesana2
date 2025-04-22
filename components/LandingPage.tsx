import Hero from "./sections/Hero";
import FeaturedProducts from "./sections/FeaturedProducts";
import Services from "./sections/Services";
import Faqs from "./sections/Faqs";
import ContactUs from "./sections/ContactUs";
import NewsLetter from "./sections/NewsLetter";
import AgriculturalNews from "./sections/AgriCulturalNews";
import AboutUs from "./sections/AboutUs";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import NewsMarquee from "./NewsMarquee";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Hero Section */}
      <Hero />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* About Us */}
      <div
        id="aboutUs"
        className="relative top-[50px] left-0 w-24 h-24 md:w-32 md:h-32"
      >
        <Image
          src="/images/decorativeLeaf.png"
          alt="Decorative leaf"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <AboutUs />

      {/* Marquee */}
      {/* <NewsMarquee /> */}

      {/* Services */}
      <div className="services pt-16 bg-white relative">
        <h2 className="text-4xl font-bold mb-8 text-center text-primary">
          Our Services
        </h2>
        <Services />
        <Link href="/our-services" className="absolute bottom-3 right-5 hover:right-3 transition-all ease-out duration-500 bg-black text-white hover:bg-primary py-3 px-4 rounded-md">
          <span className="flex">Full Services <ArrowRight /></span>
        </Link>
      </div>

      {/* Agricultural News */}
      {/* <AgriculturalNews /> */}

      {/* FAQ Section */}
      <Faqs />

      {/* Contact Us Section */}
      <ContactUs />

      {/* Newsletter Section */}
      <NewsLetter />
    </div>
  );
}
