import type { DBCategory } from '~/server/types/categories'
import type {
  DBIngredients,
  DBProduct,
  DBProductIngredients,
  DBProductInventory,
  DBProductOptions,
} from '~/server/types/products'

export const sanitizeProduct = (
  product: DBProduct & {
    category: DBCategory
    options: (DBProductOptions & { inventory: DBProductInventory[] })[]
    productIngredients: (DBProductIngredients & { ingredient: DBIngredients })[]
  },
) => ({
  name: product.name,
  slug: product.slug,
  description: product.description,
  category: {
    id: product.category.id,
    name: product.category.name,
  },
  status: product.status ?? 'draft',
  sortOrder: product.sortOrder ?? 0,
  isVisible: product.isVisible ?? true,
  options: product.options.map((option) => ({
    sku: option.sku,
    optionType: option.optionType,
    unit: option.unit,
    value: option.value,
    price: option.price,
    isDefault: option.isDefault ?? false,
    sortOrder: option.sortOrder ?? 0,
    inventory: option.inventory.map((inv) => ({
      storeId: inv.storeId,
      quantity: inv.quantity ?? 0,
      status: inv.status ?? 'inStock',
    })),
  })),
  ingredients: product.productIngredients.map(({ ingredient }) => ({
    name: ingredient.name,
  })),
})
