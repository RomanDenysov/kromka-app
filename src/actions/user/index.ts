'use server'

import { eq, inArray } from 'drizzle-orm'
import { headers } from 'next/headers'
import { cache } from 'react'
import { db } from '~/db'
import { users } from '~/db/schema'

import { auth } from '~/lib/auth'
import { log } from '~/lib/log'

const getUser = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return null
  }
  const result = session?.user
  return result
})

const getUsers = cache(async () => {
  return await db.query.users.findMany({ limit: 10, offset: 0 })
})

const deleteUser = async (id: string | string[]) => {
  try {
    if (Array.isArray(id)) {
      if (id.length === 0) {
        return { success: false, error: 'No IDs provided' }
      }
      const res = await db
        .delete(users)
        .where(inArray(users.id, id))
        .returning({ deletedId: users.id })
      return {
        success: true,
        deletedCount: res.length, // В идеале получать реальное количество удаленных записей
      }
    }
    await db.delete(users).where(eq(users.id, id))
    return {
      success: true,
      deletedCount: 1,
    }
  } catch (error) {
    log.error(`Error deleting user(s): ${error}`)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

const isAdmin = cache(async () => {
  const user = await getUser()
  if (!user) {
    return false
  }
  return user.role === 'admin'
})

export { deleteUser, getUser, getUsers, isAdmin }
