import { Metadata } from "next";
import AboutUsClient from "./_components/AboutUsClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Artesana's mission, vision, and commitment to providing premium agricultural products. Discover our story and values.",
  openGraph: {
    title: "About Artesana | Our Story & Mission",
    description:
      "Discover Artesana's journey in providing premium agricultural products. Learn about our mission, vision, and commitment to quality.",
    images: [
      {
        url: "/images/about-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Artesana Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Artesana | Our Story & Mission",
    description:
      "Discover Artesana's journey in providing premium agricultural products. Learn about our mission, vision, and commitment to quality.",
    images: ["/images/about-hero.jpg"],
  },
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}
