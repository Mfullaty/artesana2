'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'

interface Subscription {
  id: string
  email: string
  submittedOn: string
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchSubscriptions(currentPage)
  }, [currentPage])

  const fetchSubscriptions = async (page: number) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/subscriptions?page=${page}&limit=10`)
      const data = await response.json()
      if (data.success) {
        setSubscriptions(data.subscriptions)
        setTotalPages(data.totalPages)
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
      toast.error('Failed to fetch subscriptions. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        setSubscriptions(subscriptions.filter(sub => sub.id !== id))
        setSelectedSubscriptions(selectedSubscriptions.filter(subId => subId !== id))
        toast.success('Subscription deleted successfully.')
      } else {
        throw new Error('Failed to delete subscription')
      }
    } catch (error) {
      console.error('Error deleting subscription:', error)
      toast.error('Failed to delete subscription. Please try again.')
    }
  }

  const handleToggleSelect = (id: string) => {
    setSelectedSubscriptions(prev => 
      prev.includes(id) ? prev.filter(subId => subId !== id) : [...prev, id]
    )
  }

  const handleDeleteSelected = async () => {
    try {
      const response = await fetch('/api/subscriptions/bulk-delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedSubscriptions }),
      })

      if (response.ok) {
        setSubscriptions(subscriptions.filter(sub => !selectedSubscriptions.includes(sub.id)))
        setSelectedSubscriptions([])
        toast.success('Subscriptions deleted successfully.')
      } else {
        throw new Error('Failed to delete  subscriptions')
      }
    } catch (error) {
      console.error('Error deleting  subscriptions:', error)
      toast.error('Failed to delete  subscriptions. Please try again.')
    }
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${format(date, 'PPP')} (${formatDistanceToNow(date, { addSuffix: true })})`
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Email Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Email Subscriptions</CardTitle>
          {selectedSubscriptions.length > 0 && (
            <Button variant="destructive" onClick={handleDeleteSelected}>
              <Trash2 className="mr-2 h-4 w-4" />({selectedSubscriptions.length})
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subscriptions.map((subscription) => (
              <div key={subscription.id} className="flex items-center justify-between p-4 bg-primary-foreground rounded-lg">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    id={`select-${subscription.id}`}
                    checked={selectedSubscriptions.includes(subscription.id)}
                    onCheckedChange={() => handleToggleSelect(subscription.id)}
                  />
                  <div>
                    <label htmlFor={`select-${subscription.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {subscription.email}
                    </label>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(subscription.submittedOn)}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(subscription.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span>Page {currentPage} of {totalPages}</span>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}