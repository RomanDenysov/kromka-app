'use server'

import { cache } from 'react'
import { db } from '~/db'

export const getStores = cache(async () => {
  return await db.query.stores.findMany()
})
