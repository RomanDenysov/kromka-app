import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  index,
  integer,
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core'

// USERS SCHEMAS
export const userRoles = pgEnum('role', ['admin', 'author', 'manager', 'user', 'partner'])

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull(),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
  role: userRoles('role').default('user'),
  banned: boolean('banned'),
  banReason: text('banReason'),
  banExpires: timestamp('banExpires'),
  isAnonymous: boolean('isAnonymous'),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => users.id),
  activeOrganizationId: text('activeOrganizationId'),
  impersonatedBy: text('impersonatedBy'),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => users.id),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt'),
  updatedAt: timestamp('updatedAt'),
})

export const organization = pgTable('organization', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').unique(),
  logo: text('logo'),
  createdAt: timestamp('createdAt').notNull(),
  metadata: text('metadata'),
})

export const member = pgTable('member', {
  id: text('id').primaryKey(),
  organizationId: text('organizationId')
    .notNull()
    .references(() => organization.id),
  userId: text('userId')
    .notNull()
    .references(() => users.id),
  role: text('role').notNull(),
  createdAt: timestamp('createdAt').notNull(),
})

export const invitation = pgTable('invitation', {
  id: text('id').primaryKey(),
  organizationId: text('organizationId')
    .notNull()
    .references(() => organization.id),
  email: text('email').notNull(),
  role: text('role'),
  status: text('status').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  inviterId: text('inviterId')
    .notNull()
    .references(() => users.id),
})

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

export const stores = pgTable(
  'stores',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull().unique(),
    slug: text('slug').notNull().unique(),

    // TODO: Temporary solution, should be moved to a separate table with own schema and relations
    address: json().$type<Address>().notNull(),
    addressUrl: text('addressUrl'),

    workingHours: json()
      .$type<WorkingHours>()
      .default({ week: '8:00 - 17:00', saturday: '8:00 - 12:00', sunday: 'Zatvorene' }),

    sortOrder: integer('sortOrder').default(0),
    isVisible: boolean('isVisible').notNull(),

    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt')
      .defaultNow()
      .$defaultFn(() => new Date()),
  },
  (table) => {
    return {
      slugIdx: index('store_slug_idx').on(table.slug),
    }
  },
)

export const storeRoles = pgEnum('storeRoles', ['member', 'manager'])

export const storeMembers = pgTable(
  'storeMembers',
  {
    id: text('id').primaryKey(),
    storeId: text('storeId')
      .notNull()
      .references(() => stores.id),
    userId: text('userId')
      .notNull()
      .references(() => users.id),
    role: storeRoles('role').notNull().default('member'),
    createdAt: timestamp('createdAt').defaultNow(),
  },
  (table) => {
    return {
      userStoreIdx: uniqueIndex('user_store_idx').on(table.userId, table.storeId),
    }
  },
)

export const inventoryStatus = pgEnum('inventoryStatus', ['inStock', 'discontinued', 'soldOut'])

export const inventory = pgTable(
  'inventory',
  {
    id: text('id').primaryKey(),
    storeId: text('storeId')
      .notNull()
      .references(() => stores.id, { onDelete: 'cascade' }),
    productId: text('productId') // Связь с продуктом
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    productOptionsSku: text('productOptionsSku') // Связь с опцией
      .notNull()
      .references(() => productOptions.sku, { onDelete: 'cascade' }),
    quantity: integer('quantity'),
    status: inventoryStatus('status').notNull().default('inStock'),
    updatedAt: timestamp('createdAt').defaultNow(),
  },
  (table) => ({
    storeProductOptionIdx: uniqueIndex('store_product_option_idx').on(
      table.storeId,
      table.productOptionsSku,
    ),
  }),
)

// PRODUCTS SCHEMAS

