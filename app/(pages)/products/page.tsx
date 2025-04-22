import { Metadata } from "next";
import { db } from "@/lib/db";
import ProductsClient from "@/components/ProductsClient";

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "Browse our collection of high-quality products. Find the perfect product for your needs.",
  openGraph: {
    title: "Our Products | Artesana",
    description:
      "Browse our collection of high-quality products. Find the perfect product for your needs.",
    type: "website",
  },
};

export default async function ProductsPage() {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <ProductsClient initialProducts={products} />;
}
