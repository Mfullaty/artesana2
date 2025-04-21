import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import ProductForm from "@/components/admin/ProductForm";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await db.product.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Product: {product.name}</h1>
      <ProductForm initialData={product} />
    </div>
  );
}
