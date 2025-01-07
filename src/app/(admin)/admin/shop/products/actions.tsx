'use client'

import { EditIcon, MoreHorizontalIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

export const Actions = ({ id }: { id: string }) => {
  const handleDelete = async () => {
    console.log('Delete product')
  }
  const isPending = false

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-5 p-0">
          <MoreHorizontalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href={`/admin/shop/products/${id}`}>
          <DropdownMenuItem disabled={isPending}>
            <EditIcon className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem disabled={isPending} onClick={handleDelete}>
          <TrashIcon className="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
