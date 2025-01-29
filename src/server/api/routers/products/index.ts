import { eq } from 'drizzle-orm';
import { log } from '~/lib/utils/log';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import {
  options,
  productImages,
  productIngredients,
  products,
} from '~/server/db/schema';
import { idSchema } from '../helpers';
import { adminProductSchema, createProductSchema } from './schema';

export const productsRouter = createTRPCRouter({
  getById: publicProcedure
    .input(idSchema)
    .output(adminProductSchema)
    .query(async ({ input, ctx }) => {
      const product = await ctx.db.query.products.findFirst({
        where: (products, { eq }) => eq(products.id, input.id),
        with: {
          productIngredients: {
            with: {
              ingredient: true,
            },
          },
          category: true,
          images: {
            orderBy: (images, { asc }) => [asc(images.sortOrder)],
            with: {
              image: true,
            },
          },
        },
      });

      log.info(product);

      return product;
    }),

  create: publicProcedure
    .input(createProductSchema)
    .mutation(async ({ input, ctx }) => {
      const productData = {
        name: input.name,
        slug: input.slug,
        description: input.description,
        categoryId: input.categoryId,
        productStatus: input.productStatus,
        isVisible: input.isVisible ?? false,
        sortOrder: input.sortOrder ?? 0,
        updatedAt: new Date(),
      };
      return await ctx.db.transaction(async (tx) => {
        // Создаем продукт
        const [product] = await tx
          .insert(products)
          .values(productData)
          .onConflictDoUpdate({
            target: products.id,
            set: productData,
          })
          .returning({ id: products.id });

        // Создаем опции продукта
        if (input.options?.length) {
          await tx.delete(options).where(eq(options.productId, product.id));
          await tx.insert(options).values(
            input.options.map((opt) => ({
              sku: opt.sku,
              productId: product.id,
              unit: opt.unit,
              value: opt.value,
              price: opt.price,
              sortOrder: opt.sortOrder,
            }))
          );
        }

        // Всегда удаляем старые ингредиенты
        await tx
          .delete(productIngredients)
          .where(eq(productIngredients.productId, product.id));

        // Создаем новые ингредиенты только если они есть
        if (input.productIngredients?.length) {
          await tx.insert(productIngredients).values(
            input.productIngredients.map((ing) => ({
              productId: product.id,
              ingredientId: ing.ingredientId,
            }))
          );
        }

        await tx.insert(productImages).values(
          input.images.map((img) => ({
            productId: product.id,
            imageId: img.image.id,
            isDefault: img.isDefault,
            sortOrder: img.sortOrder,
          }))
        );

        return {
          success: true,
          id: product.id,
        };
      });
    }),
});
