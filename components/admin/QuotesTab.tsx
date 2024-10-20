"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash, Loader2, Eye } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import Pagination from "./Pagination"
import ConfirmationModal from "../ConfirmationModal"

interface Quote {
  id: string
  fullName: string
  email: string
  phone?: string
  companyName?: string
  product: string
  productType: string
  volume: string
  unit: string
  deliveryDate: string
  createdAt: string
}

export default function QuotesTab() {
  const router = useRouter()
  const { toast } = useToast()
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; quoteId: string | null }>({ isOpen: false, quoteId: null })
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({})
  const itemsPerPage = 10

  useEffect(() => {
    fetchQuotes()
  }, [currentPage])

  const fetchQuotes = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/quotes?page=${currentPage}&limit=${itemsPerPage}`)
      const data = await response.json()
      setQuotes(data.quotes)
      setTotalPages(data.pagination.totalPages)
    } catch (error) {
      console.error('Error fetching quotes:', error)
      toast({
        title: "Error",
        description: "Failed to fetch quotes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteQuote = async (id: string) => {
    setLoadingStates(prev => ({ ...prev, [id]: true }))
    try {
      const response = await fetch(`/api/quotes/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchQuotes()
        toast({
          title: "Success",
          description: "Quote deleted successfully.",
        })
      } else {
        throw new Error('Failed to delete quote')
      }
    } catch (error) {
      console.error('Error deleting quote:', error)
      toast({
        title: "Error",
        description: "Failed to delete quote. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoadingStates(prev => ({ ...prev, [id]: false }))
      setDeleteConfirmation({ isOpen: false, quoteId: null })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Quote Enquiries</CardTitle>
        <CardDescription>Manage incoming quote requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: itemsPerPage }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-[100px]" /></TableCell>
                  </TableRow>
                ))
              ) : (
                quotes.map((quote) => (
                  <TableRow key={quote.id} className="hover:bg-gray-100">
                    <TableCell>{quote.fullName}</TableCell>
                    <TableCell>{quote.product}</TableCell>
                    <TableCell>{`${quote.volume} ${quote.unit}`}</TableCell>
                    <TableCell>{formatDate(quote.deliveryDate)}</TableCell>
                    <TableCell>{formatDate(quote.createdAt)}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => router.push(`/admin/quotes/${quote.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {/* <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => router.push(`/admin/quotes/${quote.id}/edit`)}
                        disabled={loadingStates[quote.id]}
                      >
                        {loadingStates[quote.id] ? <Loader2 className="h-4 w-4 animate-spin" /> : <Pencil className="h-4 w-4" />}
                      </Button> */}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setDeleteConfirmation({ isOpen: true, quoteId: quote.id })}
                        disabled={loadingStates[quote.id]}
                      >
                        {loadingStates[quote.id] ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4" />}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <ConfirmationModal
          isOpen={deleteConfirmation.isOpen}
          onClose={() => setDeleteConfirmation({ isOpen: false, quoteId: null })}
          onConfirm={() => deleteConfirmation.quoteId && handleDeleteQuote(deleteConfirmation.quoteId)}
          title="Delete Quote"
          description="Are you sure you want to delete this quote? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </CardContent>
      <Toaster />
    </Card>
  )
}