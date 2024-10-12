import { StockInfo } from "@/types/product";
import StockMarquee from "./StockMarquee";
import Hero from "./sections/Hero";
import FeaturedProducts from "./sections/FeaturedProducts";
import Services from "./sections/Services";
import Faqs from "./sections/Faqs";
import ContactUs from "./sections/ContactUs";
import NewsLetter from "./sections/NewsLetter";
import AgriculturalNews from "./sections/AgriCulturalNews";

const stocks: StockInfo[] = [
  { name: "Beans in beirut", change: 18.0 },
  { name: "Corn in china", change: -2.5 },
  { name: "Wheat in brazil", change: 5.3 },
  { name: "Soybeans in Egypt", change: -1.2 },
  { name: "Rice in Nigeria", change: 3.7 },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Main Content */}
      <main>
        {/* Stock Marquee Section */}
        <div className="mt-16">
          <StockMarquee stocks={stocks} />
        </div>

        {/* Hero Section */}
        <Hero />

        {/* Featured Products */}
        <FeaturedProducts />
        <div className="my-6">
          <StockMarquee stocks={stocks} />
        </div>

        <AgriculturalNews />

        {/* Services */}
        <Services />

        {/* FAQ Section */}
        <Faqs />

        {/* Contact Us Section */}
        <ContactUs />

        {/* Newsletter Section */}
        <NewsLetter />
      </main>
    </div>
  );
}
