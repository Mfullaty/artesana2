"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash, CheckCheck, Reply } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import Pagination from "./Pagination"
import { format } from 'date-fns'
import ConfirmationModal from "../ConfirmationModal"
import { Message } from "@/types/all"

export default function MessagesTab() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; messageId: string | null }>({ isOpen: false, messageId: null })
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({})
  const [unreadCount, setUnreadCount] = useState(0)
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
      setUnreadCount(data.unreadCount)
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

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy h:mm a')
  }
  const handleRowClick = (messageId: string) => {
    router.push(`/admin/messages/${messageId}`)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Messages</CardTitle>
            <CardDescription>View and manage incoming messages</CardDescription>
          </div>
          <Badge variant="secondary">{unreadCount} Unread</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: itemsPerPage }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-6 w-[150px]" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-[200px]" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-[100px]" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-[100px]" /></TableCell>
                    <TableCell><Skeleton className="h-10 w-20" /></TableCell>
                  </TableRow>
                ))
              ) : messages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">No messages found</TableCell>
                </TableRow>
              ) : (
                messages.map((message) => (
                  <TableRow
                    key={message.id}
                    className={`cursor-pointer hover:bg-gray-100 ${
                      message.status === 'new' ? 'bg-green-50 font-bold' : 
                      message.status === 'Read' ? 'bg-secondary-foreground' : ''
                    }`}
                    onClick={() => handleRowClick(message.id)}
                  >
                    <TableCell>{message.name}</TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell>
                      <div className="line-clamp-2" title={message.message}>
                        {message.message}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(message.sentOn)}</TableCell>
                    <TableCell>
                      {message.status === 'Read' ? (
                        <CheckCheck className="h-5 w-5 text-gray-400" />
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          New
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRowClick(message.id)
                          }}
                          aria-label="View message"
                        >
                          <Reply className="h-4 w-4" />
                        </Button>
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
                          {loadingStates[message.id] ? (
                            <Skeleton className="h-4 w-4 rounded-full" />
                          ) : (
                            <Trash className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
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