import { createId } from '@paralleldrive/cuid2'
import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import { productIngredients, productOptions, products } from '~/server/db/schema'
import { adminProductSchema, createProductSchema } from './types'

export const productsRouter = createTRPCRouter({
  getByIdOrSlug: publicProcedure
    .input(z.string())
    .output(adminProductSchema)
    .query(async ({ input, ctx }) => {
      const product = await ctx.db.query.products.findFirst({
        where: (products, { eq, or }) => or(eq(products.id, input), eq(products.slug, input)),
        columns: {
          id: true,
          name: true,
          slug: true,
          description: true,
          category: true,
          productStatus: true,
          sortOrder: true,
          isVisible: true,
          // Исключаем stripeId и timestamps которые нам не нужны
        },
        with: {
          options: {
            columns: {
              sku: true,
              unit: true,
              value: true,
              price: true,
              sortOrder: true,
              // Исключаем productId и stripePriceId
            },
            with: {
              inventory: {
                columns: {
                  storeId: true,
                  defaultQuantity: true,
                  currentQuantity: true,
                  lowStockThreshold: true,
                  inventoryStatus: true,
                  // Исключаем id, productId, timestamps
                },
                with: {
                  store: {
                    columns: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
          productIngredients: {
            columns: {
              ingredientName: true,
              // Исключаем id и productId
            },
            with: {
              ingredient: {
                columns: {
                  name: true,
                },
              },
            },
          },
          category: {
            columns: {
              id: true,
              name: true,
              slug: true,
            },
          },
          images: {
            orderBy: (images, { asc }) => [asc(images.sortOrder)],
            with: {
              image: {
                columns: {
                  id: true,
                  url: true,
                },
              },
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

      return product
    }),

  create: publicProcedure.input(createProductSchema).mutation(async ({ input, ctx }) => {
    const productData = {
      id: input.id ?? createId(),
      name: input.name!,
      slug: input.slug!,
      description: input.description!,
      category: input.category!,
      productStatus: input.productStatus!,
      isVisible: input.isVisible ?? false,
      sortOrder: input.sortOrder ?? 0,
      updatedAt: new Date(),
    }
    return await ctx.db.transaction(async (tx) => {
      // Создаем продукт
      const [product] = await tx
        .insert(products)
        .values(productData)
        .onConflictDoUpdate({
          target: products.id,
          set: productData,
        })
        .returning({ id: products.id })

      // Создаем опции продукта
      if (input.options?.length) {
        await tx.delete(productOptions).where(eq(productOptions.productId, product.id))
        await tx.insert(productOptions).values(
          input.options.map((opt) => ({
            sku: opt.sku,
            productId: product.id,
            unit: opt.unit,
            value: opt.value,
            price: opt.price,
            sortOrder: opt.sortOrder,
          })),
        )
      }

      // Всегда удаляем старые ингредиенты
      await tx.delete(productIngredients).where(eq(productIngredients.productId, product.id))

      // Создаем новые ингредиенты только если они есть
      if (input.productIngredients?.length) {
        await tx.insert(productIngredients).values(
          input.productIngredients.map((ing) => ({
            id: createId(),
            productId: product.id,
            ingredientName: ing.ingredientName,
          })),
        )
      }

      return {
        success: true,
        id: product.id,
      }
    })
  }),
})
