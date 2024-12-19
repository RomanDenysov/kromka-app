import { DataTable } from '~/components/data-table'
import { Typography } from '~/components/typography'
import { columns } from './columns'

const dummyOrders = [
  {
    id: '1',
    user: 'John Doe',
    store: 'Amazon',
    date: new Date(),
    items: [
      { title: 'T-Shirt', quantity: 2 },
      { title: 'Socks', quantity: 1 },
      { title: 'Shoes', quantity: 1 },
    ],
    status: 'Pending',
    payment: 'Credit Card',
  },
  {
    id: '2',
    user: 'Jane Doe',
    store: 'Apple Store',
    date: new Date(),
    items: [
      { title: 'iPhone', quantity: 1 },
      { title: 'MacBook Pro', quantity: 1 },
      { title: 'Apple Watch', quantity: 1 },
    ],
    status: 'Shipped',
    payment: 'PayPal',
  },
]

export default function Page() {
  return (
    <>
      <Typography variant="h3">Orders</Typography>
      <DataTable filterKey="user" columns={columns} data={dummyOrders} />
    </>
  )
}
