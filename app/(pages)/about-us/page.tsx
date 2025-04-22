import { Metadata } from "next";
import AboutUsClient from "./_components/AboutUsClient";
import { generateMetaKeywords } from "@/lib/generateKeywords";

export const metadata: Metadata = {
  title: "About Us",
  applicationName: "Artesana",
  description:
    "Learn about Artesana's mission, vision, and commitment to providing premium agricultural products. Discover our story and values.",
  openGraph: {
    title: "About Artesana | Our Story & Mission",
    description:
      "Discover Artesana's journey in providing premium agricultural products. Learn about our mission, vision, and commitment to quality.",
    images: [
      {
        url: "/images/site/artesana-about-us-1.webp",
        width: 1200,
        height: 630,
        alt: "Artesana Team",
      },
    ],
    siteName: "Artesana",
    countryName: "Nigeria",
    locale: "en_NG",
    type: "website",
    url: "https://www.artesana.com/about-us",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Artesana | Our Story & Mission",
    description:
      "Discover Artesana's journey in providing premium agricultural products. Learn about our mission, vision, and commitment to quality.",
    images: ["/images/site/artesana-about-us-1.webp"],
  },
  keywords: generateMetaKeywords(
    "About Artesana, our story, our mission, our commitment to quality products, our commitment to quality services, our commitment to quality",
    50
  ),
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}
