import type { z } from 'zod'
import type { createProductSchema, productSchema } from '~/server/api/routers/products/validator'

type CreateProductInput = z.infer<typeof createProductSchema>
type Product = z.infer<typeof productSchema>

export type { CreateProductInput, Product }
