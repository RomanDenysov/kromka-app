import { relations } from 'drizzle-orm';
import { index, integer, pgTable, primaryKey, text } from 'drizzle-orm/pg-core';
import { idField, sortAndVisibility, timestamps } from '../helpers';
import { categories } from './categories';
import { inventoryStatus, measurementUnits, productStatus } from './enums';
import { productImages } from './images';
import { stores } from './stores';

// PRODUCTS SCHEMAS
const products = pgTable(
  'products',
  {
    ...idField,
    name: text('name').notNull().unique(),
    slug: text('slug').notNull().unique(),
    description: text('description').notNull(),

    categoryId: text('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'restrict' }),

    productStatus: productStatus('product_status').notNull().default('draft'),

    unit: measurementUnits('unit').notNull(),
    value: integer('value'),
    price: integer('price'),

    ...sortAndVisibility,

    stripeId: text('stripe_id').unique(),
    stripePriceId: text('stripe_price_id').unique(),

    ...timestamps,
  },
  (table) => ({
    slugIdx: index('product_slug_idx').on(table.slug),
  })
);

const ingredients = pgTable(
  'ingredients',
  {
    ...idField,
    name: text('name').notNull().unique(),
  },
  (table) => ({
    nameIdx: index('ingredient_name_idx').on(table.name),
  })
);

const productIngredients = pgTable(
  'product_ingredients',
  {
    productId: text('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    ingredientId: text('ingredient_id')
      .notNull()
      .references(() => ingredients.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.productId, table.ingredientId] }),
  })
);

const inventory = pgTable(
  'inventory',
  {
    ...idField,
    storeId: text('store_id')
      .notNull()
      .references(() => stores.id, { onDelete: 'cascade' }),
    productId: text('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),

    defaultQuantity: integer('default_quantity').notNull(),
    currentQuantity: integer('current_quantity').notNull(),
    lowStockThreshold: integer('low_stock_threshold').notNull(),

    inventoryStatus: inventoryStatus('inventory_status')
      .notNull()
      .default('in_stock'),
    ...timestamps,
  },
  (table) => ({
    inventoryStatusIdx: index('inventory_status_idx').on(table.inventoryStatus),
    currentQuantityIdx: index('current_quantity_idx').on(table.currentQuantity),
  })
);

// Relations
const productsRelations = relations(products, ({ many, one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  productIngredients: many(productIngredients),
  images: many(productImages),
}));

const productIngredientsRelations = relations(
  productIngredients,
  ({ one }) => ({
    product: one(products, {
      fields: [productIngredients.productId],
      references: [products.id],
    }),
    ingredient: one(ingredients, {
      fields: [productIngredients.ingredientId],
      references: [ingredients.id],
    }),
  })
);

const ingredientsRelations = relations(ingredients, ({ many }) => ({
  productIngredients: many(productIngredients),
}));

const inventoryRelations = relations(inventory, ({ one }) => ({
  store: one(stores, {
    fields: [inventory.storeId],
    references: [stores.id],
  }),
  product: one(products, {
    fields: [inventory.productId],
    references: [products.id],
  }),
}));

export {
  ingredients,
  ingredientsRelations,
  inventory,
  inventoryRelations,
  productIngredients,
  productIngredientsRelations,
  products,
  productsRelations,
};
