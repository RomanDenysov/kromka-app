import { DataTable } from '~/components/data-table'
import { Typography } from '~/components/typography'
import { columns } from './columns'

const dummyCategories = [
  {
    id: '1',
    title: 'Category 1',
    description: 'Description 1',
    image: '/placeholder.png',
    products: 10,
  },
  {
    id: '2',
    title: 'Category 2',
    description: 'Description 2',
    image: '/placeholder.png',
    products: 20,
  },
  {
    id: '3',
    title: 'Category 3',
    description: 'Description 3',
    image: '/placeholder.png',
    products: 30,
  },
]

export default function Page() {
  return (
    <>
      <Typography variant="h3">Categories</Typography>
      <DataTable columns={columns} data={dummyCategories} />
    </>
  )
}
