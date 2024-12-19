'use client'

import type { ColumnDef } from '@tanstack/react-table'

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

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
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
    accessorKey: 'image',
    header: 'Image',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'available',
    header: 'Available',
    cell: ({ row }) => {
      return row.getValue('available') ? 'Yes' : 'No'
    },
  },
]
