'use client'

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Product } from "@/types/all"
import Carousel from "./Carousel"
import Link from "next/link"
import { RefreshCw } from "lucide-react"

const PLACEHOLDER_IMAGE = '/image/placeholder.webp'

function ProductCardSkeleton() {
  return (
    <Card className="bg-[#eee0cd] relative border-none shadow-none overflow-hidden">
      <CardContent className="p-4">
        <Skeleton className="w-full h-[250px]" />
        <Skeleton className="h-6 w-3/4 mt-4" />
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-full mt-1" />
        <Skeleton className="h-4 w-2/3 mt-1" />
      </CardContent>
    </Card>
  )
}

function NoProductsSection() {
  return (
    <div className="bg-[#eee0cd] p-8 rounded-lg text-center">
      <RefreshCw className="w-10 h-10 mx-auto mb-4 text-primary animate-spin" />
      <h2 className="text-2xl font-bold text-primary mb-2">Come back and refresh soon</h2>
      <p className="text-gray-600">We are working on uploading the products</p>
    </div>
  )
}

export default function ProductShowcase() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?page=1&limit=10')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data.products)
      } catch (err) {
        setError('Error fetching products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    )
  }

  if (!loading && products.length === 0) {
    return (
      <div className="px-2">
        <div className="max-w-7xl mx-auto">
          <NoProductsSection />
        </div>
      </div>
    )
  }

  return (
    <div className="px-2">
      <div className="max-w-7xl mx-auto">
        <Carousel autoPlayInterval={2000}>
          {loading
            ? Array(6).fill(0).map((_, index) => (
                <div key={index} className="px-2">
                  <ProductCardSkeleton />
                </div>
              ))
            : products.map((product) => (
                <Link draggable={false} href={`/products/${product.id}`} key={product.id} className="px-2">
                  <Card className="bg-[#eee0cd] relative border-none shadow-none overflow-hidden transition-transform duration-300 hover:scale-105">
                    <CardContent className="p-4">
                      <img
                        src={product.images && product.images.length > 0 ? product.images[0] : PLACEHOLDER_IMAGE}
                        alt={product.name}
                        className="w-full h-[250px] object-cover"
                        draggable={false}
                      />
                      <h3 className="text-lg font-semibold text-primary mb-1 line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))
          }
        </Carousel>
      </div>
    </div>
  )
}