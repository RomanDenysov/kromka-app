import type { z } from 'zod';
import type {
  createProductSchema,
  productImageSchema,
  productIngredientSchema,
  productOptionsSchema,
  productSchema,
} from '~/server/api/routers/products/schema';

type CreateProductInput = z.infer<typeof createProductSchema>;
type Product = z.infer<typeof productSchema>;
type Ingredient = z.infer<typeof productIngredientSchema>;
type Image = z.infer<typeof productImageSchema>;
type Option = z.infer<typeof productOptionsSchema>;

export type { CreateProductInput, Ingredient, Product, Image, Option };
