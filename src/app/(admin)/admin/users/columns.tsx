'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon } from 'lucide-react'
import { AvatarStack } from '~/components/avatar-stack'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import type { User } from '~/types/user'

export const columns: ColumnDef<User>[] = [
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
    header: 'Avatar',
    cell: ({ cell, row }) => {
      const image = cell.getValue() as string
      const name = row.getValue('name') as string
      const email = row.getValue('email') as string

      return <AvatarStack avatar={image} name={name} email={email} />
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ cell }) => <span className="text-xs">{cell.getValue() as string}</span>,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="[&_svg]:size-4"
        >
          Role
          <ArrowUpDownIcon />
        </Button>
      )
    },
  },
  {
    accessorKey: 'isAnonymous',
    header: 'Registered',
    cell: ({ cell }) => <span className="text-xs">{cell.getValue() ? 'No' : 'Yes'}</span>,
  },
  {
    accessorKey: 'createdAt',

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="[&_svg]:size-4"
        >
          Created At
          <ArrowUpDownIcon />
        </Button>
      )
    },
    cell: ({ cell }) => (
      <span className="text-xs">{(cell.getValue() as Date).toLocaleDateString('sk-SK')}</span>
    ),
  },
]
