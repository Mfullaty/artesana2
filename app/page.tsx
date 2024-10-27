"use client";
import LandingPage from "@/components/LandingPage";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import StockMarquee from "@/components/StockMarquee";

export default function Home() {
  return (
    <>
      <Header />
      {/* Stock Marquee Section */}
      <div className="mt-20 bg-white">
        <StockMarquee />
      </div>
      <LandingPage />
      <Footer />
    </>
  );
}
