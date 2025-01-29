import { eq } from 'drizzle-orm';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { staff } from '~/server/db/schema/users';

export const userRouter = createTRPCRouter({
  getUser: publicProcedure.query(({ ctx }) => {
    return ctx.session?.user ?? null;
  }),
  checkAccess: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id ?? null;
    if (!userId) {
      return {
        success: false,
        role: null,
      };
    }
    const res = await ctx.db.query.staff.findFirst({
      where: eq(staff.userId, userId),
    });

    if (!res) {
      return {
        success: false,
        role: null,
      };
    }
    return {
      success: true,
      role: res?.role,
    };
  }),
});
