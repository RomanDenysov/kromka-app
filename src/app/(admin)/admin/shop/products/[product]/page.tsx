import { ProductForm } from '~/components/features/admin/eshop/product/form';
import { api } from '~/trpc/server';

export default async function Page(props: {
  params: Promise<{ product: string }>;
}) {
  const productId = decodeURIComponent((await props.params).product);
  const product = await api.products.getByIdOrSlug({ id: productId });

  return <ProductForm product={product} />;
}
