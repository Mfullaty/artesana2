"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import Pagination from "./Pagination"

export default function MessagesTab() {
  const router = useRouter()
  const [messages, setMessages] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", message: "Interested in your products" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", message: "Requesting more information" },
    // Add more messages here for testing pagination
  ])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(messages.length / itemsPerPage)
  const paginatedMessages = messages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
              {paginatedMessages.map((message) => (
                <TableRow key={message.id} className="cursor-pointer hover:bg-gray-100" onClick={() => router.push(`/admin/messages/${message.id}`)}>
                  <TableCell>{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>{message.message}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Trash className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </CardContent>
    </Card>
  )
}