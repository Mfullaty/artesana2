"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Pencil } from 'lucide-react'

export default function MessageDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [message, setMessage] = useState<any>(null)

  useEffect(() => {
    // In a real application, you would fetch the message data from an API
    // For this example, we'll use mock data
    setMessage({
      id: params.id,
      name: "John Doe",
      email: "john@example.com",
      message: "I'm interested in your products. Can you provide more information about your sesame seeds?",
      date: "2024-10-15",
      status: "Unread"
    })
  }, [params.id])

  if (!message) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Messages
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Message from {message.name}</CardTitle>
          <CardDescription>Message Details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">From</h3>
              <p>{message.name} ({message.email})</p>
              <h3 className="text-lg font-semibold mt-4 mb-2">Date</h3>
              <p>{message.date}</p>
              <h3 className="text-lg font-semibold mt-4 mb-2">Status</h3>
              <p>{message.status}</p>
              <h3 className="text-lg font-semibold mt-4 mb-2">Message</h3>
              <p className="whitespace-pre-wrap">{message.message}</p>
              <Button className="mt-4">
                <Pencil className="mr-2 h-4 w-4" /> Mark as Read
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}