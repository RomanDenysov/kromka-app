import type { stores } from '~/db/schema'

export type DBStore = typeof stores.$inferSelect
