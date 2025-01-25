import { relations, sql } from 'drizzle-orm'
import { boolean, integer, pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core'
import { categories } from './categories'
import { timestamps } from '../helpers'
import { products } from './products'
import { stores } from './stores'
import { users } from './users'

const images = pgTable('images', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  url: text('url').notNull(),
  key: text('key').notNull().unique(), // ключ в MinIO
  size: text('size').notNull(),
  mimeType: text('mime_type').notNull(),
  width: integer('width'),
  height: integer('height'),
  uploadedBy: text('uploaded_by')
    .notNull()
    .references(() => users.id),
  ...timestamps,
})

// Изображения для продуктов
const productImages = pgTable(
  'product_images',
  {
    id: text('id').primaryKey(),
    productId: text('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'set null' }),
    imageId: text('image_id')
      .notNull()
      .references(() => images.id),
    isDefault: boolean('is_default').default(false),
    sortOrder: integer('sort_order').default(0),
  },
  (table) => ({
    // Убедимся что у продукта может быть только одно дефолтное изображение
    defaultImageIdx: uniqueIndex('product_default_image_idx')
      .on(table.productId)
      .where(sql`${table.isDefault} = true`),
  }),
)

// Изображение для категории (одно изображение)
const categoryImage = pgTable('category_image', {
  categoryId: text('category_id')
    .primaryKey()
    .references(() => categories.id, { onDelete: 'set null' }),
  imageId: text('image_id')
    .notNull()
    .references(() => images.id),
})

// Изображение для магазина (одно изображение)
const storeImage = pgTable('store_image', {
  storeId: text('store_id')
    .primaryKey()
    .references(() => stores.id, { onDelete: 'set null' }),
  imageId: text('image_id')
    .notNull()
    .references(() => images.id),
})

// Relations
const imagesRelations = relations(images, ({ one }) => ({
  uploader: one(users, {
    fields: [images.uploadedBy],
    references: [users.id],
  }),
}))

const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
  image: one(images, {
    fields: [productImages.imageId],
    references: [images.id],
  }),
}))

const categoryImageRelations = relations(categoryImage, ({ one }) => ({
  category: one(categories, {
    fields: [categoryImage.categoryId],
    references: [categories.id],
  }),
  image: one(images, {
    fields: [categoryImage.imageId],
    references: [images.id],
  }),
}))

const storeImageRelations = relations(storeImage, ({ one }) => ({
  store: one(stores, {
    fields: [storeImage.storeId],
    references: [stores.id],
  }),
  image: one(images, {
    fields: [storeImage.imageId],
    references: [images.id],
  }),
}))

export {
  categoryImage,
  categoryImageRelations,
  images,
  imagesRelations,
  productImages,
  productImagesRelations,
  storeImage,
  storeImageRelations,
}
