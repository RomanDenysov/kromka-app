'use client'

import type { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '~/components/ui/badge'
import type { Store } from '~/server/types/store'
import { Actions } from './actions'

export const columns: ColumnDef<Store>[] = [
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
    accessorKey: 'name',
    header: 'Title',
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ cell, row }) => {
      const address = cell.getValue() as Store['address']
      const { street, city, zip } = address
      const url = row.original.addressUrl
      return (
        <Link
          target="_blank"
          rel="noreferer nofollow"
          href={url}
          className="font-medium text-sm underline hover:text-muted-foreground"
        >
          {street} {city} {zip}
        </Link>
      )
    },
  },
  {
    accessorKey: 'isVisible',
    header: 'Open',
    cell: ({ cell }) => {
      const isVisible = cell.getValue() as boolean
      return isVisible ? <Badge>Open</Badge> : <Badge variant="destructive">Closed</Badge>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
]
