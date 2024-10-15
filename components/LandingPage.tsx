import StockMarquee from "./StockMarquee";
import Hero from "./sections/Hero";
import FeaturedProducts from "./sections/FeaturedProducts";
import Services from "./sections/Services";
import Faqs from "./sections/Faqs";
import ContactUs from "./sections/ContactUs";
import NewsLetter from "./sections/NewsLetter";
import AgriculturalNews from "./sections/AgriCulturalNews";
import AboutUs from "./sections/AboutUs";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Stock Marquee Section */}
      <div className="mt-16 bg-white">
        <StockMarquee />
      </div>

      {/* Hero Section */}
      <Hero />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* About Us */}
        <div id="aboutUs" className="relative top-[50px] left-0 w-24 h-24 md:w-32 md:h-32">
          <Image
            src="/images/decorativeLeaf.png"
            alt="Decorative leaf"
            layout="fill"
            objectFit="contain"
          />
        </div>
      <AboutUs />
      

      {/* Marquee */}
      <StockMarquee />

      {/* Services */}
      <Services />

      {/* Agricultural News */}
      <AgriculturalNews />

      {/* FAQ Section */}
      <Faqs />

      {/* Contact Us Section */}
      <ContactUs />

      {/* Newsletter Section */}
      <NewsLetter />
    </div>
  );
}
