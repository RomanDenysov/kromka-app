import { z } from 'zod'

export const imageSchema = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
  key: z.string().min(1),
  size: z.string().min(1),
  mimeType: z.string().min(1),
})
export const imageIdSchema = z.object({
  id: z.string().min(1),
})
