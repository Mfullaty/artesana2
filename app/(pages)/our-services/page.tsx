import { Metadata } from "next";
import OurServicesClient from "./_components/OurServicesClient";

export const metadata: Metadata = {
  title: "Our Services",
  applicationName: "Artesana",
  description:
    "Discover Artesana's comprehensive agricultural services. From sourcing to export, we provide end-to-end solutions for your agricultural product needs.",
  openGraph: {
    title: "Our Services | Artesana",
    description:
      "Explore Artesana's comprehensive agricultural services. From sourcing to export, we provide end-to-end solutions for your agricultural product needs.",
    images: [
      {
        url: "/images/site/artesana-ourservices.webp",
        width: 1200,
        height: 630,
        alt: "Artesana Services",
      },
    ],
    siteName: "Artesana",
    countryName: "Nigeria",
    locale: "en_NG",
    type: "website",
    url: "https://www.artesana.com/our-services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | Artesana",
    description:
      "Explore Artesana's comprehensive agricultural services. From sourcing to export, we provide end-to-end solutions for your agricultural product needs.",
    images: ["/images/site/artesana-ourservices.webp"],
  },
};

export default function OurServicesPage() {
  return <OurServicesClient />;
}
