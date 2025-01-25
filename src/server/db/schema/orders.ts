import { relations } from 'drizzle-orm'
import { index, integer, json, pgTable, text } from 'drizzle-orm/pg-core'

import { timestamps } from '../helpers'
import { deliveryTypes, orderStatus, paymentStatus, paymentTypes } from './enums'
import { productOptions, products } from './products'
import { stores } from './stores'
import { users } from './users'

// ORDERS SCHEMA

const orders = pgTable(
  'orders',
  {
    id: text('id').primaryKey(),
    storeId: text('store_id').references(() => stores.id), // nullable, before store is selected
    userId: text('user_id').references(() => users.id),
    orderStatus: orderStatus('order_status').default('not_checked_out'),

    subtotalPrice: integer('subtotal_price').default(0),
    deliveryPrice: integer('delivery_price').default(0),
    totalPrice: integer('total_price').default(0),

    paymentType: paymentTypes('payment_type').default('in_store'),
    paymentStatus: paymentStatus('payment_status').default('pending'),

    ...timestamps,
  },
  (table) => ({
    userIdIdx: index('order_user_id_idx').on(table.userId),
    storeIdIdx: index('order_store_id_idx').on(table.storeId),
    statusIdx: index('order_status_idx').on(table.orderStatus),
  }),
)

const orderDeliveryInformation = pgTable('order_delivery_information', {
  orderId: text('order_id')
    .primaryKey()
    .references(() => orders.id, { onDelete: 'cascade' }),
  deliveryType: deliveryTypes('delivery_type').default('pickup'),
  deliveryAddress: text('delivery_address'),
})

type OrderItemSnapshot = {
  productName: string
  price: number // цена за единицу в центах
}

const orderItems = pgTable(
  'order_items',
  {
    id: text('id').primaryKey(),
    orderId: text('ord er_id').references(() => orders.id, { onDelete: 'cascade' }),
    productId: text('product_id').references(() => products.id),
    productOptionsSku: text('product_options_sku').references(() => productOptions.sku),
    snapshot: json('snapshot').$type<OrderItemSnapshot>(),
    quantity: integer('quantity'),
  },
  (table) => ({
    orderIdIdx: index('order_items_order_id_idx').on(table.orderId),
    orderProductIdx: index('order_items_order_product_idx').on(table.orderId, table.productId),
  }),
)

// Relations
const ordersRelations = relations(orders, ({ many, one }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  store: one(stores, {
    fields: [orders.storeId],
    references: [stores.id],
  }),
  items: many(orderItems),
  orderDeliveryInformation: one(orderDeliveryInformation),
}))

const orderDeliveryInformationRelations = relations(orderDeliveryInformation, ({ one }) => ({
  order: one(orders, {
    fields: [orderDeliveryInformation.orderId],
    references: [orders.id],
  }),
}))

const orderItemsRelations = relations(orderItems, ({ one }) => ({
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

export {
  orderDeliveryInformation,
  orderDeliveryInformationRelations,
  orderItems,
  orderItemsRelations,
  orders,
  ordersRelations,
}
