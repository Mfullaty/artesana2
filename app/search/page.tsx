import { db } from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";

interface SearchPageProps {
  searchParams: { q?: string };
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q;

  if (!query) {
    return {
      title: "Search Products",
      description: "Search through our collection of high-quality products",
    };
  }

  return {
    title: `Search results for "${query}" | Artesana`,
    description: `Search results for "${query}" - Find the best products matching your search criteria`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q;

  if (!query) {
    notFound();
  }

  const products = await db.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { origin: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Search Results for &quot;{query}&quot;
      </h1>
      <p className="text-gray-600 mb-8">
        Found {products.length} products matching your search
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No products found matching your search criteria. Try different
            keywords.
          </p>
        </div>
      )}
    </div>
  );
}
