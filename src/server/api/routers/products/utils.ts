import type { DBIngredients, DBInventory, DBProduct, DBProductOptions, Product } from './types'

type RawProduct = {
  options: DBProductOptions[] & { inventory: DBInventory[] }[]
  productIngredients: DBIngredients[]
} & DBProduct

export function transformProduct(rawProduct: RawProduct): Product {
  return {
    ...rawProduct,
    ingredients: rawProduct.productIngredients.map((ing) => ({
      id: ing.id,
      name: ing.ingredientName,
      // маппинг других необходимых полей
    })),
    options: rawProduct.options.map((opt) => ({
      ...opt,
      inventory: opt.inventory || [],
    })),
  }
}
