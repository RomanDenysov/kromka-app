import { relations } from 'drizzle-orm'
import { integer, pgTable, primaryKey, text, uniqueIndex } from 'drizzle-orm/pg-core'
import { sortAndVisibility, timestamps } from '../helpers'
import { categories } from './categories'
import { inventoryStatus, measurementUnits, productStatus } from './enums'
import { productImages } from './images'
import { stores } from './stores'

// PRODUCTS SCHEMAS

const products = pgTable('products', {
  id: text('id').primaryKey(),

  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),

  categoryId: text('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'restrict' }),

  productStatus: productStatus('product_status').notNull().default('draft'),

  ...sortAndVisibility,

  stripeId: text('stripe_id').unique(),

  ...timestamps,
})

const ingredients = pgTable('ingredients', {
  name: text('name').primaryKey().notNull(),
})

const productIngredients = pgTable(
  'productIngredients',
  {
    id: text('id').primaryKey(),
    productId: text('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    ingredientName: text('ingredient_name')
      .notNull()
      .references(() => ingredients.name),
  },
  (table) => ({
    productIngredientsIdx: uniqueIndex('product_ingredients_idx').on(
      table.productId,
      table.ingredientName,
    ),
  }),
)

// PRODUCT OPTIONS SCHEMA

const productOptions = pgTable('product_options', {
  sku: text('sku').notNull().primaryKey(),
  productId: text('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  unit: measurementUnits('unit').notNull(),
  value: integer('value').notNull(),

  price: integer('price').notNull(),

  stripePriceId: text('stripe_price_id').unique(),

  sortOrder: integer('sort_order').default(0),
})

const inventory = pgTable(
  'inventory',
  {
    storeId: text('store_id')
      .notNull()
      .references(() => stores.id, { onDelete: 'cascade' }),
    productOptionsSku: text('product_options_sku')
      .notNull()
      .references(() => productOptions.sku, { onDelete: 'cascade' }),

    defaultQuantity: integer('default_quantity').notNull(),
    currentQuantity: integer('current_quantity').notNull(),
    lowStockThreshold: integer('low_stock_threshold').notNull(),

    inventoryStatus: inventoryStatus('inventory_status').notNull().default('in_stock'),
    ...timestamps,
  },
  (table) => ({
    pk: primaryKey({ columns: [table.storeId, table.productOptionsSku] }),
  }),
)

// Relations
const productsRelations = relations(products, ({ many, one }) => ({
  options: many(productOptions),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  productIngredients: many(productIngredients),
  images: many(productImages),
}))

const productIngredientsRelations = relations(productIngredients, ({ one }) => ({
  product: one(products, {
    fields: [productIngredients.productId],
    references: [products.id],
  }),
  ingredient: one(ingredients, {
    fields: [productIngredients.ingredientName],
    references: [ingredients.name],
  }),
}))

const ingredientsRelations = relations(ingredients, ({ many }) => ({
  productIngredients: many(productIngredients),
}))

const productOptionsRelations = relations(productOptions, ({ many, one }) => ({
  product: one(products, {
    fields: [productOptions.productId],
    references: [products.id],
  }),
  inventory: many(inventory),
}))

const inventoryRelations = relations(inventory, ({ one }) => ({
  store: one(stores, {
    fields: [inventory.storeId],
    references: [stores.id],
  }),
  option: one(productOptions, {
    fields: [inventory.productOptionsSku],
    references: [productOptions.sku],
  }),
}))

export {
  ingredients,
  ingredientsRelations,
  inventory,
  inventoryRelations,
  productIngredients,
  productIngredientsRelations,
  productOptions,
  productOptionsRelations,
  products,
  productsRelations,
}
