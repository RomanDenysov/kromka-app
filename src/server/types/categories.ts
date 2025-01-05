import type { categories } from '~/db/schema'

export type DBCategory = typeof categories.$inferSelect
