"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  FormInputIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import RequestAQuoteForm from "@/components/RequestAQuoteForm"
import { Skeleton } from "@/components/ui/skeleton"

interface Product {
  id: string
  name: string
  description: string
  images: string[]
  details: string[]
}

export default function ProductSinglePage({ params }: { params: { id: string } }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch product')
        }
        const data = await response.json()
        setProduct(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching product:', error)
        setError('Failed to load product. Please try again later.')
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const nextImage = () => {
    if (product && product.images.length > 0) {
      setCurrentImage((prev) => (prev + 1) % product.images.length)
    }
  }

  const prevImage = () => {
    if (product && product.images.length > 0) {
      setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-800 p-2 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-6 w-full" />
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-800 p-2 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-xl"
            >
              {product.images && product.images.length > 0 ? (
                <>
                  <Image
                    src={product.images[currentImage]}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/70 text-gray-800"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/70 text-gray-800"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                  No image available
                </div>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
                  {product.name}
                </h1>
                <p className="text-xl text-gray-600">{product.description}</p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Product Details</h2>
                <ul className="list-none space-y-2 text-gray-600">
                  {product.details && product.details.map((detail, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col space-y-4">
                <a href="#requestAQuote">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <div className="flex justify-center items-center gap-2">
                      <FormInputIcon />
                      <p>Request a Quote</p>
                    </div>
                  </Button>
                </a>
                <Button
                  onClick={() => window.open("https://wa.me/2348138497268", "_blank")}
                  variant="outline"
                  className="w-full text-green-600 border-green-600 hover:bg-green-600 hover:text-white transition-all duration-300"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat On WhatsApp
                </Button>
              </div>
            </motion.div>
            {product.images && product.images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-4 gap-4"
              >
                {product.images.map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    width={150}
                    height={150}
                    className={`rounded-lg cursor-pointer transition-all ${
                      currentImage === index
                        ? "ring-2 ring-amber-600"
                        : "opacity-50 hover:opacity-100"
                    }`}
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </motion.div>
            )}
          </div>
          {/* Request A Quote Section */}
          <RequestAQuoteForm productName={product.name} />
        </div>
      </div>
    </>
  )
}