import type {
  ingredients,
  inventory,
  productIngredients,
  productOptions,
  products,
} from '~/db/schema'

export type DBProduct = typeof products.$inferSelect
// id: string
// name: string
// slug: string
// description: string
// category: string
// sortOrder: number
// isVisible: boolean
// stripeId: string
// createdAt: Date
// updatedAt: Date

export type DBIngredients = typeof ingredients.$inferSelect
// id: string
// name: string

export type DBProductOptions = typeof productOptions.$inferSelect
// sku: string
// productId: string
// optionType: string
// unit: string
// value: number
// price: number
// stripePriceId: string
// isDefault: boolean
// sortOrder: number

export type DBProductInventory = typeof inventory.$inferSelect
// id: string
// storeId: string
// productId: string
// productOptionsSku: string
// quantity: number
// status: string
// updatedAt: Date

export type ProductClearlyDefined = Omit<DBProduct, 'stripeId' | 'createdAt' | 'updatedAt'>
export type DBProductIngredients = typeof productIngredients.$inferSelect
export type ProductWithOptions = ProductClearlyDefined & {
  options: DBProductOptions[]
}

export type ProductWithInventory = ProductClearlyDefined & {
  inventory: Omit<DBProductInventory, 'id' | 'updatedAt'>[]
}

export type ProductWithIngredients = ProductClearlyDefined & {
  ingredients: DBIngredients[]
}

export type ProductInternal = ProductClearlyDefined & {
  options: DBProductOptions[]
  inventory: DBProductInventory[]
  ingredients: DBIngredients[]
}

// PRODUCT:
// id: string
// name: string
// slug: string
// description: string
// category: string
// sortOrder: number
// isVisible: boolean
// stripeId: string
// createdAt: Date
// updatedAt: Date
// options: DBProductOptions[]
// inventory: DBProductInventory[]
// ingredients: DBIngredients[]
