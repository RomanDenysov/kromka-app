import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';
import { env } from '~/env';
import { staff } from '~/server/db/schema';
import { createTRPCRouter, publicProcedure } from '../../trpc';
import { otpSchema } from './schemas';

export const authRouter = createTRPCRouter({
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
  getPermission: publicProcedure
    .input(otpSchema)
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session?.user ?? null;

      const otp = input.otp;

      const secret = env.OTP_SECRET;

      if (otp !== secret) {
        return {
          success: false,
          message: 'Invalid OTP',
        };
      }

      if (!user || user?.isAnonymous) {
        return {
          success: false,
          message: 'User not found',
        };
      }
      const res = await ctx.db.insert(staff).values({
        id: createId(),
        userId: user.id,
        role: 'admin' as const,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      if (res) {
        return {
          success: true,
          message: 'Permission granted',
        };
      }

      return {
        success: false,
        message: 'Failed to grant permission',
      };
    }),
});
