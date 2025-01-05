import { z } from 'zod'

export const idSchema = z.object({
  id: z.string().min(1, 'ID обязателен'),
})

export const slugSchema = z.object({
  slug: z.string().min(1),
})

export const productSchema = z.object({
  name: z.string().min(1, 'Название продукта обязательно'),
  slug: z.string().min(1, 'Slug обязателен'),
  description: z.string().min(1, 'Описание обязательно'),
  category: z.object({
    id: z.string(),
    name: z.string(),
    // другие поля категории
  }),
  sortOrder: z.number().int().nonnegative(),
  isVisible: z.boolean(),
  options: z.array(
    z.object({
      sku: z.string().min(1, 'SKU обязателен'),
      optionType: z.enum(['weight', 'quantity', 'volume']),
      unit: z.enum(['g', 'kg', 'pcs', 'ml', 'l', 'ks']),
      value: z.number().int().positive(),
      price: z.number().int().nonnegative(),
      isDefault: z.boolean(),
      sortOrder: z.number().int().nonnegative(),
      inventory: z.array(
        z.object({
          storeId: z.string().min(1, 'ID магазина обязателен'),
          quantity: z.number().int().nonnegative(),
          status: z.enum(['inStock', 'discontinued', 'soldOut']),
        }),
      ),
    }),
  ),
  ingredients: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().min(1, 'Название ингредиента обязательно'),
    }),
  ),
})

export const productWithIdSchema = productSchema.merge(idSchema)

export const createProductSchema = z.object({
  name: z.string().min(1, 'Название продукта обязательно'),
  slug: z.string().min(1, 'Slug обязателен'),
  description: z.string().min(1, 'Описание обязательно'),
  categoryId: z.string().min(1, 'Категория обязательна'),
  isVisible: z.boolean().default(true),
  sortOrder: z.coerce.number().int().nonnegative().default(0),
  options: z.array(
    z.object({
      sku: z.string().min(1, 'SKU обязателен'),
      optionType: z.enum(['weight', 'quantity', 'volume']),
      unit: z.enum(['g', 'kg', 'pcs', 'ml', 'l', 'ks']),
      value: z.coerce.number().int().positive(),
      price: z.coerce.number().int().nonnegative(),
      isDefault: z.boolean().default(false),
      sortOrder: z.number().int().nonnegative().default(0),
    }),
  ),
  ingredients: z.array(
    z.object({
      id: z.string().min(1, 'ID ингредиента обязателен'),
    }),
  ),
})

export const updateProductSchema = createProductSchema
  .partial() // делаем все поля опциональными
  .merge(idSchema)
