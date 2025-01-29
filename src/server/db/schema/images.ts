import { relations } from 'drizzle-orm';
import { integer, pgTable, primaryKey, text } from 'drizzle-orm/pg-core';
import { idField, timestamps } from '../helpers';
import { products } from './products';

const images = pgTable('images', {
  ...idField,
  name: text('name').notNull(),
  url: text('url').notNull(),
  key: text('key').notNull().unique(), // ключ в MinIO
  size: text('size').notNull(),
  mimeType: text('mime_type').notNull(),
  width: integer('width'),
  height: integer('height'),
  ...timestamps,
});

// Изображения для продуктов
const productImages = pgTable(
  'product_images',
  {
    productId: text('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    imageId: text('image_id')
      .notNull()
      .references(() => images.id, { onDelete: 'cascade' }),
    sortOrder: integer('sort_order').default(0),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.productId, t.imageId] }),
  })
);

// Relations

const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
  image: one(images, {
    fields: [productImages.imageId],
    references: [images.id],
  }),
}));

export { images, productImages, productImagesRelations };
