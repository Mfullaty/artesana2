import { Metadata } from "next";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductSinglePage from "@/components/ProductSinglePage";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await db.product.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.name} | Artesana`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: product.images,
    },
  };
}

export default async function Page({ params }: ProductPageProps) {
  const product = await db.product.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!product) {
    notFound();
  }

  return <ProductSinglePage product={product} />;
}
