"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { ArrowLeft, Pencil, Loader2 } from 'lucide-react'

interface Quote {
  id: string
  fullName: string
  email: string
  phone?: string
  companyName?: string
  website?: string
  needFor: string
  product: string
  productType: string
  cultivationType: string[]
  processing?: string
  unit: string
  volume: string
  purchaseType: string
  deliveryAddress: string
  incoterm: string
  deliveryDate: string
  deliveryFrequency: string
  additionalInfo?: string
  createdAt: string
  updatedAt: string
}

export default function QuoteDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [quote, setQuote] = useState<Quote | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchQuote()
  }, [params.id])

  const fetchQuote = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/quotes/${params.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch quote')
      }
      const data = await response.json()
      setQuote(data)
    } catch (error) {
      console.error('Error fetching quote:', error)
      toast({
        title: "Error",
        description: "Failed to load quote details. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setQuote(prev =>   prev ? { ...prev, [name]: value } : null)
  }

  const handleSave = async () => {
    if (!quote) return

    setIsSaving(true)
    try {
      const response = await fetch(`/api/quotes/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quote),
      })

      if (!response.ok) {
        throw new Error('Failed to update quote')
      }

      toast({
        title: "Success",
        description: "Quote updated successfully.",
      })
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating quote:', error)
      toast({
        title: "Error",
        description: "Failed to update quote. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!quote) {
    return <div>Quote not found</div>
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Quotes
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Quote Details</CardTitle>
          <CardDescription>View and edit quote information</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  name="fullName" 
                  value={quote.fullName} 
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  value={quote.email} 
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={quote.phone || ''} 
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input 
                  id="companyName" 
                  name="companyName" 
                  value={quote.companyName || ''} 
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Input 
                  id="product" 
                  name="product" 
                  value={quote.product} 
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="productType">Product Type</Label>
                <Input 
                  id="productType" 
                  name="productType" 
                  value={quote.productType} 
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="volume">Volume</Label>
                <Input 
                  id="volume" 
                  name="volume" 
                  value={quote.volume} 
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select 
                  name="unit" 
                  value={quote.unit} 
                  onValueChange={(value) => handleInputChange({ target: { name: 'unit', value } } as any)}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilogram (kg)</SelectItem>
                    <SelectItem value="ton">Ton</SelectItem>
                    <SelectItem value="lb">Pound (lb)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryDate">Delivery Date</Label>
                <Input 
                  id="deliveryDate" 
                  name="deliveryDate" 
                  type="date"
                  value={new Date(quote.deliveryDate).toISOString().split('T')[0]} 
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryFrequency">Delivery Frequency</Label>
                <Input 
                  id="deliveryFrequency" 
                  name="deliveryFrequency" 
                  value={quote.deliveryFrequency} 
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea 
                id="additionalInfo" 
                name="additionalInfo" 
                value={quote.additionalInfo || ''} 
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            {isEditing ? (
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Pencil className="mr-2 h-4 w-4" /> Edit Quote
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}