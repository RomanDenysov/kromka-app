import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc'
import { categoriesRouter } from './routers/categories'
import { ingredientsRouter } from './routers/ingredients'
import { productsRouter } from './routers/products'
import { storesRouter } from './routers/stores'

export const appRouter = createTRPCRouter({
  products: productsRouter,
  ingredients: ingredientsRouter,
  categories: categoriesRouter,
  stores: storesRouter,
})

export type AppRouter = typeof appRouter
export const createCaller = createCallerFactory(appRouter)
