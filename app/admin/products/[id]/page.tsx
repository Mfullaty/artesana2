"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Pencil } from 'lucide-react'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  description: string
  origin: string
  moisture: string
  color: string
  form: string
  cultivation: string
  cultivationType: string
  purity: string
  grades: string
  measurement: string
  inStock: string
  images: string[]
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch product')
        }
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
        toast({
          title: "Error",
          description: "Failed to load product details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [params.id, toast])

  const handleEdit = () => {
    // Implement edit functionality or navigation to edit page
    router.push(`/admin`)
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-[300px]" />
            <Skeleton className="h-4 w-[200px]" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-[300px] w-full" />
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-4 w-full" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center">
        <p>Product not found.</p>
        <Button variant="ghost" onClick={() => router.back()} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>Product Details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {product.images && product.images.length > 0 ? (
                <Image 
                  src={product.images[0]} 
                  alt={product.name} 
                  width={400} 
                  height={400} 
                  className="w-full h-auto rounded-lg object-cover"
                />
              ) : (
                <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
                  No image available
                </div>
              )}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(1).map((image, index) => (
                    <Image 
                      key={index}
                      src={image} 
                      alt={`${product.name} - ${index + 2}`} 
                      width={100} 
                      height={100} 
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Description</h3>
                <p>{product.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Origin</h4>
                  <p>{product.origin}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Moisture</h4>
                  <p>{product.moisture}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Color</h4>
                  <p>{product.color}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Form</h4>
                  <p>{product.form}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Cultivation</h4>
                  <p>{product.cultivation}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Cultivation Type</h4>
                  <p>{product.cultivationType}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Purity</h4>
                  <p>{product.purity}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Grades</h4>
                  <p>{product.grades}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Measurement</h4>
                  <p>{product.measurement}</p>
                </div>
                <div>
                  <h4 className="font-semibold">In Stock</h4>
                  <p>{product.inStock}</p>
                </div>
              </div>
              <Button onClick={handleEdit} className="w-full">
                <Pencil className="mr-2 h-4 w-4" /> Edit Product
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}