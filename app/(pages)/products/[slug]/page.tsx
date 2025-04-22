import { Metadata } from "next";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductSinglePage from "@/components/ProductSinglePage";
import { generateMetaKeywords } from "@/lib/generateKeywords";

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

  const keywords = generateMetaKeywords(product.description, 50);
  // console.log(keywords);

  return {
    title: `${product.name} | Artesana`,
    applicationName: "Artesana",
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
      siteName: "Artesana",
      countryName: "Nigeria",
      locale: "en_NG",
      type: "website",
      url: `https://www.artesana.com/products/${product.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: product.images,
    },
    keywords: keywords,
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
