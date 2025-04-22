import type { Metadata } from "next";
import "./globals.css";
import { generateMetaKeywords } from "@/lib/generateKeywords";

const dynamicKeywords = generateMetaKeywords("Artesana is a trusted platform dedicated to connecting global markets with the finest agricultural products from Nigeria, West Africa, and across the African continent. We specialize in sourcing and delivering premium commodities that reflect the richness and diversity of Africa’s agricultural heritage. Our offerings include a wide range of fresh, organic, and conventional products, carefully selected to meet international quality standards. Whether you’re looking for products for export, import, sale, or purchase, Artesana serves as your reliable partner in agricultural trade", 50);

const staticKeywords = [
  "agricultural products",
  "premium commodities",
  "Artesana",
  "agricultural trade",
  "Products from Nigeria",
  "Products from Africa",
  "Products from West Africa",
  "Products from Nigeria",
  "Products from Africa",
  "Products from West Africa",
  "Products from Nigeria",
  "Fresh Products",
  "Organic Products",
  "Conventional Products",
  "Agricultural Trade",
  "Agricultural Commodities",
  "Agricultural Products",
  "Agricultural Trade",
  "Agricultural Commodities",
  "Products for export",
  "Products for import",
  "Products for sale",
  "Products for purchase",
  "Products for sale",
  "Products for purchase",
];

const metaKeywords = [...staticKeywords, ...dynamicKeywords];

// console.log(metaKeywords);

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.artesana.com"
  ),
  title: {
    default: "Artesana | Premium Agricultural Products",
    template: "%s | Artesana",
  },
  description:
    "Premium quality agricultural products from Artesana. Explore our range of high-quality agricultural commodities.",
  keywords: metaKeywords,
  authors: [{ name: "Artesana" }],
  creator: "Artesana",
  publisher: "Artesana",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  icons: {
    icon: "/logo-1.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Artesana",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@artesana",
    site: "@artesana",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
