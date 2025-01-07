import { createId } from '@paralleldrive/cuid2'
import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { productIngredients, productOptions, products } from '~/db/schema'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { sanitizeProduct } from './utils'
import {
  createProductSchema,
  idSchema,
  productSchema,
  slugSchema,
  updateProductSchema,
} from './validator'

export const productsRouter = createTRPCRouter({
  byId: publicProcedure
    .input(idSchema)
    .output(productSchema)
    .query(async ({ input, ctx }) => {
      const product = await ctx.db.query.products.findFirst({
        where: eq(products.id, input.id),
        with: {
          productIngredients: {
            with: {
              ingredient: true,
            },
          },
          category: true,
          options: {
            with: {
              inventory: true,
            },
          },
        },
      })

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found',
        })
      }

      return sanitizeProduct(product)
    }),

  bySlug: publicProcedure
    .input(slugSchema)
    .output(productSchema)
    .query(async ({ input, ctx }) => {
      const product = await ctx.db.query.products.findFirst({
        where: eq(products.slug, input.slug),
        with: {
          productIngredients: {
            with: {
              ingredient: true,
            },
          },
          category: true,
          options: {
            with: {
              inventory: true,
            },
          },
        },
      })

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found',
        })
      }

      return sanitizeProduct(product)
    }),

  create: publicProcedure.input(createProductSchema).mutation(async ({ input, ctx }) => {
    return await ctx.db.transaction(async (tx) => {
      // Создаем продукт
      const [product] = await tx
        .insert(products)
        .values({
          id: createId(),
          name: input.name,
          slug: input.slug,
          description: input.description,
          category: input.categoryId,
          status: input.status,
          isVisible: input.isVisible,
          sortOrder: input.sortOrder,
        })
        .returning()
      if (!product || !product.id) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create product',
        })
      }

      // Создаем опции продукта
      if (input.options.length) {
        await tx.insert(productOptions).values(
          input.options.map((opt) => ({
            sku: opt.sku,
            productId: product.id,
            optionType: opt.optionType,
            unit: opt.unit,
            value: opt.value,
            price: opt.price,
            isDefault: opt.isDefault,
            sortOrder: opt.sortOrder,
          })),
        )
      }

      // Создаем ингредиенты
      if (input.ingredients?.length) {
        await tx.insert(productIngredients).values(
          input.ingredients.map((ing) => ({
            id: createId(),
            productId: product.id,
            ingredientName: ing.name,
          })),
        )
      }

      // Возвращаем созданный продукт
      const newProduct = await tx.query.products.findFirst({
        where: eq(products.id, product.id),
        with: {
          category: true,
          options: {
            with: {
              inventory: true,
            },
          },
          productIngredients: {
            with: {
              ingredient: true,
            },
          },
        },
      })

      if (!newProduct) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found',
        })
      }

      return sanitizeProduct(newProduct)
    })
  }),

  update: publicProcedure.input(updateProductSchema).mutation(async ({ input, ctx }) => {
    return await ctx.db.transaction(async (tx) => {
      console.log('Update product', input)
      if (Object.keys(input).length > 1) {
        await tx
          .update(products)
          .set({
            name: input.name,
            slug: input.slug,
            description: input.description,
            category: input.categoryId,
            status: input.status ?? 'draft',
            isVisible: input.isVisible,
            sortOrder: input.sortOrder ?? 0,
          })
          .where(eq(products.id, input.id))
      }
      // Обновляем опции если они предоставлены
      if (input.options?.length) {
        // Удаляем старые опции
        await tx.delete(productOptions).where(eq(productOptions.productId, input.id))

        // Создаем новые
        await tx.insert(productOptions).values(
          input.options.map((opt) => ({
            sku: opt.sku,
            productId: input.id,
            optionType: opt.optionType,
            unit: opt.unit,
            value: opt.value,
            price: opt.price,
            isDefault: opt.isDefault,
            sortOrder: opt.sortOrder,
          })),
        )
      }

      // Обновляем ингредиенты если они предоставлены
      if (input.ingredients?.length) {
        // Удаляем старые связи
        await tx.delete(productIngredients).where(eq(productIngredients.productId, input.id))

        // Создаем новые
        await tx.insert(productIngredients).values(
          input.ingredients.map((ing) => ({
            id: createId(), // добавляем id, который мы забыли
            productId: input.id,
            ingredientName: ing.name, // используем name вместо id
          })),
        )
      }

      // Возвращаем обновленный продукт
      const updatedProduct = await tx.query.products.findFirst({
        where: eq(products.id, input.id),
        with: {
          category: true,
          options: {
            with: {
              inventory: true,
            },
          },
          productIngredients: {
            with: {
              ingredient: true,
            },
          },
        },
      })

      if (!updatedProduct) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found',
        })
      }

      return sanitizeProduct(updatedProduct)
    })
  }),
})
