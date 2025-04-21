import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2Icon } from 'lucide-react'

interface ConfirmationModalProps {
  isOpen: boolean
  isDeleting: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDeleting
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting && <Loader2Icon className="h-4 w-4 animate-spin" />}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmationModal