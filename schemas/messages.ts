import * as z from 'zod'

export const messageSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  sentOn: z.date().optional(),
  status: z.enum(['new', 'read', 'replied']).optional(),
})

export type MessageSchema = z.infer<typeof messageSchema>