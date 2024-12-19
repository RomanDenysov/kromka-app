'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '~/components/ui/badge'

export type Post = {
  id: string
  title: string
  author: string
  date: Date
  content: string
  tags: string[]
  likes: number
  comments: number
}

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'author',
    header: 'Author',
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
    accessorKey: 'content',
    header: 'Content',
    cell: ({ cell }) => {
      const content = cell.getValue() as string
      return <span>{content.substring(0, 50)}...</span>
    },
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ cell }) => (
      <div className="flex flex-wrap space-y-0.5">
        {(cell.getValue() as string[]).map((tag) => (
          <Badge key={tag} variant="secondary" className="bg-card px-1 text-muted-foreground">
            {tag}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'likes',
    header: 'Likes',
  },
  {
    accessorKey: 'comments',
    header: 'Comments',
  },
]
