import { relations } from 'drizzle-orm';
import { boolean, index, pgTable, text } from 'drizzle-orm/pg-core';
import { idField, sortAndVisibility, timestamps } from '../helpers';
import { images } from './images';
import { products } from './products';

// CATEGORIES SCHEMA
const categories = pgTable(
  'categories',
  {
    ...idField,
    name: text('name').notNull().unique(),
    slug: text('slug').notNull().unique(),
    description: text('description').notNull(),
    imageId: text('image_id')
      .notNull()
      .references(() => images.id, { onDelete: 'set null' }),
    allowsDelivery: boolean('allows_delivery').notNull().default(false),
    ...sortAndVisibility,
    ...timestamps,
  },
  (table) => ({
    slugIdx: index('category_slug_idx').on(table.slug),
  })
);

// Relations для категорий
const categoriesRelations = relations(categories, ({ one, many }) => ({
  image: one(images, {
    fields: [categories.imageId],
    references: [images.id],
  }),
  products: many(products),
}));

export { categories, categoriesRelations };
