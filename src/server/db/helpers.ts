import { boolean, integer, timestamp } from 'drizzle-orm/pg-core'

const timestamps = {
  updatedAt: timestamp('updated_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}

const sortAndVisibility = {
  sortOrder: integer('sort_order').default(0),
  isVisible: boolean('is_visible').notNull().default(true),
}

export { sortAndVisibility, timestamps }
