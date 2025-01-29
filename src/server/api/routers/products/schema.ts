import { z } from 'zod';

export const productInventorySchema = z.object({
  storeId: z.string(),
  defaultQuantity: z.number(),
  currentQuantity: z.number(),
  lowStockThreshold: z.number(),
  inventoryStatus: z.enum(['in_stock', 'sold_out']),
});

export const productImageSchema = z.object({
  sortOrder: z.number().nullable(),
});

export const ingredientSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const productStatusSchema = z.enum([
  'draft',
  'active',
  'discontinued',
  'sold',
]);

const unitEnum = z.enum(['g', 'kg', 'ml', 'l', 'ks']);

export const productSchema = z.object({
  id: z.string(),

  name: z.string(),
  slug: z.string(),
  description: z.string(),

  categoryId: z.string(),

  productStatus: productStatusSchema,

  unit: unitEnum,
  value: z.number().int().positive(),
  price: z.number().int().nonnegative(),

  sortOrder: z.number(),
  isVisible: z.boolean(),

  stripeId: z.string(),
  stripePriceId: z.string(),

  ingredients: z.array(ingredientSchema),
  inventory: z.array(productInventorySchema),
  images: z.array(productImageSchema),

  createdAt: z.string(),
  updatedAt: z.string(),
});

export const adminProductSchema = productSchema.optional();

export const createProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().min(10),
  categoryId: z.string(),
  productStatus: productStatusSchema,
  sortOrder: z.number().nullable(),
  isVisible: z.boolean().nullable(),
  ingredients: z.array(ingredientSchema),
  images: z.array(productImageSchema),
});
