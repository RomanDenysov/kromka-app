import { pgEnum } from 'drizzle-orm/pg-core'

const staffRole = pgEnum('staff_role', [
  'admin', // Полный доступ ко всему
  'manager', // Доступ к управлению магазинами, товарами, заказами
  'author', // Доступ только к созданию и редактированию контента
])

const orderStatus = pgEnum('order_status', [
  'not_checked_out',
  'checkout_started',
  'pending',
  'confirmed',
  'completed',
  'cancelled',
  'abandoned',
])

const deliveryTypes = pgEnum('delivery_types', ['pickup', 'delivery'])

const paymentTypes = pgEnum('payment_types', [
  'in_store', // user can pay in store (cash, credit card)
  'card',
  'invoice', // user can pay with invoice
])
const paymentStatus = pgEnum('payment_status', ['pending', 'confirmed', 'failed', 'refunded'])

const productStatus = pgEnum('product_status', ['draft', 'active', 'discontinued', 'sold'])
const measurementUnits = pgEnum('measurement_units', ['g', 'kg', 'ml', 'l', 'ks'])
const inventoryStatus = pgEnum('inventory_status', ['in_stock', 'sold_out'])

const memberRoles = pgEnum('member_roles', ['member', 'manager'])

export {
  deliveryTypes,
  inventoryStatus,
  measurementUnits,
  memberRoles,
  orderStatus,
  paymentStatus,
  paymentTypes,
  productStatus,
  staffRole,
}
 