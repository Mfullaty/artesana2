"use client";
import LandingPage from "@/components/LandingPage";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import NewsMarquee from "@/components/NewsMarquee";

export default function Home() {
  return (
    <>
      <Header />
      {/* Stock Marquee Section */}
      <div className="mt-20 bg-white">
        <NewsMarquee />
      </div>
        <LandingPage />
      {/* <div className="mt-20">
      </div> */}
      <Footer />
    </>
  );
}
