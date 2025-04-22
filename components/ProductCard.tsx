import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} passHref>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer">
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-6">
          {product.origin && (
            <div className="mb-2">
              <p className="text-sm text-gray-700 font-bold capitalize">
                ORIGIN: {product.origin}
              </p>
            </div>
          )}

          <h3 className="font-bold text-2xl mb-2">{product.name}</h3>

          {product.purity && (
            <div className="flex justify-between text-sm text-primary font-bold mb-4">
              <span>Purity: {product.purity}</span>
            </div>
          )}

          {product.description && (
            <p className="text-gray-600 mb-2 line-clamp-3">
              {product.description}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
