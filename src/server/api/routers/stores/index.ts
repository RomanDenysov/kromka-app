import { createId } from '@paralleldrive/cuid2'
import { eq } from 'drizzle-orm'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc'
import { stores } from '~/server/db/schema'
import { createStoreSchema, idSchema } from './validator'

export const storesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.stores.findMany({
      where: eq(stores.isVisible, true),
    })
  }),

  byId: publicProcedure.input(idSchema).query(async ({ ctx, input }) => {
    return await ctx.db.query.stores.findFirst({
      where: eq(stores.id, input.id),
    })
  }),

  create: protectedProcedure.input(createStoreSchema).mutation(async ({ ctx, input }) => {
    const storeValues = {
      id: input.id ?? createId(),
      name: input.name,
      slug: input.slug,
      address: input.address,
      addressUrl: input.addressUrl,
      workingHours: input.workingHours,
      sortOrder: input.sortOrder,
      isVisible: input.isVisible,
    }

    return await ctx.db
      .insert(stores)
      .values(storeValues)
      .onConflictDoUpdate({
        target: stores.id,
        set: storeValues,
      })
      .returning({ id: stores.id })
  }),

  delete: protectedProcedure.input(idSchema).mutation(async ({ ctx, input }) => {
    return await ctx.db.delete(stores).where(eq(stores.id, input.id))
  }),
})
