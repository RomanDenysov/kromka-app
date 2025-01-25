import { createTRPCRouter, publicProcedure } from '../../trpc'

export const authRouter = createTRPCRouter({
  getUser: publicProcedure.query(async ({ ctx }) => {
    const user = await ctx.session?.user

    if (!user) {
      return null
    }

    return user
  }),
})
