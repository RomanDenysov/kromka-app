import { createTRPCRouter, publicProcedure } from '../../trpc'

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(async () => {
    const user = null
    return null
  }),
})
