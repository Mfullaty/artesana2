"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash, Loader2 } from "lucide-react"
import { toast } from "sonner"
import Pagination from "./Pagination"
import ConfirmationModal from "../ConfirmationModal"

interface Message {
  id: string
  name: string
  email: string
  message: string
  sentOn: string
  status: string
}

export default function MessagesTab() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; messageId: string | null }>({ isOpen: false, messageId: null })
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({})
  const itemsPerPage = 5

  useEffect(() => {
    fetchMessages()
  }, [currentPage])

  const fetchMessages = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/messages?page=${currentPage}&limit=${itemsPerPage}`)
      if (!response.ok) {
        throw new Error('Failed to fetch messages')
      }
      const data = await response.json()
      setMessages(data.messages)
      setTotalPages(data.pagination.totalPages)
    } catch (error) {
      console.error('Error fetching messages:', error)
      toast.error("Failed to fetch messages. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteMessage = async (id: string) => {
    setLoadingStates(prev => ({ ...prev, [id]: true }))
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete message')
      }
      await fetchMessages()
      toast.success("Message deleted successfully.")
    } catch (error) {
      console.error('Error deleting message:', error)
      toast.error("Failed to delete message. Please try again.")
    } finally {
      setLoadingStates(prev => ({ ...prev, [id]: false }))
      setDeleteConfirmation({ isOpen: false, messageId: null })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
        <CardDescription>View and manage incoming messages</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    <span className="sr-only">Loading messages...</span>
                  </TableCell>
                </TableRow>
              ) : messages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No messages found</TableCell>
                </TableRow>
              ) : (
                messages.map((message) => (
                  <TableRow key={message.id} className="cursor-pointer hover:bg-gray-100" onClick={() => router.push(`/admin/messages/${message.id}`)}>
                    <TableCell>{message.name}</TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell>
                      <div className="line-clamp-2" title={message.message}>
                        {message.message}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          setDeleteConfirmation({ isOpen: true, messageId: message.id })
                        }}
                        disabled={loadingStates[message.id]}
                        aria-label="Delete message"
                      >
                        {loadingStates[message.id] ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4" />}
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
          onClose={() => setDeleteConfirmation({ isOpen: false, messageId: null })}
          onConfirm={() => deleteConfirmation.messageId && handleDeleteMessage(deleteConfirmation.messageId)}
          title="Delete Message"
          description="Are you sure you want to delete this message? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </CardContent>
    </Card>
  )
}