export const products = pgTable('products', {
  id: text('id').primaryKey(),

  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  // basePrice: integer('basePrice'),

  category: text('category')
    .notNull()
    .references(() => categories.id, { onDelete: 'restrict' }),

  sortOrder: integer('sortOrder').default(0),

  isVisible: boolean('isVisible').default(true),
  stripeId: text('stripeId').unique(),

  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt')
    .defaultNow()
    .$defaultFn(() => new Date()),
})

export const ingredients = pgTable('ingredients', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
})

export const productIngredients = pgTable(
  'productIngredients',
  {
    id: text('id').primaryKey(),
    productId: text('productId')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    ingredientId: text('ingredientId')
      .notNull()
      .references(() => ingredients.id),
  },
  (table) => ({
    productIngredientsIdx: uniqueIndex('product_ingredients_idx').on(
      table.productId,
      table.ingredientId,
    ),
  }),
)

// PRODUCT VARIANTS SCHEMA
export const optionTypes = pgEnum('optionType', ['weight', 'quantity', 'volume'])

export const measurementUnits = pgEnum('measurementUnit', ['g', 'kg', 'pcs', 'ml', 'l', 'ks'])

export const productOptions = pgTable(
  'productOptions',
  {
    sku: text('sku').notNull().primaryKey(),
    productId: text('productId')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    optionType: optionTypes('optionType').notNull(),
    unit: measurementUnits('unit').notNull(),
    value: integer('value').notNull(),
    price: integer('price').notNull(),
    stripePriceId: text('stripePriceId').unique(),
    isDefault: boolean('isDefault').default(false),
    sortOrder: integer('sortOrder').default(0),
  },
  (table) => ({
    // Убедимся что у продукта может быть только один дефолтный вариант
    defaultOptionIdx: index('default_option_idx')
      .on(table.productId, table.isDefault)
      .where(sql`${table.isDefault} = true`),
  }),
)

// Relations
export const productsRelations = relations(products, ({ many, one }) => ({
  options: many(productOptions),
  category: one(categories, {
    fields: [products.category],
    references: [categories.id],
  }),
  productIngredients: many(productIngredients),
}))

export const productIngredientsRelations = relations(productIngredients, ({ one }) => ({
  product: one(products, {
    fields: [productIngredients.productId],
    references: [products.id],
  }),
  ingredient: one(ingredients, {
    fields: [productIngredients.ingredientId],
    references: [ingredients.id],
  }),
}))

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
  productIngredients: many(productIngredients),
}))

export const inventoryRelations = relations(inventory, ({ one }) => ({
  store: one(stores, {
    fields: [inventory.storeId],
    references: [stores.id],
  }),
  option: one(productOptions, {
    fields: [inventory.productOptionsSku],
    references: [productOptions.sku],
  }),
}))

export const productOptionsRelations = relations(productOptions, ({ many, one }) => ({
  product: one(products, {
    fields: [productOptions.productId],
    references: [products.id],
  }),
  inventory: many(inventory),
}))

// CATEGORIES SCHEMA
export const categories = pgTable(
  'categories',
  {
    id: text('id').primaryKey(),

    name: text('name').notNull().unique(),
    slug: text('slug').notNull().unique(),

    description: text('description').notNull(),

    allowsDelivery: boolean('allowsDelivery').notNull().default(false),
    isVisible: boolean('isVisible').default(true),

    sortOrder: integer('sortOrder').default(0),

    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt')
      .defaultNow()
      .$defaultFn(() => new Date()),
  },
  (table) => {
    return {
      slugIdx: index('category_slug_idx').on(table.slug),
    }
  },
)

// ORDERS SCHEMA
export const orderStatuses = pgEnum('orderStatus', [
  'notCheckedOut',
  'checkoutStarted',
  'pending',
  'confirmed',
  'completed',
  'cancelled',
  'abandoned',
])

export const deliveryTypes = pgEnum('deliveryType', ['pickup', 'delivery'])

export const paymentTypes = pgEnum('paymentType', [
  'inStore', // user can pay in store (cash, credit card)
  'card',
  'invoice', // user can pay with invoice
])

