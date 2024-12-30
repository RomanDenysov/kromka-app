'use server'

import { cache } from 'react'
import { db } from '~/db'

export const getProducts = cache(async () => {
  return await db.query.products.findMany()
})
