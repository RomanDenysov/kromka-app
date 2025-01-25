'use server'

import { cache } from 'react'
import { db } from '~/server/db'

export const getCategories = cache(async () => {
  return await db.query.categories.findMany()
})