export const paymentStatuses = pgEnum('paymentStatus', [
  'pending',
  'confirmed',
  'failed',
  'refunded',
])

export const orders = pgTable(
  'orders',
  {
    id: text('id').primaryKey(),
    storeId: text('storeId').references(() => stores.id), // nullable, before store is selected
    userId: text('userId')
      .notNull()
      .references(() => users.id),
    status: orderStatuses('status').notNull().default('notCheckedOut'),

    subtotalPrice: integer('subtotalPrice').notNull().default(0),
    totalPrice: integer('totalPrice').notNull().default(0),
    deliveryPrice: integer('deliveryPrice').notNull().default(0),

    deliveryType: deliveryTypes('deliveryType'),
    // TODO: implement address schema
    deliveryAddress: text('deliveryAddress'),

    paymentType: paymentTypes('paymentType').default('inStore'),
    paymentStatus: paymentStatuses('paymentStatus').default('pending'),

    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt')
      .defaultNow()
      .$defaultFn(() => new Date()),
  },
  (table) => ({
    userIdIdx: index('order_user_id_idx').on(table.userId),
    storeIdIdx: index('order_store_id_idx').on(table.storeId),
    statusIdx: index('order_status_idx').on(table.status),
  }),
)

export const orderItems = pgTable(
  'orderItems',
  {
    id: text('id').primaryKey(),
    orderId: text('orderId')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),

    productId: text('productId')
      .notNull()
      .references(() => products.id),

    productOptionsSku: text('productOptionsSku')
      .notNull()
      .references(() => productOptions.sku),

    quantity: integer('quantity').notNull(),
    pricePerItem: integer('pricePerItem').notNull(),
    totalPrice: integer('totalPrice').notNull(),

    addedAt: timestamp('addedAt').defaultNow(),
    removedAt: timestamp('removedAt'),
  },
  (table) => ({
    orderIdIdx: index('order_items_order_id_idx').on(table.orderId),
    orderProductIdx: index('order_items_order_product_idx').on(table.orderId, table.productId),
  }),
)

// ANALYTICS SCHEMA
export const orderAnalytics = pgTable(
  'orderAnalytics',
  {
    id: text('id').primaryKey(),
    orderId: text('orderId')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),

    // Device & Session info
    deviceFingerprint: text('deviceFingerprint'),
    userAgent: text('userAgent'),
    ipAddress: text('ipAddress'),

    // Interactions
    lastInteractionAt: timestamp('lastInteractionAt').notNull().defaultNow(),
    checkoutAttempts: integer('checkoutAttempts').default(0),

    // Cart behavior
    itemsAddedCount: integer('itemsAddedCount').default(0),
    itemsRemovedCount: integer('itemsRemovedCount').default(0),

    // Time tracking
    timeToFirstAdd: integer('timeToFirstAdd'), // время в секундах от создания до первого добавления
    timeToCheckout: integer('timeToCheckout'), // время в секундах от создания до checkout

    // UTM and source
    utmSource: text('utmSource'),
    utmMedium: text('utmMedium'),
    utmCampaign: text('utmCampaign'),
    referrer: text('referrer'),

    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt')
      .defaultNow()
      .$defaultFn(() => new Date()),
  },
  (table) => ({
    orderIdIdx: index('order_analytics_order_id_idx').on(table.orderId),
    deviceIdx: index('order_analytics_device_idx').on(table.deviceFingerprint),
  }),
)

// Добавляем relations
export const orderAnalyticsRelations = relations(orderAnalytics, ({ one }) => ({
  order: one(orders, {
    fields: [orderAnalytics.orderId],
    references: [orders.id],
  }),
}))

// Relations
export const ordersRelations = relations(orders, ({ many, one }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  store: one(stores, {
    fields: [orders.storeId],
    references: [stores.id],
  }),
  items: many(orderItems),
  analytics: one(orderAnalytics),
}))

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
  option: one(productOptions, {
    fields: [orderItems.productOptionsSku],
    references: [productOptions.sku],
  }),
}))
