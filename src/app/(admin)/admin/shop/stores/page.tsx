import { DataTable } from '~/components/data-table'
import { Typography } from '~/components/typography'
import { columns } from './columns'

const dummyStores = [
  {
    id: '1',
    title: 'Store 1',
    address: 'New York',
    addressUrl:
      'https://www.google.com/maps/place/New+York,+NY,+USA/@40.7128,-74.0060,17z/data=!3m1!4b1!4m5!3m4!1s0x89c259a7c3c7f55f:0x1f568f8e2b4907a5!8m2!3d40.7128283!4d-74.0059978',
    image: '/placeholder.png',
    isOpen: true,
  },
  {
    id: '2',
    title: 'Store 2',
    address: 'Los Angeles',
    addressUrl: 'https://www.google.com/maps/place/Los+Angeles,+CA',
    image: '/placeholder.png',
    isOpen: false,
  },
  {
    id: '3',
    title: 'Store 3',
    address: 'Chicago',
    addressUrl: 'https://www.google.com/maps/place/Chicago,+IL',
    image: '/placeholder.png',
    isOpen: true,
  },
  {
    id: '4',
    title: 'Store 4',
    address: 'Houston',
    addressUrl: 'https://www.google.com/maps/place/Houston,+TX',
    image: '/placeholder.png',
    isOpen: true,
  },
  {
    id: '5',
    title: 'Store 5',
    address: 'Miami',
    addressUrl: 'https://www.google.com/maps/place/Miami,+FL',
    image: '/placeholder.png',
    isOpen: false,
  },
]

export default function Page() {
  return (
    <>
      <Typography variant="h3">Stores</Typography>
      <DataTable columns={columns} data={dummyStores} canCreateNew />
    </>
  )
}
