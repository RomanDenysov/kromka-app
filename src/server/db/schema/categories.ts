import { relations } from 'drizzle-orm'
import { boolean, index, pgTable, text } from 'drizzle-orm/pg-core'
import { sortAndVisibility, timestamps } from '../helpers'
import { categoryImage } from './images'
import { products } from './products'

// CATEGORIES SCHEMA
const categories = pgTable(
  'categories',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull().unique(),
    slug: text('slug').notNull().unique(),
    description: text('description').notNull(),
    allowsDelivery: boolean('allows_delivery').notNull().default(false),
    ...sortAndVisibility,
    ...timestamps,
  },
  (table) => {
    return {
      slugIdx: index('category_slug_idx').on(table.slug),
    }
  },
)

// Relations для категорий
const categoriesRelations = relations(categories, ({ one, many }) => ({
  image: one(categoryImage, {
    fields: [categories.id],
    references: [categoryImage.categoryId],
  }),
  products: many(products),
}))

export { categories, categoriesRelations }
