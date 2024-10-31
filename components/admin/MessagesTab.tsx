"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash, CheckCheck, Reply, MoreHorizontal, X, Loader2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import Pagination from "./Pagination"
import { format } from 'date-fns'
import ConfirmationModal from "../ConfirmationModal"
import { Message } from "@/types/all"
import { Checkbox } from "@/components/ui/checkbox"

export default function MessagesTab() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; messageId: string | null }>({ isOpen: false, messageId: null })
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({})
  const [unreadCount, setUnreadCount] = useState(0)
  const [selectedMessages, setSelectedMessages] = useState<string[]>([])
  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [isBulkDeleting, setIsBulkDeleting] = useState(false)
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

  const handleBulkDelete = async () => {
    if (selectedMessages.length === 0) return

    setIsBulkDeleting(true)
    try {
      // Implement bulk delete API call here
      // For now, we'll delete messages one by one
      for (const messageId of selectedMessages) {
        await handleDeleteMessage(messageId)
      }
      setSelectedMessages([])
      setIsSelectionMode(false)
      toast.success(`${selectedMessages.length} messages deleted successfully.`)
    } catch (error) {
      console.error('Error bulk deleting messages:', error)
      toast.error("Failed to delete messages. Please try again.")
    } finally {
      setIsBulkDeleting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy h:mm a')
  }

  const handleRowClick = (messageId: string) => {
    if (!isSelectionMode) {
      router.push(`/admin/messages/${messageId}`)
    }
  }

  const toggleMessageSelection = (messageId: string) => {
    setSelectedMessages(prev =>
      prev.includes(messageId)
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    )
  }

  const toggleSelectAll = () => {
    if (selectedMessages.length === messages.length) {
      setSelectedMessages([])
    } else {
      setSelectedMessages(messages.map(message => message.id))
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Messages</CardTitle>
            <CardDescription>View and manage incoming messages</CardDescription>
          </div>
          <div className="flex items-center flex-wrap gap-2">
            <Badge className="bg-green-500 w-12 p-1">{unreadCount} New</Badge>
            {isSelectionMode ? (
              <>
                <Button
                  variant="destructive"
                  onClick={() => setDeleteConfirmation({ isOpen: true, messageId: 'bulk' })}
                  disabled={selectedMessages.length === 0 || isBulkDeleting}
                >
                  {isBulkDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4" />}
                  <span className="ml-2">({selectedMessages.length})</span>
                </Button>
                <Button variant="outline" onClick={() => {
                  setIsSelectionMode(false)
                  setSelectedMessages([])
                }}>
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setIsSelectionMode(true)}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {isSelectionMode && (
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedMessages.length === messages.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                )}
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
                    {isSelectionMode && <TableCell><Skeleton className="h-4 w-4" /></TableCell>}
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
                  <TableCell colSpan={isSelectionMode ? 7 : 6} className="text-center">No messages found</TableCell>
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
                    {isSelectionMode && (
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedMessages.includes(message.id)}
                          onCheckedChange={() => toggleMessageSelection(message.id)}
                        />
                      </TableCell>
                    )}
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
                      <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRowClick(message.id)}
                          aria-label="View message"
                        >
                          <Reply className="h-4 w-4" />
                        </Button>
                        {!isSelectionMode && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteConfirmation({ isOpen: true, messageId: message.id })}
                            disabled={loadingStates[message.id]}
                            aria-label="Delete message"
                          >
                            {loadingStates[message.id] ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash className="h-4 w-4" />
                            )}
                          </Button>
                        )}
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
          onConfirm={() => {
            if (deleteConfirmation.messageId === 'bulk') {
              handleBulkDelete()
            } else if (deleteConfirmation.messageId) {
              handleDeleteMessage(deleteConfirmation.messageId)
            }
          }}
          title={deleteConfirmation.messageId === 'bulk' ? "Delete Selected Messages" : "Delete Message"}
          description={deleteConfirmation.messageId === 'bulk'
            ? `Are you sure you want to delete ${selectedMessages.length} selected messages? This action cannot be undone.`
            : "Are you sure you want to delete this message? This action cannot be undone."}
          confirmText="Delete"
          cancelText="Cancel"
        />
      </CardContent>
    </Card>
  )
}