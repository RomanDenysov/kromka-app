import { getProducts } from '~/actions/products'
import { DataTable } from '~/components/data-table'
import { Typography } from '~/components/typography'
import { log } from '~/lib/utils/log'
import { columns } from './columns'

export default async function Page() {
  const products = await getProducts()

  log.debug(`Products: ${products}`)
  return (
    <>
      <Typography variant="h3">Products ({products.length})</Typography>

      {products.length > 0 ? (
        <DataTable columns={columns} data={products} canCreateNew />
      ) : (
        <div>No products</div>
      )}
    </>
  )
}
