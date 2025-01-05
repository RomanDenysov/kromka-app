import { createId } from '@paralleldrive/cuid2'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { categories } from '~/db/schema'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc'
import { createCategoryValidator, updateCategoryValidator } from './validator'

export const categoriesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.categories.findMany()
  }),

  byId: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return await ctx.db.query.categories.findFirst({
      where: eq(categories.id, input.id),
    })
  }),

  bySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ ctx, input }) => {
    return await ctx.db.query.categories.findFirst({
      where: eq(categories.slug, input.slug),
    })
  }),

  create: protectedProcedure.input(createCategoryValidator).mutation(async ({ ctx, input }) => {
    return await ctx.db.insert(categories).values({
      id: createId(),
      name: input.name,
      description: '',
      slug: input.slug,
      allowsDelivery: false,
      isVisible: input.isVisible,
      sortOrder: input.sortOrder,
    })
  }),

  update: protectedProcedure.input(updateCategoryValidator).mutation(async ({ ctx, input }) => {
    return await ctx.db
      .update(categories)
      .set({ name: input.name })
      .where(eq(categories.id, input.id))
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(categories).where(eq(categories.id, input.id))
    }),
})
