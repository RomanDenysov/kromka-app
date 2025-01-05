import { z } from 'zod'

export const createCategoryValidator = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  allowsDelivery: z.boolean().optional().default(false),
  isVisible: z.boolean().default(true),
  sortOrder: z.number().default(0),
})

export const updateCategoryValidator = createCategoryValidator
  .partial()
  .merge(z.object({ id: z.string().min(1) }))
