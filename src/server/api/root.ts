import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc'
import { categoriesRouter } from './routers/categories'
import { imagesRouter } from './routers/images'
import { ingredientsRouter } from './routers/ingredients'
import { productsRouter } from './routers/products'
import { storesRouter } from './routers/stores'
import { userRouter } from './routers/users'

export const appRouter = createTRPCRouter({
  users: userRouter,
  products: productsRouter,
  ingredients: ingredientsRouter,
  categories: categoriesRouter,
  stores: storesRouter,
  images: imagesRouter,
})

export type AppRouter = typeof appRouter
export const createCaller = createCallerFactory(appRouter)
