'use client'

import type { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { Checkbox } from '~/components/ui/checkbox'
import type { ProductInternal } from '~/types/product'
import { Actions } from './actions'

export type Product = {
  id: string
  title: string
  description: string
  category: string
  price: string
  image: string
  status: string
  available: boolean
}

export const columns: ColumnDef<ProductInternal>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ cell }) => {
      const image = cell.getValue() as string
      return (
        <div className="relative aspect-square size-16 rounded ring-1 ring-primary-foreground">
          <Image
            src={image}
            alt="Product image"
            className="absolute inset-0 object-cover object-center"
            fill
          />
        </div>
      )
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'isVisible',
    header: 'Visibile',
    cell: ({ row }) => {
      return row.getValue('isVisible') ? 'Yes' : 'No'
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions slug={row.original.slug} />,
  },
]
