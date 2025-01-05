import { createId } from '@paralleldrive/cuid2'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { ingredients } from '~/db/schema'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc'

export const ingredientsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.ingredients.findMany()
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(ingredients).values({
        id: createId(),
        name: input.name,
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(ingredients).where(eq(ingredients.id, input.id))
    }),
})
