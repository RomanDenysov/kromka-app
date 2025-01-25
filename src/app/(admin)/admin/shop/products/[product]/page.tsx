import { Suspense } from 'react'
import { ProductForm } from '~/components/forms/products/ui'
import { api } from '~/trpc/server'

export default async function Page(props: { params: Promise<{ product: string }> }) {
  const productId = decodeURIComponent((await props.params).product)

  const product = await api.products.getByIdOrSlug(productId)

  return (
    <Suspense>
      <ProductForm product={product} />
    </Suspense>
  )
}
