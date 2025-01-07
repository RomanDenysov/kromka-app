import type { z } from 'zod'
import type {
  createProductSchema,
  ingredientSchema,
  productSchema,
} from '~/server/api/routers/products/validator'

type CreateProductInput = z.infer<typeof createProductSchema>
type Product = z.infer<typeof productSchema>
type Ingredient = z.infer<typeof ingredientSchema>

export type { CreateProductInput, Ingredient, Product }
