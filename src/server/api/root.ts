import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc';
import { authRouter } from './routers/auth';
import { categoriesRouter } from './routers/categories';
import { imagesRouter } from './routers/images';
import { ingredientsRouter } from './routers/ingredients';
import { productsRouter } from './routers/products';
import { storesRouter } from './routers/stores';
import { userRouter } from './routers/users';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  users: userRouter,
  products: productsRouter,
  ingredients: ingredientsRouter,
  categories: categoriesRouter,
  stores: storesRouter,
  images: imagesRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
