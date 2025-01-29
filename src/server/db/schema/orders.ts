import { relations } from 'drizzle-orm';
import {
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
} from 'drizzle-orm/pg-core';

import { idField, timestamps } from '../helpers';
import {
  deliveryTypes,
  orderStatus,
  paymentStatus,
  paymentTypes,
} from './enums';
import { products } from './products';
import { stores } from './stores';
import { users } from './users';

// ORDERS SCHEMA

type DeliveryAddress = {
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

const orders = pgTable(
  'orders',
  {
    ...idField,
    storeId: text('store_id').references(() => stores.id), // nullable, before store is selected
    userId: text('user_id').references(() => users.id),
    orderStatus: orderStatus('order_status').notNull().default('draft'),

    subtotalPrice: integer('subtotal_price').default(0),
    deliveryPrice: integer('delivery_price').default(0),
    totalPrice: integer('total_price').default(0),

    deliveryType: deliveryTypes('delivery_type').default('pickup'),

    paymentType: paymentTypes('payment_type').default('in_store'),
    paymentStatus: paymentStatus('payment_status').default('pending'),

    internalNote: text('internal_note'),

    customerComment: text('customer_comment'),

    ...timestamps,
  },
  (table) => ({
    userIdIdx: index('order_user_id_idx').on(table.userId),
    storeIdIdx: index('order_store_id_idx').on(table.storeId),
    statusIdx: index('order_status_idx').on(table.orderStatus),
  })
);

const deliveryInformation = pgTable('delivery_information', {
  orderId: text('order_id')
    .primaryKey()
    .references(() => orders.id, { onDelete: 'cascade' }),
  deliveryAddress: jsonb('delivery_address').$type<DeliveryAddress>(),
  deliveryInstructions: text('delivery_instructions'),
  deliveryContact: text('delivery_contact'),
  deliveryService: text('delivery_service'),
  trackingNumber: text('tracking_number'),
});

const orderItems = pgTable(
  'order_items',
  {
    orderId: text('order_id').references(() => orders.id, {
      onDelete: 'cascade',
    }),
    productId: text('product_id').references(() => products.id),
    productPrice: integer('product_price'),
    quantity: integer('quantity'),
  },
  (table) => ({
    orderIdIdx: index('order_items_order_id_idx').on(table.orderId),
    orderProductIdx: index('order_items_order_product_idx').on(
      table.orderId,
      table.productId
    ),
    pk: primaryKey({ columns: [table.orderId, table.productId] }),
  })
);

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
  orderDeliveryInformation: one(deliveryInformation),
}));

const deliveryInformationRelations = relations(
  deliveryInformation,
  ({ one }) => ({
    order: one(orders, {
      fields: [deliveryInformation.orderId],
      references: [orders.id],
    }),
  })
);

const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

export {
  deliveryInformation,
  deliveryInformationRelations,
  orderItems,
  orderItemsRelations,
  orders,
  ordersRelations,
};
