import { getCategories } from '~/actions/categories'
import { getProducts } from '~/actions/products'
import { getStores } from '~/actions/stores'
import { ProductForm } from '~/components/forms/products/ui/product-form'

export default async function Page() {
  const [products, stores, categories] = await Promise.all([
    getProducts(),
    getStores(),
    getCategories(),
  ])

  return (
    <div>
      <ProductForm />

      {/* <Upload /> */}
    </div>
  )
}
