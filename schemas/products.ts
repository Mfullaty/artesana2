import { z } from 'zod'

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  origin: z.string().optional(),
  moisture: z.string().optional(),
  color: z.string().optional(),
  form: z.string(),
  cultivation: z.string(),
  cultivationType: z.string().optional(),
  purity: z.string().optional(),
  grades: z.string().optional(),
  measurement: z.string(),
  images: z.array(z.string()),
})

export type ProductFormData = z.infer<typeof productSchema>