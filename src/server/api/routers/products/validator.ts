import { z } from 'zod'

export const idSchema = z.object({
  id: z.string().min(1, 'ID обязателен'),
})

export const slugSchema = z.object({
  slug: z.string().min(1),
})

export const ingredientSchema = z.object({
  name: z.string().min(1, 'Название ингредиента обязательно'),
})

const inventorySchema = z.object({
  storeId: z.string().min(1, 'ID магазина обязателен'),
  quantity: z.number().int().nonnegative(),
  status: z.enum(['inStock', 'soldOut']).default('inStock'),
})

// Схема опции продукта
const productOptionSchema = z.object({
  sku: z.string().min(1, 'SKU обязателен'),
  optionType: z.enum(['weight', 'quantity', 'volume']),
  unit: z.enum(['g', 'kg', 'pcs', 'ml', 'l', 'ks']),
  value: z.number().int().positive(),
  price: z.number().int().nonnegative(),
  isDefault: z.boolean(),
  sortOrder: z.number().int().nonnegative(),
  inventory: z.array(inventorySchema).optional(),
})

// Схема продукта (для чтения)
export const productSchema = z.object({
  name: z.string().min(1, 'Название продукта обязательно'),
  slug: z.string().min(1, 'Slug обязателен'),
  description: z.string().min(1, 'Описание обязательно'),
  category: z.object({
    id: z.string(),
    name: z.string(),
  }),
  status: z.enum(['draft', 'active', 'discontinued', 'sold']).default('draft'),
  sortOrder: z.number().int().nonnegative(),
  isVisible: z.boolean(),
  options: z.array(productOptionSchema),
  ingredients: z.array(ingredientSchema),
})

// Схема для создания опции продукта
const createProductOptionSchema = productOptionSchema.omit({ inventory: true }).extend({
  isDefault: z.boolean().default(false),
  sortOrder: z.number().int().nonnegative().default(0),
  value: z.coerce.number().int().positive(),
  price: z.coerce.number().int().nonnegative(),
})

// Схема для создания продукта
export const createProductSchema = z.object({
  name: z.string().min(1, 'Название продукта обязательно'),
  slug: z.string().min(1, 'Slug обязателен'),
  description: z.string().min(1, 'Описание обязательно'),
  categoryId: z.string().min(1, 'Категория обязательна'),
  status: z.enum(['draft', 'active', 'discontinued', 'sold']).default('draft'),
  isVisible: z.boolean().default(true),
  sortOrder: z.coerce.number().int().nonnegative().default(0),
  options: z.array(createProductOptionSchema),
  ingredients: z.array(ingredientSchema).default([]),
})

// Схема для обновления продукта
export const updateProductSchema = createProductSchema
  .partial()
  .merge(idSchema)
  .extend({
    options: z.array(createProductOptionSchema).optional(),
  })

export const updateInventorySchema = z.object({
  productId: z.string().min(1),
  inventory: z.array(
    z.object({
      storeId: z.string().min(1),
      items: z.array(
        z.object({
          sku: z.string().min(1),
          quantity: z.number().int().nonnegative(),
          status: z.enum(['inStock', 'soldOut']),
        }),
      ),
    }),
  ),
})

export const productWithIdSchema = productSchema.merge(idSchema)
