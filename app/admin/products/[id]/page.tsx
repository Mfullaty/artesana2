"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Pencil, Trash, Upload, X, Loader2, Check } from 'lucide-react'
import Image from 'next/image'
import ConfirmationModal from "@/components/ConfirmationModal"

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
  admixture: string
  defection: string
  measurement: string
  images: string[]
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [formData, setFormData] = useState<Product | null>(null)
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch product')
        }
        const data = await response.json()
        setProduct(data)
        setFormData(data)
        setImagePreviews(data.images || [])
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => prev ? ({ ...prev, [name]: value }) : null)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImageFiles = Array.from(files).slice(0, 4 - imageFiles.length)
      setImageFiles(prev => [...prev, ...newImageFiles])
      
      const newPreviews = newImageFiles.map(file => URL.createObjectURL(file))
      setImagePreviews(prev => [...prev, ...newPreviews])
    }
  }

  const removeImage = (index: number) => {
    const newImageFiles = [...imageFiles]
    newImageFiles.splice(index, 1)
    setImageFiles(newImageFiles)

    const newPreviews = [...imagePreviews]
    URL.revokeObjectURL(newPreviews[index])
    newPreviews.splice(index, 1)
    setImagePreviews(newPreviews)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formData) return

    setIsSubmitting(true)
    const formDataToSend = new FormData()
    
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formDataToSend.append(key, value.toString())
      }
    })

    imageFiles.forEach((file, index) => {
      formDataToSend.append(`image${index + 1}`, file)
    })

    try {
      const response = await fetch(`/api/products/${params.id}`, {
        method: 'PUT',
        body: formDataToSend,
      })

      if (response.ok) {
        const updatedProduct = await response.json()
        setProduct(updatedProduct)
        setIsEditModalOpen(false)
        toast({
          title: "Success",
          description: "Product updated successfully.",
        })
      } else {
        throw new Error('Failed to update product')
      }
    } catch (error) {
      console.error('Error updating product:', error)
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/admin')
        toast({
          title: "Success",
          description: "Product deleted successfully.",
        })
      } else {
        throw new Error('Failed to delete product')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      })
    }
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
                  <h4 className="font-semibold">Admixture</h4>
                  <p>{product.admixture}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Defection</h4>
                  <p>{product.defection}</p>
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
              </div>
              <div className="space-y-2">
                <Button onClick={() => setIsEditModalOpen(true)} className="w-full">
                  <Pencil className="mr-2 h-4 w-4" /> Edit Product
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => setDeleteConfirmation(true)} 
                  className="w-full"
                >
                  <Trash className="mr-2 h-4 w-4" /> Delete Product
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {formData && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin</Label>
                  <Select name="origin" value={formData.origin} onValueChange={(value) => setFormData(prev => prev ? ({ ...prev, origin: value }) : null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cameroon">Cameroon</SelectItem>
                      <SelectItem value="egypt">Egypt</SelectItem>
                      <SelectItem value="ghana">Ghana</SelectItem>
                      <SelectItem value="nigeria">Nigeria</SelectItem>
                      <SelectItem value="niger">Niger</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moisture">Moisture</Label>
                  <Input id="moisture" name="moisture" value={formData.moisture} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moisture">Admixture</Label>
                  <Input id="moisture" name="moisture" value={formData.admixture} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moisture">Defection</Label>
                  <Input id="moisture" name="moisture" value={formData.defection} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" name="color" value={formData.color} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label>Form</Label>
                  <RadioGroup 
                    name="form" 
                    value={formData.form} 
                    onValueChange={(value) => setFormData(prev => prev ? ({ ...prev, form: value }) : null)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="single" id="form-single" />
                      <Label htmlFor="form-single">Single</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pieces" id="form-pieces" />
                      <Label htmlFor="form-pieces">Pieces</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="whole" id="form-whole" />
                      <Label htmlFor="form-whole">Whole</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cultivation">Cultivation</Label>
                  <Select 
                    name="cultivation" 
                    value={formData.cultivation} 
                    onValueChange={(value) => setFormData(prev => prev ? ({ ...prev, cultivation: value }) : null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select cultivation" />
                    </SelectTrigger>
                    <SelectContent>
                      
                      <SelectItem value="organic">Organic</SelectItem>
                      <SelectItem value="conventional">Conventional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cultivationType">Cultivation Type</Label>
                  <Input id="cultivationType" name="cultivationType" value={formData.cultivationType} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purity">Purity</Label>
                  <Input id="purity" name="purity" value={formData.purity} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grades">Grades</Label>
                  <Input id="grades" name="grades" value={formData.grades} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="measurement">Measurement</Label>
                  <Select 
                    name="measurement" 
                    value={formData.measurement}
                    onValueChange={(value) => setFormData(prev => prev ? ({ ...prev, measurement: value }) : null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select measurement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ton">Ton</SelectItem>
                      <SelectItem value="metric-ton">Metric Ton</SelectItem>
                      <SelectItem value="kg">KG</SelectItem>
                      <SelectItem value="lb">lb</SelectItem>
                      <SelectItem value="grams">grams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  className="min-h-[100px]" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Images (Max 4)</Label>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-[120px]"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                  <p className="text-sm text-gray-500">{imagePreviews.length}/4 images selected</p>
                </div>
                <Input
                  id="images"
                  name="images"
                  type="file"
                  accept="image/*"
                  multiple
                  max="4"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </div>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <Image 
                        src={preview} 
                        alt={`Preview ${index + 1}`} 
                        width={100} 
                        height={100} 
                        className="object-cover rounded-lg" 
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Check className="mr-2 h-4 w-4" />
                )}
                Update Product
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmationModal
        isOpen={deleteConfirmation}
        onClose={() => setDeleteConfirmation(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  )
}