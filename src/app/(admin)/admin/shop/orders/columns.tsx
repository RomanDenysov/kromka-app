'use client'

import type { ColumnDef } from '@tanstack/react-table'

export type Order = {
  id: string
  user: string
  store: string
  date: Date
  items: {
    title: string
    quantity: number
  }[]
  status: string
  payment: string
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'user',
    header: 'User',
  },
  {
    accessorKey: 'store',
    header: 'Store',
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ cell }) => {
      const date = cell.getValue() as Date
      return <span>{date.toLocaleDateString('sk-SK')}</span>
    },
  },
  {
    accessorKey: 'items',
    header: 'Items',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'payment',
    header: 'Payment',
  },
]
