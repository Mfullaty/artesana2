import StockMarquee from "./StockMarquee";
import Hero from "./sections/Hero";
import FeaturedProducts from "./sections/FeaturedProducts";
import Services from "./sections/Services";
import Faqs from "./sections/Faqs";
import ContactUs from "./sections/ContactUs";
import NewsLetter from "./sections/NewsLetter";
import AgriculturalNews from "./sections/AgriCulturalNews";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8f8f8]">
        {/* Stock Marquee Section */}
        <div className="mt-16">
          <StockMarquee />
        </div>

        {/* Hero Section */}
        <Hero />

        {/* Featured Products */}
        <FeaturedProducts />

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
