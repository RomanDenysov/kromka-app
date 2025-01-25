'use server'

import { cache } from 'react'
import { db } from '~/server/db'

export const getProducts = cache(async () => {
  return await db.query.products.findMany()
})
