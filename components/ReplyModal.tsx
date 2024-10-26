import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Message } from '@/types/all'

interface ReplyModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (content: string) => void
  message: Message | null
}

export default function ReplyModal({ isOpen, onClose, onSubmit, message }: ReplyModalProps) {
  const [replyContent, setReplyContent] = useState('')

  const handleSubmit = () => {
    onSubmit(replyContent)
    setReplyContent('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reply to {message?.name}</DialogTitle>
        </DialogHeader>
        <Textarea
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="Type your reply here..."
          rows={5}
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Send Reply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}