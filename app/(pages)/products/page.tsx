import { Metadata } from "next";
import { db } from "@/lib/db";
import ProductsClient from "@/components/ProductsClient";
import { generateMetaKeywords } from "@/lib/generateKeywords";
import { productImages } from "@/data/productImages";

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "Browse our collection of high-quality products. Find the perfect product for your needs.",
  openGraph: {
    title: "Our Products | Artesana",
    description:
      "Browse our collection of high-quality products. Find the perfect product for your needs.",
    type: "website",
    images: productImages,
  },
  keywords: generateMetaKeywords(
    "Browse our collection of high-quality products. Find the perfect product for your needs. our products are sourced and made in fresh farms, we are a team of farmers and artisans who are passionate about providing the best products for our customers.",
    50
  ),
};

export default async function ProductsPage() {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <ProductsClient initialProducts={products} />;
}
