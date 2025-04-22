import { Metadata } from "next";
import ContactUs from "@/components/sections/ContactUs";
import { generateMetaKeywords } from "@/lib/generateKeywords";

export const metadata: Metadata = {
  title: "Contact Us",
  applicationName: "Artesana",
  description:
    "Get in touch with Artesana. We're here to help with your agricultural product needs. Contact us via phone, email, or visit our office in Abuja.",
  openGraph: {
    title: "Contact Artesana | Get in Touch",
    description:
      "Connect with Artesana for your agricultural product needs. Contact us via phone, email, or visit our office in Abuja.",
    images: [
      {
        url: "/images/site/artesana-about-us-1.webp",
        width: 1200,
        height: 630,
        alt: "Artesana Contact",
      },
    ],
    siteName: "Artesana",
    countryName: "Nigeria",
    locale: "en_NG",
    type: "website",
    url: "https://www.artesana.com/contact-us",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Artesana | Get in Touch",
    description:
      "Connect with Artesana for your agricultural product needs. Contact us via phone, email, or visit our office in Abuja.",
    images: ["/images/site/artesana-ourservices.webp"],
  },
  keywords: generateMetaKeywords(
    "Contact us at Artesana, we provide you with organic and conventional products that are delightful, delicious and fresh from Nigerian products and farms, we partner with the most legit and legal farms in Nigeria, we are certified and we operate within the Nigerian export laws",
    50
  ),
};

export default function ContactUsPage() {
  return <ContactUs />;
}
