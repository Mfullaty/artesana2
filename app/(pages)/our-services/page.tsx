import { Metadata } from "next";
import OurServicesClient from "./_components/OurServicesClient";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Discover Artesana's comprehensive agricultural services. From sourcing to export, we provide end-to-end solutions for your agricultural product needs.",
  openGraph: {
    title: "Our Services | Artesana",
    description:
      "Explore Artesana's comprehensive agricultural services. From sourcing to export, we provide end-to-end solutions for your agricultural product needs.",
    images: [
      {
        url: "/images/services-hero.webp",
        width: 1200,
        height: 630,
        alt: "Artesana Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | Artesana",
    description:
      "Explore Artesana's comprehensive agricultural services. From sourcing to export, we provide end-to-end solutions for your agricultural product needs.",
    images: ["/images/services-hero.webp"],
  },
};

export default function OurServicesPage() {
  return <OurServicesClient />;
}
