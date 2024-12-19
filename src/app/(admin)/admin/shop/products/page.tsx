import { DataTable } from '~/components/data-table'
import { Typography } from '~/components/typography'
import { columns } from './columns'

const dummyProducts = [
  {
    id: '1',
    title: 'Product 1',
    description: 'This is a product description',
    category: 'Electronics',
    price: '$19.99',
    image: 'https://picsum.photos/id/1/200/300',
    status: 'In Stock',
    available: true,
  },
  {
    id: '2',
    title: 'Product 2',
    description: 'This is a product description',
    category: 'Electronics',
    price: '$19.99',
    image: 'https://picsum.photos/id/2/200/300',
    status: 'In Stock',
    available: true,
  },
  {
    id: '3',
    title: 'Product 3',
    description: 'This is a product description',
    category: 'Electronics',
    price: '$19.99',
    image: 'https://picsum.photos/id/3/200/300',
    status: 'In Stock',
    available: true,
  },
]

export default function Page() {
  return (
    <>
      <Typography variant="h3">Products</Typography>
      <DataTable columns={columns} data={dummyProducts} />
    </>
  )
}
