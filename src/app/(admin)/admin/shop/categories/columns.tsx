import type { ColumnDef } from '@tanstack/react-table'

export type Category = {
  id: string
  title: string
  description: string
  image: string
  products: number
}

export const columns: ColumnDef<Category>[] = [
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
    accessorKey: 'image',
    header: 'Image',
  },
  {
    accessorKey: 'products',
    header: 'Products',
  },
]
