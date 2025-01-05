import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc'
import { categoriesRouter } from './routers/categories'
import { ingredientsRouter } from './routers/ingredients'
import { productsRouter } from './routers/products'

export const appRouter = createTRPCRouter({
  products: productsRouter,
  ingredients: ingredientsRouter,
  categories: categoriesRouter,
})

export type AppRouter = typeof appRouter
export const createCaller = createCallerFactory(appRouter)
