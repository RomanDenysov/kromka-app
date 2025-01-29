import { eq } from 'drizzle-orm';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import { images } from '~/server/db/schema';
import { imageIdSchema, imageSchema } from './validator';

export const imagesRouter = createTRPCRouter({
  upload: protectedProcedure
    .input(imageSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return await ctx.db.insert(images).values({
        name: input.name,
        url: input.url,
        key: input.key,
        size: input.size,
        mimeType: input.mimeType,
        uploadedBy: userId,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.images.findMany();
  }),

  delete: protectedProcedure
    .input(imageIdSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(images).where(eq(images.id, input.id));
    }),
});
