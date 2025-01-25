import { z } from 'zod'

export const adminProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  category: z.string(),
  productStatus: z.enum(['draft', 'active', 'discontinued', 'sold']),
  sortOrder: z.number().nullable(),
  isVisible: z.boolean().nullable(),
  options: z.array(
    z.object({
      sku: z.string(),
      unit: z.enum(['g', 'kg', 'ml', 'l', 'ks']),
      value: z.number().int().positive(),
      price: z.number().int().nonnegative(),
      sortOrder: z.number().nullable(),
      inventory: z.array(
        z.object({
          storeId: z.string(),
          defaultQuantity: z.number(),
          currentQuantity: z.number(),
          lowStockThreshold: z.number(),
          inventoryStatus: z.enum(['inStock', 'soldOut']),
        }),
      ),
    }),
  ),

  productIngredients: z.array(
    z.object({
      ingredientName: z.string(),
    }),
  ),
  images: z.array(
    z.object({
      id: z.string(),
      image: z.object({
        id: z.string(),
        url: z.string(),
      }),
      isDefault: z.boolean().nullish(),
      sortOrder: z.number().nullable(),
    }),
  ),
})

export const createProductSchema = adminProductSchema.partial()
