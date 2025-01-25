'use client'

import type { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { Checkbox } from '~/components/ui/checkbox'
import type { Product } from '~/server/api/routers/products/types'
import { Actions } from './actions'

export const columns: ColumnDef<Product>[] = [
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
            src={image ?? '/placeholder.png'}
            alt="Product image"
            className="absolute inset-0 rounded object-cover object-center"
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
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
]
