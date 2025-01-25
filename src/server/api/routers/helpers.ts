import { z } from 'zod'

export const idSchema = z.object({
  id: z.string().min(1, 'ID обязателен'),
})

export const slugSchema = z.object({
  slug: z.string().min(1),
})
