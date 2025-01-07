import { createId } from '@paralleldrive/cuid2'
import { eq } from 'drizzle-orm'
import { stores } from '~/db/schema'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc'
import { createStoreSchema, idSchema, updateStoreSchema } from './validator'

export const storesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.stores.findMany({
      with: {
        isVisible: true,
      },
    })
  }),

  byId: publicProcedure.input(idSchema).query(async ({ ctx, input }) => {
    return await ctx.db.query.stores.findFirst({
      where: eq(stores.id, input.id),
      with: {
        address: true,
        members: true,
      },
    })
  }),

  create: protectedProcedure.input(createStoreSchema).mutation(async ({ ctx, input }) => {
    return await ctx.db.insert(stores).values({
      id: createId(),
      name: input.name,
      slug: input.slug,
      address: input.address,
      addressUrl: input.addressUrl,
      workingHours: input.workingHours,
      sortOrder: input.sortOrder,
      isVisible: input.isVisible,
    })
  }),

  update: protectedProcedure.input(updateStoreSchema).mutation(async ({ ctx, input }) => {
    return await ctx.db
      .update(stores)
      .set({
        name: input.name,
        slug: input.slug,
        address: input.address,
        addressUrl: input.addressUrl,
        workingHours: input.workingHours,
        sortOrder: input.sortOrder,
        isVisible: input.isVisible,
      })
      .where(eq(stores.id, input.id))
  }),

  delete: protectedProcedure.input(idSchema).mutation(async ({ ctx, input }) => {
    return await ctx.db.delete(stores).where(eq(stores.id, input.id))
  }),
})
