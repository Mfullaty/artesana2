import { Metadata } from "next";
import ContactUs from "@/components/sections/ContactUs";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Artesana. We're here to help with your agricultural product needs. Contact us via phone, email, or visit our office in Abuja.",
  openGraph: {
    title: "Contact Artesana | Get in Touch",
    description:
      "Connect with Artesana for your agricultural product needs. Contact us via phone, email, or visit our office in Abuja.",
    images: [
      {
        url: "/images/contact-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Artesana Contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Artesana | Get in Touch",
    description:
      "Connect with Artesana for your agricultural product needs. Contact us via phone, email, or visit our office in Abuja.",
    images: ["/images/contact-hero.jpg"],
  },
};

export default function ContactUsPage() {
  return <ContactUs />;
}
