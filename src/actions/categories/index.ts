'use server'

import { cache } from 'react'
import { db } from '~/db'

export const getCategories = cache(async () => {
  return await db.query.categories.findMany()
})
