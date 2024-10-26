"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Skeleton } from "@/components/ui/skeleton"
import { format } from 'date-fns'
import { Message, Reply } from '@/types/all'



export default function MessageDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [message, setMessage] = useState<Message | null>(null)
  const [replies, setReplies] = useState<Reply[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [replyContent, setReplyContent] = useState('')
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchMessageAndReplies()
  }, [params.id])

  useEffect(() => {
    scrollToBottom()
  }, [replies])

  const fetchMessageAndReplies = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/messages/${params.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch message')
      }
      const data = await response.json()
      setMessage(data.message)
      setReplies(data.replies)
    } catch (error) {
      console.error('Error fetching message:', error)
      toast.error("Failed to fetch message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyContent.trim()) return

    setIsSending(true)
    try {
      const response = await fetch(`/api/messages/${params.id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: replyContent }),
      })
      if (!response.ok) {
        throw new Error('Failed to send reply')
      }
      const newReply = await response.json()
      setReplies([...replies, newReply])
      setReplyContent('')
      toast.success("Reply sent successfully.")
    } catch (error) {
      console.error('Error sending reply:', error)
      toast.error("Failed to send reply. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy h:mm a')
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }

  if (!message) {
    return <div>Message not found</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Messages
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Conversation with {message.name}</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto mb-4">
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="font-semibold">{message.name}</div>
            <div>{message.message}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {formatDate(message.sentOn)}
            </div>
          </div>
          {replies.map((reply) => (
            <div
              key={reply.id}
              className={`p-4 rounded-lg ${
                reply.isAdmin ? 'bg-secondary ml-8' : 'bg-primary/10'
              }`}
            >
              <div className="font-semibold">
                {reply.isAdmin ? 'You' : message.name}
              </div>
              <div>{reply.content}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {formatDate(reply.sentOn)}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
          <form onSubmit={handleReply} className="flex items-center space-x-2">
            <Input
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Type your reply..."
              disabled={isSending}
            />
            <Button type="submit" disabled={isSending}>
              {isSending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span className="sr-only">Send reply</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}