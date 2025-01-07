import { ProductForm } from '~/components/forms/products/ui/product-form'

export default async function Page(props: { params: Promise<{ product: string }> }) {
  const productId = decodeURIComponent((await props.params).product)

  console.log('product', productId)

  return (
    <div>
      <ProductForm productId={productId} />

      {/* <Upload /> */}
    </div>
  )
}
