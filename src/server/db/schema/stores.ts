import { relations } from 'drizzle-orm'
import { index, json, pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core'
import { sortAndVisibility, timestamps } from '../helpers'
import { memberRoles } from './enums'
import { storeImage } from './images'
import { orders } from './orders'
import { inventory } from './products'
import { users } from './users'
// STORES SCHEMAS

type WorkingHours = {
  week: string
  saturday: string
  sunday: string
}

// TODO: Temporary solution, should be moved to a separate table
type Address = {
  street: string
  city: string
  zip: string
}

const stores = pgTable(
  'stores',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull().unique(),
    slug: text('slug').notNull().unique(),

    // TODO: Temporary solution, should be moved to a separate table with own schema and relations
    address: json().$type<Address>().notNull(),
    addressUrl: text().notNull(),

    workingHours: json('working_hours')
      .$type<WorkingHours>()
      .default({ week: '8:00 - 17:00', saturday: '8:00 - 12:00', sunday: 'Zatvorene' })
      .notNull(),

    ...sortAndVisibility,

    ...timestamps,
  },
  (table) => {
    return {
      slugIdx: index('store_slug_idx').on(table.slug),
    }
  },
)

const storeMembers = pgTable(
  'store_members',
  {
    id: text('id').primaryKey(),
    storeId: text('store_id')
      .notNull()
      .references(() => stores.id),
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    memberRole: memberRoles('member_role').notNull().default('member'),
  },
  (table) => {
    return {
      userStoreIdx: uniqueIndex('user_store_idx').on(table.userId, table.storeId),
    }
  },
)

// Relations для stores
const storesRelations = relations(stores, ({ one, many }) => ({
  image: one(storeImage, {
    fields: [stores.id],
    references: [storeImage.storeId],
  }),
  storeMembers: many(storeMembers),
  inventory: many(inventory),
  orders: many(orders),
}))

const storeMembersRelations = relations(storeMembers, ({ one }) => ({
  store: one(stores, {
    fields: [storeMembers.storeId],
    references: [stores.id],
  }),
  user: one(users, {
    fields: [storeMembers.userId],
    references: [users.id],
  }),
}))

export { storeMembers, storeMembersRelations, stores, storesRelations }
