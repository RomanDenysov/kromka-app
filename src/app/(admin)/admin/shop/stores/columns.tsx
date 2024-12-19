import type { ColumnDef } from '@tanstack/react-table'

export type Store = {
  id: string
  title: string
  address: string
  addressUrl: string
  image: string
  isOpen: boolean
}

export const columns: ColumnDef<Store>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'addressUrl',
    header: 'URL',
  },
  {
    accessorKey: 'image',
    header: 'Image',
  },
  {
    accessorKey: 'isOpen',
    header: 'Open',
  },
]
